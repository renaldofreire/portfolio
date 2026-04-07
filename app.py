import json
import os
from flask import Flask, render_template

app = Flask(__name__)

REPOS_FILE = os.path.join("static", "data", "repos.json")


def load_repos():
    if os.path.exists(REPOS_FILE):
        with open(REPOS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


@app.route("/")
def index():
    repos = load_repos()
    return render_template("index.html", repos=repos)


if __name__ == "__main__":
    app.run(debug=True)
