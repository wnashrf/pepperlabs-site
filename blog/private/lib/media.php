<?php
// Article pictures as files. The admin page sends pictures inside the article (data: addresses);
// store_pictures() writes each one to blog/uploads/<post id>/, records it in the media table,
// and leaves only the file's address in the article. Used by api/posts.php and cli/move-pictures.php.

declare(strict_types=1);

const UPLOADS_DIR = __DIR__ . '/../../uploads';
const UPLOADS_URL = '/blog/uploads';
// Only these are written out. Anything else (an SVG, a broken picture) stays inside the article as before.
const PICTURE_TYPES = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_GIF => 'gif', IMAGETYPE_WEBP => 'webp'];

// $data is the article's JSON document; the same document comes back with addresses in place of pictures.
function store_pictures(int $postId, string $data, ?int $userId): string
{
    $record = db()->prepare('INSERT IGNORE INTO media (post_id, url, mime, size, uploaded_by) VALUES (?, ?, ?, ?, ?)');
    return preg_replace_callback('#data:image/[a-z0-9.+-]+;base64,([A-Za-z0-9+/]+={0,2})#i', function (array $match) use ($postId, $userId, $record): string {
        $bytes = base64_decode($match[1], true);
        $info = $bytes === false ? false : @getimagesizefromstring($bytes);
        if (!$info || !isset(PICTURE_TYPES[$info[2]])) return $match[0];

        // Named by content, so the same picture used twice in an article is one file.
        $name = substr(sha1($bytes), 0, 16) . '.' . PICTURE_TYPES[$info[2]];
        $folder = UPLOADS_DIR . '/' . $postId;
        if (!is_dir($folder) && !mkdir($folder, 0755, true) && !is_dir($folder)) {
            throw new RuntimeException("Cannot create $folder");
        }
        if (!is_file("$folder/$name") && file_put_contents("$folder/$name", $bytes, LOCK_EX) !== strlen($bytes)) {
            throw new RuntimeException("Cannot write $folder/$name");
        }
        $url = UPLOADS_URL . "/$postId/$name";
        $record->execute([$postId, $url, $info['mime'], strlen($bytes), $userId]);
        return $url;
    }, $data);
}

// When an article is deleted. Its media rows go with it (ON DELETE CASCADE).
function delete_pictures(int $postId): void
{
    $folder = UPLOADS_DIR . '/' . $postId;
    if (!is_dir($folder)) return;
    foreach (glob("$folder/*") ?: [] as $file) unlink($file);
    rmdir($folder);
}
