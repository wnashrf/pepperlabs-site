<?php
// Laptop only: php -S ignores .htaccess, so this gives it the same addresses as the server.
//
//   php -S localhost:8000 dev-router.php
//
// Keep it in step with the rewrite rules in .htaccess.

if (PHP_SAPI !== 'cli-server') {
    http_response_code(404);
    exit;
}

$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/');
$slug = '[a-z0-9]+(?:-[a-z0-9]+)*';

if ($path === '/robots.txt') return require __DIR__ . '/blog/robots.php';
if ($path === '/sitemap.xml') return require __DIR__ . '/blog/sitemap.php';

if ($path === '/blog/' || $path === '/blog/index.html') {
    header('Location: /blog', true, 301);
    return true;
}
if ($path === '/blog') return require __DIR__ . '/blog/index.php';

if ($path === '/blog/post.html' && preg_match("/^$slug$/", $_GET['slug'] ?? '')) {
    header('Location: /blog/' . $_GET['slug'], true, 301);
    return true;
}
if (preg_match("#^/blog/($slug)$#", $path, $match) && !is_dir(__DIR__ . $path)) {
    $_GET['slug'] = $match[1];
    return require __DIR__ . '/blog/post.php';
}

// Anything else is a real file, or the React app for addresses it handles itself.
if (is_file(__DIR__ . $path)) return false;
return str_starts_with($path, '/blog/') ? false : require __DIR__ . '/index.html';
