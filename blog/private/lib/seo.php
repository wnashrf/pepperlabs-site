<?php
// Shared by the blog pages served through PHP for search engines and link previews:
// blog/post.php (each article) and blog/sitemap.php.
//
// Unlike the JSON API (bootstrap.php), these must still answer when the database is down,
// so nothing here stops the page: problems are logged and the caller gets null instead.

declare(strict_types=1);

const SLUG_PATTERN = '/^[a-z0-9]+(?:-[a-z0-9]+)*$/';
const SITE_NAME = 'Pepper Labs';
// Used when an article has no picture that link previews can load (none, or one saved inside the article).
const DEFAULT_SHARE_IMAGE = '/meta-images/og_thumbnail.png';
const PUBLISHER_LOGO = '/meta-images/logo.png';

function seo_config(): array
{
    static $config = null;
    if ($config === null) {
        $file = __DIR__ . '/../config.local.php';
        $config = is_file($file) ? require $file : [];
    }
    return $config;
}

// MySQL stores times in the server's local time, so PHP must read them in the same zone.
date_default_timezone_set(seo_config()['timezone'] ?? 'Asia/Kuala_Lumpur');

// The address search engines should treat as the real one, e.g. https://pepperlabs.my.
// Set site_url in config.local.php; without it the address the page was opened at is used.
function site_url(): string
{
    $configured = rtrim((string) (seo_config()['site_url'] ?? ''), '/');
    if ($configured !== '') return $configured;
    $https = ($_SERVER['HTTPS'] ?? '') !== '' && ($_SERVER['HTTPS'] ?? '') !== 'off';
    return ($https ? 'https' : 'http') . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
}

// False on copies of the site that must stay out of search results, such as mock.pepperlabs.my.
function indexing_allowed(): bool
{
    return (seo_config()['allow_indexing'] ?? true) !== false;
}

function absolute_url(string $path): string
{
    return preg_match('#^https?://#i', $path) ? $path : site_url() . '/' . ltrim($path, '/');
}

function e(?string $text): string
{
    return htmlspecialchars((string) $text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

// Safe to place inside <script>: tags, ampersands and quotes in the data cannot close the element.
function script_json($data): string
{
    return json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP | JSON_INVALID_UTF8_SUBSTITUTE);
}

// Published articles, newest first, or null when the database cannot be reached.
function published_posts(): ?array
{
    $config = seo_config();
    if (!isset($config['db_host'])) return null;
    try {
        $pdo = new PDO(
            "mysql:host={$config['db_host']};dbname={$config['db_name']};charset=utf8mb4",
            $config['db_user'],
            $config['db_pass'],
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
        );
        $rows = $pdo->query("SELECT slug, data, updated_at FROM posts WHERE status = 'published'")->fetchAll();
    } catch (Throwable $error) {
        error_log('[blog seo] ' . $error->getMessage());
        return null;
    }
    $posts = array_map(function ($row) {
        $post = json_decode($row['data'], true) ?: [];
        $post['slug'] = $row['slug'];
        $post['updatedAt'] = $row['updated_at'];
        return $post;
    }, $rows);
    usort($posts, fn ($a, $b) => (post_time($b) ?? 0) <=> (post_time($a) ?? 0));
    return $posts;
}

// Same order of preference as the blog pages: the publish date, then the display date.
function post_time(array $post): ?int
{
    foreach (['publishDate', 'date'] as $field) {
        $time = isset($post[$field]) ? strtotime((string) $post[$field]) : false;
        if ($time) return $time;
    }
    return null;
}

function post_url(array $post): string
{
    return site_url() . '/blog/' . $post['slug'];
}

// A plain-text summary of up to 160 characters, for search results and previews.
function post_description(array $post): string
{
    $text = trim((string) ($post['excerpt'] ?? ''));
    if ($text === '') $text = trim(html_entity_decode(strip_tags((string) ($post['content'] ?? '')), ENT_QUOTES, 'UTF-8'));
    $text = preg_replace('/\s+/u', ' ', $text);
    return mb_strlen($text) > 160 ? rtrim(mb_substr($text, 0, 157)) . '…' : $text;
}

// Link previews need a picture at a web address; one saved inside the article (data:) cannot be fetched.
function post_image(array $post): string
{
    $image = (string) ($post['image'] ?? '');
    return $image !== '' && !str_starts_with($image, 'data:') ? absolute_url($image) : absolute_url(DEFAULT_SHARE_IMAGE);
}

// Puts $head in place of the default tags between the <!-- seo:start ... --> and <!-- seo:end --> comments in a page.
function fill_template(string $file, string $head): string
{
    $html = (string) file_get_contents($file);
    // A callback, so a "$1" or backslash in an article title is inserted as written.
    return preg_replace_callback('/<!-- seo:start.*?<!-- seo:end -->/s', fn () => $head, $html, 1) ?? $html;
}

function send_page(string $html, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: text/html; charset=utf-8');
    if (!indexing_allowed()) header('X-Robots-Tag: noindex, nofollow');
    echo $html;
}
