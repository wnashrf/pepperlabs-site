<?php
// Moves pictures saved inside articles, and the sample articles' pictures in blog/data/images/,
// into each article's own folder, blog/uploads/<article id>/.
// Saving an article already does this, so it is only for articles not saved since. Safe to run again.
//
//   php blog/private/cli/move-pictures.php

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

require __DIR__ . '/../lib/bootstrap.php';
require __DIR__ . '/../lib/media.php';

$rows = db()->query("SELECT id, slug, author_id, data FROM posts WHERE data LIKE '%data:image/%' OR data LIKE '%/blog/data/images/%'")->fetchAll();
$pictures = fn (string $data): int => substr_count($data, 'data:image/') + substr_count($data, SAMPLE_IMAGES_URL . '/');
// updated_at = updated_at: moving pictures is not an edit, so the article keeps its last-changed time.
$update = db()->prepare('UPDATE posts SET data = ?, updated_at = updated_at WHERE id = ?');
foreach ($rows as $row) {
    $authorId = $row['author_id'] === null ? null : (int) $row['author_id'];
    $data = store_pictures((int) $row['id'], $row['data'], $authorId);
    $update->execute([$data, $row['id']]);
    $left = $pictures($data);
    echo "{$row['slug']}: " . ($pictures($row['data']) - $left) . ' moved' . ($left ? ", $left left as they were (missing, or not a JPEG, PNG, GIF or WebP)" : '') . PHP_EOL;
}
echo count($rows) ? 'Done.' . PHP_EOL : 'No article has pictures left to move.' . PHP_EOL;
