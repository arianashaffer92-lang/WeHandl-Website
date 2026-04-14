# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WeHandl.ai is a **static marketing website** — no build system, no package manager, no framework. The entire site is plain HTML, CSS, and vanilla JavaScript.

## File Structure

- `index7-updated.html` — main landing page (all CSS and JS are embedded inline)
- `guide.html` — free guide page (referenced but separate file)
- `/privacy` — privacy policy page
- `WeHandl_logo_transparent.png` — logo asset (also embedded as base64 in the HTML)

## Development

Open files directly in a browser — there is no dev server, build step, or compilation required. To preview changes, open the HTML file locally or serve with any static file server:

```bash
python3 -m http.server 8000
```

## Architecture

### CSS

All styles are in a single `<style>` block in the `<head>`. Design tokens are CSS custom properties on `:root` (`--navy`, `--green`, `--green-d`, `--shadow`, `--r`, `--px`, etc.). The layout uses CSS Grid (`grid-template-columns`) for most multi-column sections and `clamp()` for fluid typography.

Responsive breakpoints: `1024px` (collapse grids to 1 column), `768px` (tighter padding), `640px` (footer stacks).

### JavaScript

All JS is in a single `<script>` block at the bottom of `<body>`. Key behaviors:

- **Calculator** (`whCalc(redirectToGuide)`) — reads 5 inputs, computes monthly/annual/long-term missed revenue, animates the result values with an easing function. Passing `true` redirects to `guide.html` with URL params (`source`, `monthly`, `annual`, `longterm`, `jobs`).
- **Before/After table** — `baRows` array is rendered dynamically into `#ba-body` on page load.
- **FAQ accordion** — `toggleFaq(el)` closes all items then opens the clicked one.
- **Scroll reveal** — `IntersectionObserver` adds `.visible` class to `.reveal` elements with staggered delay based on sibling index within the same parent.
- **Lead flow animation** — `.lf-step-row` elements stagger in on page load with a 220ms interval.
- **Cookie banner** — persisted via `localStorage` key `wh_ck`.

### Section Order (DOM)

Launch bar → Nav → Hero → Integration strip → Transition block → Calculator → Growth breakdown → Solution → Before/After → How It Works → Who It's For → Pricing → FAQ → Free Guide → Final CTA → Footer

## Key Design Decisions

- The logo is embedded as a base64 JPEG in the `src` attribute of `<img>` tags — do not replace with a file path unless the file is confirmed to be served.
- All external links (`calendly.com/wehandl_ai`) open in `target="_blank" rel="noopener"`.
- The calculator's "See Your Numbers" button navigates to `guide.html` with query params — `guide.html` must read these params to pre-populate or personalize content.
- Color palette: `--navy: #0D1B3E`, `--green: #16A34A`, semantic reds/golds for negative/neutral stats.
