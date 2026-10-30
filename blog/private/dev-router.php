<?php
// Laptop only. php -S ignores .htaccess, so this gives it the same blog addresses as blog/.htaccess on the server.
// From the repo folder:
//
//   php -S localhost:8000 blog/private/dev-router.php
//
// Keep it in step with blog/.htaccess.

if (PHP_SAPI !== 'cli-server') {
    http_response_code(404);
    exit;
}

$root = dirname(__DIR__, 2);
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/');
$slug = '[a-z0-9]+(?:-[a-z0-9]+)*';

// Like blog/private/.htaccess: never served.
if (str_starts_with($path, '/blog/private/')) {
    http_response_code(403);
    return true;
}

// Like blog/uploads/.htaccess: pictures only.
if (str_starts_with($path, '/blog/uploads/') && !preg_match('/\.(jpg|png|gif|webp)$/', $path)) {
    http_response_code(403);
    return true;
}

if ($path === '/blog' || $path === '/blog/index.html') {
    header('Location: /blog/', true, 301);
    return true;
}
if ($path === '/blog/sitemap.xml') return require $root . '/blog/sitemap.php';

if ($path === '/blog/post.html' && preg_match("/^$slug$/", $_GET['slug'] ?? '')) {
    header('Location: /blog/' . $_GET['slug'], true, 301);
    return true;
}
if (preg_match("#^/blog/($slug)$#", $path, $match) && !file_exists($root . $path)) {
    $_GET['slug'] = $match[1];
    return require $root . '/blog/post.php';
}

// Everything else as php -S would serve it: real files, and index.html for folders.
return false;
