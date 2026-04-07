# renaldofreire.dev — Portfolio

Portfolio pessoal construído com **Flask + Frozen-Flask**, deployado no **GitHub Pages** via GitHub Actions.

## Stack

- **Python / Flask** — backend e geração estática
- **Frozen-Flask** — converte o app Flask em arquivos `.html` estáticos
- **GitHub Actions** — build e deploy automático a cada push
- **GitHub API** — repositórios carregados em build time via Python

## Estrutura

```
portfolio/
├── app.py              # Flask app
├── fetch_repos.py      # Busca repositórios via API do GitHub
├── freeze.py           # Gera o site estático em /docs
├── requirements.txt
├── static/
│   ├── css/style.css   # Estilos (tema café + dark mode)
│   ├── js/main.js      # Tema, idioma e renderização dos projetos
│   └── data/repos.json # Gerado pelo fetch_repos.py
├── templates/
│   └── index.html
└── .github/
    └── workflows/
        └── deploy.yml  # CI/CD — build + deploy automático
```

## Setup local

```bash
git clone https://github.com/renaldofreire/portfolio
cd portfolio

python -m venv venv
source venv/bin/activate

pip install -r requirements.txt

# Busca os repos do GitHub (opcional em dev)
python fetch_repos.py

# Roda o servidor local
python app.py
# Acesse http://localhost:5000
```

## Build estático

```bash
python fetch_repos.py   # atualiza static/data/repos.json
python freeze.py        # gera /docs
```

## Deploy

O deploy é automático via GitHub Actions a cada push na branch `main`.

Para ativar o GitHub Pages:
1. Vá em **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / root

O workflow também roda toda segunda-feira para manter os repos atualizados.
