title: "Publicando um site com GitHub Pages e Porkbun"
date: 2026-07-20
lang: pt
description: Guia prático para hospedar um site estático no GitHub Pages e configurar um domínio personalizado via Porkbun com HTTPS.
tags: [web, dev, tutorial, git]

Hospedar um site estático no GitHub Pages utilizando um domínio próprio comprado no Porkbun é uma das formas mais eficientes, seguras e econômicas de colocar um projeto no ar.

A infraestrutura não depende de servidores dedicados nem de bancos de dados: os arquivos HTML, CSS e ativos estáticos são servidos pela CDN global do GitHub com certificado SSL gratuito e renovação automática.

Abaixo está o passo a passo completo para configurar o repositório, o DNS e o deploy automatizado.

---

### 1. Preparação no Repositório (Arquivo CNAME)

Para que o GitHub Pages saiba qual domínio deve responder pelo seu repositório, é necessário incluir um arquivo chamado `CNAME` na raiz da publicação (por exemplo, na branch `gh-pages` ou dentro da pasta gerada pelo seu gerador estático).

O conteúdo do arquivo deve ser apenas o seu domínio, sem protocolo (`https://`) e sem barras:

```text
renaldofreire.dev
```

Se o seu site usa geradores estáticos (como Frozen-Flask, Hugo, Zola ou Jekyll), garanta que o processo de build crie ou copie esse arquivo para o diretório final de saída.

---

### 2. Configuração de DNS no Porkbun

No painel de gerenciamento do Porkbun, acesse **Domain Management**, localize seu domínio e clique em **DNS Records**.

Remova os registros padrões de estacionamento de domínio (parking) e adicione as seguintes entradas:

#### A Records (Domínio Apex `@`)
Crie 4 registros do tipo **A** apontando o host `@` (ou em branco) para os IPs da CDN do GitHub Pages:

| Tipo | Host | Resposta / Valor | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | 600 |
| **A** | `@` | `185.199.109.153` | 600 |
| **A** | `@` | `185.199.110.153` | 600 |
| **A** | `@` | `185.199.111.153` | 600 |

*(Opcional: você também pode adicionar os registros AAAA correspondentes para IPv6: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` e `2606:50c0:8003::153`).*

#### CNAME Record (Subdomínio `www`)
Para que o tráfego de `www.seudominio.com` seja redirecionado corretamente, crie um registro **CNAME**:

| Tipo | Host | Resposta / Valor | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `<seu-usuario>.github.io` | 600 |

Substitua `<seu-usuario>` pelo seu nome de usuário no GitHub.

---

### 3. Automação de Deploy com GitHub Actions

Em vez de compilar e subir arquivos manualmente, utilize um workflow do GitHub Actions em `.github/workflows/deploy.yml`. 

A cada `git push` na branch `main`, o runner monta o ambiente, compila as páginas estáticas e publica o resultado na branch `gh-pages`:

```yaml
name: Build & Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: "pip"

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Build static site
        run: python freeze.py

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
          publish_branch: gh-pages
```

---

### 4. Ativação do Domínio e HTTPS no GitHub

Após o primeiro deploy da branch `gh-pages`:

1. No repositório do GitHub, vá em **Settings** > **Pages**.
2. Em **Build and deployment**, selecione:
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` / `/ (root)`
3. Em **Custom domain**, digite seu domínio (ex: `renaldofreire.dev`) e clique em **Save**.
4. O GitHub verificará os registros de DNS configurados no Porkbun. Uma vez aprovado, marque a opção **Enforce HTTPS**. O GitHub emitirá um certificado SSL Let's Encrypt automaticamente.

---

### 5. Verificação via Terminal

Para checar se o DNS já propagou antes de testar no navegador:

```bash
dig +noall +answer renaldofreire.dev A
```

A resposta deve listar os 4 endereços IP configurados:

```text
renaldofreire.dev.    600    IN    A    185.199.108.153
renaldofreire.dev.    600    IN    A    185.199.109.153
renaldofreire.dev.    600    IN    A    185.199.110.153
renaldofreire.dev.    600    IN    A    185.199.111.153
```

Com essa estrutura, a manutenção se resume a adicionar ou editar arquivos de conteúdo e fazer o push para o Git. O restante do fluxo é totalmente automático e sem custo de hospedagem.
