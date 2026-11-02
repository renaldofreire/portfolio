# portfolio

Minimalist personal portfolio and blog. Inspired by [Bear Blog](https://bearblog.dev).

Zero JavaScript. Minimal CSS. ~2–5 KB pages.

## Stack

- Python 3.12, Flask, Frozen-Flask, Flask-FlatPages
- Semantic HTML + minimal CSS
- GitHub Pages

## Dev

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
FLASK_DEBUG=true python app.py
```

## Build

```bash
python freeze.py
```
