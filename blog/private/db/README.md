# Blog database, sign-in and search

Everything for the blog lives in `blog/`, so the main site's files are never touched:

```
blog/
├── .htaccess           the blog's own addresses: /blog/<article>, /blog/sitemap.xml, old-link redirects
├── index.html          blog home, at /blog/
├── post.html, post.php one article at /blog/<article>; post.php fills in the page's <head>
├── admin.html, login.html, media.js, media.css
├── sitemap.php         /blog/sitemap.xml
├── api/                auth.php, posts.php, users.php: the only PHP that browsers call directly
├── data/images/        pictures of the sample articles
├── uploads/            pictures added in the admin page, one folder per article (not in git)
└── private/            never served to browsers (private/.htaccess)
    ├── config.example.php, config.local.php
    ├── lib/            bootstrap.php (API), media.php (picture files), seo.php (post.php, sitemap.php)
    ├── db/             schema.sql, this file
    ├── cli/            create-user.php, move-pictures.php
    └── dev-router.php  laptop only
```

The blog keeps its articles, accounts and history in MySQL. `blog/api/` reads and writes it, and checks every permission:

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
   mysql -uroot pepperlabs_blog < blog/private/db/schema.sql
   ```
3. Copy `blog/private/config.example.php` to `blog/private/config.local.php`, fill in the password from step 2, and set `'allow_indexing' => false`.
4. Create your admin account:
   ```
   php blog/private/cli/create-user.php admin "Your Name" you@pepperlabs.my
   ```
5. Run the site from the repo folder and open `http://localhost:8000/blog/login.html`:
   ```
   php -S localhost:8000 blog/private/dev-router.php
   ```
   The router gives `php -S` the same addresses as `blog/.htaccess` on the server. Plain `php -S localhost:8000` (or `START_BLOG.bat`)
   also works: article links then open as `/blog/post.html?slug=...`, without the server-made `<head>`.
6. As admin, open **Settings** and click **Import articles** once to load the sample articles, or the ones saved in your browser.

## Set up on Plesk (mock.pepperlabs.my)

1. **Databases > Add Database**: name it (for example `pepperlabs_blog`) and create a database user. Note the name, user and password.
2. Open **phpMyAdmin** for that database > **Import** > choose `blog/private/db/schema.sql` > **Go**.
3. In **File Manager**, copy `blog/private/config.example.php` to `blog/private/config.local.php` and edit it:
   fill in the database details and set `setup_key` to a long random string. This file is not in GitHub, so Git deploys never overwrite it.
   On mock, also set `'site_url' => 'https://mock.pepperlabs.my'` and **`'allow_indexing' => false`**, so Google does not list mock's articles.
4. Open `https://mock.pepperlabs.my/blog/login.html`. With no accounts yet, it asks for the setup key and creates the first admin.
5. Sign in, open **Settings**, and click **Import articles** once.
6. Add your coworkers under **Users and roles**.

On the live site (pepperlabs.my) the steps are the same, with `'site_url' => 'https://pepperlabs.my'` and `'allow_indexing' => true`.

## Search engines and link previews

Search engines and link previews (WhatsApp, LinkedIn, Facebook) read a page's `<head>` without running JavaScript.

| Address | Served by | What it gives them |
|---------|-----------|--------------------|
| `/blog/` | `blog/index.html` | Fixed title, description, share picture and canonical address (`https://pepperlabs.my/blog/`) |
| `/blog/<article>` | `blog/post.php` (page: `post.html`) | The article's own title, summary, picture and dates, as share tags and schema.org `BlogPosting`. 404 for unknown or unpublished articles |
| `/blog/sitemap.xml` | `blog/sitemap.php` | Every published article, with when it last changed. Not available when `allow_indexing` is false |

- Old `/blog/post.html?slug=...` links redirect permanently to `/blog/<article>`, so links already shared keep working.
- `/blog` redirects to `/blog/`. A folder with its own `.htaccess` takes over from the root's rules for its addresses, and Apache adds the slash before those rules run, so the blog's home has to be `/blog/`.
- `post.php` fills in the tags between `<!-- seo:start` and `<!-- seo:end -->` in `post.html`; edit the rest of the page as before.
- With `allow_indexing` false, article pages say `noindex`. The main site's `robots.txt` is outside the blog, so keeping the whole of mock out of Google is up to the main site.

After the live site has this:
1. In [Google Search Console](https://search.google.com/search-console), submit `https://pepperlabs.my/blog/sitemap.xml`.
2. Check a few articles with Google's [Rich Results Test](https://search.google.com/test/rich-results) and LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/).
3. Plesk's **SEO** page (SEO Toolkit) can audit the site and track keywords.

Pictures uploaded in the admin page are saved as files (see Notes), so link previews can show an article's main picture.

## Notes

- Passwords are stored with PHP's `password_hash`. Five wrong passwords lock that email out for 15 minutes.
- Pictures: the admin page sends them inside the article, and on save the server writes each one to `blog/uploads/<article id>/` and lists it in the `media` table. The article keeps only the address.
  Deleting an article deletes its folder. A picture removed from an article stays on disk.
  The folder is not in git and deploys don't touch it, so **back up `blog/uploads/` together with the database**. PHP must be able to write to `blog/uploads/`.
  An article with many photos is sent in one request, so it can hit the server's upload limit (`post_max_size` in PHP settings).
- Databases made before the `media` table: import `schema.sql` again (it only adds missing tables), then run `php blog/private/cli/move-pictures.php` once to move pictures saved inside older articles into files.
- `blog/private/.htaccess` stops browsers opening that folder. If the server does not allow it, Apache answers with an error instead, which still keeps the folder closed.
  On `php -S`, PHP files there run and print nothing, and `dev-router.php` blocks the folder.
