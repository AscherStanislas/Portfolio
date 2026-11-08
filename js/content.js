/**
 * Contenu éditorial : fichiers _____<Bloc>.md (rechargés à chaque visite, cache: no-store).
 * Profil : Assets/Profile/
 * Projet  : Assets/Projects/<Dossier>/  (dossier = contentDir ou déduit depuis previewGif / trailer)
 *
 * Blocs projet : Tagline, Pitch, Contributions, Workflow
 * Blocs profil  : Tagline, Bio, Skills, Contact
 */

window.ContentLoader = (() => {
  function stripMdInline(text) {
    return String(text)
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .trim();
  }

  async function fetchMarkdown(path) {
    if (!path) return null;
    try {
      const res = await fetch(encodeURI(path), { cache: "no-store" });
      if (!res.ok) return null;
      return await res.text();
    } catch {
      return null;
    }
  }

  function mdFile(dir, blockName) {
    return dir ? `${dir}/_____${blockName}.md` : "";
  }

  function projectContentDir(p) {
    if (p.contentDir) return String(p.contentDir).replace(/\/$/, "");
    const src = p.previewGif || p.trailer?.file || "";
    const m = String(src).match(/^Assets\/Projects\/([^/]+)/i);
    return m ? `Assets/Projects/${m[1]}` : "";
  }

  function profileContentDir(profile) {
    return String(profile.contentDir || "Assets/Profile").replace(/\/$/, "");
  }

  function parseSingleLine(raw) {
    if (!raw) return "";
    for (const line of String(raw).split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      return stripMdInline(t);
    }
    const first = String(raw).trim().split(/\r?\n/)[0] || "";
    return stripMdInline(first.replace(/^#+\s*/, ""));
  }

  function parseParagraphs(raw) {
    if (!raw) return [];
    const body = String(raw)
      .replace(/^#{1,4}\s+[^\n]+\n+/, "")
      .trim();
    if (!body) return [];
    return body
      .split(/\n\s*\n/)
      .map((p) => stripMdInline(p.replace(/\s*\n\s*/g, " ").trim()))
      .filter(Boolean);
  }

  function parseBulletList(raw) {
    const items = [];
    for (const line of String(raw).split(/\r?\n/)) {
      const m = line.trim().match(/^[-*]\s+(.+)$/);
      if (m) items.push(stripMdInline(m[1]));
    }
    return items;
  }

  function parseSkillsMarkdown(raw) {
    const groups = [];
    let current = null;
    for (const line of String(raw).split(/\r?\n/)) {
      const t = line.trim();
      const h3 = t.match(/^#{3}\s+(.+)$/);
      const bullet = t.match(/^[-*]\s+(.+)$/);
      if (h3) {
        current = { group: stripMdInline(h3[1]), items: [] };
        groups.push(current);
        continue;
      }
      if (bullet && current) {
        const item = stripMdInline(bullet[1]);
        if (item) current.items.push(item);
      }
    }
    return groups.filter((g) => g.group && g.items.length);
  }

  function parseWorkflowMarkdown(raw) {
    const phases = [];
    let title = "Workflow";
    let current = null;

    for (const line of String(raw).split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const h4 = trimmed.match(/^#{4}\s+(.+)$/);
      const h3 = trimmed.match(/^#{3}\s+(.+)$/);
      const bullet = trimmed.match(/^[-*]\s+(.+)$/);
      if (h4) {
        title = stripMdInline(h4[1]);
        continue;
      }
      if (h3) {
        current = { title: stripMdInline(h3[1]), items: [] };
        phases.push(current);
        continue;
      }
      if (bullet && current) current.items.push(stripMdInline(bullet[1]));
    }

    return { title, phases: phases.filter((ph) => ph.title && ph.items.length) };
  }

  async function hydrateProject(project) {
    const dir = projectContentDir(project);
    if (!dir) return project;

    const [taglineRaw, pitchRaw, contribRaw, workflowRaw] = await Promise.all([
      fetchMarkdown(mdFile(dir, "Tagline")),
      fetchMarkdown(mdFile(dir, "Pitch")),
      fetchMarkdown(mdFile(dir, "Contributions")),
      fetchMarkdown(project.workflowFile || mdFile(dir, "Workflow"))
    ]);

    if (taglineRaw) {
      const tagline = parseSingleLine(taglineRaw);
      if (tagline) project.tagline = tagline;
    }
    if (pitchRaw) {
      const pitch = parseParagraphs(pitchRaw);
      if (pitch.length) project.pitch = pitch;
    }
    if (contribRaw) {
      const contributions = parseBulletList(contribRaw);
      if (contributions.length) project.contributions = contributions;
    }
    if (workflowRaw) {
      const workflow = parseWorkflowMarkdown(workflowRaw);
      if (workflow.phases?.length) project.workflow = workflow;
    }
    return project;
  }

  async function hydrateProfile(profile) {
    const dir = profileContentDir(profile);
    const [taglineRaw, bioRaw, skillsRaw, contactRaw] = await Promise.all([
      fetchMarkdown(mdFile(dir, "Tagline")),
      fetchMarkdown(mdFile(dir, "Bio")),
      fetchMarkdown(mdFile(dir, "Skills")),
      fetchMarkdown(mdFile(dir, "Contact"))
    ]);

    if (taglineRaw) {
      const tagline = parseSingleLine(taglineRaw);
      if (tagline) profile.tagline = tagline;
    }
    if (bioRaw) {
      const bio = parseParagraphs(bioRaw);
      if (bio.length) profile.bio = bio;
    }
    if (skillsRaw) {
      const skills = parseSkillsMarkdown(skillsRaw);
      if (skills.length) profile.skills = skills;
    }
    if (contactRaw) {
      const contactIntro = parseSingleLine(contactRaw) || parseParagraphs(contactRaw).join(" ");
      if (contactIntro) profile.contactIntro = contactIntro;
    }
    return profile;
  }

  async function hydrateAllProjects(projectList) {
    await Promise.all(projectList.map((p) => hydrateProject(p)));
    return projectList;
  }

  return {
    hydrateProject,
    hydrateProfile,
    hydrateAllProjects,
    projectContentDir,
    mdFile
  };
})();
