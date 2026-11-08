const projectId = new URLSearchParams(location.search).get("id");
const index = projects.findIndex((p) => p.id === projectId);
const project = projects[index];

function trailerBlock(p) {
  return trailerMedia(p.trailer, `Bande-annonce ${p.title}`, {
    cover: p.cover,
    accent: p.accent,
    placeholderLabel: "Bande-annonce"
  });
}

function factSheet(p) {
  const rows = [
    ["Rôle", p.role], ["Genre", p.genre], ["Moteur", p.engine], ["Plateformes", p.platforms],
    ["Équipe", p.team], ["Durée", p.duration], ["Année", p.year], ["Statut", p.status]
  ].filter(([, v]) => v);
  return `
    <aside class="fact-sheet">
      <h4>Fiche projet</h4>
      <dl>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      ${p.links?.length ? `<div class="fact-links">${p.links.map((l) => externalLink(l.url, l.label, "btn btn-cta btn-block")).join("")}</div>` : ""}
    </aside>`;
}

const DOC_ICONS = { pdf: "PDF", image: "IMG", link: "↗" };

function documentsBlock(p) {
  if (!p.documents?.length) return "";
  return `
    <section class="p-section" id="documents">
      <h2>Documents de production</h2>
      <div class="doc-grid">
        ${p.documents.map((d, i) => `
          <button class="doc-card" data-doc="${i}" ${d.url ? "" : "disabled"}>
            <span class="doc-icon">${DOC_ICONS[d.format] || "DOC"}</span>
            <span class="doc-info">
              <span class="doc-kind">${esc(d.kind || "")}</span>
              <strong>${esc(d.title)}</strong>
              ${d.description ? `<span class="doc-desc">${esc(d.description)}</span>` : ""}
              ${d.url ? "" : `<span class="doc-desc muted">Fichier à ajouter</span>`}
            </span>
          </button>`).join("")}
      </div>
    </section>`;
}

function galleryBlock(p) {
  if (!p.gallery?.length) return "";
  return `
    <section class="p-section" id="galerie">
      <h2>Galerie</h2>
      <div class="gallery">
        ${p.gallery.map((g, i) => `
          <figure>
            <button class="gallery-item" data-img="${i}" ${g.src ? "" : "disabled"}>
              ${g.src ? `<img src="${esc(g.src)}" alt="${esc(g.caption || "")}" loading="lazy">` : placeholder(`Image ${i + 1}`, p.accent)}
            </button>
            ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}
          </figure>`).join("")}
      </div>
    </section>`;
}

function workflowBlock(p) {
  const wf = p.workflow;
  if (!wf?.phases?.length) return "";
  const heading = wf.title || "Workflow";
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
      <a href="project.html?id=${encodeURIComponent(prev.id)}"><span>← Précédent</span><strong>${esc(prev.title)}</strong></a>
      <a href="project.html?id=${encodeURIComponent(next.id)}" class="right"><span>Suivant →</span><strong>${esc(next.title)}</strong></a>
    </nav>`;
}

function renderProject(p) {
  document.title = `${p.title} — ${profile.name}`;
  document.body.style.setProperty("--accent", p.accent);

  const sections = [
    ["presentation", "Présentation", true],
    ["workflow", "Workflow", p.workflow?.phases?.length],
    ["documents", "Documents", p.documents?.length],
    ["galerie", "Galerie", p.gallery?.length]
  ].filter(([, , show]) => show);

  $("#project").innerHTML = `
    <section class="p-hero container">
      <p class="eyebrow">${esc(p.genre)} · ${esc(p.year)}</p>
      <h1>${esc(p.title)}</h1>
      <p class="hero-tagline">${esc(p.tagline)}</p>
      <ul class="tag-list">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    </section>

    <div class="container">
      <div class="trailer media-frame">${trailerBlock(p)}</div>

      <nav class="p-tabs">${sections.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}</nav>

      <div class="p-layout">
        <div class="p-main">
          <section class="p-section" id="presentation">
            <h2>Présentation</h2>
            <div class="prose">${paragraphs(p.pitch)}</div>
            ${p.contributions?.length ? `
              <h3 class="sub">Mes contributions</h3>
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
  const download = `<a class="btn" href="${esc(d.url)}" download>Télécharger</a>
    <a class="btn" href="${esc(d.url)}" target="_blank" rel="noopener">Plein écran ↗</a>`;
  const body = d.format === "pdf"
    ? `<iframe class="pdf-frame" src="${esc(d.url)}" title="${esc(d.title)}"></iframe>`
    : `<img class="modal-img" src="${esc(d.url)}" alt="${esc(d.title)}">`;
  openModal(d.title, body, download);
}

function openGallery(p, start) {
  const items = p.gallery.filter((g) => g.src);
  let i = items.indexOf(p.gallery[start]);
  const show = () => {
    const g = items[i];
    openModal(g.caption || p.title, `
      <div class="lightbox">
        ${items.length > 1 ? `<button class="icon-btn lb-prev" aria-label="Précédente">‹</button>` : ""}
        <img class="modal-img" src="${esc(g.src)}" alt="${esc(g.caption || "")}">
        ${items.length > 1 ? `<button class="icon-btn lb-next" aria-label="Suivante">›</button>` : ""}
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
        <h1>Projet introuvable</h1>
        <p>Ce projet n'existe pas ou a été déplacé.</p>
        <a class="btn btn-primary" href="index.html#projets">Retour aux projets</a>
      </section>`;
    return;
  }

  await ContentLoader.hydrateProject(project);
  renderProject(project);
}

initProjectPage();
