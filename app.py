import datetime
import os

import yaml
from flask import Flask, render_template, url_for
from flask_flatpages import FlatPages

if os.path.exists(".env"):
    with open(".env", "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ.setdefault(key.strip(), val.strip().strip("'\""))

app = Flask(__name__)

SITE_URL = os.environ.get("SITE_URL", "https://renaldofreire.dev").rstrip("/")
app.config["SITE_URL"] = SITE_URL
app.config["FREEZER_BASE_URL"] = SITE_URL
app.config["WEB3FORMS_ACCESS_KEY"] = os.environ.get(
    "WEB3FORMS_ACCESS_KEY", "YOUR_ACCESS_KEY"
)

app.config["FLATPAGES_EXTENSION"] = ".md"
app.config["FLATPAGES_ROOT"] = "content"
app.config["FLATPAGES_POSTS_DIR"] = "posts"
app.config["FLATPAGES_MARKDOWN_EXTENSIONS"] = [
    "codehilite",
    "fenced_code",
    "tables",
]

pages = FlatPages(app)

PROJECTS_FILE = os.path.join("content", "projects.yml")


@app.context_processor
def inject_globals():
    return {
        "site_url": app.config["SITE_URL"],
        "web3forms_key": app.config["WEB3FORMS_ACCESS_KEY"],
    }


def load_projects():
    if os.path.exists(PROJECTS_FILE):
        with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
            return yaml.safe_load(f) or []
    return []


def get_posts(lang=None):
    posts = [
        p
        for p in pages
        if p.path.startswith(app.config["FLATPAGES_POSTS_DIR"])
    ]
    if lang:
        posts = [p for p in posts if p.meta.get("lang") == lang]
    posts.sort(key=lambda item: item.meta.get("date", ""), reverse=True)
    return posts


def _render_post(path, lang):
    clean_path = path.removesuffix(".en")
    posts_dir = app.config["FLATPAGES_POSTS_DIR"]
    if lang == "en":
        page = pages.get(f"{posts_dir}/{clean_path}.en") or pages.get_or_404(
            f"{posts_dir}/{clean_path}"
        )
        alt_path = clean_path if pages.get(f"{posts_dir}/{clean_path}") else None
    else:
        page = pages.get_or_404(f"{posts_dir}/{clean_path}")
        alt_path = clean_path if pages.get(f"{posts_dir}/{clean_path}.en") else None
    return render_template("post.html", post=page, alt_path=alt_path, lang=lang, slug=clean_path)


def _render_feed(lang):
    posts = get_posts(lang=lang)
    build_date = datetime.datetime.now(datetime.timezone.utc).strftime(
        "%a, %d %b %Y %H:%M:%S +0000"
    )
    xml = render_template("feed.xml", posts=posts, build_date=build_date, lang=lang)
    return app.response_class(xml, mimetype="text/xml")


@app.route("/")
def index():
    posts = get_posts(lang="pt")
    return render_template("index.html", posts=posts, lang="pt")


@app.route("/projetos/")
def projetos():
    projects = load_projects()
    return render_template("projects.html", projects=projects, lang="pt")


@app.route("/blog/")
def blog():
    posts = get_posts(lang="pt")
    return render_template("blog.html", posts=posts, lang="pt")


@app.route("/blog/<path:path>/")
def post(path):
    return _render_post(path, lang="pt")


@app.route("/contato/")
def contato():
    return render_template("contact.html", lang="pt")


@app.route("/contato/sucesso/")
def contato_sucesso():
    return render_template("contact_success.html", lang="pt")


@app.route("/feed.xml")
def feed():
    return _render_feed(lang="pt")


@app.route("/en/")
def index_en():
    posts = get_posts(lang="en")
    return render_template("index.html", posts=posts, lang="en")


@app.route("/en/projects/")
def projects_en():
    projects = load_projects()
    return render_template("projects.html", projects=projects, lang="en")


@app.route("/en/blog/")
def blog_en():
    posts = get_posts(lang="en")
    return render_template("blog.html", posts=posts, lang="en")


@app.route("/en/blog/<path:path>/")
def post_en(path):
    return _render_post(path, lang="en")


@app.route("/en/contact/")
def contact_en():
    return render_template("contact.html", lang="en")


@app.route("/en/contact/success/")
def contact_success_en():
    return render_template("contact_success.html", lang="en")


@app.route("/en/feed.xml")
def feed_en():
    return _render_feed(lang="en")


MONTHS_PT = [
    "", "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez",
]
MONTHS_EN = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]


@app.template_filter("post_slug")
def post_slug_filter(post_or_path):
    path_val = getattr(post_or_path, "path", post_or_path)
    return path_val.replace("posts/", "").removesuffix(".en")


@app.template_filter("format_date")
def format_date(date_val, lang="pt"):
    if not date_val:
        return ""
    if isinstance(date_val, str):
        try:
            date_val = datetime.datetime.strptime(date_val.strip(), "%Y-%m-%d").date()
        except ValueError:
            return str(date_val)
    months = MONTHS_PT if lang == "pt" else MONTHS_EN
    return f"{date_val.day} {months[date_val.month]} {date_val.year}"


@app.template_filter("format_rfc822")
def format_rfc822(date_val):
    if not date_val:
        return ""
    if isinstance(date_val, (datetime.date, datetime.datetime)):
        dt = (
            datetime.datetime.combine(
                date_val, datetime.time.min, tzinfo=datetime.timezone.utc
            )
            if not isinstance(date_val, datetime.datetime)
            else (
                date_val.replace(tzinfo=datetime.timezone.utc)
                if date_val.tzinfo is None
                else date_val
            )
        )
        return dt.strftime("%a, %d %b %Y %H:%M:%S +0000")
    try:
        parsed = datetime.datetime.strptime(str(date_val).strip(), "%Y-%m-%d").replace(
            tzinfo=datetime.timezone.utc
        )
        return parsed.strftime("%a, %d %b %Y %H:%M:%S +0000")
    except ValueError:
        return str(date_val)


if __name__ == "__main__":
    debug = os.environ.get("FLASK_DEBUG", "false").lower() in ("1", "true")
    app.run(debug=debug)
