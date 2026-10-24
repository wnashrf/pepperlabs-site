<?php
// The blog index at /blog (see .htaccess). The page itself is index.html; this fills in its <head>
// with the address search engines should use and a list of the articles they can find.

declare(strict_types=1);
require __DIR__ . '/api/lib/seo.php';

$title = 'Blog - ' . SITE_NAME;
$description = 'Read the latest insights and articles from Pepper Labs';
$url = site_url() . '/blog';
$posts = published_posts() ?? [];

$structured = [
    '@context' => 'https://schema.org',
    '@type' => 'Blog',
    'name' => $title,
    'description' => $description,
    'url' => $url,
    'publisher' => ['@type' => 'Organization', 'name' => SITE_NAME, 'logo' => ['@type' => 'ImageObject', 'url' => absolute_url(PUBLISHER_LOGO)]],
    'blogPost' => array_map(function ($post) {
        $item = ['@type' => 'BlogPosting', 'headline' => (string) ($post['title'] ?? ''), 'url' => post_url($post)];
        if ($time = post_time($post)) $item['datePublished'] = date(DATE_ATOM, $time);
        return $item;
    }, array_slice($posts, 0, 20)),
];

$head = '
    <title>' . e($title) . '</title>
    <meta name="description" content="' . e($description) . '">
    <link rel="canonical" href="' . e($url) . '">
    ' . (indexing_allowed() ? '' : '<meta name="robots" content="noindex, nofollow">') . '
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="' . SITE_NAME . '">
    <meta property="og:title" content="' . e($title) . '">
    <meta property="og:description" content="' . e($description) . '">
    <meta property="og:url" content="' . e($url) . '">
    <meta property="og:image" content="' . e(absolute_url(DEFAULT_SHARE_IMAGE)) . '">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">' . script_json($structured) . '</script>';

send_page(fill_template(__DIR__ . '/index.html', $head));
