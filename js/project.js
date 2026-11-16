const projectId = new URLSearchParams(location.search).get("id");
const index = projects.findIndex((p) => p.id === projectId);
const project = projects[index];

function trailerBlock(p) {
  return trailerMedia(p.trailer, `${t("project.trailer")} ${p.title}`, {
    cover: p.cover,
    accent: p.accent,
    placeholderLabel: t("project.trailer")
  });
}

const CAROUSEL_DELAY = 5000;

function carouselBlock(p) {
  const items = p.gallery.filter((g) => g.src);
  return `
    <div class="carousel" data-carousel>
      ${items.map((g, i) => `
        <img class="carousel-slide${i === 0 ? " is-active" : ""}" src="${mediaSrc(g.src)}" alt="${esc(g.caption || p.title)}" data-img="${p.gallery.indexOf(g)}" ${i === 0 ? "" : `loading="lazy"`}>`).join("")}
      ${items.length > 1 ? `
        <button class="icon-btn carousel-prev" aria-label="${esc(t("project.prevImage"))}">‹</button>
        <button class="icon-btn carousel-next" aria-label="${esc(t("project.nextImage"))}">›</button>
        <div class="carousel-dots">
          ${items.map((_, i) => `<button class="carousel-dot${i === 0 ? " is-active" : ""}" data-slide="${i}" aria-label="${esc(t("project.image"))} ${i + 1}"></button>`).join("")}
        </div>` : ""}
    </div>`;
}

function initCarousel(root) {
  if (!root) return;
  const slides = $$(".carousel-slide", root);
  const dots = $$(".carousel-dot", root);
  if (slides.length < 2) return;
  let current = 0;
  let timer;

  const go = (n) => {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = (n + slides.length) % slides.length;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  };
  const start = () => { clearInterval(timer); timer = setInterval(() => go(current + 1), CAROUSEL_DELAY); };
  const stop = () => clearInterval(timer);

  root.addEventListener("click", (e) => {
    if (e.target.closest(".carousel-prev")) go(current - 1);
    else if (e.target.closest(".carousel-next")) go(current + 1);
    else if (e.target.closest("[data-slide]")) go(Number(e.target.closest("[data-slide]").dataset.slide));
    else return;
    start();
  });
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  start();
}

