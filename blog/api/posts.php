<?php
// Blog articles.
//   GET                      published articles, for the blog itself (no sign-in)
//   GET    ?view=admin       articles the signed-in user may see: all for an admin, their own for an author
//   POST                     {post}         new article
//   POST   ?action=import    {posts: [...]} fill an empty blog (admin only)
//   PUT    ?id=N             {post}         save changes
//   DELETE ?id=N                            delete (admin only)
//
// The admin page decides what buttons to show, but every rule is checked again here.

declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';

const STATUSES = ['pending', 'published', 'returned', 'unpublished'];
const ADMIN_ACTIONS = ['added', 'submitted', 'resubmitted', 'approved', 'returned', 'unpublished', 'republished', 'edited', 'pinned', 'unpinned', 'comments-on', 'comments-off'];
// Authors write and resubmit. Reviewing, publishing and pinning are for admins.
const AUTHOR_ACTIONS = ['submitted', 'resubmitted', 'edited'];
// Kept in their own columns or worked out by the server, so they are not stored twice in data.
const OWN_COLUMNS = ['id', 'slug', 'status', 'pinned', 'history', 'authorId', 'authorAccount'];
// Notes between staff that blog visitors should not see.
const PRIVATE_FIELDS = ['reviewNote', 'moderator', 'submittedAt', 'imageName', 'socialNetworks'];

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (($_GET['view'] ?? '') === 'admin') {
        $user = require_user();
        send_json(['posts' => load_posts($user)]);
    }
    send_json(['posts' => load_posts(null)]);
}

$user = require_user();
check_csrf();

if ($method === 'POST' && ($_GET['action'] ?? '') === 'import') {
    if ($user['role'] !== 'admin') fail('Only an admin can import articles.', 403);
    import_posts(request_body()['posts'] ?? null, $user);
}

if ($method === 'POST') {
    $post = request_body()['post'] ?? null;
    if (!is_array($post)) fail('No article was sent.');
    send_json(['post' => create_post($post, $user)], 201);
}

if ($method === 'PUT') {
    $post = request_body()['post'] ?? null;
    if (!is_array($post)) fail('No article was sent.');
    send_json(['post' => update_post((int) ($_GET['id'] ?? 0), $post, $user)]);
}

if ($method === 'DELETE') {
    if ($user['role'] !== 'admin') fail('Only an admin can delete articles.', 403);
    $statement = db()->prepare('DELETE FROM posts WHERE id = ?');
    $statement->execute([(int) ($_GET['id'] ?? 0)]);
    if (!$statement->rowCount()) fail('That article no longer exists.', 404);
    send_json(['ok' => true]);
}

fail('Method not allowed.', 405);

/* ---------- Reading ---------- */

// $user null means a blog visitor: published articles only, without staff notes or history.
function load_posts(?array $user): array
{
    $sql = 'SELECT p.*, u.name AS account_name FROM posts p LEFT JOIN users u ON u.id = p.author_id';
    $params = [];
    if ($user === null) {
        $sql .= " WHERE p.status = 'published'";
    } elseif ($user['role'] !== 'admin') {
        $sql .= ' WHERE p.author_id = ?';
        $params[] = $user['id'];
    }
    $statement = db()->prepare($sql . ' ORDER BY p.id');
    $statement->execute($params);
    $rows = $statement->fetchAll();

    $history = $user === null ? [] : load_history(array_column($rows, 'id'));
    return array_map(fn ($row) => to_client($row, $history[$row['id']] ?? [], $user !== null), $rows);
}

function load_history(array $postIds): array
{
    if (!$postIds) return [];
    $marks = implode(',', array_fill(0, count($postIds), '?'));
    $statement = db()->prepare("SELECT h.post_id, h.action, h.note, h.created_at, u.name FROM post_history h LEFT JOIN users u ON u.id = h.user_id WHERE h.post_id IN ($marks) ORDER BY h.id");
    $statement->execute($postIds);
    $byPost = [];
    foreach ($statement->fetchAll() as $row) {
        $entry = ['action' => $row['action'], 'at' => date(DATE_ATOM, strtotime($row['created_at']))];
        if ($row['note'] !== null && $row['note'] !== '') $entry['note'] = $row['note'];
        if ($row['name'] !== null) $entry['by'] = $row['name'];
        $byPost[$row['post_id']][] = $entry;
    }
    return $byPost;
}

