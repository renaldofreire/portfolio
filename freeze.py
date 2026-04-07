"""
Gera o site estático em /docs para deploy no GitHub Pages.

Uso:
    python freeze.py

O GitHub Pages serve a partir da branch main, pasta /docs.
"""

from flask_frozen import Freezer
from app import app

app.config["FREEZER_DESTINATION"] = "docs"
app.config["FREEZER_RELATIVE_URLS"] = True
app.config["FREEZER_REMOVE_EXTRA_FILES"] = True

freezer = Freezer(app)

if __name__ == "__main__":
    freezer.freeze()
    
    # Cria o arquivo CNAME para o domínio personalizado
    with open("docs/CNAME", "w") as f:
        f.write("renaldofreire.dev")
        
    print("Site gerado em /docs com CNAME — pronto para o GitHub Pages.")
