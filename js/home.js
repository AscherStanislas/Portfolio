function renderBannerContacts() {
  const links = [];
  if (profile.email) {
    links.push(`<a class="btn btn-primary" href="mailto:${esc(profile.email)}">${esc(t("home.email"))}</a>`);
  }
  if (profile.cv) {
    links.push(`<a class="btn btn-banner" href="${esc(profile.cv)}" target="_blank" rel="noopener">${esc(t("home.cv"))}</a>`);
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

const UNITY_LOGO = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12.9288 4.2939 3.7997 2.1929c.1366.077.1415.2905 0 .3675l-4.515 2.6057a.4192.4192 0 0 1-.4246 0L7.274 6.8543c-.139-.0745-.1415-.2905 0-.3675l3.7972-2.1929V0L1.3758 5.5977V16.793l3.7177-2.1456v-4.3858c-.0025-.1565.1813-.2682.318-.1838l4.5148 2.6057a.4252.4252 0 0 1 .2136.3676v5.2114c.0025.1565-.1813.2682-.3179.1838l-3.7996-2.1929-3.7178 2.1457L12 24l9.6954-5.5977-3.7178-2.1457-3.7996 2.1929c-.1341.082-.3229-.0248-.3179-.1838V13.054c0-.1565.087-.2956.2136-.3676l4.5149-2.6057c.134-.082.3228.0224.3179.1838v4.3858l3.7177 2.1456V5.5977L12.9288 0Z"/></svg>`;

function engineBadge(p) {
  if (p.engine !== "Unity") return "";
  return `<span class="engine-badge">${UNITY_LOGO}Unity</span>`;
}

function latestTeaser(p) {
  return `
    <a class="home-tease" href="project.html?id=${encodeURIComponent(p.id)}">
      <div class="home-tease-media">
        ${highlightPreviewMedia(p)}
        ${engineBadge(p)}
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
    <h2 class="home-latest-title">${esc(t("home.featured"))}</h2>
    <div class="home-latest-grid">${picks.map(latestTeaser).join("")}</div>`;
}

function vignetteCard(p) {
  return `
    <a class="vignette-card" href="project.html?id=${encodeURIComponent(p.id)}" style="--accent:${esc(p.accent)}">
      <div class="media-frame vignette-media">
        ${highlightPreviewMedia(p, "vignette-preview")}
        ${engineBadge(p)}
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
    : `<p class="muted">${esc(t("home.emptyCategory"))}</p>`;
}

function renderAbout() {
  $("#about").innerHTML = `
    <h2 class="category-title">${esc(t("home.about"))}</h2>
    <div class="about-grid panel-light about-panel">
      <div class="about-text">
        <div class="prose">${paragraphs(profile.bio)}</div>
        <a class="btn btn-whoami" href="qui-suis-je.html">${esc(t("home.whoamiButton"))}</a>
      </div>
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
  const intro = profile.contactIntro || t("home.contactIntro");
  $("#contact").innerHTML = `
    <div class="contact-card">
      <h2>${esc(t("home.contact"))}</h2>
      <p>${esc(intro)}</p>
      <div class="hero-actions">
        ${profile.email ? `<a class="btn btn-primary" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>` : ""}
        ${profile.cv ? `<a class="btn" href="${esc(profile.cv)}" target="_blank" rel="noopener">${esc(t("home.cv"))}</a>` : ""}
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
