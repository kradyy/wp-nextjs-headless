# 🚀 WP-NextJS Boilerplate

This is a WIP hobby project designed for headless WordPress development with Next.js, it's robust enough for production use.

## 🛠 Tech Stack

- Next.js (Frontend)
- WordPress (Backend)
- Apollo Client (GraphQL)
- Tailwind CSS
- Lando (Optional) for development

## 🎬 Quick Start

### 1. Clone the Repo

````bash
git clone https://github.com/kradyy/wp-nextjs-headless


## 2. Install Dependencies
Navigate to both `wp` and `nextjs` folders and execute:
```bash
npm install
````

## 3. Environment Setup

Create `.env.local` in the `/nextjs` directory and populate it with your specific environment variables.

## 4. Run the Projects

```bash
npm run dev:gutenberg:blocks
npm run dev:next
```

## 🌍 Environment Variables

```bash
WP_GRAPHQL_URL=https://localhost/graphql
NODE_ENV=development
NODE_TLS_REJECT_UNAUTHORIZED=0
NEXT_PUBLIC_WP_SITE_URL=https://localhost
NEXT_PUBLIC_WP_MENU_PRIMARY=primary_menu
NEXT_PUBLIC_WP_MENU_FOOTER=footer_menu
```

## 📁 Folder Structure

- `/wp/`: WordPress Installation
- `/nextjs/`: Next.js Project
- `/shared/`: Shared resources like Tailwind config.

## 📜 Scripts Explained

| Script                 | Description                           |
| ---------------------- | ------------------------------------- |
| `dev:gutenberg:blocks` | Watch for changes in Gutenberg blocks |
| `dev:next`             | Run Next.js in development mode       |

## 🧱 Developing Gutenberg Blocks

Developing Gutenberg blocks in this project involves a dual setup — one for the frontend powered by Next.js and another for the WordPress admin backend. This approach ensures a coherent experience between what you see in the admin area and what the end-users will see on the website.

### Next.js (Frontend)

For the frontend, blocks should be created in the following folder:

```plaintext
/wp-headless/nextjs/src/blocks
```

Inside this folder, you can develop React components that correspond to your Gutenberg blocks. These components will serve as the frontend representation of your blocks, integrated seamlessly within your Next.js application.

### WordPress (Admin Backend)

For the admin backend, blocks should be placed in the following folder:

```plaintext
/wp-headless/wp/wp-content/themes/wp-headless/src/blocks
```

This folder is where you'll create the actual Gutenberg blocks using PHP and JavaScript. These blocks will be available in the WordPress block editor, providing admins with a visual interface to manage content.

## 🔄 Hot Reloading for Gutenberg Blocks

To enable hot-reloading during Gutenberg block development, you can use WordPress's built-in `SCRIPT_DEBUG` constant. This will ensure that the most recent changes are fetched without manual page reloading.

Add the following line to your `wp-config.php`:

```php
define( 'SCRIPT_DEBUG', true );
```

This enables debugging for scripts and stylesheets, making it easier to spot issues and test changes in real time when used in conjunction with `wp-scripts`.

## 🌐 Setting Localhost Addresses with LANDO

If you're using LANDO for local development, make sure to set your localhost addresses for WordPress to get the live-reloading to work.

Add the following to your `wp-config.php`:

```php
define('WP_HOME','https://localhost:63112');
define('WP_SITEURL','https://localhost:63112');
```

By setting these, WordPress will recognize the proper site URL, allowing for effective local development.

## 🎯 Must-Use Plugins

Under the `wp-content/plugins` folder, we have included a number of must-use plugins to extend the capabilities of this project. The plugins in this folder are:

- `add-wpgraphql-seo`: For adding SEO support to WPGraphQL.
- `wp-graphql`: The backbone for enabling GraphQL support.
- `wp-graphql-blocks-1.0.10`: For making Gutenberg blocks accessible via GraphQL.
- `wp-graphql-blocks-acf-1.0.4`: For ACF support in WPGraphQL.
- `wp-graphql-gutenberg`: For Gutenberg support in WPGraphQL.
- `wp-graphql-meta-query-0.1.1`: For querying WordPress meta fields.
- `wp-graphql-offset-pagination-0.2.0`: For advanced pagination support in WPGraphQL.

## 📜 License

This project is licensed under the MIT License.

```
MIT Copyright 2023 Your Name or Organization

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```