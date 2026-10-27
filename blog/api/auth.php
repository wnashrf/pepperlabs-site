<?php
// Sign-in for the blog admin.
//   GET                       who is signed in (401 if nobody; needsSetup when there are no accounts yet)
//   POST {action: "login"}    email + password
//   POST {action: "setup"}    first admin, only while there are no accounts
//   POST {action: "logout"}
//   POST {action: "password"} currentPassword + newPassword, for whoever is signed in
//   POST {action: "demo"}     staging only: signs in as the demo_login account, if config.local.php sets one

declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';

const MAX_FAILED_LOGINS = 5;
const MAX_FAILED_PER_ADDRESS = 30;
const LOCKOUT_MINUTES = 15;

// Failures count per email *and* address, so someone guessing at a colleague's email locks out only
// themselves. The per-address cap stops one machine trying many emails.
function locked_out(string $email, string $ip): bool
{
    $statement = db()->prepare('SELECT COUNT(*) AS address, COALESCE(SUM(email = ?), 0) AS pair FROM login_attempts WHERE ip = ? AND attempted_at > (NOW() - INTERVAL ' . LOCKOUT_MINUTES . ' MINUTE)');
    $statement->execute([$email, $ip]);
    $count = $statement->fetch();
    return (int) $count['pair'] >= MAX_FAILED_LOGINS || (int) $count['address'] >= MAX_FAILED_PER_ADDRESS;
}

function record_failure(string $email, string $ip): void
{
    db()->prepare('INSERT INTO login_attempts (email, ip) VALUES (?, ?)')->execute([$email, $ip]);
    db()->exec('DELETE FROM login_attempts WHERE attempted_at < (NOW() - INTERVAL 1 DAY)');
}

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user = current_user();
    if (!$user) {
        $needsSetup = (int) db()->query('SELECT COUNT(*) FROM users')->fetchColumn() === 0;
        send_json(['error' => 'Not signed in.', 'needsSetup' => $needsSetup], 401);
    }
    send_json(['user' => public_user($user), 'csrf' => csrf_token()]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('Method not allowed.', 405);

$body = request_body();
$action = $body['action'] ?? '';

if ($action === 'logout') {
    start_session();
    check_csrf();
    $_SESSION = [];
    session_destroy();
    send_json(['ok' => true]);
}

// First run only: while there are no accounts, whoever knows setup_key from config.local.php creates the first admin.
if ($action === 'setup') {
    $key = (string) (config()['setup_key'] ?? '');
    if ((int) db()->query('SELECT COUNT(*) FROM users')->fetchColumn() > 0) fail('The blog already has accounts. Sign in instead.', 409);
    if (strlen($key) < 16 || !hash_equals($key, (string) ($body['setupKey'] ?? ''))) fail('That setup key is not right.', 403);
    $name = trim((string) ($body['name'] ?? ''));
    $email = strtolower(trim((string) ($body['email'] ?? '')));
    $password = (string) ($body['password'] ?? '');
    if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) fail('Enter your name and a valid email address.');
    if (mb_strlen($password) < 10) fail('Passwords need at least 10 characters.');
    db()->prepare("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'admin')")
        ->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT)]);
    $action = 'login';
    $body['email'] = $email;
}

// shortcut: staging-only one-click sign-in for the "Admin (demo)" button. It works only while config.local.php
// names an account in demo_login; delete this block, the setting and the button before launch.
if ($action === 'demo') {
    $email = strtolower(trim((string) (config()['demo_login'] ?? '')));
    if ($email === '') fail('One-click demo sign-in is turned off. Sign in with your email and password.', 403);
    $statement = db()->prepare('SELECT id, name, email, role, status, password_hash FROM users WHERE email = ?');
    $statement->execute([$email]);
    $user = $statement->fetch();
    if (!$user || $user['status'] !== 'active' || !in_array($user['role'], ROLES, true)) fail('The demo account is not available.', 403);
    db()->prepare('UPDATE users SET last_login_at = NOW() WHERE id = ?')->execute([$user['id']]);
    sign_in($user);
    send_json(['user' => public_user($user), 'csrf' => csrf_token()]);
}

// Anyone signed in can change their own password. The current one is asked for, so a browser left
// signed in can't be used to take the account over. Other browsers using the old password are signed out.
if ($action === 'password') {
    $user = require_user();
    check_csrf();
    if (locked_out($user['email'], $ip)) fail('Too many wrong passwords. Wait ' . LOCKOUT_MINUTES . ' minutes, then try again.', 429);
    $statement = db()->prepare('SELECT password_hash FROM users WHERE id = ?');
    $statement->execute([$user['id']]);
    if (!password_verify((string) ($body['currentPassword'] ?? ''), (string) $statement->fetchColumn())) {
        record_failure($user['email'], $ip);
        fail('Your current password is not right.', 403);
    }
    $password = (string) ($body['newPassword'] ?? '');
    if (mb_strlen($password) < 10) fail('Passwords need at least 10 characters.');
    $user['password_hash'] = password_hash($password, PASSWORD_DEFAULT);
    db()->prepare('UPDATE users SET password_hash = ? WHERE id = ?')->execute([$user['password_hash'], $user['id']]);
    sign_in($user);
    send_json(['ok' => true, 'csrf' => csrf_token()]);
}

if ($action !== 'login') fail('Unknown action.');

$email = strtolower(trim((string) ($body['email'] ?? '')));
$password = (string) ($body['password'] ?? '');
if ($email === '' || $password === '') fail('Enter your email and password.');
if (locked_out($email, $ip)) fail('Too many wrong passwords. Wait ' . LOCKOUT_MINUTES . ' minutes, then try again.', 429);

$statement = db()->prepare('SELECT id, name, email, role, status, password_hash FROM users WHERE email = ?');
$statement->execute([$email]);
$user = $statement->fetch();

// The same message for an unknown email and a wrong password, so the form doesn't reveal who has an account.
if (!$user || !password_verify($password, $user['password_hash']) || $user['status'] !== 'active' || !in_array($user['role'], ROLES, true)) {
    record_failure($email, $ip);
    fail('That email and password don\'t match an active account.', 401);
}

if (password_needs_rehash($user['password_hash'], PASSWORD_DEFAULT)) {
    $user['password_hash'] = password_hash($password, PASSWORD_DEFAULT);
    db()->prepare('UPDATE users SET password_hash = ? WHERE id = ?')->execute([$user['password_hash'], $user['id']]);
}
db()->prepare('DELETE FROM login_attempts WHERE email = ? AND ip = ?')->execute([$email, $ip]);
db()->prepare('UPDATE users SET last_login_at = NOW() WHERE id = ?')->execute([$user['id']]);

sign_in($user);
send_json(['user' => public_user($user), 'csrf' => csrf_token()]);
