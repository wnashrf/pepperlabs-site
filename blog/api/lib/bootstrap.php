<?php
// Shared by every endpoint in /blog/api: settings, database, JSON replies, sessions and roles.

declare(strict_types=1);

const ROLES = ['admin', 'author'];

// Anything unexpected is logged on the server and the browser only gets a short message.
set_exception_handler(function (Throwable $error) {
    error_log('[blog api] ' . $error);
    send_json(['error' => 'Something went wrong on the server. Please try again.'], 500);
});

function send_json(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(string $message, int $status = 400): void
{
    send_json(['error' => $message], $status);
}

function request_body(): array
{
    $body = json_decode(file_get_contents('php://input') ?: '', true);
    return is_array($body) ? $body : [];
}

function config(): array
{
    static $config = null;
    if ($config === null) {
        $file = __DIR__ . '/../config.local.php';
        if (!is_file($file)) {
            fail('The blog database is not set up yet. Copy blog/api/config.example.php to config.local.php.', 503);
        }
        $config = require $file;
    }
    return $config;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $config = config();
        $pdo = new PDO(
            "mysql:host={$config['db_host']};dbname={$config['db_name']};charset=utf8mb4",
            $config['db_user'],
            $config['db_pass'],
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
    }
    return $pdo;
}

function start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) return;
    $https = ($_SERVER['HTTPS'] ?? '') !== '' && ($_SERVER['HTTPS'] ?? '') !== 'off';
    session_name('pl_blog');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/blog/',
        'secure' => $https,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

// The signed-in user, read fresh from the database so a disabled account or changed role takes effect at once.
function current_user(): ?array
{
    start_session();
    $id = $_SESSION['user_id'] ?? null;
    if (!$id) return null;
    $statement = db()->prepare('SELECT id, name, email, role, status FROM users WHERE id = ?');
    $statement->execute([$id]);
    $user = $statement->fetch();
    if (!$user || $user['status'] !== 'active' || !in_array($user['role'], ROLES, true)) {
        $_SESSION = [];
        return null;
    }
    $user['id'] = (int) $user['id'];
    return $user;
}

function require_user(array $roles = ROLES): array
{
    $user = current_user();
    if (!$user) fail('Please sign in again.', 401);
    if (!in_array($user['role'], $roles, true)) fail('Your role cannot do that.', 403);
    return $user;
}

function csrf_token(): string
{
    start_session();
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
    return $_SESSION['csrf'];
}

// Every change must carry the token handed out at sign-in, so another site cannot act for a signed-in user.
function check_csrf(): void
{
    $sent = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!is_string($sent) || !hash_equals(csrf_token(), $sent)) {
        fail('This page has expired. Reload it and try again.', 419);
    }
}

function public_user(array $user): array
{
    return ['id' => (int) $user['id'], 'name' => $user['name'], 'email' => $user['email'], 'role' => $user['role']];
}
