<?php
// /blog/sitemap.xml (see blog/.htaccess): the blog and every published article, so search engines
// find new articles without waiting to follow links. Submit it in Google Search Console; the site's
// robots.txt belongs to the main site, so it is not listed there.

declare(strict_types=1);
require __DIR__ . '/private/lib/seo.php';

// Like article pages (send_page): always current, never a copy saved by Plesk's nginx caching.
header('Cache-Control: no-cache');

if (!indexing_allowed()) {
    http_response_code(404);
    exit;
}

$posts = published_posts();
if ($posts === null) {
    http_response_code(503);
    header('Retry-After: 300');
    exit;
}

$entries = [['loc' => site_url() . '/blog/', 'lastmod' => null]];
foreach ($posts as $post) {
    $updated = strtotime((string) $post['updatedAt']);
    $entries[] = ['loc' => post_url($post), 'lastmod' => $updated ? date('Y-m-d', $updated) : null];
}

header('Content-Type: application/xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>', "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', "\n";
foreach ($entries as $entry) {
    echo '  <url><loc>', e($entry['loc']), '</loc>', $entry['lastmod'] ? '<lastmod>' . $entry['lastmod'] . '</lastmod>' : '', '</url>', "\n";
}
echo '</urlset>', "\n";
