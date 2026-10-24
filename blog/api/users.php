<?php
// Blog staff accounts. Admins only.
//   GET               everyone
//   POST              {name, email, role, password}       add someone
//   PUT ?id=N         {name?, role?, status?, password?}  change role, disable, or set a new password
//
// Accounts are disabled rather than deleted, so their name stays on the articles and history they touched.

declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';

const MIN_PASSWORD = 10;

$admin = require_user(['admin']);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $users = db()->query('SELECT id, name, email, role, status, created_at, last_login_at FROM users ORDER BY name')->fetchAll();
    foreach ($users as &$user) $user['id'] = (int) $user['id'];
    send_json(['users' => $users]);
}

check_csrf();
$body = request_body();

if ($method === 'POST') {
    $name = clean_name($body['name'] ?? '');
    $email = clean_email($body['email'] ?? '');
    $role = clean_role($body['role'] ?? '');
    $password = clean_password($body['password'] ?? '');

    $exists = db()->prepare('SELECT 1 FROM users WHERE email = ?');
    $exists->execute([$email]);
    if ($exists->fetchColumn()) fail('Someone already has an account with that email.', 409);

    db()->prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)')
        ->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT), $role]);
    send_json(['user' => find_user((int) db()->lastInsertId())], 201);
}

if ($method === 'PUT') {
    $user = find_user((int) ($_GET['id'] ?? 0));
    $role = array_key_exists('role', $body) ? clean_role($body['role']) : $user['role'];
    $status = array_key_exists('status', $body) ? $body['status'] : $user['status'];
    if (!in_array($status, ['active', 'disabled'], true)) fail('Status must be active or disabled.');

    if ($user['id'] === $admin['id'] && ($role !== 'admin' || $status !== 'active')) {
        fail('You cannot remove your own admin access. Ask another admin.', 403);
    }
    $losingAdmin = $user['role'] === 'admin' && $user['status'] === 'active' && ($role !== 'admin' || $status !== 'active');
    if ($losingAdmin && (int) db()->query("SELECT COUNT(*) FROM users WHERE role = 'admin' AND status = 'active'")->fetchColumn() <= 1) {
        fail('The blog needs at least one active admin.', 409);
    }

    $name = array_key_exists('name', $body) ? clean_name($body['name']) : $user['name'];
    db()->prepare('UPDATE users SET name = ?, role = ?, status = ? WHERE id = ?')->execute([$name, $role, $status, $user['id']]);
    if (array_key_exists('password', $body) && $body['password'] !== '') {
        db()->prepare('UPDATE users SET password_hash = ? WHERE id = ?')
            ->execute([password_hash(clean_password($body['password']), PASSWORD_DEFAULT), $user['id']]);
    }
    send_json(['user' => find_user($user['id'])]);
}

fail('Method not allowed.', 405);

function find_user(int $id): array
{
    $statement = db()->prepare('SELECT id, name, email, role, status, created_at, last_login_at FROM users WHERE id = ?');
    $statement->execute([$id]);
    $user = $statement->fetch();
    if (!$user) fail('That account no longer exists.', 404);
    $user['id'] = (int) $user['id'];
    return $user;
}

function clean_name($name): string
{
    $name = trim((string) $name);
    if ($name === '' || mb_strlen($name) > 120) fail('Enter a name of up to 120 characters.');
    return $name;
}

function clean_email($email): string
{
    $email = strtolower(trim((string) $email));
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 190) fail('Enter a valid email address.');
    return $email;
}

function clean_role($role): string
{
    if (!in_array($role, ROLES, true)) fail('Role must be admin or author.');
    return $role;
}

function clean_password($password): string
{
    $password = (string) $password;
    if (mb_strlen($password) < MIN_PASSWORD) fail('Passwords need at least ' . MIN_PASSWORD . ' characters.');
    return $password;
}
