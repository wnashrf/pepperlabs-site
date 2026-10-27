<?php
// Copy this file to config.local.php in the same folder and fill in the database details.
// config.local.php is listed in .gitignore, so the password never reaches GitHub.
// On Plesk: Databases > Add Database gives you the name, user and password.

return [
    'db_host' => 'localhost',
    'db_name' => 'pepperlabs_blog',
    'db_user' => 'pepperlabs_blog',
    'db_pass' => 'change-me',

    // Only needed once: /blog/login.html asks for this key before it lets anyone create the first admin.
    // Use a long random string (at least 16 characters). It stops working as soon as one account exists.
    'setup_key' => '',

    // STAGING ONLY. The email of an account that the "Admin (demo)" button signs in as, with no password.
    // Anyone who can open the site gets that account, so leave this empty on the live site.
    'demo_login' => '',
];
