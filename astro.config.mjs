import { defineConfig } from 'astro/config';
import { readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Pages that return a 404 (hidden drawers, ready: false) still get written as
// a stub "404" page. Delete those so a hidden page has no URL on the live site.
const dropHiddenPages = {
  name: 'drop-hidden-pages',
  hooks: {
    'astro:build:done': async ({ dir, pages }) => {
      for (const { pathname } of pages) {
        if (!pathname || pathname === '404/') continue;
        const folder = new URL(pathname, dir);
        const html = await readFile(new URL('index.html', folder), 'utf8').catch(() => '');
        if (html.includes('<title>404: Not Found</title>')) {
          await rm(fileURLToPath(folder), { recursive: true });
        }
      }
    },
  },
};

export default defineConfig({
  site: 'https://themadseacow.github.io',
  integrations: [dropHiddenPages],
});
