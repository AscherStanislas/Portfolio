/*
  data.js = structure (id, médias, métadonnées fiche, galerie, liens).
  Textes = fichiers Markdown rechargés via js/content.js (serveur local requis).

  Profil : Assets/Profile/_____<Bloc>.md
    Blocs : Tagline, Bio, Skills, Contact

  Projet (modèle Fling) : Assets/Projects/<Dossier>/_____<Bloc>.md
    Dossier = contentDir OU déduit de previewGif / trailer local
    Blocs : Tagline, Pitch, Contributions, Workflow
*/

window.PORTFOLIO = {
  profile: {
    name: "Ascher Stanislas",
    role: "Game designer",
    tagline: "",
    bio: [],
    avatar: "",
    location: "France",
    availability: "",
    email: "a.stanislas@student.isartdigital.com",
    cv: "https://d11122ad-4261-49d8-8b2f-d953c20b5b44.filesusr.com/ugd/02bbbf_423a604bcd6e412aa402cde0e5ccb747.pdf",
    showcase: {
      file: "https://video.wixstatic.com/video/02bbbf_39f13e2ebf2840a99fa50d02f5be9b31/1080p/mp4/file.mp4"
    },
    homeFeatured: ["fling", "bloodlust", "teokali"],
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/ascher-stanislas-6063a3329/" }
    ],
    skills: []
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
      cover: "https://static.wixstatic.com/media/02bbbf_4fa852b1766d4325a66a1a84c837a748f000.jpg/v1/fill/w_980,h_950,al_c,q_85/02bbbf_4fa852b1766d4325a66a1a84c837a748f000.jpg",
      genre: "Action / Platformer 2.5D",
      platforms: "PC",
      engine: "Unity",
      duration: "2 mois",
      team: "6 (2 dev, 2 audio, game designers)",
      role: "Game Designer, Level Designer (niveau 3), Producer",
      tags: ["Level Design", "Projet académique", "Unity"],
      trailer: { file: "Assets/Projects/Fling/Fling Game Trailer.mp4" },
      pitch: [],
      contributions: [],
      documents: [],
      gallery: [
        { src: "https://static.wixstatic.com/media/02bbbf_9a113fe6069542e6b343c23d8e99e739~mv2.png/v1/fill/w_1200,h_750,al_c,q_85/LadyDimitrescu_Fling_Screen_6.png", caption: "Gameplay — Fling" },
        { src: "https://static.wixstatic.com/media/02bbbf_b22f8c9469584a02b15b56fefe7617ba~mv2.png/v1/fill/w_1200,h_750,al_c,q_85/LadyDimitrescu_Fling_Screen_8.png", caption: "Gameplay — Fling" },
        { src: "https://static.wixstatic.com/media/02bbbf_70259747f5644f538bb0eb1a1c1432db~mv2.png/v1/fill/w_1200,h_750,al_c,q_85/LadyDimitrescu_Fling_Screen_3.png", caption: "Gameplay — Fling" }
      ],
      links: [{ label: "Jouer sur itch.io", url: "https://loveneedlove.itch.io/fling" }]
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
      cover: "https://static.wixstatic.com/media/02bbbf_39f13e2ebf2840a99fa50d02f5be9b31f000.jpg/v1/fill/w_980,h_950,al_c,q_85/02bbbf_39f13e2ebf2840a99fa50d02f5be9b31f000.jpg",
      genre: "Brawler 3D",
      platforms: "PC",
      engine: "Unity",
      duration: "2 mois",
      team: "5",
      role: "Game Designer, IA & enemy behavior, Level Design",
      tags: ["Systèmes", "IA", "Projet académique"],
      trailer: { file: "Assets/Projects/BloodLust/Bloodlust Trailer.mov" },
      pitch: [],
      contributions: [],
      documents: [],
      gallery: [
        { src: "https://static.wixstatic.com/media/02bbbf_e4440a5cb64c49ce9441f91d87461e33~mv2.png/v1/fill/w_1200,h_750,al_c,q_85/02bbbf_e4440a5cb64c49ce9441f91d87461e33~mv2.png", caption: "BloodLust" },
        { src: "https://static.wixstatic.com/media/02bbbf_6f3d193c93c94f8e91c2c6d95da396e7~mv2.png/v1/fill/w_1200,h_750,al_c,q_85/02bbbf_6f3d193c93c94f8e91c2c6d95da396e7~mv2.png", caption: "BloodLust" },
        { src: "https://static.wixstatic.com/media/02bbbf_ea76e6f3eee245babb62f74513548df5~mv2.png/v1/fill/w_1200,h_750,al_c,q_85/05_Brotherhood_Screenshot09.png", caption: "BloodLust" }
      ],
      links: []
    },
    {
      id: "teokali",
      title: "Teokali",
      contentDir: "Assets/Projects/Teokali",
      tagline: "",
      year: 2024,
      status: "Terminé — prix école, Orléans Joue",
      featured: true,
      category: "academique",
      accent: "#0A3B66",
      previewGif: "",
      cover: "https://static.wixstatic.com/media/02bbbf_c8032bae6c0147c9904f7f0518a85864~mv2.png/v1/fill/w_1200,h_750,al_c,q_85/StanislasAscher__GD1B_ScreenShot_1.png",
      genre: "Board game / Coop",
      platforms: "Jeu de table",
      engine: "—",
      duration: "2 mois",
      team: "6",
      role: "Game Designer — economic design & balancing",
      tags: ["Économie", "Équilibrage", "Projet académique"],
      trailer: { youtube: "" },
      pitch: [],
      contributions: [],
      documents: [],
      gallery: [
        { src: "https://static.wixstatic.com/media/02bbbf_c8032bae6c0147c9904f7f0518a85864~mv2.png/v1/fill/w_1200,h_750,al_c,q_85/StanislasAscher__GD1B_ScreenShot_1.png", caption: "Teokali" },
        { src: "https://static.wixstatic.com/media/02bbbf_1b94ecc2341f4a51bcdf06394ff57b2d~mv2.png/v1/fill/w_1200,h_750,al_c,q_85/StanislasAscher__GD1B_ScreenShot_3.png", caption: "Teokali" },
        { src: "https://static.wixstatic.com/media/02bbbf_c5f7167e09ff406ab7c8efecb591023b~mv2.png/v1/fill/w_1200,h_750,al_c,q_85/StanislasAscher__GD1B_ScreenShot_2.png", caption: "Teokali" }
      ],
      links: []
    },
    {
      id: "trials-of-kuno",
      title: "Trials of Kuno",
      contentDir: "Assets/Projects/TrialsOfKuno",
      tagline: "",
      year: 2024,
      status: "Terminé",
      featured: false,
      category: "academique",
      accent: "#0A3B66",
      cover: "https://static.wixstatic.com/media/02bbbf_03359f6326a44a2590e4d3ca1c032530f000.jpg/v1/fill/w_980,h_950,al_c,q_85/02bbbf_03359f6326a44a2590e4d3ca1c032530f000.jpg",
      genre: "One-button / Platformer",
      platforms: "PC / Mobile",
      engine: "Unity",
      duration: "1,5 mois",
      team: "Solo",
      role: "Game Designer — solo project",
      tags: ["Level Design", "Projet académique", "Solo"],
      trailer: {
        file: "https://video.wixstatic.com/video/02bbbf_03359f6326a44a2590e4d3ca1c032530/1080p/mp4/file.mp4"
      },
      pitch: [],
      contributions: [],
      documents: [],
      gallery: [
        { src: "https://static.wixstatic.com/media/02bbbf_c8032bae6c0147c9904f7f0518a85864~mv2.png/v1/fill/w_1200,h_750,al_c,q_85/StanislasAscher__GD1B_ScreenShot_1.png", caption: "Trials of Kuno" },
        { src: "https://static.wixstatic.com/media/02bbbf_1b94ecc2341f4a51bcdf06394ff57b2d~mv2.png/v1/fill/w_1200,h_750,al_c,q_85/StanislasAscher__GD1B_ScreenShot_3.png", caption: "Trials of Kuno" }
      ],
      links: []
    },
    {
      id: "dungeon-scroller",
      title: "Dungeon Scroller",
      contentDir: "Assets/Projects/DungeonScroller",
      tagline: "",
      year: 2026,
      status: "À compléter",
      featured: false,
      category: "academique",
      accent: "#0A3B66",
      cover: "",
      genre: "",
      platforms: "",
      engine: "",
      duration: "",
      team: "",
      role: "Game Designer",
      tags: ["Projet académique"],
      trailer: { youtube: "" },
      pitch: [],
      contributions: [],
      documents: [],
      gallery: [],
      links: []
    },
    {
      id: "connection",
      title: "Connection",
      contentDir: "Assets/Projects/Connection",
      tagline: "",
      year: 2026,
      status: "À compléter",
      featured: false,
      category: "perso",
      accent: "#0A3B66",
      cover: "",
      genre: "",
      platforms: "",
      engine: "",
      duration: "",
      team: "",
      role: "Game Designer",
      tags: ["Projet perso"],
      trailer: { youtube: "" },
      pitch: [],
      contributions: [],
      documents: [],
      gallery: [],
      links: []
    }
  ]
};
