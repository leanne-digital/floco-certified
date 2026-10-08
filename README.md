# FLOCO Certified — Homepage (standalone export)

Static website exported from the **FLOCO Certified Homepage v4** design. Plain HTML, CSS and JavaScript. No build step and no framework.

## Run locally

Any static server works. You need a server, not `file://`, because the territory map loads in an iframe and fetches map data:

```
npx serve .
# or
python3 -m http.server 8000
```

Deploy as-is to GitHub Pages, Netlify, Vercel (static) or similar.

## Structure

```
index.html                  Homepage markup (inline styles preserved exactly from the design)
css/styles.css              Global resets, image-fill rules, hover states
css/responsive.css          Tablet (768–1199px) and mobile (≤767px) layout; desktop (≥1200px) is untouched
js/main.js                  Mobile menu toggle; blocks the placeholder search form from submitting
map/market-map.html         Territory map (d3 + TopoJSON), embedded via <iframe>
assets/images/              Optimized WebP images
```

## Images (assets/images)

| File | Used in | Size |
|---|---|---|
| hero-sunset-pool.webp | Hero | ~107 KB |
| star-pool-deck.webp | The Program; FLOCO Family "Residential" card | ~109 KB |
| training-team.webp | Training (full-width) | ~104 KB |
| splash-pad-bee.webp | Training (small); FLOCO Family "Commercial" card | ~130 KB |
| team-kitchen.webp | Training (small) | ~67 KB |
| floco-team-group.webp | Instructors (group photo; from an 8192px original) | ~151 KB |
| floco-certified-badge.webp | Nav logo, hero badge, FLOCO Family card, final CTA, favicon (transparent) | ~69 KB |
| floco-surfacing-gallery-2/4/11/37/82/163.webp | Opportunities photo strip (self-hosted from flocodeckingsystems.com, 675–900px source) | 61–179 KB |
| palm-leaf.webp | Instructors palm leaf (transparent, decorative) | ~22 KB |
| floco-flamingo-speech-bubble.webp | Find a Specialist flamingo (transparent) | ~46 KB |

All are within budget (hero < 400 KB, content < 200 KB). No Base64 images are embedded anywhere.

## External dependencies

Fonts (Google Fonts):
- Barlow (400–700), Barlow Condensed (500–800), Yellowtail

Territory map (map/market-map.html):
- d3 7.9.0: https://unpkg.com/d3@7.9.0/dist/d3.min.js
- topojson-client 3.1.0: https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js
- US states geometry: https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json

### Hotlinked images: done

The 8 images that were hotlinked from flocodeckingsystems.com all loaded (HTTP 200) when checked. They are now downloaded, converted to WebP (~80% quality, original dimensions, transparency kept) and served from `assets/images/`. No images load from external hosts anymore.

## Differences from the design version

- **Image frames → `<img>`.** The design used editable drag-and-drop image frames. They are now plain `<img>` tags with `object-fit: cover`. Before conversion I checked for user-dropped images and crops, and none were saved, so every image is the one set in the design.
- **Style switches fixed.** The design's "script accents" and "hero badge" switches are fixed ON (script accents shown, hero badge visible).
- **Hover states.** These were per-element hover styles in the design. They are now generated classes (`.hv-1` … `.hv-22`) in `css/styles.css` using `!important` so they override the inline styles.
- **Inline styles.** Visual styles stay inline on each element, as authored. This reproduces the design exactly. Refactoring them into classes is optional.
- **Image resolution.** Images were re-encoded to WebP at about 80% quality. Five project photos were only 900px wide at the source, so they may look soft on very large or retina screens. Swap in higher-resolution originals if available.

## Status and open items

Done:
- Responsive layout for tablet and mobile (`css/responsive.css` + mobile menu in `js/main.js`). At 1200px and up, the page is verified identical to the v4 export: every element matches in position, size and computed style at 1200, 1280, 1440 and 1920px.
- Territory map redraws on resize; narrow frames use smaller labels. us-atlas is pinned to 3.0.1.
- SEO basics: title (matches sitemap H1/focus keyword), 150-character meta description, Open Graph/Twitter tags, descriptive alt text, width/height on all images.
- Accessibility basics: search input label, menu button with aria-expanded, keyboard focus outlines, decorative SVGs/images hidden from screen readers.

Needs owner input before launch:
1. **Login URL.** "Specialist Login" (nav → `#login`) and "Certified Specialist Login" (footer → `#`) need the installer app URL.
2. **Apply / Check My Territory.** 6 buttons point to `#apply` (the final CTA section, which also links to itself). They need the real `/apply/` page or form URL.
3. **Find a Certified Specialist search.** No backend. Submission is blocked in `js/main.js`.
4. **Sitemap page links.** "See Everything Included", "Explore the 5-Day Immersion", "Meet Your Instructors", "See How FLOCO Certified Works" and "Explore the FLOCO Certified Program" are in-page anchors. Point them at the sitemap pages once those exist.
5. **Territory map data.** The 6 markets in `map/market-map.html` are placeholders, all shown as "Open". Supply the real status per market.
6. **Live domain.** Needed to add `<link rel="canonical">`, `og:url` and `og:image` as absolute URLs (TODO comment in `<head>`).
7. **Image resolution.** Several photos are only 900px wide at the source, so they look soft on large or retina screens. Swap in higher-resolution originals if available.

Optional hardening: self-host the fonts and map libraries (d3, topojson-client, us-atlas).
