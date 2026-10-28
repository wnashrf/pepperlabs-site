<?php
// Moves pictures saved inside articles out into files in blog/uploads/<article id>/.
// New saves already do this, so it is only for articles saved before that. Safe to run again.
//
//   php blog/private/cli/move-pictures.php

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

require __DIR__ . '/../lib/bootstrap.php';
require __DIR__ . '/../lib/media.php';

$rows = db()->query("SELECT id, slug, author_id, data FROM posts WHERE data LIKE '%data:image/%'")->fetchAll();
// updated_at = updated_at: moving pictures is not an edit, so the article keeps its last-changed time.
$update = db()->prepare('UPDATE posts SET data = ?, updated_at = updated_at WHERE id = ?');
foreach ($rows as $row) {
    $authorId = $row['author_id'] === null ? null : (int) $row['author_id'];
    $data = store_pictures((int) $row['id'], $row['data'], $authorId);
    $update->execute([$data, $row['id']]);
    $left = substr_count($data, 'data:image/');
    echo "{$row['slug']}: " . (substr_count($row['data'], 'data:image/') - $left) . ' moved' . ($left ? ", $left left inside (not a JPEG, PNG, GIF or WebP)" : '') . PHP_EOL;
}
echo count($rows) ? 'Done.' . PHP_EOL : 'No article has pictures saved inside it.' . PHP_EOL;
