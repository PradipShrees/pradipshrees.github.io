# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step, no npm dependencies, no framework. User's
explicit choice over Astro and React+Vite. Deploys to GitHub Pages as a user
site (`pradipshrees.github.io`) by pushing to `main` — no GitHub Action needed.
Fonts are self-hosted woff2 so the site has zero external network dependencies.

## Users

Primary: hiring managers, technical recruiters, and team leads screening
candidates for **sysadmin, junior network engineer, and cloud/DevOps** roles in
Sydney, Australia. They arrive from a job application or LinkedIn, spend well
under a minute, and are looking for evidence that the candidate has operated
real infrastructure rather than only completed coursework.

Secondary: peers and other engineers arriving from GitHub, who want to read the
code behind a project.

## Product Purpose

A single-page portfolio for Pradip Shrees. Success is a visitor opening a GitHub
repository. Everything on the page exists to move someone from landing to
clicking through to real, readable work.

## Positioning

The evidence is self-hosted and physical: a Raspberry Pi 5 running a real Kafka
pipeline, a Pi camera doing face matching through AWS Rekognition, a DNS
sinkhole serving an actual household, and AWS labs documented with screenshots
of real console state. This is a homelab operator, not a tutorial follower —
a claim most junior portfolios cannot truthfully make.

Self-described: "Certified Homelaber."
Own words, used as the site's positioning line: *"Building and breaking
infrastructure so it doesn't break in production."*

## Operating Context

Visitors scan on desktop and phone, frequently with many tabs open, often
comparing several candidates in sequence. They do not read; they scan for
recognisable technology names and working links. The page must be fully legible
with images still loading and must never depend on JavaScript to reveal content.

## Capabilities and Constraints

- Single page, anchor-navigated. No router, no build step, no backend.
- Contact is links only — a large copyable email address plus LinkedIn and
  GitHub. No form, because GitHub Pages has no backend and a third-party form
  service would be a dependency that can fail silently.
- The project list must be modular: adding a project is appending one object to
  `js/projects.js` and dropping an image into `img/projects/`.
- Images are supplied over time. Every image slot must degrade to an
  intentional-looking fallback, never a broken-image icon or an empty box.

### Undecided / awaiting user input

- Institution name for the Master of Networking (confirmed as starting; the
  school is not yet settled).
- Hero photograph of the actual homelab hardware.
- Project screenshots for AirWatch, Overwatch and the VPC lab.

## Brand Commitments

- Name: Pradip Shrees. GitHub handle: `PradipShrees`.
- Public contact address: pradipshrees0@gmail.com.
- LinkedIn: https://www.linkedin.com/in/pradip-shrees-776b612a1/
- Colour: the user supplied a self-made banner in Ubuntu aubergine/magenta and
  chose a Raspberry Pi as its subject. Aubergine is therefore a binding brand
  signal, taken at its dark controlled end rather than as the Ubuntu wallpaper
  gradient.
- Voice: wry, plainspoken, hands-on. "Certified Homelaber" is his own phrase and
  is treated as voice, not filler.

## Evidence on Hand

Real, in `~/Desktop/GitHub/`:

- **AirWatch** — Pi 5 + Sensirion SEN54 → Kafka → PostgreSQL → FastAPI → React.
  EPA AQI scoring, live charts, calendar heatmap, 48h outdoor forecast.
  Assets: `frontend/src/assets/hero.png`, `frontend/public/login-bg.jpg`.
- **Overwatch** — Pi camera → face detect/track → S3 → AWS Rekognition → SNS
  alerts. Headless; degrades to local-only when AWS is unreachable. ICT301.
  No screenshots on disk yet.
- **AWS Labs & Documentation** — VPC lab and ALB/ASG lab. 10 real screenshots.
- **Linux/Ubuntu Labs** — Pi-hole DNS sinkhole on real hardware. 2 screenshots.
- **Python Journey** — learning journal. Footer link only, not a project card.

Deliberately excluded: WildlifeCareAustralia-Project2 (ICT302). It is a team
project whose repository belongs to another student's account. The user asked
for it to be left out entirely — including oblique references in the education
copy. Do not reintroduce it.

Pradip's own final year projects are **AirWatch and Overwatch**. State it that
way; do not attribute the wildlife-rescue platform to him.

**Must not be fabricated:** Pradip holds no certifications yet. CCNA and AWS
Solutions Architect Associate are in progress and must always be labelled as
such. No employment history, testimonials, client work, or metrics exist —
do not invent any.

## Product Principles

1. **Evidence outranks claims.** Projects sit directly below the hero, above
   skills and education. The work is the argument.
2. **Never overstate.** In-progress certifications are labelled in progress and
   linked to the repository where the work is visibly happening. Team projects
   are attributed. Honest scope reads as senior.
3. **Nothing can rot.** Zero dependencies is a feature, not a constraint. The
   site must still work untouched in three years.
4. **Modular by data, not by framework.** Growth happens in a data file, so
   adding the tenth project costs exactly what adding the second did.
5. **Degrade intentionally.** Missing images, disabled JavaScript, and reduced
   motion are all normal states, not error states.

## Accessibility & Inclusion

WCAG 2.1 AA as the floor. Body text ≥4.5:1, large text ≥3:1, verified in-browser
rather than estimated. Full keyboard operation including the project filter.
Visible focus indicators. Every animation has a `prefers-reduced-motion`
alternative. Content is visible by default and never gated behind a
JavaScript-triggered reveal.
