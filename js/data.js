/*
  data.js = structure (id, médias, métadonnées fiche, galerie, liens).
  Textes = fichiers Markdown rechargés via js/content.js (serveur local requis).

  Profil : Assets/Profile/_____<Bloc>.md
    Blocs : Tagline, Bio, Skills, Contact, Story, Interests

  Projet (modèle Fling) : Assets/Projects/<Dossier>/_____<Bloc>.md
    Dossier = contentDir OU déduit de previewGif / trailer local
    Blocs : Tagline, Pitch, Contributions, Workflow

  Version anglaise :
    - textes : _____<Bloc>.en.md à côté du fichier français
    - données ci-dessous : objet `en: { ... }` qui remplace les champs français
      (pour gallery / documents / links : une entrée par élément, dans le même ordre)
*/

window.PORTFOLIO = {
  profile: {
    name: "Ascher Stanislas",
    role: "Game designer",
    tagline: "",
    bio: [],
    avatar: "",
    photo: "Assets/Profile/Photo.jpg",
    location: "France",
    availability: "",
    email: "a.stanislas@student.isartdigital.com",
    cv: "Assets/Profile/CV_Ascher_Stanislas.pdf",
    showcase: {
      file: "Assets/Profile/Showcase.mp4"
    },
    homeFeatured: ["fling", "bloodlust", "dungeon-scroller"],
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/ascher-stanislas-6063a3329/" }
    ],
    skills: [],
    story: [],
    interestsIntro: [],
    interests: [],
    favorites: [
      { title: "Dark Souls III", kind: "Jeu vidéo", image: "Assets/Profile/Favoris/Dark Souls III.jpg" },
      { title: "Root", kind: "Jeu de plateau", image: "Assets/Profile/Favoris/Root.jpg" },
      { title: "World of Warcraft", kind: "Jeu vidéo", image: "Assets/Profile/Favoris/World of Warcraft.jpg" },
      { title: "Dungeons & Dragons", kind: "Jeu de rôle", image: "Assets/Profile/Favoris/Dungeons and Dragons.png", fit: "contain" },
      { title: "Civilization VI", kind: "Jeu vidéo", image: "Assets/Profile/Favoris/Civilization VI.jpg" },
      { title: "League of Legends", kind: "Jeu vidéo", image: "Assets/Profile/Favoris/League of Legends.jpg" }
    ]
  },

  projects: [
    {
      id: "fling",
      title: "Fling",
      tagline: "",
      year: 2025,
      status: "Terminé",
      featured: true,
      category: "academique",
      accent: "#0A3B66",
      previewGif: "Assets/Projects/Fling/Fling Game Preview.gif",
      cover: "Assets/Projects/Fling/Fling Cover.jpg",
      genre: "Action / Platformer 2.5D",
      platforms: "PC",
      engine: "Unity",
      duration: "2 mois",
      team: "6 (2 dev, 2 audio, game designers)",
      role: "Game designer, level designer (niveau 3), producer",
      tags: ["Level design", "Projet académique", "Unity"],
      trailer: { file: "Assets/Projects/Fling/Fling Game Trailer.mp4" },
      pitch: [],
      contributions: [],
      documents: [],
      gallery: [
        { src: "Assets/Projects/Fling/Fling Screen 6.png", caption: "Gameplay — Fling" },
        { src: "Assets/Projects/Fling/Fling Screen 8.png", caption: "Gameplay — Fling" },
        { src: "Assets/Projects/Fling/Fling Screen 3.png", caption: "Gameplay — Fling" }
      ],
      links: [{ label: "Jouer sur itch.io", url: "https://loveneedlove.itch.io/fling" }],
      en: {
        status: "Completed",
        genre: "Action / 2.5D platformer",
        duration: "2 months",
        team: "6 (2 devs, 2 audio, game designers)",
        role: "Game designer, level designer (level 3), producer",
        tags: ["Level design", "Academic project", "Unity"],
        links: [{ label: "Play on itch.io" }]
      }
    },
    {
      id: "bloodlust",
      title: "BloodLust",
      tagline: "",
      year: 2025,
      status: "Terminé",
      featured: true,
      category: "academique",
      accent: "#0A3B66",
      previewGif: "Assets/Projects/BloodLust/Bloodlust Preview.gif",
      cover: "Assets/Projects/BloodLust/BloodLust Cover.jpg",
      genre: "Brawler 3D",
      platforms: "PC",
      engine: "Unity",
      duration: "2 mois",
      team: "5",
      role: "Game designer, IA & enemy behavior, level design",
      tags: ["Systèmes", "IA", "Projet académique"],
      trailer: { file: "Assets/Projects/BloodLust/Bloodlust Trailer.mov" },
      pitch: [],
      contributions: [],
      documents: [],
      gallery: [
        { src: "Assets/Projects/BloodLust/BloodLust Screen 1.png", caption: "BloodLust" },
        { src: "Assets/Projects/BloodLust/BloodLust Screen 2.png", caption: "BloodLust" },
        { src: "Assets/Projects/BloodLust/BloodLust Screen 3.png", caption: "BloodLust" }
      ],
      links: [{ label: "Jouer sur itch.io", url: "https://crashyflower.itch.io/bloodlust" }],
      en: {
        status: "Completed",
        genre: "3D brawler",
        duration: "2 months",
        role: "Game designer, AI & enemy behavior, level design",
        tags: ["Systems", "AI", "Academic project"],
        links: [{ label: "Play on itch.io" }]
      }
    },
    {
      id: "teokali",
      title: "Teokali",
      contentDir: "Assets/Projects/Teokali",
      tagline: "",
      year: 2024,
      status: "Terminé — prix de l'école, Orléans Joue",
      featured: true,
      category: "academique",
      accent: "#0A3B66",
      previewGif: "",
      cover: "Assets/Projects/Teokali/TEOKALI (1).png",
      genre: "Jeu coopératif",
      platforms: "Jeu de plateau",
      engine: "—",
      duration: "2 mois",
      team: "6",
      role: "Game designer — design économique et équilibrage",
      tags: ["Économie", "Équilibrage", "Projet académique"],
      logo: "Assets/Projects/Teokali/Teokali Logo.png",
      carousel: true,
      trailer: { youtube: "" },
      pitch: [],
      contributions: [],
      documents: [],
      gallery: [
        { src: "Assets/Projects/Teokali/TEOKALI (1).png", caption: "Teokali" },
        { src: "Assets/Projects/Teokali/TEOKALI (2).png", caption: "Teokali" },
        { src: "Assets/Projects/Teokali/TEOKALI (3).png", caption: "Teokali" },
        { src: "Assets/Projects/Teokali/TEOKALI (4).png", caption: "Teokali" },
        { src: "Assets/Projects/Teokali/image2.jpg", caption: "Teokali — session de jeu" }
      ],
      links: [],
      en: {
        status: "Completed — school prize, Orléans Joue",
        genre: "Cooperative game",
        platforms: "Board game",
        duration: "2 months",
        role: "Game designer — economy design & balancing",
        tags: ["Economy", "Balancing", "Academic project"],
        gallery: [{}, {}, {}, {}, { caption: "Teokali — play session" }]
      }
    },
    {
      id: "dungeon-scroller",
      title: "Dungeon Scrawler",
      contentDir: "Assets/Projects/DungeonScroller",
      tagline: "",
      year: 2026,
      status: "Terminé",
      featured: false,
      category: "academique",
      accent: "#0A3B66",
      cover: "Assets/Projects/DungeonScroller/Screenshot 1.png",
      genre: "Dungeon crawler / Roguelite F2P",
      platforms: "Mobile",
      engine: "Unity",
      duration: "",
      team: "Tiamat",
      role: "Game designer",
      tags: ["F2P", "Mobile", "Projet académique"],
      trailer: { file: "Assets/Projects/DungeonScroller/F2P_2026_Tiamat_DungeonScrawler_Short_Trailer.mp4" },
      pitch: [],
      contributions: [],
      documents: [
        {
          title: "Game Design Document",
          kind: "GDD",
          format: "pptx",
          description: "Déplacement, combat, éditeur d'ennemis, upgrades, core loop, UI, FTUE et méta-progression.",
          url: "Assets/Projects/DungeonScroller/Documents de production/G.D.D.pptx",
          preview: "Assets/Projects/DungeonScroller/Documents de production/G.D.D.pdf"
        },
        {
          title: "Document d'économie",
          kind: "Economy design",
          format: "xlsx",
          description: "Courbes d'upgrade par rareté, économie du jeu, drop rates et pity des coffres, design des équipements.",
          url: "Assets/Projects/DungeonScroller/Documents de production/Document Eco G.D.xlsx",
          preview: "Assets/Projects/DungeonScroller/Documents de production/Document Eco G.D.pdf"
        }
      ],
      gallery: [
        { src: "Assets/Projects/DungeonScroller/Screenshot 1.png", caption: "Dungeon Scrawler" },
        { src: "Assets/Projects/DungeonScroller/Screenshot 2.png", caption: "Dungeon Scrawler" },
        { src: "Assets/Projects/DungeonScroller/Screenshot 5.png", caption: "Dungeon Scrawler" }
      ],
      links: [{ label: "Voir le trailer long", url: "Assets/Projects/DungeonScroller/F2P_2026_Timat_DungeonScrawler_Long_Trailer.mp4" }],
      en: {
        status: "Completed",
        genre: "Dungeon crawler / F2P roguelite",
        tags: ["F2P", "Mobile", "Academic project"],
        documents: [
          { description: "Movement, combat, enemy editor, upgrades, core loop, UI, FTUE and meta-progression." },
          { title: "Economy document", description: "Upgrade curves by rarity, game economy, chest drop rates and pity, equipment design." }
        ],
        links: [{ label: "Watch the long trailer" }]
      }
    },
    {
      id: "connection",
      title: "Connection",
      contentDir: "Assets/Projects/Connection",
      tagline: "",
      year: 2026,
      status: "En cours",
      featured: false,
      category: "perso",
      accent: "#0A3B66",
      cover: "",
      genre: "",
      platforms: "",
      engine: "",
      duration: "",
      team: "",
      role: "Game designer",
      tags: ["Projet perso"],
      trailer: { youtube: "" },
      pitch: [],
      contributions: [],
      documents: [],
      gallery: [],
      links: [],
      en: {
        status: "In progress",
        tags: ["Personal project"]
      }
    }
  ]
};
