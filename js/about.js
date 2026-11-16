function photoBlock() {
  return `
    <div class="whoami-photo">
      <div class="whoami-photo-placeholder">
        <span>${esc(t("whoami.photo"))}</span>
        <small>${esc(profile.photo)}</small>
      </div>
      ${profile.photo ? `<img src="${mediaSrc(profile.photo)}" alt="${esc(profile.name)}" onerror="this.remove()">` : ""}
    </div>`;
}

function favoriteCard(f) {
  return `
    <figure class="favorite-card">
      <div class="favorite-media${f.fit === "contain" ? " is-contain" : ""}"><img src="${mediaSrc(f.image)}" alt="${esc(f.title)}" title="${esc(f.title)}" loading="lazy"></div>
    </figure>`;
}

function renderWhoAmI() {
  $("#whoami").innerHTML = `
    <h1 class="whoami-title">${esc(t("whoami.title"))}</h1>
    <div class="whoami-grid">
      ${photoBlock()}
      <div class="whoami-text">
        <section>
          <div class="prose">${paragraphs(profile.story)}</div>
        </section>
        <section>
          <h2>${esc(profile.interestsTitle || t("whoami.interests"))}</h2>
          <div class="prose">${paragraphs(profile.interestsIntro)}</div>
          ${profile.interests?.length ? `<ul class="tag-list interest-list">${profile.interests.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : ""}
        </section>
      </div>
    </div>
    ${profile.favorites?.length ? `
      <section class="whoami-favorites">
        <h2>${esc(t("whoami.favorites"))}</h2>
        <div class="favorite-grid">${profile.favorites.map(favoriteCard).join("")}</div>
      </section>` : ""}`;
}

async function initWhoAmI() {
  await ContentLoader.hydrateProfile(window.PORTFOLIO.profile);
  document.title = `${t("whoami.title")} — ${profile.name}`;
  renderWhoAmI();
}

initWhoAmI();