function factSheet(p) {
  const rows = [
    ["role", p.role], ["genre", p.genre], ["engine", p.engine], ["platforms", p.platforms],
    ["team", p.team], ["duration", p.duration], ["year", p.year], ["status", p.status]
  ].filter(([, v]) => v);
  return `
    <aside class="fact-sheet">
      <h4>${esc(t("project.factSheet"))}</h4>
      <dl>${rows.map(([k, v]) => `<div><dt>${esc(t(`project.${k}`))}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      ${p.links?.length ? `<div class="fact-links">${p.links.map((l) => externalLink(l.url, l.label, "btn btn-cta btn-block")).join("")}</div>` : ""}
    </aside>`;
}

const DOC_ICONS = { pdf: "PDF", image: "IMG", link: "↗", pptx: "PPT", xlsx: "XLS", docx: "DOC" };
const OFFICE_FORMATS = ["pptx", "xlsx", "docx"];

function isPublicHost() {
  return /^https?:$/.test(location.protocol) && !/^(localhost|127\.|\[::1\]|192\.168\.|10\.)/.test(location.hostname);
}

function documentsBlock(p) {
  if (!p.documents?.length) return "";
  return `
    <section class="p-section" id="documents">
      <h2>${esc(t("project.documentsTitle"))}</h2>
      <div class="doc-grid">
        ${p.documents.map((d, i) => `
          <button class="doc-card" data-doc="${i}" ${d.url ? "" : "disabled"}>
            <span class="doc-icon">${DOC_ICONS[d.format] || "DOC"}</span>
            <span class="doc-info">
              <span class="doc-kind">${esc(d.kind || "")}</span>
              <strong>${esc(d.title)}</strong>
              ${d.description ? `<span class="doc-desc">${esc(d.description)}</span>` : ""}
              ${d.url ? "" : `<span class="doc-desc muted">${esc(t("project.fileMissing"))}</span>`}
            </span>
          </button>`).join("")}
      </div>
    </section>`;
}

function galleryBlock(p) {
  if (!p.gallery?.length) return "";
  return `
    <section class="p-section" id="galerie">
      <h2>${esc(t("project.gallery"))}</h2>
      <div class="gallery">
        ${p.gallery.map((g, i) => `
          <figure>
            <button class="gallery-item" data-img="${i}" ${g.src ? "" : "disabled"}>
              ${g.src ? `<img src="${mediaSrc(g.src)}" alt="${esc(g.caption || "")}" loading="lazy">` : placeholder(`${t("project.image")} ${i + 1}`, p.accent)}
            </button>
            ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}
          </figure>`).join("")}
      </div>
    </section>`;
}

function workflowBlock(p) {
  const wf = p.workflow;
  if (!wf?.phases?.length) return "";
  const heading = wf.title || t("project.workflow");
  return `
    <section class="wf-section p-section" id="workflow">
      <h2>${esc(heading)}</h2>
      ${wf.intro ? `<p class="wf-intro">${esc(wf.intro)}</p>` : ""}
      <div class="workflow-stack">
        ${wf.phases.map((phase) => `
          <section class="workflow-step">
            <h3 class="workflow-step-title">${esc(phase.title)}</h3>
            ${phase.items?.length ? `
              <ul class="workflow-list">
                ${phase.items.map((item) => `<li>${esc(item)}</li>`).join("")}
              </ul>` : ""}
          </section>`).join("")}
      </div>
    </section>`;
}

function neighbours() {
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  if (projects.length < 2) return "";
  return `
    <nav class="p-nav container">
      <a href="project.html?id=${encodeURIComponent(prev.id)}"><span>${esc(t("project.previous"))}</span><strong>${esc(prev.title)}</strong></a>
      <a href="project.html?id=${encodeURIComponent(next.id)}" class="right"><span>${esc(t("project.next"))}</span><strong>${esc(next.title)}</strong></a>
    </nav>`;
}

function renderProject(p) {
  document.title = `${p.title} — ${profile.name}`;
  document.body.style.setProperty("--accent", p.accent);

  const sections = [
    ["presentation", t("project.presentation"), true],
    ["workflow", t("project.workflow"), p.workflow?.phases?.length],
    ["documents", t("project.documents"), p.documents?.length],
    ["galerie", t("project.gallery"), p.gallery?.length]
  ].filter(([, , show]) => show);

  $("#project").innerHTML = `
    <section class="p-hero container">
      <p class="eyebrow">${esc(p.genre)} · ${esc(p.year)}</p>
      ${p.logo
        ? `<h1 class="p-logo"><img src="${mediaSrc(p.logo)}" alt="${esc(p.title)}"></h1>`
        : `<h1>${esc(p.title)}</h1>`}
      <p class="hero-tagline">${esc(p.tagline)}</p>
      <ul class="tag-list">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    </section>

    <div class="container">
      <div class="trailer media-frame">${p.carousel && p.gallery?.length ? carouselBlock(p) : trailerBlock(p)}</div>

      <nav class="p-tabs">${sections.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join("")}</nav>

      <div class="p-layout">
        <div class="p-main">
          <section class="p-section" id="presentation">
            <h2>${esc(t("project.presentation"))}</h2>
            <div class="prose">${paragraphs(p.pitch)}</div>
            ${p.contributions?.length ? `
              <h3 class="sub">${esc(t("project.contributions"))}</h3>
              <ul class="check-list">${p.contributions.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
          </section>
          ${workflowBlock(p)}
        </div>
        ${factSheet(p)}
      </div>

      <div class="p-main p-main-continued">
        ${documentsBlock(p)}
        ${galleryBlock(p)}
      </div>
    </div>
    ${neighbours()}`;

  bindInteractions(p);
  initCarousel($("[data-carousel]"));
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
}

const modal = $("#modal");

function openModal(title, content, actions = "") {
  $("#modal-title").textContent = title;
  $("#modal-content").innerHTML = content;
  $("#modal-actions").innerHTML = actions;
  modal.hidden = false;
  document.body.classList.add("no-scroll");
}

function closeModal() {
  modal.hidden = true;
  $("#modal-content").innerHTML = "";
  document.body.classList.remove("no-scroll");
}

function openDocument(d) {
  if (d.format === "link") {
    window.open(d.url, "_blank", "noopener");
    return;
  }
  if (d.preview) {
    openModal(d.title,
      `<iframe class="pdf-frame" src="${mediaSrc(d.preview)}" title="${esc(d.title)}"></iframe>`,
      `<a class="btn" href="${mediaSrc(d.url)}" download>${esc(t("project.download"))}</a>
      <a class="btn" href="${mediaSrc(d.preview)}" target="_blank" rel="noopener">${esc(t("project.fullscreen"))}</a>`);
    return;
  }
  if (OFFICE_FORMATS.includes(d.format)) {
    const absolute = new URL(encodeURI(d.url), location.href).href;
    const viewer = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absolute)}`;
    const body = isPublicHost()
      ? `<iframe class="pdf-frame" src="${esc(viewer)}" title="${esc(d.title)}"></iframe>`
      : `<div class="doc-offline"><p>${esc(t("project.offlinePreview"))}</p>
          <a class="btn btn-primary" href="${mediaSrc(d.url)}" download>${esc(t("project.downloadFile"))}</a></div>`;
    const actions = `<a class="btn" href="${mediaSrc(d.url)}" download>${esc(t("project.download"))}</a>
      ${isPublicHost() ? `<a class="btn" href="${esc(viewer.replace("/embed.aspx", "/view.aspx"))}" target="_blank" rel="noopener">${esc(t("project.fullscreen"))}</a>` : ""}`;
    openModal(d.title, body, actions);
    return;
  }
  const download = `<a class="btn" href="${mediaSrc(d.url)}" download>${esc(t("project.download"))}</a>
    <a class="btn" href="${mediaSrc(d.url)}" target="_blank" rel="noopener">${esc(t("project.fullscreen"))}</a>`;
  const body = d.format === "pdf"
    ? `<iframe class="pdf-frame" src="${mediaSrc(d.url)}" title="${esc(d.title)}"></iframe>`
    : `<img class="modal-img" src="${mediaSrc(d.url)}" alt="${esc(d.title)}">`;
  openModal(d.title, body, download);
}

function openGallery(p, start) {
  const items = p.gallery.filter((g) => g.src);
  let i = items.indexOf(p.gallery[start]);
  const show = () => {
    const g = items[i];
    openModal(g.caption || p.title, `
      <div class="lightbox">
        ${items.length > 1 ? `<button class="icon-btn lb-prev" aria-label="${esc(t("project.lightboxPrev"))}">‹</button>` : ""}
        <img class="modal-img" src="${mediaSrc(g.src)}" alt="${esc(g.caption || "")}">
        ${items.length > 1 ? `<button class="icon-btn lb-next" aria-label="${esc(t("project.lightboxNext"))}">›</button>` : ""}
      </div>`, `<span class="muted">${i + 1} / ${items.length}</span>`);
  };
  const step = (d) => { i = (i + d + items.length) % items.length; show(); };
  modal.onclick = (e) => {
    if (e.target.closest(".lb-prev")) step(-1);
    if (e.target.closest(".lb-next")) step(1);
  };
  document.onkeydown = (e) => {
    if (modal.hidden) return;
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  };
  show();
}

function bindInteractions(p) {
  $("#project").addEventListener("click", (e) => {
    const doc = e.target.closest("[data-doc]");
    if (doc) {
      modal.onclick = null;
      openDocument(p.documents[doc.dataset.doc]);
    }
    const img = e.target.closest("[data-img]");
    if (img) openGallery(p, Number(img.dataset.img));
  });
}

modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

async function initProjectPage() {
  if (!project) {
    $("#project").innerHTML = `
      <section class="container section empty">
        <h1>${esc(t("project.notFound"))}</h1>
        <p>${esc(t("project.notFoundText"))}</p>
        <a class="btn btn-primary" href="index.html#projets-academiques">${esc(t("project.backToProjects"))}</a>
      </section>`;
    return;
  }

  await ContentLoader.hydrateProject(project);
  renderProject(project);
}

initProjectPage();
