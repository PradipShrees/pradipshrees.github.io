(function () {
  'use strict';

  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReduced = () => reduceMotion.matches;

  const esc = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* ---------------------------------------------------------------
     Fallback artwork.
     When a project has no photo yet, draw a small network topology
     from its slug. Deterministic, so a given project always gets the
     same picture — it reads as artwork, not as a missing asset.
     --------------------------------------------------------------- */

  function seededRandom(seed) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return function () {
      h += 0x6D2B79F5;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function topologySVG(slug) {
    const rand = seededRandom(slug);
    const W = 600, H = 360;
    const cols = 4, rows = 4;
    const nodes = [];

    /* A loose grid with jitter — reads as a network diagram rather than as
       random scatter, and every cell is occupied so no corner looks empty. */
    for (let i = 0; i < cols * rows; i++) {
      const col = i % cols, row = Math.floor(i / cols);
      nodes.push({
        x: 70 + col * ((W - 140) / (cols - 1)) + (rand() - 0.5) * 66,
        y: 52 + row * ((H - 104) / (rows - 1)) + (rand() - 0.5) * 46,
        r: 2.5 + rand() * 3.5
      });
    }

    let edges = '';
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 190 && rand() > 0.46) {
          edges += `<line x1="${nodes[i].x.toFixed(1)}" y1="${nodes[i].y.toFixed(1)}" ` +
                   `x2="${nodes[j].x.toFixed(1)}" y2="${nodes[j].y.toFixed(1)}"/>`;
        }
      }
    }

    const circles = nodes.map((n, i) =>
      `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.r.toFixed(1)}"${
        i % 5 === 0 ? ' class="hot"' : ''}/>`).join('');

    /* `slice` keeps nodes circular. The 4×4 grid above is dense enough that
       the crop on a tall featured panel still lands on a populated region. */
    return `<svg class="cardTopo" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="presentation">
      <g class="cardTopo__edges">${edges}</g>
      <g class="cardTopo__nodes">${circles}</g>
    </svg>`;
  }

  /* ---------------------------------------------------------------
     Project cards
     --------------------------------------------------------------- */

  const grid = $('#grid');
  const filterBar = $('.filter');
  let activeTag = 'all';

  /* Accepts `images: [...]` (strings or {src, alt}) and the older single
     `image: '...'`. Always returns a clean array. */
  function imagesOf(p) {
    const raw = Array.isArray(p.images) ? p.images
              : (p.image ? [p.image] : []);
    return raw
      .map((it) => (typeof it === 'string' ? { src: it, alt: '' } : it))
      .filter((it) => it && it.src);
  }

  function cardHTML(p) {
    const stack = p.stack.map((s) => `<li>${esc(s)}</li>`).join('');
    const shots = imagesOf(p);

    const figures = shots.map((im, i) => {
      const alt = im.alt || `${p.title} — screenshot ${i + 1} of ${shots.length}`;
      return `<img class="card__img${i === 0 ? ' is-on' : ''}" src="${esc(im.src)}" ` +
             `alt="${esc(alt)}" loading="lazy" decoding="async">`;
    }).join('');

    /* Dots only earn their place when there's more than one image. */
    const dots = shots.length > 1
      ? `<div class="card__dots" role="group" aria-label="${esc(p.title)} screenshots">` +
        shots.map((im, i) =>
          `<button type="button" class="dot${i === 0 ? ' is-on' : ''}" data-i="${i}" ` +
          `aria-current="${i === 0}" aria-label="Screenshot ${i + 1} of ${shots.length}"></button>`
        ).join('') + '</div>'
      : '';

    const video = p.video
      ? `<a class="card__video" href="${esc(p.video)}" target="_blank" rel="noopener">` +
        `Watch demo<span aria-hidden="true"> ↗</span></a>`
      : '';

    return `
      <li class="card${p.featured ? ' card--featured' : ''}" data-tags="${esc(p.tags.join(' '))}" data-slug="${esc(p.slug)}">
        <div class="card__media${shots.length ? '' : ' is-art'}">
          ${topologySVG(p.slug)}
          ${figures}
          ${dots}
        </div>
        <div class="card__body">
          <p class="card__kicker">${esc(p.kicker)}</p>
          <h3 class="card__title">
            <a class="card__link" href="${esc(p.repo)}" target="_blank" rel="noopener">${esc(p.title)}</a>
          </h3>
          <p class="card__blurb">${esc(p.blurb)}</p>
          <div class="card__foot">
            <ul class="card__stack">${stack}</ul>
            <p class="card__actions">
              <span class="card__cue">View source<span aria-hidden="true"> ↗</span></span>
              ${video}
            </p>
          </div>
        </div>
      </li>`;
  }

  function renderProjects() {
    if (!grid || typeof PROJECTS === 'undefined') return;
    grid.innerHTML = PROJECTS.map(cardHTML).join('');

    /* A missing image must never show a broken-image icon. Drop the element
       and fall back to the topology artwork underneath. */
    $$('.card__img', grid).forEach((img) => {
      img.addEventListener('error', function () {
        const media = this.closest('.card__media');
        this.remove();
        if (media && !media.querySelector('.card__img')) {
          media.classList.add('is-art');
          const d = media.querySelector('.card__dots');
          if (d) d.remove();
        }
      });
      if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event('error'));
    });

    initGalleries();
  }

  /* ---------------------------------------------------------------
     Image galleries.
     The whole card is clickable via a stretched link on the title, so the
     dots sit above it on the z-axis and stop their own clicks — otherwise
     changing image would open GitHub.
     --------------------------------------------------------------- */

  function initGalleries() {
    $$('.card__media', grid).forEach((media) => {
      const imgs = $$('.card__img', media);
      const dots = $$('.dot', media);
      if (dots.length < 2) return;

      const show = (i) => {
        imgs.forEach((im, n) => im.classList.toggle('is-on', n === i));
        dots.forEach((d, n) => {
          d.classList.toggle('is-on', n === i);
          d.setAttribute('aria-current', String(n === i));
        });
      };

      media.addEventListener('click', (e) => {
        const d = e.target.closest('.dot');
        if (!d) return;
        e.preventDefault();
        e.stopPropagation();
        show(Number(d.dataset.i));
      });

      media.addEventListener('keydown', (e) => {
        if (!e.target.closest('.dot')) return;
        const cur = dots.findIndex((d) => d.classList.contains('is-on'));
        let next = null;
        if (e.key === 'ArrowRight') next = (cur + 1) % dots.length;
        if (e.key === 'ArrowLeft') next = (cur - 1 + dots.length) % dots.length;
        if (next === null) return;
        e.preventDefault();
        show(next);
        dots[next].focus();
      });
    });
  }

  function renderFilters() {
    if (!filterBar || typeof PROJECTS === 'undefined') return;

    const labels = (typeof TAG_LABELS !== 'undefined') ? TAG_LABELS : {};

    /* TAG_LABELS defines the button order, so the most relevant filter leads.
       Any tag used in projects.js but missing from TAG_LABELS still gets a
       button — appended at the end. */
    const used = [];
    PROJECTS.forEach((p) => p.tags.forEach((t) => {
      if (used.indexOf(t) === -1) used.push(t);
    }));

    const tags = Object.keys(labels).filter((t) => used.indexOf(t) > -1)
      .concat(used.filter((t) => !(t in labels)));
    const btn = (tag, label, on) =>
      `<button type="button" class="chip" data-tag="${esc(tag)}" aria-pressed="${on}">` +
      `${esc(label)}<span class="chip__n">${
        tag === 'all' ? PROJECTS.length
                      : PROJECTS.filter((p) => p.tags.indexOf(tag) > -1).length}</span></button>`;

    filterBar.innerHTML =
      btn('all', 'All', true) +
      tags.map((t) => btn(t, labels[t] || t, false)).join('');

    filterBar.addEventListener('click', (e) => {
      const b = e.target.closest('.chip');
      if (b) applyFilter(b.dataset.tag);
    });
  }

  /* FLIP: measure, change, invert, play. Keeps the reorder legible
     instead of items teleporting. */
  function applyFilter(tag) {
    if (tag === activeTag) return;
    activeTag = tag;

    $$('.chip', filterBar).forEach((c) =>
      c.setAttribute('aria-pressed', String(c.dataset.tag === tag)));

    const cards = $$('.card', grid);
    const first = new Map();
    cards.forEach((c) => first.set(c, c.getBoundingClientRect()));

    cards.forEach((c) => {
      const match = tag === 'all' || c.dataset.tags.split(' ').indexOf(tag) > -1;
      c.hidden = !match;
    });

    if (prefersReduced()) return;

    cards.forEach((c) => {
      if (c.hidden) return;
      const before = first.get(c);
      const after = c.getBoundingClientRect();
      const dx = before.left - after.left;
      const dy = before.top - after.top;

      if (!dx && !dy && before.width) return;

      c.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)`, opacity: before.width ? 1 : 0 },
          { transform: 'translate(0, 0)', opacity: 1 }
        ],
        { duration: 420, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' }
      );
    });
  }

  /* ---------------------------------------------------------------
     Capabilities, certifications, education
     --------------------------------------------------------------- */

  function renderCapabilities() {
    const el = $('#capGrid');
    if (!el || typeof SITE === 'undefined') return;

    el.innerHTML = SITE.capabilities.map((c) => `
      <article class="cap">
        <h3 class="cap__area">${esc(c.area)}</h3>
        <ul class="cap__items">
          ${c.items.map((i) => `<li>${esc(i)}</li>`).join('')}
        </ul>
        <p class="cap__proof">
          Proven in
          <a href="#work" data-jump="${esc(c.proof)}">${esc(c.proofLabel)}</a>
        </p>
      </article>`).join('');
  }

  function renderCerts() {
    const el = $('#certs');
    if (!el || typeof SITE === 'undefined') return;

    el.innerHTML = SITE.certifications.map((c) => `
      <li class="cert">
        <div class="cert__head">
          <h3 class="cert__name">${esc(c.name)}</h3>
          <span class="cert__status">${esc(c.status)}</span>
        </div>
        <p class="cert__full">${esc(c.full)}</p>
        <p class="cert__note">${esc(c.note)}</p>
        <a class="cert__proof" href="#work" data-jump="${esc(c.proof)}">${esc(c.proofLabel)}<span aria-hidden="true"> →</span></a>
      </li>`).join('');
  }

  function renderEducation() {
    const el = $('#edu');
    if (!el || typeof SITE === 'undefined') return;

    el.innerHTML = SITE.education.map((e) => {
      const school = e.school
        ? `<p class="edu__school">${esc(e.school)}</p>`
        : `<p class="edu__school edu__school--tbc">Institution to be confirmed</p>`;
      const major = e.major ? `<span class="edu__major">${esc(e.major)}</span>` : '';

      return `
        <li class="edu__item edu__item--${esc(e.status)}">
          <div class="edu__when"><span>${esc(e.dates)}</span></div>
          <div class="edu__what">
            <h3 class="edu__degree">${esc(e.degree)}${major}</h3>
            ${school}
            <p class="edu__note">${esc(e.note)}</p>
          </div>
        </li>`;
    }).join('');
  }

  /* ---------------------------------------------------------------
     Contact
     --------------------------------------------------------------- */

  function renderContact() {
    if (typeof SITE === 'undefined') return;
    const L = SITE.links;

    const mail = $('#mailLink');
    const mailText = $('#mailText');
    if (mail && mailText) {
      mail.href = 'mailto:' + L.email;
      mailText.textContent = L.email;
    }

    const copyBtn = $('#copyBtn');
    const status = $('#copyStatus');
    if (copyBtn) {
      copyBtn.dataset.copy = L.email;
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(L.email);
          copyBtn.classList.add('is-done');
          $('.copyBtn__label', copyBtn).textContent = 'Copied';
          if (status) status.textContent = L.email + ' copied to clipboard.';
          setTimeout(() => {
            copyBtn.classList.remove('is-done');
            $('.copyBtn__label', copyBtn).textContent = 'Copy';
          }, 2200);
        } catch (err) {
          if (status) status.textContent = 'Couldn’t copy automatically — the address is ' + L.email;
        }
      });
    }

    const links = $('#contactLinks');
    if (links) {
      const rows = [
        { label: 'GitHub',   value: 'PradipShrees', href: L.github },
        { label: 'LinkedIn', value: L.linkedin ? 'Profile' : 'Not linked yet', href: L.linkedin }
      ];
      links.innerHTML = rows.map((r) => r.href
        ? `<a class="cLink" href="${esc(r.href)}" target="_blank" rel="noopener">
             <span class="cLink__label">${esc(r.label)}</span>
             <span class="cLink__value">${esc(r.value)}<span aria-hidden="true"> ↗</span></span>
           </a>`
        : `<span class="cLink cLink--empty">
             <span class="cLink__label">${esc(r.label)}</span>
             <span class="cLink__value">${esc(r.value)}</span>
           </span>`).join('');
    }

    const journal = $('#journalLink');
    if (journal && L.journal) journal.href = L.journal;
  }

  /* ---------------------------------------------------------------
     Motion — always enhancing something already visible
     --------------------------------------------------------------- */

  function revealOnScroll() {
    const targets = $$('.card, .cap, .cert, .edu__item, .sectionHead');
    if (!targets.length) return;

    if (prefersReduced() || !('IntersectionObserver' in window)) return;

    targets.forEach((t) => t.classList.add('willReveal'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const sibs = Array.from(el.parentElement.children).filter((n) =>
          n.classList.contains('willReveal'));
        const i = Math.max(0, sibs.indexOf(el));
        el.style.animationDelay = Math.min(i * 70, 350) + 'ms';
        el.classList.add('isRevealed');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    targets.forEach((t) => io.observe(t));
  }

  function heroLoad() {
    const hero = $('.hero');
    if (!hero) return;
    if (prefersReduced()) { hero.classList.add('isReady'); return; }
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('isReady')));
  }

  function navScroll() {
    const nav = $('#nav');
    const hero = $('.hero');
    if (!nav || !hero) return;

    if (!('IntersectionObserver' in window)) { nav.classList.add('isStuck'); return; }

    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:70vh;height:1px;width:1px;';
    hero.appendChild(sentinel);

    new IntersectionObserver(([e]) => {
      nav.classList.toggle('isStuck', !e.isIntersecting);
    }, { threshold: 0 }).observe(sentinel);
  }

  /* Deep-link from a capability or certification to its project card. */
  function jumpLinks() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('[data-jump]');
      if (!a) return;
      const card = $(`.card[data-slug="${a.dataset.jump}"]`);
      if (!card) return;
      e.preventDefault();
      if (card.hidden) applyFilter('all');
      card.scrollIntoView({
        behavior: prefersReduced() ? 'auto' : 'smooth',
        block: 'center'
      });
      card.classList.add('isPinged');
      setTimeout(() => card.classList.remove('isPinged'), 1400);
    });
  }

  /* ---------------------------------------------------------------
     Boot
     --------------------------------------------------------------- */

  function init() {
    renderProjects();
    renderFilters();
    renderCapabilities();
    renderCerts();
    renderEducation();
    renderContact();

    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    heroLoad();
    revealOnScroll();
    navScroll();
    jumpLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
