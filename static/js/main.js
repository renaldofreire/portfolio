/* ============================================================
   TEMA (claro / escuro)
   ============================================================ */
const THEME_KEY = "rf-theme";

function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  const btn = document.getElementById("themeBtn");
  if (btn) btn.innerHTML = dark ? "☀️" : "🌙";
}

function toggleTheme() {
  const isDark = !document.body.classList.contains("dark");
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  applyTheme(isDark);
}

// Aplica o tema salvo antes do primeiro render para evitar flash
(function () {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved ? saved === "dark" : prefersDark);
})();


/* ============================================================
   IDIOMA (pt / en)
   ============================================================ */
const LANG_KEY = "rf-lang";
let currentLang = "pt";

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  const btn = document.getElementById("langBtn");
  if (btn) {
    // Mostra apenas a bandeira do idioma para o qual o usuário pode mudar
    btn.innerHTML = lang === "pt" ? "🇬🇧" : "🇧🇷";
  }

  document.querySelectorAll("[data-pt][data-en]").forEach((el) => {
    el.innerHTML = el.dataset[lang];
  });
}

function toggleLang() {
  const next = currentLang === "pt" ? "en" : "pt";
  localStorage.setItem(LANG_KEY, next);
  applyLang(next);
}

(function () {
  const saved = localStorage.getItem(LANG_KEY) || "pt";
  applyLang(saved);
})();


/* ============================================================
   PROJETOS — renderiza a partir dos dados injetados pelo Python
   ============================================================ */
const LANG_ICONS = {
  Python:     "⚗",
  JavaScript: "⚡",
  TypeScript: "⚡",
  Shell:      "⚙",
  HTML:       "◈",
  CSS:        "◈",
  default:    "◆",
};

function getIcon(lang) {
  return LANG_ICONS[lang] || LANG_ICONS.default;
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const scriptTag = document.getElementById("reposData");
  let repos = [];

  try {
    repos = JSON.parse(scriptTag.textContent.trim());
  } catch (e) {
    console.warn("Não foi possível carregar os repositórios.", e);
  }

  if (repos.length === 0) {
    grid.innerHTML = renderPlaceholders();
    return;
  }

  const cards = repos.map((repo) => `
    <a class="project-card" href="${repo.url}" target="_blank" rel="noopener">
      <div class="project-card-top">
        <span class="project-icon">${getIcon(repo.language)}</span>
        <span class="project-lang">${repo.language}</span>
      </div>
      <div class="project-title">${repo.name}</div>
      <div class="project-desc">${repo.description || "—"}</div>
      <div class="project-footer">
        <span>★ ${repo.stars}</span>
        <span>⑂ ${repo.forks}</span>
      </div>
    </a>
  `);

  // Preenche até 6 cards; completa com card vazio se necessário
  if (cards.length % 2 !== 0) {
    cards.push(`
      <div class="project-card-empty">
        <span style="font-size:12px;color:var(--text2);font-family:'Courier New',monospace;">
          + no GitHub →
        </span>
      </div>
    `);
  }

  grid.innerHTML = cards.join("");
}

function renderPlaceholders() {
  const placeholders = [
    { title: "Projeto em Destaque", desc: "Carregando via API do GitHub..." },
    { title: "Automação & Scripts",  desc: "Carregando via API do GitHub..." },
    { title: "Homelab & DevOps",     desc: "Carregando via API do GitHub..." },
  ];

  return placeholders.map((p) => `
    <div class="project-card">
      <div class="project-card-top">
        <span class="project-icon">⚗</span>
        <span class="project-lang">Python</span>
      </div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-footer">
        <span>★ —</span><span>⑂ —</span>
      </div>
    </div>
  `).join("") + `
    <div class="project-card-empty">
      <span style="font-size:12px;color:var(--text2);font-family:'Courier New',monospace;">
        + no GitHub →
      </span>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", renderProjects);
