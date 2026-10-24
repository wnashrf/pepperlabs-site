# Blog database and sign-in

The blog keeps its articles, accounts and history in MySQL. PHP files in `blog/api/` read and write it, and check every permission:

| Role   | Can do |
|--------|--------|
| admin  | Everything: approve, send back, edit, pin, unpublish, delete. Adds people and changes roles. |
| author | Writes articles and sends them for review. Sees only their own, and edits them until they are published. |

`editor` and `member` (for commenters) can be added later. `users.role` is plain text, so no table change is needed.

## Set up on your laptop (Laragon)

1. Start Laragon (Start All).
2. Create the database. In Laragon's terminal, from the repo folder:
   ```
   mysql -uroot -e "CREATE DATABASE pepperlabs_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; CREATE USER 'pepperlabs_blog'@'localhost' IDENTIFIED BY 'pick-a-password'; GRANT ALL ON pepperlabs_blog.* TO 'pepperlabs_blog'@'localhost';"
   mysql -uroot pepperlabs_blog < blog/db/schema.sql
   ```
3. Copy `blog/api/config.example.php` to `blog/api/config.local.php` and fill in the password from step 2.
4. Create your admin account:
   ```
   php blog/cli/create-user.php admin "Your Name" you@pepperlabs.my
   ```
5. Run the site (`php -S localhost:8000 dev-router.php` in the repo folder, or `START_BLOG.bat`) and open `http://localhost:8000/blog/login.html`.
   The router gives `php -S` the same addresses as `.htaccess` on the server, such as `/blog/<article>`.
6. As admin, open **Settings** and click **Import articles** once to load the sample articles, or the ones saved in your browser.

## Set up on Plesk (mock.pepperlabs.my)

1. **Databases > Add Database**: name it (for example `pepperlabs_blog`) and create a database user. Note the name, user and password.
2. Open **phpMyAdmin** for that database > **Import** > choose `blog/db/schema.sql` > **Go**.
3. In **File Manager**, in the site's folder, copy `blog/api/config.example.php` to `blog/api/config.local.php` and edit it:
   fill in the database details and set `setup_key` to a long random string. This file is not in GitHub, so Git deploys never overwrite it.
   On mock, also set `'site_url' => 'https://mock.pepperlabs.my'` and **`'allow_indexing' => false`**, so Google does not list mock as a copy of the real site.
4. Open `https://mock.pepperlabs.my/blog/login.html`. With no accounts yet, it asks for the setup key and creates the first admin.
5. Sign in, open **Settings**, and click **Import articles** once.
6. Add your coworkers under **Users and roles**.

On the live site (pepperlabs.my) the steps are the same, with `'site_url' => 'https://pepperlabs.my'` and `'allow_indexing' => true`.

## Search engines and link previews

Search engines and link previews (WhatsApp, LinkedIn, Facebook) read a page's `<head>` without running JavaScript, so these addresses are served through PHP:

| Address | Served by | What it adds |
|---------|-----------|--------------|
| `/blog` | `blog/index.php` (page: `index.html`) | Canonical address, share tags, a list of articles for Google |
| `/blog/<article>` | `blog/post.php` (page: `post.html`) | The article's title, summary, picture and publish date, as share tags and schema.org `BlogPosting` |
| `/sitemap.xml` | `blog/sitemap.php` | Every published article, with when it last changed |
| `/robots.txt` | `blog/robots.php` | Keeps the admin pages and API out of search; blocks everything when `allow_indexing` is false |

Old `/blog/post.html?slug=...` links redirect to `/blog/<article>` permanently, so shared links keep working.
The PHP fills in the tags between `<!-- seo:start -->` and `<!-- seo:end -->` in `index.html` and `post.html`; edit the rest of those pages as before.

After the live site has this:
1. Add the site to [Google Search Console](https://search.google.com/search-console) and submit `https://pepperlabs.my/sitemap.xml`.
2. Check a few articles with Google's [Rich Results Test](https://search.google.com/test/rich-results) and LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/).
3. Plesk's **SEO** page (SEO Toolkit) can audit the site and track keywords. Leave its robots.txt and sitemap editors alone: the site makes its own.

An article whose main picture was uploaded in the admin page is saved inside the article, which link previews cannot load, so it shares with the Pepper Labs image instead. Moving uploads to real files (the Media tab) fixes that.

## Notes

- Passwords are stored with PHP's `password_hash`. Five wrong passwords lock that email out for 15 minutes.
- Pictures are still saved inside each article (as data in the database). Very large photos can hit the server's upload limit (`post_max_size` in PHP settings). Moving pictures to real file uploads is the next step for the Media tab.
- The `.htaccess` files in `blog/api/lib`, `blog/cli` and `blog/db` stop browsers opening those folders on Apache. `php -S` ignores them, which is fine on your laptop.
