<?php
// Pictures saved on the server, for the admin page's Media tab and its "From library" picker.
//   GET                       pictures the signed-in user may see: all for an admin; for an author,
//                             the library and the pictures in their own articles
//   POST   {image: "data:…"}  add a picture to the library (anyone signed in)
//   DELETE ?id=N              delete a library picture, or one no longer in its article (admin only)

declare(strict_types=1);
require __DIR__ . '/../private/lib/bootstrap.php';
require __DIR__ . '/../private/lib/media.php';

$user = require_user();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') send_json(['media' => list_media($user)]);

check_csrf();

if ($method === 'POST') {
    $image = (string) (request_body()['image'] ?? '');
    $bytes = preg_match('#^data:image/[a-z0-9.+-]+;base64,([A-Za-z0-9+/]+={0,2})$#i', $image, $match) ? base64_decode($match[1], true) : false;
    if ($bytes === false || save_picture($bytes, null, $user['id']) === null) fail('Choose a JPEG, PNG, GIF or WebP picture.');
    send_json(['media' => list_media($user)], 201);
}

if ($method === 'DELETE') {
    if ($user['role'] !== 'admin') fail('Only an admin can delete pictures.', 403);
    $statement = db()->prepare('SELECT m.id, m.url, m.post_id, p.data FROM media m LEFT JOIN posts p ON p.id = m.post_id WHERE m.id = ?');
    $statement->execute([(int) ($_GET['id'] ?? 0)]);
    $row = $statement->fetch();
    if (!$row) fail('That picture no longer exists. Reload the page.', 404);
    // Articles keep their own copies, so a library picture can always go; an article's picture only once the article stops using it.
    if ($row['post_id'] !== null && str_contains((string) $row['data'], $row['url'])) {
        fail('This picture is still in its article. Remove it there first.', 409);
    }
    db()->prepare('DELETE FROM media WHERE id = ?')->execute([$row['id']]);
    $file = picture_file($row['url']);
    if ($file !== null && is_file($file)) unlink($file);
    send_json(['media' => list_media($user)]);
}

fail('Method not allowed.', 405);

function list_media(array $user): array
{
    $sql = 'SELECT m.id, m.url, m.mime, m.size, m.created_at, m.post_id, u.name AS uploader, p.slug, p.status, p.data
            FROM media m LEFT JOIN users u ON u.id = m.uploaded_by LEFT JOIN posts p ON p.id = m.post_id';
    $params = [];
    if ($user['role'] !== 'admin') {
        $sql .= ' WHERE m.post_id IS NULL OR p.author_id = ?';
        $params[] = $user['id'];
    }
    $statement = db()->prepare($sql . ' ORDER BY m.id DESC');
    $statement->execute($params);

    return array_map(function (array $row): array {
        $post = null;
        if ($row['post_id'] !== null) {
            $data = json_decode((string) $row['data'], true) ?: [];
            $post = ['id' => (int) $row['post_id'], 'slug' => $row['slug'], 'status' => $row['status'], 'title' => (string) ($data['title'] ?? '')];
        }
        return [
            'id' => (int) $row['id'],
            'url' => $row['url'],
            'mime' => $row['mime'],
            'size' => (int) $row['size'],
            'createdAt' => date(DATE_ATOM, strtotime($row['created_at'])),
            'uploadedBy' => $row['uploader'],
            'post' => $post,
            // null for library pictures; for an article's picture, whether the article still shows it.
            'used' => $post === null ? null : str_contains((string) $row['data'], $row['url']),
        ];
    }, $statement->fetchAll());
}
