/**
 * Langue du site (fr / en).
 * Choix : ?lang=en dans l'URL, sinon dernier choix du visiteur, sinon français.
 * Textes Markdown : _____<Bloc>.en.md à côté du fichier français (repli sur le français s'il manque).
 * Données (data.js) : objet `en: { ... }` dans un projet ou le profil, fusionné par-dessus le français.
 */
const LANGS = ["fr", "en"];

const LANG = (() => {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(fromUrl)) {
    try { localStorage.setItem("lang", fromUrl); } catch {}
    return fromUrl;
  }
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch {}
  return LANGS.includes(saved) ? saved : "fr";
})();

document.documentElement.lang = LANG;

const UI = {
  fr: {
    "nav.home": "Accueil",
    "nav.main": "Navigation principale",
    "nav.academic": "Projets académiques",
    "nav.personal": "Projets perso",
    "nav.about": "À propos",
    "nav.whoami": "Qui suis-je ?",
    "nav.seeSection": "Voir la section",
    "nav.noProject": "Aucun projet",
    "lang.switch": "Changer de langue",

    "home.featured": "Projets mis en avant",
    "home.latestAria": "Derniers projets",
    "home.emptyCategory": "Aucun projet dans cette catégorie pour le moment.",
    "home.about": "À propos",
    "home.whoamiButton": "Qui suis-je ? →",
    "home.contact": "Contact",
    "home.contactIntro": "N'hésitez pas à me contacter, je réponds dès que possible.",
    "home.email": "Email",
    "home.cv": "CV",
    "home.bannerPlaceholder": "Vidéo bannière",

    "project.trailer": "Bande-annonce",
    "project.videoPlaceholder": "Vidéo de projet",
    "project.prevImage": "Image précédente",
    "project.nextImage": "Image suivante",
    "project.image": "Image",
    "project.factSheet": "Fiche projet",
    "project.role": "Rôle",
    "project.genre": "Genre",
    "project.engine": "Moteur",
    "project.platforms": "Plateformes",
    "project.team": "Équipe",
    "project.duration": "Durée",
    "project.year": "Année",
    "project.status": "Statut",
    "project.presentation": "Présentation",
    "project.contributions": "Mes contributions",
    "project.workflow": "Workflow",
    "project.documents": "Documents",
    "project.documentsTitle": "Documents de production",
    "project.fileMissing": "Fichier à ajouter",
    "project.gallery": "Galerie",
    "project.previous": "← Précédent",
    "project.next": "Suivant →",
    "project.download": "Télécharger",
    "project.downloadFile": "Télécharger le fichier",
    "project.fullscreen": "Plein écran ↗",
    "project.offlinePreview": "L'aperçu en ligne de ce document sera disponible une fois le site publié.",
    "project.lightboxPrev": "Précédente",
    "project.lightboxNext": "Suivante",
    "project.notFound": "Projet introuvable",
    "project.notFoundText": "Ce projet n'existe pas ou a été déplacé.",
    "project.backToProjects": "Retour aux projets",
    "modal.close": "Fermer",

    "whoami.title": "Qui suis-je ?",
    "whoami.interests": "Ce que j'aime",
    "whoami.favorites": "Mes incontournables",
    "whoami.photo": "Photo"
  },
  en: {
    "nav.home": "Home",
    "nav.main": "Main navigation",
    "nav.academic": "Academic projects",
    "nav.personal": "Personal projects",
    "nav.about": "About",
    "nav.whoami": "Who am I?",
    "nav.seeSection": "See section",
    "nav.noProject": "No projects",
    "lang.switch": "Switch language",

    "home.featured": "Featured projects",
    "home.latestAria": "Latest projects",
    "home.emptyCategory": "No projects in this category yet.",
    "home.about": "About",
    "home.whoamiButton": "Who am I? →",
    "home.contact": "Contact",
    "home.contactIntro": "Feel free to reach out, I'll get back to you as soon as possible.",
    "home.email": "Email",
    "home.cv": "CV",
    "home.bannerPlaceholder": "Banner video",

    "project.trailer": "Trailer",
    "project.videoPlaceholder": "Project video",
    "project.prevImage": "Previous image",
    "project.nextImage": "Next image",
    "project.image": "Image",
    "project.factSheet": "Project info",
    "project.role": "Role",
    "project.genre": "Genre",
    "project.engine": "Engine",
    "project.platforms": "Platforms",
    "project.team": "Team",
    "project.duration": "Duration",
    "project.year": "Year",
    "project.status": "Status",
    "project.presentation": "Overview",
    "project.contributions": "My contributions",
    "project.workflow": "Workflow",
    "project.documents": "Documents",
    "project.documentsTitle": "Production documents",
    "project.fileMissing": "File coming soon",
    "project.gallery": "Gallery",
    "project.previous": "← Previous",
    "project.next": "Next →",
    "project.download": "Download",
    "project.downloadFile": "Download the file",
    "project.fullscreen": "Full screen ↗",
    "project.offlinePreview": "The online preview of this document will be available once the site is published.",
    "project.lightboxPrev": "Previous",
    "project.lightboxNext": "Next",
    "project.notFound": "Project not found",
    "project.notFoundText": "This project doesn't exist or has been moved.",
    "project.backToProjects": "Back to projects",
    "modal.close": "Close",

    "whoami.title": "Who am I?",
    "whoami.interests": "What I love",
    "whoami.favorites": "All-time favorites",
    "whoami.photo": "Photo"
  }
};

function t(key) {
  return UI[LANG]?.[key] ?? UI.fr[key] ?? key;
}

function mergeLocale(target, overrides) {
  Object.entries(overrides).forEach(([key, value]) => {
    const isObjectList = Array.isArray(value) && value.some((item) => item && typeof item === "object");
    if (isObjectList && Array.isArray(target[key])) {
      value.forEach((item, i) => {
        if (item && target[key][i]) mergeLocale(target[key][i], item);
      });
    } else if (value && typeof value === "object" && !Array.isArray(value) && target[key] && typeof target[key] === "object") {
      mergeLocale(target[key], value);
    } else {
      target[key] = value;
    }
  });
}

function applyLocale(obj) {
  if (obj && LANG !== "fr" && obj[LANG]) mergeLocale(obj, obj[LANG]);
}

function langSwitchHref(lang) {
  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  return url.pathname.split("/").pop() + url.search + url.hash;
}

function translateStatic(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
}
