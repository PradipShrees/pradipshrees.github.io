# pradipshrees.github.io

Personal portfolio. Plain HTML, CSS and JavaScript — no framework, no build
step, no npm install, no dependencies. Pushing to `main` publishes it.

---

## Before you publish

One placeholder is left, marked `TODO` in `js/site.js`:

| What | Where |
|---|---|
| Master's institution name | `js/site.js` → `SITE.education[0].school` |

Until it's filled in, the education entry reads "Institution to be confirmed"
in italics, which is honest rather than broken. Leave it that way until
enrolment is actually confirmed.

Two files in the repo root are yours and aren't used by the site:
`banner.png` and `Image/IMG_0025.heic`. They'll be published if you commit
them. Delete them, or move the photo to `img/` and wire it up (see below).

---

## Adding a project

Open `js/projects.js`, copy any block, paste it into the array, edit it. Save.
That is the whole process — no other file changes.

```js
{
  slug:   'my-project',                     // also the image filename
  title:  'My Project',
  kicker: 'Short context line',             // small orange line above the title
  blurb:  'Two or three sentences on what it does and what you built.',
  stack:  ['Thing', 'Other Thing'],         // renders as small mono chips
  tags:   ['networking', 'homelab'],        // drives the filter buttons
  image:  'img/projects/my-project.jpg',
  repo:   'https://github.com/PradipShrees/my-project',
  featured: false                           // true = double-width card
}
```

Adding a tag that doesn't exist yet automatically creates a new filter button.
Give it a display name in `TAG_LABELS` at the bottom of the same file.

Only one project should have `featured: true`.

---

## Adding images

Save the file to `img/projects/`, then add its path to that project's
`images:` list. A project can have as many images as you like — dots appear
automatically once there's more than one, and they're keyboard-operable
(arrow keys move between them).

```js
images: [
  'img/projects/airwatch.jpg',      // shown first — make this the strongest
  'img/projects/airwatch2.jpg'
]
```

**Put the best screenshot first.** That's the one people see without clicking.

| Slot | Path | Size | Switch it on in |
|---|---|---|---|
| Hero background | `img/hero.jpg` | 2000px wide | `css/tokens.css` → `--hero-image` |
| Project cards | `img/projects/<name>.jpg` | ~1400px wide | `js/projects.js` → that project's `images` |
| Social preview | `img/og.jpg` | 1200 × 630 | already wired; just add the file |

Watch out for one thing: **don't write `image:` twice in the same block.**
JavaScript silently keeps only the last one, so the first is discarded without
any error. Use the single `images:` list instead.

**A missing image is a designed state, not a broken one.** Any project with
`image: null` draws its own network-topology artwork, generated deterministically
from its slug — same picture every reload, and no failed network request. The
hero does the same with a gradient-and-topology scene.

Currently real: `aws-alb-asg.jpg` and `pihole-dns.jpg`, cropped from the
screenshots already in your lab repos. **The AWS account ID visible in the
original console screenshot was deliberately cropped out** — don't re-crop that
image looser. The other three projects draw artwork until you supply photos.

For the hero, a dark photo works best: it sits at 50% opacity behind the
headline, so anything bright will fight the text.

---

## Running it locally

No tooling required — open `index.html` in a browser. Or, to match how GitHub
Pages serves it:

```bash
python3 -m http.server 8000
```

---

## File map

```
index.html          all page prose — hero, headings, contact copy
css/tokens.css      every colour, font, space and timing value
css/styles.css      layout and components
js/projects.js      ← the file you'll edit most
js/site.js          skills, certifications, education, links
js/main.js          rendering, filtering, motion (no need to touch)
fonts/              Archivo + Martian Mono, self-hosted
PRODUCT.md          who this is for and what it must never claim
DESIGN.md           the visual system and the reasoning behind it
```

---

## Ground rules baked into this site

- **Nothing is claimed that isn't true.** CCNA and AWS SAA are labelled
  *in progress* everywhere they appear. Don't change a status until the
  certificate is in hand.
- **Content is never hidden behind JavaScript animation.** Entrance animations
  are added on top of content that already renders.
- **Every animation has a reduced-motion alternative.**
- **Zero external requests.** Fonts are self-hosted; there is no CDN, analytics,
  or tracker. Nothing to break, nothing to leak.