function to_client(array $row, array $history, bool $forStaff): array
{
    $post = json_decode($row['data'], true) ?: [];
    $post['id'] = (int) $row['id'];
    $post['slug'] = $row['slug'];
    $post['status'] = $row['status'];
    $post['pinned'] = (bool) $row['pinned'];
    if ($forStaff) {
        $post['history'] = $history;
        $post['authorId'] = $row['author_id'] === null ? null : (int) $row['author_id'];
        $post['authorAccount'] = $row['account_name'] ?? null;
    } else {
        foreach (PRIVATE_FIELDS as $field) unset($post[$field]);
    }
    return $post;
}

function find_row(int $id): array
{
    $statement = db()->prepare('SELECT p.*, u.name AS account_name FROM posts p LEFT JOIN users u ON u.id = p.author_id WHERE p.id = ?');
    $statement->execute([$id]);
    $row = $statement->fetch();
    if (!$row) fail('That article no longer exists. Reload the page.', 404);
    return $row;
}

function saved(int $id): array
{
    return to_client(find_row($id), load_history([$id])[$id] ?? [], true);
}

/* ---------- Writing ---------- */

function clean_slug($slug): string
{
    $slug = is_string($slug) ? strtolower(trim($slug)) : '';
    if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug) || strlen($slug) > 190) {
        fail('The article needs a web address made of lowercase letters, numbers and dashes.');
    }
    return $slug;
}

function slug_taken(string $slug, int $exceptId = 0): bool
{
    $statement = db()->prepare('SELECT 1 FROM posts WHERE slug = ? AND id <> ?');
    $statement->execute([$slug, $exceptId]);
    return (bool) $statement->fetchColumn();
}

