title: Como este blog (quase) se criou sozinho
date: 2026-05-25
lang: pt
description: O necessário para se ter um blog simples usando Python, café e teimosia.
tags: [python, dev, gambiarras-do-bem]

# O nascimento de um blog (ou: Por que não usei WordPress?)

Se você está lendo isso, parabéns! Significa que o emaranhado de scripts em Python que eu chamo de "sistema de build" realmente funcionou e não explodiu meu computador.

Muita gente perguntaria: *"Renaldo, por que diabos você não usou o WordPress ou o Medium?"*. A resposta é simples: porque eu gosto de sofrer (e de ter controle total sobre cada pixel e cada linha de código). 

Aqui está a receita do que faz esse blog rodar enquanto eu tomo meu café:

### A Santíssima Trindade do meu Setup:

1.  **Flask + Flask-FlatPages:** 
    O Flask é como aquele canivete suíço que eu uso para tudo. O FlatPages é a mágica que pega arquivos Markdown sem graça e os transforma em páginas HTML elegantes. Sem banco de dados, sem complicação, sem drama.
    
2.  **Markdown:** 
    Eu escrevo em texto puro, o Python faz o trabalho pesado e o resultado é um HTML limpo. É a forma mais próxima de "programar" um texto que eu conheço.

3.  **Frozen-Flask:** 
    Este aqui é o gênio da lâmpada. Ele pega todo o dinamismo do Flask e "congela" em arquivos estáticos. O resultado? Um site que voa, é seguro por natureza e mora de graça no GitHub Pages.

### O "Mestre Cuca" por trás de tudo
O real herói aqui é o **GitHub Actions**. Toda vez que eu faço um `git push` com um novo post, um robô em algum lugar do mundo acorda, roda meus scripts Python, limpa a sujeira e publica o site. Eu só preciso me preocupar em escrever (e em não deixar o café esfriar).

### Exemplo de código (porque blog de dev tem que ter código):

Só para garantir que o realce de cores está funcionando e deixando tudo bonitão:

```python
def rotina_matinal(cafe_disponivel: bool):
    if cafe_disponivel:
        print("☕ Iniciando o deploy do blog...")
        return "Mundo conquistado!"
    else:
        raise Exception("Erro Crítico: Cafeína não encontrada.")

# Spoiler: o café sempre está disponível.
```

Espero que gostem dos próximos posts. Embreve falarei de Linux, Homelab, Software Livre outras nerdices.

Até a próxima!
