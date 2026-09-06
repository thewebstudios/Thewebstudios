# TheWebStudios — Agency Portfolio Website

A premium, minimal, mobile-first agency portfolio website. This showcases
website templates/designs that TheWebStudios can build for client
businesses (it is not a website for one specific business).

## Files (flat structure, no folders — upload all as-is)

```
index.html      (main one-page agency site: hero, templates, pricing, FAQ, contact...)
work.html       (Examples / portfolio page)
project.html    (per-template "Live Preview" detail page)
pricing.html    (standalone pricing page)
quote.html      (Get a Quote / enquiry form page)
style.css
script.js
logo.png
favicon.svg
hero-bg.mp4          (currently unused — kept in case you want a video hero later)
hero-bg-poster.jpg   (currently unused)
README.md
```

## Homepage sections (index.html)

1. Navbar — Home / Templates / Services / Pricing / About / Contact, sticky, mobile hamburger
2. Hero — headline, subheading, two CTAs, browser mockup visual
3. Trust stats bar
4. Template showcase — filterable by category (All, Real Estate, Restaurant,
   Hotel, Clinic, Education, Fashion, Electronics, Salon, Gym, Services).
   Each card has "Live Preview" (opens `project.html?type=...`) and
   "Get This Website" (opens `quote.html`).
5. About / Why TheWebStudios — 6 reason cards
6. How It Works — 4 steps
7. Services list
8. Pricing — Starter / Business / Premium, each with a "Get Quote" button
9. FAQ — click to expand/collapse
10. Final CTA banner
11. Contact form (Name, Business Name, Category, Phone/WhatsApp, project
    details) → opens WhatsApp with everything filled in, plus a direct
    WhatsApp button
12. Footer — quick links, services, contact, socials

## Editing the template list

Open `script.js` and find the `templates` array (search for
`Template showcase (render + filter)`). Each entry looks like:

```js
{ name: "Estate Pro", category: "realestate", categoryLabel: "Real Estate",
  desc: "Property listings with photos, filters...", icon: '<path d="..."/>' }
```

Add, remove, or edit entries here — the grid and filters update automatically.
`category` must match one of the filter button values (`data-filter="..."`
in `index.html`) for the filter buttons to work with it.

To make "Live Preview" show custom text for a new category, add a matching
entry to the `projects` object in `script.js` (search for
`Project page dynamic content`).

## How to upload on GitHub

1. Open your repository → **Add file → Upload files**.
2. Drag in all files listed above at once.
3. Commit changes.
4. Settings → Pages → Source: Deploy from branch → `main` → `/ (root)` → Save.

## Updating content later

- WhatsApp number: search `919897286952` across files and replace.
- Email: `thewebstudios69@gmail.com`.
- Logo: replace `logo.png` with a new image of the same filename.
