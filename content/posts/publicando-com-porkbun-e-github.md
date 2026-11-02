title: "Tirando a poeira: Como publiquei meu portfólio usando Porkbun e GitHub"
date: 2026-07-20
lang: pt
description: Um guia leve e sem mistérios sobre como registrar seu domínio e colocar seu site no ar de graça.
tags: [web, dev, tutorial]

### Os bits estão acumulados, eu sei

Se a frequência de posts deste blog fosse um exame de eletrocardiograma, o médico já teria assinado meu atestado de óbito. Sim, faz um tempo que não publico nada por aqui, mas
hoje quero contar um pouco sobre os bastidores de como este site saiu da minha máquina local e foi parar na internet, sob o domínio **renaldofreire.dev**. A melhor parte? Custa menos do que duas xícaras de café por ano.

---

### O Motor: Flask e Markdown

Antes de falarmos sobre como o site foi publicado, vale entender do que ele é feito. Eu poderia ter usado WordPress, mas como gosto de entender onde cada parafuso se encaixa, decidi usar **Flask** (um framework leve em Python) e **Markdown** (uma forma simples de escrever textos que o Python converte em HTML).

Para colocar isso na internet de forma rápida e segura, usei o **Frozen-Flask**. Ele roda na minha máquina, lê todo o código dinâmico e "congela" o site, gerando apenas arquivos HTML, CSS e JS estáticos. O resultado? Um site extremamente leve, sem banco de dados para dar dor de cabeça e impossível de ser invadido por vulnerabilidades comuns.

---

### A Garagem Gratuita: GitHub Pages

Depois de "congelar" o site, eu precisava de um lugar para guardá-lo. É aí que entra o **GitHub**. 

Além de ser a plataforma onde guardamos códigos de programação, o GitHub tem um serviço chamado **GitHub Pages**. Pense nele como uma hospedagem gratuita para sites estáticos. Eu simplesmente envio os arquivos gerados para lá, e o GitHub se encarrega de exibi-los para o mundo. 

Mas subir esses arquivos manualmente toda vez seria um porre. Por isso, configurei o **GitHub Actions** — que funciona como um assistente virtual. Toda vez que escrevo um post novo (como este) e faço um envio de código (`git push`), esse assistente acorda sozinho, roda os scripts em Python para atualizar o site e publica a nova versão no ar em segundos.

---

### O Endereço Próprio: Porkbun e DNS

Ter o site no GitHub é ótimo, mas o endereço padrão seria algo sem graça como *renaldofreire.github.io*. Eu queria algo com mais personalidade.

Para resolver isso, comprei o domínio **renaldofreire.dev** na **Porkbun** (uma registradora de domínios muito querida na comunidade dev, famosa pelos preços honestos e pelo mascote de porquinho).

Depois de comprar o domínio, a mágica acontece na configuração do **DNS** (que funciona como a lista telefônica da internet):
1. No painel da Porkbun, apontei o domínio para os servidores do GitHub.
2. No GitHub, criei um arquivo chamado `CNAME` dizendo: *"Ei, quando alguém digitar renaldofreire.dev, mostre a minha página!"*.

Tudo isso se conecta perfeitamente. O domínio direciona o visitante ao GitHub Pages, que por sua vez entrega o site estático que foi gerado de forma automática pelo Python.

---

### Conclusão

Colocar um site no ar hoje não precisa envolver servidores caros ou configurações de rede assustadoras. Com a combinação de ferramentas estáticas, o GitHub Pages para hospedagem gratuita e um domínio barato na Porkbun, você consegue ter seu próprio espaço na internet com controle total.

Prometo que o próximo post não vai demorar tanto para sair.

Até a próxima, de preferência com uma xícara de café fresca ao lado!
