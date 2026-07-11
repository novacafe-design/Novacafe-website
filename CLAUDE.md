# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NOVA CAFE is a static single-page website for a premium halal cafe in South C, Nairobi. No build step, no framework, no dependencies — open `index.html` directly in a browser to preview.

**Live site:** `https://novacafe.co.ke/` (custom domain via Cloudflare, origin GitHub Pages)
**GitHub repo:** `https://github.com/novacafe-design/Novacafe-website`
**Contact:** `novacafe.ke@gmail.com`

## Previewing & Deploying

**Local preview:** Open `index.html` directly in any browser. No server needed.

**Deploy:** Push to `main` — GitHub Pages auto-deploys within ~1 minute.

```bash
git add <files>
git commit -m "your message"
git push origin main
```

Hard-refresh with Ctrl+F5 after deploying to clear browser cache.

## Architecture

Four files, each with a clear responsibility:

| File | Role | Edit frequency |
|---|---|---|
| `menu.js` | Menu data (`MENU` array) + renderer | Most often |
| `index.html` | Page structure and all copy | Often |
| `styles.css` | All styling via CSS variables | Occasionally |
| `script.js` | Nav scroll/mobile toggle, form handler, scroll reveal | Rarely |

**No build pipeline.** `styles.css` is a single flat file (~1100 lines), not split into modules. `script.js` uses vanilla JS with no imports.

### How the menu works

`menu.js` defines a `MENU` array of category objects. Each category has `id`, `label`, `title`, `description`, and `items[]`. The renderer (bottom half of `menu.js`, after the `DO NOT EDIT BELOW` comment) reads this array on `DOMContentLoaded` and builds the tabs + item cards into `#menuTabs` and `#menuContent` in `index.html`. The tabs in `index.html` are empty `<div>`s — always populated by JS.

Item shape:
```js
{ name: "Item Name", desc: "Short description.", price: "450", tag: "new|veg|spicy|", img: "URL" }
```

### How images work

Content images are `<img>` tags (lazy-loaded, `decoding="async"`); a few section backdrops are CSS `background-image`:

| Slot | Type | Current source |
|---|---|---|
| Hero | `<img class="hero-image">` with `srcset` (768/1280/1536) | `images/branded cup NOVA*.webp` |
| Story portrait | CSS bg `.story-img` | `images/COFFEE BREWER.webp` |
| Feature strip | CSS bg `.feature` | `images/new images/hot coffee branded.webp` |
| Brand strip | CSS bg `.brandstrip-img` | `images/COFFEE SPILLING.webp` |
| Gallery `.g1`–`.g6` | `<img>` | local WebP photos |
| Signature cards | `<img>` | `images/new images/*.webp` |
| Menu thumbnails | `<img>` built by `menu.js` | `images/menu/<item-slug>.webp` |

All photos are local WebP — no external image dependencies. Menu thumbnails have an `onerror` fallback that shows the item's first letter.

**Menu image conventions** (follow these when adding new item photos):
- Path/name: `images/menu/<kebab-case-item-name>.webp` (e.g. `iced-spanish-latte.webp`).
- Size: 600×800 (portrait); the card crops it to 4:3 with `object-fit: cover`.
- Format: WebP, quality ~72–75 (Pillow `method=6`), target ≤35 KB per thumbnail.
- Section/gallery images: max 800–1200 px on the long edge, WebP q75, target ≤120 KB.
- Keep the original photo out of git (add it to `.gitignore` like the existing originals) and commit only the optimized WebP.

### CSS design tokens

All colours and spacing are CSS variables at the top of `styles.css` under `:root`. Changing a variable updates the whole site:

```css
--bg: #2B1E17;          /* dark coffee-brown page background */
--bg-warm: #3E2C23;     /* lighter brown — nav (scrolled), menu section, footer */
--bg-deep: #231610;     /* darkest brown — top bar, visit section */
--cream: #F5EDE6;       /* headings and primary text */
--bronze: #C49A6C;      /* primary accent — buttons, prices, highlights */
--font-display: 'Cormorant Garamond', ...;
--font-body: 'Inter', ...;
--max: 1320px;          /* max content width (nav/topbar) */
--section-max: 1200px;  /* max content width (sections) */
--pad: clamp(1.25rem, 4vw, 3rem); /* responsive horizontal padding */
```

### Reservation form

The form posts to Formspree (`mykodwqg`, delivers to novacafe.ke@gmail.com). `script.js` submits it with `fetch` and shows an inline success/error message in `.form-status`, so visitors never leave the page; with JS disabled it falls back to a native POST to Formspree's confirmation page. It includes a `_gotcha` honeypot for spam and sets the date input's `min` to today.

## Common Edits

**Change a price or description** → edit the relevant object in the `MENU` array in `menu.js`.

**Add/remove a menu item** → add/remove an object in the appropriate `items[]` array. Every item except the last in its array needs a trailing comma.

**Change contact details (phone, email, address, hours)** → `index.html`, `<!-- VISIT / CONTACT -->` section.

**Change hero headline or story copy** → `index.html`, `<!-- HERO -->` or `<!-- STORY -->` sections.

**Add a real photo** → optimize to WebP per the conventions above, put it in `images/`, then update the `<img>` src in `index.html`/`menu.js` (or the `background-image` URL in `styles.css` for the story/feature/brandstrip backdrops).

**Change opening hours** → update BOTH the `hours` list in `index.html` (Visit section), the `HOURS` table at the top of `script.js` (drives the "Open today" top bar), and the `openingHoursSpecification` in the JSON-LD block in `index.html`'s head.

**After editing styles.css or the JS files** → bump the `?v=` query string on `styles.css`, `menu.js`, and `script.js` in `index.html` so Cloudflare/browser caches pick up the change.

**Change social links** → `index.html`, search for `Instagram`.

**Change the rotating taglines** (band under the hero) → `TAGLINES` array in `script.js`. The first phrase in `index.html` (`#tagbandText`) is what no-JS and reduced-motion visitors see — keep it the strongest one.

**Change the orbit badge text** (rotating ring on the story photo) → `<textPath>` in `index.html`; keep it short enough to fit the ring (`textLength="288"` distributes it evenly).

## Git Setup Note

This folder was initialized as a git repo locally (not cloned). The remote is:
```bash
git remote add origin https://github.com/novacafe-design/Novacafe-website.git
```
If git isn't initialized, run the above two commands before pushing.

## Pending Items

(Last reviewed 2026-07-11 during the pre-launch audit.)

- **Menu photos:** all 42 items now have local WebP thumbnails. Spanish Latte, Americano, and Iced Mocha use optimized copies of the former Unsplash stock shots — swap in real branded photos when available (see the menu image conventions above).
- **Hero on very wide screens:** the largest hero variant is 1536 px; on 2K+ displays it upscales slightly. Consider exporting a 2048 px variant if ultra-wide sharpness ever matters.
- **Cookie/consent notice:** the site runs Google Analytics (gtag) without a consent banner. Fine to launch, but worth a decision under the Kenya DPA if traffic grows.
