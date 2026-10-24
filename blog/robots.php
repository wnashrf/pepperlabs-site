<?php
// /robots.txt (see .htaccess). Generated, so the same code can open the live site to search engines
// and close a copy such as mock.pepperlabs.my (allow_indexing => false in config.local.php).

declare(strict_types=1);
require __DIR__ . '/api/lib/seo.php';

header('Content-Type: text/plain; charset=utf-8');

if (!indexing_allowed()) {
    echo "# Not the live site: keep it out of search results.\nUser-agent: *\nDisallow: /\n";
    exit;
}

echo "User-agent: *\n";
echo "Allow: /\n";
echo "Disallow: /blog/admin.html\n";
echo "Disallow: /blog/login.html\n";
echo "Disallow: /blog/api/\n";
echo "\n";
echo 'Sitemap: ', site_url(), "/sitemap.xml\n";