function document_of(array $post): string
{
    foreach (OWN_COLUMNS as $field) unset($post[$field]);
    return json_encode($post, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
}

// The page sends the whole history back with each save. Only the entries added since the last save are new.
function add_history(int $postId, array $incoming, int $alreadySaved, array $user): int
{
    $allowed = $user['role'] === 'admin' ? ADMIN_ACTIONS : AUTHOR_ACTIONS;
    $insert = db()->prepare('INSERT INTO post_history (post_id, user_id, action, note) VALUES (?, ?, ?, ?)');
    $added = 0;
    foreach (array_slice($incoming, $alreadySaved) as $entry) {
        $action = is_array($entry) ? (string) ($entry['action'] ?? '') : '';
        // Writing an article reads as "added by a moderator" for an admin and "submitted" for an author.
        if ($action === 'added' && $user['role'] !== 'admin') $action = 'submitted';
        if (!in_array($action, $allowed, true)) continue;
        $note = isset($entry['note']) ? mb_substr((string) $entry['note'], 0, 2000) : null;
        $insert->execute([$postId, $user['id'], $action, $note]);
        $added++;
    }
    return $added;
}

function history_count(int $postId): int
{
    $statement = db()->prepare('SELECT COUNT(*) FROM post_history WHERE post_id = ?');
    $statement->execute([$postId]);
    return (int) $statement->fetchColumn();
}

// The blog leads with a single pinned article.
function unpin_others(int $postId): void
{
    db()->prepare('UPDATE posts SET pinned = 0 WHERE id <> ? AND pinned = 1')->execute([$postId]);
}

function create_post(array $post, array $user): array
{
    $slug = clean_slug($post['slug'] ?? '');
    if (slug_taken($slug)) fail('Another article already uses this web address. Change the title slightly.', 409);

    if ($user['role'] === 'admin') {
        $status = in_array($post['status'] ?? '', STATUSES, true) ? $post['status'] : 'pending';
        $pinned = !empty($post['pinned']) && $status === 'published';
    } else {
        // An author's article always starts in review.
        $status = 'pending';
        $pinned = false;
        $post['submittedAt'] = gmdate(DATE_ATOM);
    }

    db()->beginTransaction();
    db()->prepare('INSERT INTO posts (slug, status, author_id, pinned, data) VALUES (?, ?, ?, ?, ?)')
        ->execute([$slug, $status, $user['id'], (int) $pinned, document_of($post)]);
    $id = (int) db()->lastInsertId();
    $history = is_array($post['history'] ?? null) ? $post['history'] : [];
    if (!add_history($id, $history, 0, $user)) {
        add_history($id, [['action' => $user['role'] === 'admin' ? 'added' : 'submitted']], 0, $user);
    }
    if ($pinned) unpin_others($id);
    db()->commit();

    return saved($id);
}

function update_post(int $id, array $post, array $user): array
{
    $row = find_row($id);
    $slug = clean_slug($post['slug'] ?? $row['slug']);
    if (slug_taken($slug, $id)) fail('Another article already uses this web address.', 409);

    if ($user['role'] === 'admin') {
        $status = in_array($post['status'] ?? '', STATUSES, true) ? $post['status'] : $row['status'];
        $pinned = !empty($post['pinned']) && $status === 'published';
    } else {
        if ((int) $row['author_id'] !== $user['id']) fail('You can only change your own articles.', 403);
        if (!in_array($row['status'], ['pending', 'returned'], true)) {
            fail('This article has been published or taken down, so only an admin can change it now.', 403);
        }
        // Saving after a send-back puts the article back in review. Authors cannot publish or pin.
        $status = 'pending';
        $pinned = (bool) $row['pinned'];
        if ($row['status'] === 'returned') $post['submittedAt'] = gmdate(DATE_ATOM);
        $before = json_decode($row['data'], true) ?: [];
        if (isset($before['reviewNote'])) $post['reviewNote'] = $before['reviewNote'];
    }

    db()->beginTransaction();
    db()->prepare('UPDATE posts SET slug = ?, status = ?, pinned = ?, data = ? WHERE id = ?')
        ->execute([$slug, $status, (int) $pinned, document_of($post), $id]);
    $history = is_array($post['history'] ?? null) ? $post['history'] : [];
    $added = add_history($id, $history, history_count($id), $user);
    // An Undo changes the status without adding a step, so the server notes it to keep the record complete.
    if (!$added && $status !== $row['status']) {
        db()->prepare('INSERT INTO post_history (post_id, user_id, action, note) VALUES (?, ?, ?, ?)')
            ->execute([$id, $user['id'], 'undone', "Moved back to {$status}"]);
    }
    if ($pinned) unpin_others($id);
    db()->commit();

    return saved($id);
}

function import_posts($posts, array $user): void
{
    if (!is_array($posts) || !$posts) fail('No articles were sent.');
    if ((int) db()->query('SELECT COUNT(*) FROM posts')->fetchColumn() > 0) {
        fail('The blog already has articles, so nothing was imported.', 409);
    }

    db()->beginTransaction();
    $insert = db()->prepare('INSERT INTO posts (slug, status, author_id, pinned, data) VALUES (?, ?, NULL, ?, ?)');
    $note = db()->prepare('INSERT INTO post_history (post_id, user_id, action, note, created_at) VALUES (?, ?, ?, ?, ?)');
    $seen = [];
    foreach ($posts as $post) {
        if (!is_array($post)) continue;
        $slug = clean_slug($post['slug'] ?? '');
        if (isset($seen[$slug])) continue;
        $seen[$slug] = true;
        $status = in_array($post['status'] ?? '', STATUSES, true) ? $post['status'] : 'published';
        $insert->execute([$slug, $status, (int) (!empty($post['pinned']) && $status === 'published'), document_of($post)]);
        $id = (int) db()->lastInsertId();
        // Earlier steps are kept with their original times, but nobody can be named for them.
        foreach (is_array($post['history'] ?? null) ? $post['history'] : [] as $entry) {
            if (!is_array($entry) || !in_array($entry['action'] ?? '', ADMIN_ACTIONS, true)) continue;
            $time = strtotime((string) ($entry['at'] ?? '')) ?: time();
            $note->execute([$id, null, $entry['action'], $entry['note'] ?? null, date('Y-m-d H:i:s', $time)]);
        }
        $note->execute([$id, $user['id'], 'imported', null, date('Y-m-d H:i:s')]);
    }
    db()->commit();

    send_json(['posts' => load_posts($user)], 201);
}
