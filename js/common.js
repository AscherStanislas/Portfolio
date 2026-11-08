const { profile, projects } = window.PORTFOLIO;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function paragraphs(text) {
  if (!text) return "";
  const list = Array.isArray(text) ? text : String(text).split(/\n\s*\n/);
  return list.map((p) => `<p>${esc(p.trim())}</p>`).join("");
}

function initials(title) {
  return title.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

function placeholder(label, accent, cls = "") {
  return `<div class="placeholder ${cls}" style="--ph:${esc(accent || "var(--accent)")}"><span>${esc(label)}</span></div>`;
}

/** Chemins locaux (espaces, accents) → URL utilisable dans src/href. */
function mediaSrc(path) {
  const raw = String(path ?? "").trim();
  if (!raw || /^https?:\/\//i.test(raw)) return esc(raw);
  return esc(encodeURI(raw));
}

/** Aperçu accueil (cartes cliquables) : GIF en boucle, sinon cover — pas le trailer MP4. */
function highlightPreviewMedia(project, cls = "home-tease-preview") {
  if (project.previewGif) {
    return `<img class="${cls}" src="${mediaSrc(project.previewGif)}" alt="" decoding="async" loading="lazy">`;
  }
  return coverMedia(project, cls);
}

function coverMedia(project, cls = "") {
  if (project.cover) {
    return `<img class="${cls}" src="${mediaSrc(project.cover)}" alt="${esc(project.title)}" loading="lazy">`;
  }
  return placeholder(initials(project.title), project.accent, cls);
}

/** Vidéo / GIF de bannière d'accueil : lecture en boucle, sans contrôles (autoplay muted). */
function showcaseBackgroundMedia(showcase, title) {
  const s = showcase || {};
  if (s.gif) {
    return `<img class="banner-bg-media" src="${esc(s.gif)}" alt="" aria-hidden="true" decoding="async">`;
  }
  if (s.youtube) {
    const id = encodeURIComponent(s.youtube);
    return `<iframe class="banner-bg-media" title="${esc(title)}"
      src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1"
      allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin" tabindex="-1"></iframe>`;
  }
  if (s.vimeo) {
    const id = encodeURIComponent(s.vimeo);
    return `<iframe class="banner-bg-media" title="${esc(title)}"
      src="https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&playsinline=1"
      allow="autoplay; fullscreen" tabindex="-1"></iframe>`;
  }
  if (s.file) {
    if (/\.gif(\?|$)/i.test(s.file)) {
      return `<img class="banner-bg-media" src="${esc(s.file)}" alt="" aria-hidden="true" decoding="async">`;
    }
    return `<video class="banner-bg-media" autoplay muted loop playsinline preload="auto"
      aria-hidden="true" src="${esc(s.file)}"></video>`;
  }
  return `<div class="banner-bg-fallback">${placeholder("Vidéo bannière", "var(--blue-400)", "banner-bg-media")}</div>`;
}

function trailerMedia(trailer, title, { cover = "", accent = "var(--accent)", placeholderLabel = "Vidéo de projet" } = {}) {
  const t = trailer || {};
  if (t.youtube) {
    return `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(t.youtube)}?rel=0"
      title="${esc(title)}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>`;
  }
  if (t.vimeo) {
    return `<iframe src="https://player.vimeo.com/video/${encodeURIComponent(t.vimeo)}"
      title="${esc(title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  }
  if (t.file) {
    return `<video controls preload="metadata" ${cover ? `poster="${mediaSrc(cover)}"` : ""} src="${mediaSrc(t.file)}"></video>`;
  }
  return placeholder(placeholderLabel, accent);
}

function externalLink(url, label, cls = "") {
  return `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`;
}

function pageHref(hash) {
  const onProject = /project\.html/i.test(location.pathname);
  return onProject ? `index.html${hash}` : hash;
}

function navDropdown(label, sectionHash, category) {
  const items = projects.filter((p) => p.category === category);
  const list = items.length
    ? items.map((p) => `
        <li role="none">
          <a role="menuitem" href="project.html?id=${encodeURIComponent(p.id)}">${esc(p.title)}</a>
        </li>`).join("")
    : `<li class="nav-dropdown-empty" role="none">Aucun projet</li>`;

  return `
    <div class="nav-dropdown">
      <button type="button" class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
        ${esc(label)}
        <span class="nav-chevron" aria-hidden="true"></span>
      </button>
      <div class="nav-dropdown-panel" role="menu">
        <ul class="nav-dropdown-list">${list}</ul>
        <a class="nav-dropdown-all" href="${esc(pageHref(sectionHash))}">Voir la section</a>
      </div>
    </div>`;
}

function bindNavDropdowns(nav) {
  const closeAll = () => {
    $$(".nav-dropdown", nav).forEach((dd) => {
      dd.classList.remove("is-open");
      $(".nav-dropdown-trigger", dd)?.setAttribute("aria-expanded", "false");
    });
  };

  $$(".nav-dropdown", nav).forEach((dd) => {
    const trigger = $(".nav-dropdown-trigger", dd);
    if (!trigger) return;

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = dd.classList.contains("is-open");
      closeAll();
      if (!open) {
        dd.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-dropdown")) closeAll();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
}

function renderSiteNav() {
  const nav = $("#site-nav");
  if (!nav) return;

  nav.innerHTML = `
    ${navDropdown("Projet académique", "#projets-academiques", "academique")}
    ${navDropdown("Projets perso", "#projets-perso", "perso")}
    <a class="nav-link" href="${esc(pageHref("#about"))}">À propos</a>`;

  bindNavDropdowns(nav);
}

function renderSharedChrome() {
  $$("[data-profile='name']").forEach((el) => (el.textContent = profile.name));
  renderSiteNav();
  const footer = $("#footer");
  if (footer) {
    footer.innerHTML = `
      <span>© ${new Date().getFullYear()} ${esc(profile.name)} — ${esc(profile.role)}</span>
      <span class="footer-links">
        ${profile.email ? `<a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>` : ""}
        ${profile.socials.map((s) => externalLink(s.url, s.label)).join("")}
      </span>`;
  }
}

renderSharedChrome();
