# Behmen Studio — site context for agents

Living working notes for this repo. Read this before digging through the codebase.
Update the **Change requests** section when new client asks come in; mark items done.

## Stack (do not assume a framework)

- **Plain static site**: HTML + CSS + vanilla JS
- **No** `package.json`, Vue, Nuxt, React, Vite, or build step
- **Host**: GitHub Pages from `main` branch root → `behmenstudio.com` (`CNAME`)
- **Deploy**: push to `main` = publish (usually 1–2 minutes). No separate deploy job for page/CSS/JS edits
- **Portfolio carousel**: Embla Carousel + Autoplay, vendored UMD under `vendor/embla/` (no CDN, no npm build)
- **Vendor later**: Staatliches/Schibsted Grotesk under `assets/fonts/`; hero image → local WebP

## Local preview

```bash
# from repo root
python3 -m http.server 8080
# or open index.html directly
```

## File map — what to edit for what

| Goal | File(s) |
|------|---------|
| Copy, sections, layout structure, nav labels | `index.html` |
| Colors, spacing, typography, responsive layout | `styles.css` |
| Nav, portfolio carousel, lightbox, contact form | `script.js` |
| Live portfolio image list (preferred source) | `gallery-data.js` |
| Fallback gallery list inside JS (legacy/duplicate) | `script.js` (`defaultGalleryItems`) |
| In-browser image admin (GitHub token flow) | `image-library.js` + admin markup in `index.html` |
| Legal | `privacy.html`, `terms.html` |
| Internal image helper UI | `imageshelp.html` (+ `.css` / `.js`) |
| Process originals → web/thumbs + regenerate gallery data | `scripts/process_images.py`, `process-images.command` |
| Handover / hosting docs (client-facing) | `README.md`, `HANDOVER-CHECKLIST.md` |
| Historical build checklist (stale-ish) | `PROJECT_PLAN.md` |

### Assets

- `assets/images/originals/` — drop full-size photos here
- `assets/images/web/` — full display WebPs (served on site)
- `assets/images/thumbnails/` — smaller WebPs
- `assets/icons/` — logos / favicon (legacy; header is text “BEHMENSTUDIO” now)
- Gallery CI: `.github/workflows/process-gallery-images.yml` runs on push when originals (or processor scripts) change; commits generated web/thumbs/`gallery-data.js`

## Page structure (`index.html` — one-pager, full-viewport sections)

- `#home` — hero (full viewport image + `#1A1A1A` 0.6 overlay + headline / sub / 3 perks)
- `#services` — services (bg `#2A4C3A`, centered cream “SERVICES”, 3 dark cards: image + title + desc + includes list + text price)
- `#portfolio` — cinematic Embla strip (content-height, not full-viewport) + lightbox/autoplay; shared `.section-pad` / `.section-inner` title shell; fed by `gallery-data.js`
- `#contact` — booking form → Google Forms (same green / cream text treatment)
- Footer, lightbox (`#lightbox`), admin shell (`#admin-shell`)

Scripts: Embla CDN → `gallery-data.js` → `script.js` → `image-library.js` (cache-bust query `?v=`).

## Design tokens (Webflow-aligned, first pass)

| Token | Value |
|-------|--------|
| Secondary / services+contact bg | `#2A4C3A` |
| Headline cream | `#FFFFE6` |
| Accent (checks) | `#E9FF47` |
| Card on secondary | `#1A1A1A`, radius 12px, pad 24px |
| Hero overlay | `#1A1A1A` @ 0.6 |
| Display font | Staatliches — weight 400, lh 1.04, tracking -0.01em (`--display-*` + `.display-type` in `styles.css`); CDN woff2 for now; self-host later |
| Body font | Schibsted Grotesk — CDN woff2 for now; self-host later |

Hero photo (temporary remote; optimize to local WebP later):

`https://cdn.prod.website-files.com/6a1c24137686060838b25c6c/6a1c24147686060838b25c87_mittwochu%CC%88lu0129.jpg`

## Contact / booking

- Form posts to Google Forms (URLs in `script.js`: `GOOGLE_FORM_URL`, `GOOGLE_FORM_POST_URL`)
- Do not “fix” without confirming the live Form with the client

## Gotchas

1. **Not a SPA** — no router, no components, no npm. Prefer small HTML/CSS/JS edits over rewrites.
2. **Do not migrate to Nuxt/Vite** unless the maintainer explicitly asks.
3. **Admin panel is not real security** — prefer file edits / `process-images` for gallery work.
4. **Gallery data** — carousel reads `window.SITE_GALLERY_ITEMS` / `gallery-data.js`.
5. **Cache bust** — bump `?v=` on CSS/JS after meaningful changes.
6. Keep deploy, image pipeline, and Google Form wiring intact unless asked otherwise.
7. Existing docs (`README`, handover) are for the photographer; this file is for developers/agents.

## Conventions for changes

- Follow the Webflow-inspired redesign direction in Change requests (not the old warm dark AI theme).
- Keep accessibility: skip link, focus styles, `prefers-reduced-motion`, keyboard carousel/lightbox.
- Avoid bundling/minifying unless explicitly requested.
- Don’t commit secrets (tokens, `.env`, form admin credentials).
- Only commit when the user asks.

## Change requests (client)

### Pending (later iterations)

- [ ] Contact form visual polish (detail TBD)
- [ ] Self-host Staatliches + Schibsted Grotesk under `assets/fonts/`
- [ ] Optimize hero image → local WebP (stop Webflow CDN dependency)
- [ ] Further Webflow parity pass (spacing, motion, exact type scales)

### Done (iteration 1–2)

- [x] One-pager with full-viewport sections: Hero, Services, Portfolio, Contact
- [x] Header text logo `BEHMENSTUDIO` + anchor nav (Services, Portfolio, Contact)
- [x] Hero remote image + dark overlay
- [x] Hero rebuilt from Webflow scrape (layout + overlay + type + perks bottom-right)
- [x] Services green bg + cream headline; keep existing 3 service boxes
- [x] Services card design (Webflow: dark cards, includes list, text prices; images 17/15/36)
- [x] Portfolio Embla carousel (CDN for now; vendor later)
- [x] Portfolio cinematic strip + local Embla/Autoplay (`vendor/embla/`, stop on interaction)
- [x] Contact green section, centered form without colored card chrome
- [x] Load Staatliches + Schibsted Grotesk via remote woff2 for now

## Design reference (Webflow)

- Staging URL: https://captured-essence-6a495f-41c110ba3a39a87.webflow.io/
- Shared CSS: `https://cdn.prod.website-files.com/6a1c24137686060838b25c6c/css/captured-essence-6a495f-41c110ba3a39a87.webflow.shared.59d358766.css`
- Hero h1 (`.heading_hero`): Staatliches 400, ~8rem (127.84px @ wide desktop), lh 1.04, tracking -0.01em, color `#FFFFE6`, padding-inline ~60px
- Hero sub (`.subheading`): Schibsted Grotesk, ~1.13rem, lowercase, color cream @ ~70% opacity
- Agents: prefer inspecting this URL over guessing Webflow styles

## Quick decisions already made

- Keep static HTML/CSS/JS; no framework rewrite for now
- No minify/bundle for current file sizes
- Deploy = push `main`
- Redesign toward friend’s Webflow look; keep form + image pipeline + Pages hosting
