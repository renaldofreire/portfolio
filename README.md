# portfolio-bear

Portfolio pessoal minimalista. Inspirado no [Bear Blog](https://bearblog.dev).

Zero JavaScript. ~100 linhas de CSS. Páginas de ~2-5kb.

## Stack

- Python 3.12, Flask, Frozen-Flask, Flask-FlatPages
- HTML semântico + CSS mínimo
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
