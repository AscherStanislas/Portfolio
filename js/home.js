function renderBannerContacts() {
  const links = [];
  if (profile.email) {
    links.push(`<a class="btn btn-primary" href="mailto:${esc(profile.email)}">Email</a>`);
  }
  if (profile.cv) {
    links.push(`<a class="btn btn-banner" href="${esc(profile.cv)}" target="_blank" rel="noopener">CV</a>`);
  }
  profile.socials.forEach((s) => {
    links.push(externalLink(s.url, s.label, "btn btn-banner"));
  });
  return links.slice(0, 3).join("");
}

function renderBanner() {
  const showcase = profile.showcase || {};
  $("#hero").innerHTML = `
    <div class="home-banner-bg">
      ${showcaseBackgroundMedia(showcase, `Showcase — ${profile.name}`)}
    </div>
    <div class="home-banner-scrim" aria-hidden="true"></div>
    <div class="home-banner-inner container">
      <div class="home-banner-copy">
        <p class="home-role">${esc(profile.role)}</p>
        <p class="home-intro">${esc(profile.tagline)}</p>
        ${profile.availability ? `<p class="home-availability">${esc(profile.availability)}</p>` : ""}
        <div class="home-banner-cta">${renderBannerContacts()}</div>
      </div>
    </div>`;
}

function latestTeaser(p) {
  return `
    <a class="home-tease" href="project.html?id=${encodeURIComponent(p.id)}">
      <div class="home-tease-media">
        ${highlightPreviewMedia(p)}
      </div>
      <div class="home-tease-copy">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.tagline)}</p>
      </div>
    </a>`;
}

function renderLatest() {
  const picks = profile.homeFeatured?.length
    ? profile.homeFeatured.map((id) => projects.find((p) => p.id === id)).filter(Boolean)
    : projects.slice(0, 3);
  $("#latest").innerHTML = `
    <h2 class="home-latest-title">Projets mis en avant</h2>
    <div class="home-latest-grid">${picks.map(latestTeaser).join("")}</div>`;
}

function vignetteCard(p) {
  return `
    <a class="vignette-card" href="project.html?id=${encodeURIComponent(p.id)}" style="--accent:${esc(p.accent)}">
      <div class="media-frame vignette-media">
        ${highlightPreviewMedia(p, "vignette-preview")}
      </div>
      <span class="vignette-label">${esc(p.title)}</span>
    </a>`;
}

function renderCategoryGrid(id, category) {
  const list = projects.filter((p) => p.category === category);
  const el = $(id);
  if (!el) return;
  el.innerHTML = list.length
    ? list.map(vignetteCard).join("")
    : `<p class="muted">Aucun projet dans cette catégorie pour le moment.</p>`;
}

function renderAbout() {
  $("#about").innerHTML = `
    <h2 class="category-title">À propos</h2>
    <div class="about-grid panel-light about-panel">
      <div class="prose">${paragraphs(profile.bio)}</div>
      <div class="skills">
        <div class="workflow-stack skills-stack">
          ${profile.skills.map((g) => `
            <section class="workflow-step">
              <h3 class="workflow-step-title">${esc(g.group)}</h3>
              <ul class="workflow-list">
                ${g.items.map((s) => `<li>${esc(s)}</li>`).join("")}
              </ul>
            </section>`).join("")}
        </div>
      </div>
    </div>`;
}

function renderContact() {
  const intro = profile.contactIntro || "Feel free to contact — je réponds dès que possible.";
  $("#contact").innerHTML = `
    <div class="contact-card">
      <h2>Contact</h2>
      <p>${esc(intro)}</p>
      <div class="hero-actions">
        ${profile.email ? `<a class="btn btn-primary" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>` : ""}
        ${profile.cv ? `<a class="btn" href="${esc(profile.cv)}" target="_blank" rel="noopener">CV</a>` : ""}
        ${profile.socials.map((s) => externalLink(s.url, s.label, "btn")).join("")}
      </div>
    </div>`;
}

async function initHome() {
  await ContentLoader.hydrateProfile(window.PORTFOLIO.profile);
  await ContentLoader.hydrateAllProjects(window.PORTFOLIO.projects);

  document.title = `${profile.name} — ${profile.role}`;
  renderBanner();
  renderLatest();
  renderCategoryGrid("#grid-academique", "academique");
  renderCategoryGrid("#grid-perso", "perso");
  renderAbout();
  renderContact();
}

initHome();
