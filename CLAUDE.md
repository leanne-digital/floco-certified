# FLOCO Certified — Project Instructions

## Repository
- GitHub: https://github.com/leanne-digital/floco-certified (remote `origin`, branch `main`)
- **Never** read from, push to, or add as a remote the separate `flocolexi` repository. This project is fully independent of it.
- Do not push without the owner's explicit go-ahead.

## Structure
```
/                  site root (index.html and other pages)
assets/images/     all web-ready images (optimized, see rules below)
assets/images/originals/   optional local-only full-size sources (git-ignored)
css/styles.css     global resets + hover states (from the design export)
css/responsive.css tablet/mobile overrides — all rules inside max-width media queries
map/market-map.html  territory map (iframe)
```

## Desktop design is locked
- The v4 desktop design (≥1200px) must not change. Put layout changes for smaller screens in `css/responsive.css` inside `@media (max-width:1199.98px)` / `(max-width:767.98px)`.
- Do not invent territory statuses, login/apply/search URLs or copy.

## Importing from Claude Design
- Unzip exports **outside** the repo (or into a git-ignored `exports/` folder); copy only the needed site files in.
- Never commit ZIP files or export bundles.
- After import, extract any Base64-embedded images into real files in `assets/images/` and reference them by relative path.

## Image rules
1. **No Base64 / data-URI images** in HTML, CSS or JS. Exception: tiny inline SVG icons (< 2 KB) may stay inline as `<svg>` markup.
2. **Formats:** WebP (preferred) or AVIF for photos; SVG for logos/icons; PNG only when transparency is needed and WebP isn't suitable; JPEG as fallback.
3. **Dimensions:** max 2400px on the longest edge for full-width hero images; max 1600px for content images; max 800px for thumbnails/cards. Never ship camera-original sizes.
4. **File size targets:** hero ≤ 400 KB, content images ≤ 200 KB, thumbnails/icons ≤ 50 KB. **Hard limit 1 MB per image** — anything larger must be resized/recompressed before committing.
5. **Quality:** WebP/JPEG quality ~75–82.
6. **Naming:** lowercase, hyphenated, descriptive (e.g. `hero-certified-team.webp`). No spaces or special characters.
7. **HTML:** always set `width`, `height` and meaningful `alt`; use `loading="lazy"` for below-the-fold images; consider `srcset` for responsive sizes.
8. Strip EXIF/metadata when optimizing.

Quick checks before committing:
```bash
find assets/images -type f -size +1M
grep -rn "data:image" --include=*.html --include=*.css --include=*.js .
```
Optimizing on macOS (built-in): `sips -Z 1600 in.jpg --out out.jpg`. For WebP, `cwebp -q 80 in.jpg -o out.webp` (requires `brew install webp`).

## Conventions
- Keep paths relative so the site works when opened locally and when hosted.
- Keep commits small and descriptive.
