import json
import os
from flask import Flask, render_template
from flask_flatpages import FlatPages

app = Flask(__name__)

# Configurações do FlatPages
app.config['FLATPAGES_EXTENSION'] = '.md'
app.config['FLATPAGES_ROOT'] = 'content'
app.config['FLATPAGES_POSTS_DIR'] = 'posts'
app.config['FLATPAGES_MARKDOWN_EXTENSIONS'] = ['codehilite', 'fenced_code', 'tables']
pages = FlatPages(app)

REPOS_FILE = os.path.join("static", "data", "repos.json")


def load_repos():
    if os.path.exists(REPOS_FILE):
        with open(REPOS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


@app.route("/")
def index():
    repos = load_repos()
    # Pega os posts para a home, filtrando por idioma no template ou JS
    posts = [p for p in pages if p.path.startswith(app.config['FLATPAGES_POSTS_DIR'])]
    posts.sort(key=lambda item: item.meta.get('date', ''), reverse=True)
    return render_template("index.html", repos=repos, latest_posts=posts)


@app.route("/blog/")
def blog():
    posts = [p for p in pages if p.path.startswith(app.config['FLATPAGES_POSTS_DIR'])]
    posts.sort(key=lambda item: item.meta.get('date', ''), reverse=True)
    return render_template("blog.html", posts=posts)


@app.route("/blog/<path:path>/")
def post(path):
    post = pages.get_or_404(f"{app.config['FLATPAGES_POSTS_DIR']}/{path}")
    
    # Lógica para encontrar a versão traduzida
    alt_path = None
    if path.endswith('.en'):
        # Se estamos no .en, o original é sem o .en
        base_path = path.replace('.en', '')
        if pages.get(f"{app.config['FLATPAGES_POSTS_DIR']}/{base_path}"):
            alt_path = base_path
    else:
        # Se estamos no original, tentamos o .en
        if pages.get(f"{app.config['FLATPAGES_POSTS_DIR']}/{path}.en"):
            alt_path = f"{path}.en"
            
    return render_template("post.html", post=post, alt_path=alt_path)


if __name__ == "__main__":
    app.run(debug=True)
