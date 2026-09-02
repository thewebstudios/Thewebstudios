# TheWebStudios — Agency Website (Flat, Multi-Page Version)

Flat, no-folder structure — every file sits directly in the same place.
Just upload every file below as-is.

## Files to upload (all of them, no folders)

```
index.html      (home page)
work.html       (Examples / portfolio page)
project.html    (project case-study page, opened from Examples)
pricing.html    (Pricing page)
quote.html      (Get a Quote / enquiry form page — 2-step form)
style.css
script.js
logo.png
favicon.svg
README.md
```

## How to upload on GitHub

1. Open your repository on GitHub.
2. Click **Add file → Upload files**.
3. Select / drag in **all files above** at once.
4. Scroll down, click **Commit changes**.

## Turn on GitHub Pages

1. Go to **Settings → Pages** in your repo.
2. Source: **Deploy from a branch**, Branch: **main**, folder: **/ (root)**. Save.
3. Wait 1–2 minutes, then visit the link GitHub shows you.

## How the pages connect

- `index.html` → "Get Started" opens WhatsApp directly. "See Our Work" opens
  `work.html`. "View Pricing" opens `pricing.html`. "Get a Quote" (nav) opens
  `quote.html`.
- `work.html` → each project card's arrow button opens `project.html?type=...`
  (restaurant, realestate, fashion, clinic, salon, gym).
- `project.html` → shows an animated step-by-step process, plus a Back button.
- `pricing.html` → the 3 pricing plans, plus a Back button.
- `quote.html` → a 2-step enquiry form: Step 1 (name + phone), Step 2
  (project type + message), then opens WhatsApp with everything filled in.

Every sub-page (`work.html`, `project.html`, `pricing.html`, `quote.html`)
has a **Back** button at the top-left that returns to whichever page you
came from.

## Adding gallery photos

The homepage has a **Gallery** section (Mathura / Vrindavan / Agra) with
empty placeholder slots. To add a real photo, just upload an image with the
exact matching filename next to `index.html`:

```
design-01.jpg ... design-08.jpg   → Mathura (8 slots)
design-09.jpg ... design-12.jpg   → Vrindavan (4 slots)
design-13.jpg ... design-16.jpg   → Agra (4 slots)
```

No code changes needed — as soon as a file with that exact name is uploaded,
it replaces the blank placeholder automatically. Recommended: square images
(1:1), at least 600×600px, saved as `.jpg`.

## Updating content later

- WhatsApp number: search `919897286952` across all files and replace.
- Email placeholder: `hello@thewebstudios.in`.
- Logo: replace `logo.png` with a new image of the same filename.
