// GitHub Pages serves dist/<route>/index.html for /<route>, so give every app route its own copy of
// index.html. Deep links then return HTTP 200 (good for SEO) instead of relying on the 404.html fallback.
import { copyFileSync, mkdirSync } from 'node:fs';

const routes = ['about', 'faqs', 'contact', 'privacy', 'delete-account', 'terms'];
for (const r of routes) {
  mkdirSync(`dist/${r}`, { recursive: true });
  copyFileSync('dist/index.html', `dist/${r}/index.html`);
}
console.log(`route pages: ${routes.join(', ')}`);
