<?php
// Article pictures as files. The admin page sends pictures inside the article (data: addresses);
// store_pictures() writes each one to blog/uploads/<post id>/, records it in the media table,
// and leaves only the file's address in the article. Used by api/posts.php and cli/move-pictures.php.

declare(strict_types=1);

const UPLOADS_DIR = __DIR__ . '/../../uploads';
const UPLOADS_URL = '/blog/uploads';
// The sample articles' pictures. They are copied into each article's folder like an upload.
const SAMPLE_IMAGES_DIR = __DIR__ . '/../../data/images';
const SAMPLE_IMAGES_URL = '/blog/data/images';
// Only these are written out. Anything else (an SVG, a broken picture) stays inside the article as before.
const PICTURE_TYPES = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_GIF => 'gif', IMAGETYPE_WEBP => 'webp'];

// $data is the article's JSON document; the same document comes back with uploads addresses in place of pictures.
function store_pictures(int $postId, string $data, ?int $userId): string
{
    $record = db()->prepare('INSERT IGNORE INTO media (post_id, url, mime, size, uploaded_by) VALUES (?, ?, ?, ?, ?)');
    // Returns the picture's new address, or null when $bytes is not a picture we keep as a file.
    $save = function (string $bytes) use ($postId, $userId, $record): ?string {
        $info = @getimagesizefromstring($bytes);
        if (!$info || !isset(PICTURE_TYPES[$info[2]])) return null;

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
    };

    $data = preg_replace_callback('#data:image/[a-z0-9.+-]+;base64,([A-Za-z0-9+/]+={0,2})#i', function (array $match) use ($save): string {
        $bytes = base64_decode($match[1], true);
        return ($bytes === false ? null : $save($bytes)) ?? $match[0];
    }, $data);

    // No slashes in the name, so only files directly in data/images can be read.
    return preg_replace_callback('#' . SAMPLE_IMAGES_URL . '/([A-Za-z0-9._-]+)#', function (array $match) use ($save): string {
        $file = SAMPLE_IMAGES_DIR . '/' . $match[1];
        return (is_file($file) ? $save((string) file_get_contents($file)) : null) ?? $match[0];
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
