<?php
// One article at /blog/<slug> (see .htaccess). The page itself is post.html; this fills in its <head>
// with the article's title, summary and picture, so search engines and link previews (WhatsApp,
// LinkedIn, Facebook), which do not run JavaScript, see the article and not a generic page.

declare(strict_types=1);
require __DIR__ . '/api/lib/seo.php';

$slug = (string) ($_GET['slug'] ?? '');
$posts = preg_match(SLUG_PATTERN, $slug) ? published_posts() : [];
$post = null;
foreach ($posts ?? [] as $candidate) {
    if ($candidate['slug'] === $slug) $post = $candidate;
}

// Down: ask crawlers to come back later. Unknown or unpublished: a real 404, kept out of search results.
$status = $posts === null ? 503 : ($post ? 200 : 404);
if ($status === 503) header('Retry-After: 300');

if ($post) {
    $title = trim((string) ($post['title'] ?? '')) ?: 'Article';
    $description = post_description($post);
    $url = post_url($post);
    $image = post_image($post);
    $published = post_time($post);
    $modified = strtotime((string) $post['updatedAt']) ?: $published;
    $structured = [
        '@context' => 'https://schema.org',
        '@type' => 'BlogPosting',
        'headline' => $title,
        'description' => $description,
        'image' => [$image],
        'url' => $url,
        'mainEntityOfPage' => $url,
        'author' => ['@type' => 'Organization', 'name' => trim((string) ($post['author'] ?? '')) ?: SITE_NAME],
        'publisher' => ['@type' => 'Organization', 'name' => SITE_NAME, 'logo' => ['@type' => 'ImageObject', 'url' => absolute_url(PUBLISHER_LOGO)]],
    ];
    if ($published) $structured['datePublished'] = date(DATE_ATOM, $published);
    if ($modified) $structured['dateModified'] = date(DATE_ATOM, $modified);

    $head = '
    <title>' . e($title) . ' - ' . SITE_NAME . '</title>
    <meta name="description" content="' . e($description) . '">
    <link rel="canonical" href="' . e($url) . '">
    ' . (indexing_allowed() ? '' : '<meta name="robots" content="noindex, nofollow">') . '
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="' . SITE_NAME . '">
    <meta property="og:title" content="' . e($title) . '">
    <meta property="og:description" content="' . e($description) . '">
    <meta property="og:url" content="' . e($url) . '">
    <meta property="og:image" content="' . e($image) . '">
    ' . ($published ? '<meta property="article:published_time" content="' . date(DATE_ATOM, $published) . '">' : '') . '
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="' . e($title) . '">
    <meta name="twitter:description" content="' . e($description) . '">
    <meta name="twitter:image" content="' . e($image) . '">
    <script type="application/ld+json">' . script_json($structured) . '</script>';
} else {
    $head = '
    <title>' . ($status === 503 ? 'Post could not be loaded' : 'Post not found') . ' - ' . SITE_NAME . '</title>
    <meta name="robots" content="noindex">';
}

// The page script reads the slug from here, since /blog/<slug> has no ?slug= in the address.
$head .= '
    <script>window.BLOG_SLUG = ' . script_json($slug) . ';</script>';

send_page(fill_template(__DIR__ . '/post.html', $head), $status);
