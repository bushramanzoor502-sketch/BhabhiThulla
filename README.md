# Bhabhi Thulla — Website

The official website for **Bhabhi Thulla**, the classic South Asian card game for Android.
*Four seats. One deck. Don't be the Bhabhi.*

Live site: https://bushramanzoor502-sketch.github.io/BhabhiThulla/

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: cinematic card table, how a hand plays, features, the seven tables, deck showcase |
| `/about` | About Us |
| `/faqs` | FAQs (accordion) |
| `/contact` | Contact Us (validated form, opens the visitor's email app) |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |

## Stack

- React 19 + TypeScript + Vite
- React Router (`BrowserRouter` with the `/BhabhiThulla/` base)
- Framer Motion for page transitions, reveals and card animations (respects `prefers-reduced-motion`)
- Plain CSS with design tokens (`src/styles/tokens.css`)
- Self-hosted fonts via Fontsource: Cinzel, Roboto Condensed (both used in the game) and Inter

All card faces, card backs, tables and the logo are SVG ports of the game's own drawing code
(`CardArt.kt`, `CardSkin.kt`, `TablePalette.kt` and the adaptive launcher icon). There are no raster game assets.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173/BhabhiThulla/
npm run build     # type-check + production build into dist/
npm run preview
```

## Project layout

```
src/
  config/site.ts        brand facts, contact email, Play Store link, table tiers
  content/              home copy, FAQs, legal text
  components/
    cards/              PlayingCard, CardBack (7 table decks + Court Faces), TiltCard
    layout/             Navbar (mobile menu), Footer, PageTransition, ErrorBoundary
    page/               PageHeader for inner pages
    ui/ faq/ contact/ legal/
  pages/                Home (+ home/ sections), About, Faqs, Contact, Privacy, Terms, NotFound
public/                 favicon, OG image, robots.txt, sitemap.xml, 404.html (SPA fallback)
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to the
`gh-pages` branch. GitHub Pages must be set to **Deploy from a branch → `gh-pages` / root**
(Settings → Pages).

GitHub Pages has no SPA rewrites, so `public/404.html` encodes the requested path into the query string and
`index.html` restores it before the app boots (the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique).
Refreshing on any route works.

## Updating facts

Change the Play Store link, email or table data in `src/config/site.ts`. The legal pages read the email and
"last updated" date from there too.
