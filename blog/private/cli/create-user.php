<?php
// Creates a blog account from the command line. Use it for the first admin; add everyone else from the admin page.
//
//   php blog/private/cli/create-user.php admin "Your Name" you@pepperlabs.my
//
// It asks for the password without showing it. On Windows the password is shown as you type.

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

// bootstrap.php replies in JSON; on the command line a plain message reads better.
function cli_fail(string $message): void
{
    fwrite(STDERR, $message . PHP_EOL);
    exit(1);
}

[$script, $role, $name, $email] = array_pad($argv, 4, null);
if (!$role || !$name || !$email) cli_fail("Usage: php blog/private/cli/create-user.php <admin|author> \"Full Name\" email@example.com");

$config = require __DIR__ . '/../config.local.php';
$pdo = new PDO("mysql:host={$config['db_host']};dbname={$config['db_name']};charset=utf8mb4", $config['db_user'], $config['db_pass'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

if (!in_array($role, ['admin', 'author'], true)) cli_fail('Role must be admin or author.');
$email = strtolower(trim($email));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) cli_fail('That is not a valid email address.');

$password = getenv('BLOG_PASSWORD') ?: null;
if ($password === null) {
    echo 'Password (at least 10 characters): ';
    if (DIRECTORY_SEPARATOR === '/') system('stty -echo');
    $password = trim((string) fgets(STDIN));
    if (DIRECTORY_SEPARATOR === '/') system('stty echo');
    echo PHP_EOL;
}
if (mb_strlen($password) < 10) cli_fail('Passwords need at least 10 characters.');

$exists = $pdo->prepare('SELECT 1 FROM users WHERE email = ?');
$exists->execute([$email]);
if ($exists->fetchColumn()) cli_fail('Someone already has an account with that email.');

$pdo->prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)')
    ->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT), $role]);
echo "Created {$role} account for {$name} <{$email}>." . PHP_EOL;
