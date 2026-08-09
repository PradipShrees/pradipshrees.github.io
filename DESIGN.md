# Design

The visual system for `pradipshrees.github.io`. Change tokens in
`css/tokens.css`; this file explains why they are what they are.

## Scene

> A home hardware lab at 11pm — a Pi on the desk with its power LED lit, a
> monitor showing live readings, the only warm light in a dim room coming from
> status LEDs and the screen.

The theme is dark because the work genuinely happens in a dim room lit by
instruments, not because developer tools are conventionally dark.

## What this deliberately is not

Two aesthetics are saturated in this category and both are avoided:

1. **Green-on-black terminal.** The first reflex for any Linux/networking
   portfolio. Monospace everywhere, matrix palette, fake shell prompts.
2. **Editorial-typographic.** The reflex one tier deeper — display serif,
   italic headline, small tracked mono labels, ruled dividers, monochrome.
   This is what most portfolios land on while trying to avoid the first.

Instead: an **instrument panel**. Aubergine ground, warm signal accent, sturdy
grotesque type, monospace confined to actual data. Reference points are Teenage
Engineering, Panic.com, and Grafana's dark dashboards.

## Colour — Committed

Aubergine is a binding brand signal: Pradip supplied a self-made banner in
Ubuntu aubergine/magenta. It is used at its dark, controlled end. The bright
purple→magenta wallpaper gradient is deliberately not reproduced, because that
reads as the Ubuntu brand kit rather than as his own.

Orange is the signal accent — the status LED against the dark field. It carries
Ubuntu's warmth without quoting Ubuntu's logo.

| Token | Value | Role |
|---|---|---|
| `--bg` | `oklch(0.13 0.028 340)` | Deep aubergine ground |
| `--surface` | `oklch(0.18 0.036 340)` | Raised panels |
| `--surface-hi` | `oklch(0.235 0.042 340)` | Hover / active panels |
| `--ink` | `oklch(0.97 0.006 340)` | Body text — 16.8:1 on bg |
| `--ink-dim` | `oklch(0.76 0.018 340)` | Secondary text — 7.9:1 on bg |
| `--primary` | `oklch(0.52 0.19 350)` | Aubergine-magenta, filled buttons |
| `--accent` | `oklch(0.76 0.17 55)` | Warm orange signal |
| `--line` | `oklch(0.30 0.03 340)` | Hairlines |

### One hard rule

**Orange is never a fill behind text.** White on orange cannot reach 4.5:1 at any
lightness worth having, and dark text on saturated orange reads muddy because of
the Helmholtz–Kohlrausch effect. So orange is only ever a line, a dot, an
underline, a focus ring, a live indicator, or text on the dark ground — where it
hits 9.6:1 and looks excellent. Filled buttons use `--primary` with white text.

## Typography

One family with hard weight contrast, plus a mono strictly for data.

- **Archivo** — display at 800, body at 400. A sturdy grotesque with signage
  ancestry: plainspoken and slightly mechanical, which matches the voice.
- **Martian Mono** — IP ranges, instance types, stack lines, sensor readings,
  figures. Never body copy. Monospace used as decoration is costume; used on
  actual data it is a readout.

Both self-hosted as latin-subset woff2. No Google Fonts request at runtime.

Display headings cap at `clamp(2.5rem, 6vw, 5rem)` — 80px, below the 96px
shouting ceiling. Letter-spacing floor is `-0.03em`. Body copy caps at 68ch.
Light-on-dark gets `+0.06` line-height because light type reads lighter.

## Motion

- **Hero:** one orchestrated load. Image settles 1.06→1 over 900ms
  `--ease-out-expo`; headline reveals through a clip-path mask; three-step
  stagger at 70ms. Runs once.
- **Grid:** IntersectionObserver *enhances* an already-visible default. Cards
  render at full opacity; the observer adds a small translate. Visibility is
  never gated on a class, so the page cannot ship blank in a background tab or
  a headless render.
- **Cards:** image `scale(1.03)` plus an orange edge-light on hover, 220ms
  `--ease-out-quart`. Transform and opacity only.
- **Filter:** FLIP reorder via `getBoundingClientRect` and the Web Animations
  API. No library.
- **Topology:** a node-and-edge SVG motif carries between sections — real
  network geometry rather than generic circuitry. Two edges pulse in the hero.

Every one of these has a `prefers-reduced-motion: reduce` alternative, which is
a crossfade or an instant state change.

## Layout

Projects sit directly below the hero. Skills, certifications, and education
follow. This inverts the order the user first sketched, because the projects are
the argument and everything else is supporting testimony.

Section rhythm alternates generous and tight: the hero and the project grid
breathe; capabilities, certifications, and education are compact and scannable.

## Images

Every image slot degrades to an intentional fallback — an SVG built from the
project's own topology, not a grey box and never a broken-image icon. Filename
conventions are documented in `README.md`.

A project may carry several images. Dots appear only when there is more than
one, and they sit above the card's stretched link on the z-axis so they take
their own clicks. Dot buttons are 24×24 (WCAG 2.2 minimum target size) even
though the visible dot is 7px.

### Image frames stay wide

**The featured card must not split side-by-side.** It spans two grid columns
with its image in a full-width 16:9 band on top.

An earlier version put the image in a ~46%-wide side panel at full card height.
That frame is *portrait*, and `object-fit: cover` against a landscape
screenshot cropped it to a vertical sliver — about 28% of the image, unreadable.
The content here is screenshots of wide dashboards and consoles, so every frame
that holds one has to be wide too. Measured after the fix: 100% of the featured
image visible at 900px and at 1400px.

If you ever change a media frame's aspect ratio, measure the visible fraction
rather than eyeballing it:

```js
const b = img.getBoundingClientRect();
const boxR = b.width / b.height, imgR = img.naturalWidth / img.naturalHeight;
Math.min(boxR, imgR) / Math.max(boxR, imgR)   // 1.0 = nothing cropped
```
