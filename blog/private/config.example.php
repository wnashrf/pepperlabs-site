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

    // The address search engines should list, with no slash at the end:
    // 'https://pepperlabs.my' on the live site, 'https://mock.pepperlabs.my' on mock.
    // Left empty, the address the page was opened at is used.
    'site_url' => '',

    // false on any copy that is not the live site (mock, your laptop), so search engines skip the blog:
    // article pages say noindex and there is no sitemap. (The main site's robots.txt is not the blog's.)
    'allow_indexing' => true,

    // The time zone MySQL records times in. Change it only if the server is not on Malaysian time.
    'timezone' => 'Asia/Kuala_Lumpur',
];
