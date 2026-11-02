from app import app, pages
from flask_frozen import Freezer

app.config["FREEZER_DESTINATION"] = "docs"
app.config["FREEZER_RELATIVE_URLS"] = True
app.config["FREEZER_REMOVE_EXTRA_FILES"] = True
app.config["FREEZER_BASE_URL"] = app.config.get(
    "SITE_URL", "https://renaldofreire.dev"
)

freezer = Freezer(app)


@freezer.register_generator
def post():
    for page in pages:
        if page.path.startswith("posts/") and page.meta.get("lang") == "pt":
            yield {"path": page.path.replace("posts/", "").removesuffix(".en")}


@freezer.register_generator
def post_en():
    for page in pages:
        if page.path.startswith("posts/") and page.meta.get("lang") == "en":
            yield {"path": page.path.replace("posts/", "").removesuffix(".en")}


if __name__ == "__main__":
    freezer.freeze()

    with open("docs/CNAME", "w") as f:
        f.write("renaldofreire.dev")

    print("Site gerado em /docs com CNAME.")
