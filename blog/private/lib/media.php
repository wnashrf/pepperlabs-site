<?php
// Article pictures as files. The admin page sends pictures inside the article (data: addresses);
// store_pictures() writes each one to blog/uploads/<post id>/, records it in the media table,
// and leaves only the file's address in the article. Used by api/posts.php, api/media.php and cli/move-pictures.php.
//
// Every article keeps its own copy of its pictures, so deleting an article or a library picture
// never breaks another article. Pictures added in the Media tab go to blog/uploads/library/.

declare(strict_types=1);

const UPLOADS_DIR = __DIR__ . '/../../uploads';
const UPLOADS_URL = '/blog/uploads';
const LIBRARY_FOLDER = 'library';
// The sample articles' pictures. They are copied into each article's folder like an upload.
const SAMPLE_IMAGES_DIR = __DIR__ . '/../../data/images';
const SAMPLE_IMAGES_URL = '/blog/data/images';
// Only these are written out. Anything else (an SVG, a broken picture) stays inside the article as before.
const PICTURE_TYPES = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_GIF => 'gif', IMAGETYPE_WEBP => 'webp'];
// A picture already saved by the blog: its folder (an article number or the library) and file name.
const SAVED_PICTURE = '#' . UPLOADS_URL . '/(' . LIBRARY_FOLDER . '|\d+)/([a-f0-9]{16}\.(?:jpg|png|gif|webp))#';

// Writes a picture to the article's folder ($postId) or the library (null) and records it.
// Returns its address, or null when $bytes is not a picture we keep as a file.
function save_picture(string $bytes, ?int $postId, ?int $userId): ?string
{
    $info = @getimagesizefromstring($bytes);
    if (!$info || !isset(PICTURE_TYPES[$info[2]])) return null;

    // Named by content, so the same picture used twice in an article is one file.
    $name = substr(sha1($bytes), 0, 16) . '.' . PICTURE_TYPES[$info[2]];
    $folder = $postId === null ? LIBRARY_FOLDER : (string) $postId;
    $dir = UPLOADS_DIR . '/' . $folder;
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        throw new RuntimeException("Cannot create $dir");
    }
    if (!is_file("$dir/$name") && file_put_contents("$dir/$name", $bytes, LOCK_EX) !== strlen($bytes)) {
        throw new RuntimeException("Cannot write $dir/$name");
    }
    $url = UPLOADS_URL . "/$folder/$name";
    db()->prepare('INSERT IGNORE INTO media (post_id, url, mime, size, uploaded_by) VALUES (?, ?, ?, ?, ?)')
        ->execute([$postId, $url, $info['mime'], strlen($bytes), $userId]);
    return $url;
}

// $data is the article's JSON document; the same document comes back with the article's own addresses in place of pictures.
function store_pictures(int $postId, string $data, ?int $userId): string
{
    $data = preg_replace_callback('#data:image/[a-z0-9.+-]+;base64,([A-Za-z0-9+/]+={0,2})#i', function (array $match) use ($postId, $userId): string {
        $bytes = base64_decode($match[1], true);
        return ($bytes === false ? null : save_picture($bytes, $postId, $userId)) ?? $match[0];
    }, $data);

    // Pictures picked from the library or another article are copied into this article's folder.
    $data = preg_replace_callback(SAVED_PICTURE, function (array $match) use ($postId, $userId): string {
        if ($match[1] === (string) $postId) return $match[0];
        $file = UPLOADS_DIR . "/{$match[1]}/{$match[2]}";
        return (is_file($file) ? save_picture((string) file_get_contents($file), $postId, $userId) : null) ?? $match[0];
    }, $data);

    // No slashes in the name, so only files directly in data/images can be read.
    return preg_replace_callback('#' . SAMPLE_IMAGES_URL . '/([A-Za-z0-9._-]+)#', function (array $match) use ($postId, $userId): string {
        $file = SAMPLE_IMAGES_DIR . '/' . $match[1];
        return (is_file($file) ? save_picture((string) file_get_contents($file), $postId, $userId) : null) ?? $match[0];
    }, $data);
}

// The file behind a media row's address, or null if the address is not one the blog saved.
function picture_file(string $url): ?string
{
    return preg_match(SAVED_PICTURE, $url, $match) && $match[0] === $url ? UPLOADS_DIR . "/{$match[1]}/{$match[2]}" : null;
}

// When an article is deleted. Its media rows go with it (ON DELETE CASCADE).
function delete_pictures(int $postId): void
{
    $folder = UPLOADS_DIR . '/' . $postId;
    if (!is_dir($folder)) return;
    foreach (glob("$folder/*") ?: [] as $file) unlink($file);
    rmdir($folder);
}
