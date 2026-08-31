# TheWebStudios — Agency Website (Flat, Multi-Page Version)

Flat, no-folder structure — every file sits directly in the same place.
Just upload every file below as-is.

## Files to upload (all of them, no folders)

```
index.html      (home page)
work.html       (Examples / portfolio page)
project.html    (project case-study page, opened from Examples)
quote.html      (Get a Quote / enquiry form page)
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

- `index.html` → clicking "Get a Quote" opens `quote.html`. Clicking a project's
  arrow button, or "View All Examples", opens `work.html` / `project.html`.
- `work.html` → each project card's arrow button opens `project.html?type=...`
  (restaurant, realestate, fashion, clinic, salon, gym) which changes the
  title/description on that page automatically via `script.js`.
- `project.html` → shows an animated step-by-step process (Requirement
  Gathering → First Look → Required Changes → Payment → Launch).

## Updating content later

- WhatsApp number: search `919897286952` across all files and replace.
- Email placeholder: `hello@thewebstudios.in`.
- Logo: replace `logo.png` with a new image of the same filename.
