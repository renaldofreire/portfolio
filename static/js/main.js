/* ============================================================
   TEMA (claro / escuro)
   ============================================================ */
const THEME_KEY = "rf-theme";

function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  const themeIcon = document.getElementById("themeIcon");
  if (themeIcon) {
    if (dark) {
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    } else {
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    }
  }
}

function toggleTheme() {
  const isDark = !document.body.classList.contains("dark");
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  applyTheme(isDark);
}

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
  const langText = document.getElementById("langText");
  if (langText) {
    langText.innerHTML = lang === "pt" ? "EN" : "PT";
  }

  document.querySelectorAll("[data-pt][data-en]").forEach((el) => {
    el.innerHTML = el.dataset[lang];
  });

  document.querySelectorAll("[data-pt-placeholder][data-en-placeholder]").forEach((el) => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
  });

  if (typeof filterPosts === "function") filterPosts();
  if (typeof filterMiniPosts === "function") filterMiniPosts();
  
  // Atualiza os projetos se a grade existir
  if (document.getElementById("projectsGrid")) {
      renderProjects();
  }
}

function toggleLang() {
  const next = currentLang === "pt" ? "en" : "pt";
  localStorage.setItem(LANG_KEY, next);
  
  // Se estivermos em um post e houver uma versão traduzida, redireciona
  const altUrl = document.body.dataset.altUrl;
  if (altUrl) {
      window.location.href = altUrl;
  } else {
      applyLang(next);
  }
}

// Inicialização do idioma
(function () {
  currentLang = localStorage.getItem(LANG_KEY) || "pt";
  // Não chamamos applyLang aqui para evitar rodar renderProjects antes do DOM estar pronto
  // O applyLang será chamado no DOMContentLoaded ou a inicialização base será feita lá
})();


/* ============================================================
   PROJETOS
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

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getIcon(lang) {
  return LANG_ICONS[lang] || LANG_ICONS.default;
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const scriptTag = document.getElementById("reposData");
  if (!scriptTag) return;

  let repos = [];
  try {
    const content = scriptTag.textContent.trim();
    if (content) {
        repos = JSON.parse(content);
    }
  } catch (e) {
    console.error("Erro ao processar reposData:", e);
  }

  if (repos.length === 0) {
    grid.innerHTML = renderPlaceholders();
    return;
  }

  const cards = repos.map((repo) => {
    let dateStr = "—";
    try {
        if (repo.updated_at) {
            dateStr = new Date(repo.updated_at).toLocaleDateString(
              currentLang === "pt" ? "pt-BR" : "en-US",
              { month: "short", year: "numeric" }
            );
        }
    } catch (e) { console.error("Erro na data:", e); }

    const label = currentLang === "pt" ? "Atualizado em" : "Updated on";

    return `
    <a class="project-card" href="${escapeHtml(repo.url)}" target="_blank" rel="noopener">
      <div class="project-card-top">
        <span class="project-icon">${getIcon(repo.language)}</span>
        <span class="project-lang">${escapeHtml(repo.language)}</span>
      </div>
      <div class="project-title">${escapeHtml(repo.name)}</div>
      <div class="project-desc">${escapeHtml(repo.description) || "—"}</div>
      <div class="project-footer">
        <span style="opacity: 0.8;">${escapeHtml(label)} ${escapeHtml(dateStr)}</span>
      </div>
    </a>
  `;
  });

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
  const label = currentLang === "pt" ? "Atualizado em" : "Updated on";
  const placeholders = currentLang === "pt" ? [
    { title: "Projeto em Destaque", desc: "Carregando via API do GitHub..." },
    { title: "Automação & Scripts",  desc: "Carregando via API do GitHub..." },
    { title: "Homelab & DevOps",     desc: "Carregando via API do GitHub..." },
  ] : [
    { title: "Featured Project", desc: "Loading via GitHub API..." },
    { title: "Automation & Scripts",  desc: "Loading via GitHub API..." },
    { title: "Homelab & DevOps",     desc: "Loading via GitHub API..." },
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
        <span style="opacity: 0.8;">${label} ...</span>
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

/* ============================================================
   CONTATO
   ============================================================ */
function initContact() {
    const contactForm = document.getElementById("contactForm");
    const formResponse = document.getElementById("formResponse");

    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const btn = document.getElementById("submitBtn");
        const originalTxt = btn.innerHTML;

        btn.innerHTML = currentLang === "pt" ? "enviando..." : "sending...";
        btn.disabled = true;

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: json,
        })
          .then(async (response) => {
            let res = await response.json();
            if (response.status == 200) {
              contactForm.style.display = "none";
              formResponse.style.display = "block";
            } else {
              alert(res.message);
            }
          })
          .catch((error) => {
            alert(currentLang === "pt" ? "Ocorreu um erro no envio." : "Error sending message.");
          })
          .then(function () {
            btn.innerHTML = originalTxt;
            btn.disabled = false;
          });
      });
    }
}

function resetForm() {
  const contactForm = document.getElementById("contactForm");
  const formResponse = document.getElementById("formResponse");
  if (contactForm && formResponse) {
    contactForm.reset();
    contactForm.style.display = "block";
    formResponse.style.display = "none";
  }
}

/* ============================================================
   INICIALIZAÇÃO GERAL
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa o idioma salvo (já chama renderProjects() internamente via applyLang)
  const savedLang = localStorage.getItem(LANG_KEY) || "pt";
  applyLang(savedLang);

  // Inicializa contato
  initContact();
});
