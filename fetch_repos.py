"""
Busca os repositórios públicos do GitHub e salva em static/data/repos.json.
Executado pelo GitHub Actions antes do build, ou manualmente em dev.

Uso:
    python fetch_repos.py

Variável de ambiente opcional:
    GITHUB_TOKEN — aumenta o rate limit de 60 para 5000 req/hora.
"""

import json
import os
import sys
import requests

GITHUB_USERNAME = "renaldofreire"
API_URL = f"https://api.github.com/users/{GITHUB_USERNAME}/repos"
OUTPUT_FILE = os.path.join("static", "data", "repos.json")

# Repositórios a excluir do portfolio (forks, configs, etc.)
EXCLUDE = set()

# Quantos repositórios exibir no máximo
MAX_REPOS = 6


def fetch_repos():
    headers = {"Accept": "application/vnd.github+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"

    params = {
        "sort": "updated",
        "direction": "desc",
        "per_page": 100,
        "type": "owner",
    }

    print(f"Buscando repositórios de @{GITHUB_USERNAME}...")
    response = requests.get(API_URL, headers=headers, params=params, timeout=10)

    if response.status_code != 200:
        print(f"Erro na API do GitHub: {response.status_code} — {response.text}")
        sys.exit(1)

    raw = response.json()

    repos = []
    for repo in raw:
        if repo["name"] in EXCLUDE:
            continue
        if repo["fork"]:
            continue

        repos.append({
            "name": repo["name"],
            "description": repo["description"] or "",
            "language": repo["language"] or "—",
            "stars": repo["stargazers_count"],
            "forks": repo["forks_count"],
            "url": repo["html_url"],
            "topics": repo.get("topics", []),
            "updated_at": repo["updated_at"],
        })

    repos = repos[:MAX_REPOS]

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(repos, f, ensure_ascii=False, indent=2)

    print(f"{len(repos)} repositório(s) salvos em {OUTPUT_FILE}")


if __name__ == "__main__":
    fetch_repos()
