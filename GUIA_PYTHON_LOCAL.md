# 🐍 Guia Prático: Rodando Projetos Python Localmente

Este guia explica como configurar e executar projetos Python em sua máquina, detalhando as tecnologias que garantem que o código funcione da mesma forma em qualquer computador.

---

## 1. O Ambiente Virtual (`venv`)

### O que é?
Imagine que você tem dois projetos: um usa a versão 1.0 de uma biblioteca e outro precisa da versão 2.0. Se você instalar tudo globalmente no seu sistema, um projeto vai "quebrar" o outro. O **venv** (Virtual Environment) cria uma "bolha" isolada para cada projeto.

### Comandos Úteis:
*   **Criar o ambiente:**
    ```bash
    python -m venv venv
    ```
    *(Isso cria uma pasta chamada `venv` com uma cópia limpa do Python).*

*   **Ativar (Linux/Mac):**
    ```bash
    source venv/bin/activate
    ```
    *Após ativar, o nome `(venv)` aparecerá no início do seu terminal.*

*   **Desativar:**
    ```bash
    deactivate
    ```

---

## 2. Gerenciamento de Dependências (`requirements.txt`)

### O que é?
É a "lista de compras" do seu projeto. Em vez de enviar todas as bibliotecas para o GitHub (o que deixaria o projeto pesado), você envia apenas este arquivo de texto que lista o que o Python precisa baixar para rodar o código.

### Comandos Úteis:
*   **Instalar tudo da lista:**
    ```bash
    pip install -r requirements.txt
    ```

*   **Gerar a lista com o que você já instalou:**
    ```bash
    pip freeze > requirements.txt
    ```

---

## 3. O Ponto de Entrada (`app.py` ou `main.py`)

### O que é?
Geralmente, projetos pequenos possuem um arquivo principal (como o seu `app.py`). Ele contém as instruções iniciais para "ligar" o motor do sistema. No seu caso, ele configura as rotas do site e inicia o servidor **Flask**.

### Comandos Úteis:
*   **Executar o projeto:**
    ```bash
    python app.py
    ```

---

## 4. O Gerenciador de Pacotes (`pip`)

### O que é?
O **pip** é o instalador oficial de pacotes do Python. Ele busca bibliotecas em um repositório global chamado PyPI (Python Package Index).

### Comandos Úteis:
*   **Instalar uma biblioteca específica:**
    ```bash
    pip install nome-da-biblioteca
    ```

*   **Ver bibliotecas instaladas:**
    ```bash
    pip list
    ```

---

## 4.5 Como ter certeza que estou no ambiente local?

É comum surgir a dúvida: *"Como garanto que o `pip list` está mostrando os pacotes do projeto e não do meu computador?"*.

A garantia vem do comando `activate`. Ele altera temporariamente o **PATH** (o caminho de busca do sistema), colocando a pasta do seu projeto no início da fila.

### Formas de confirmar:
1.  **O Prefixo:** O nome `(venv)` deve aparecer no início da linha do seu terminal.
2.  **O Comando `which`:** Rode `which pip` (no Linux/Mac) ou `where pip` (no Windows). 
    *   Se o caminho retornado apontar para dentro da pasta do seu projeto, você está seguro!
3.  **A Prova Real:** Rode `pip list` antes e depois de ativar. Você notará que a lista local é muito menor e focada apenas no necessário para o seu projeto.

---

## 5. Resumo do Fluxo de Trabalho (Workflow)

Sempre que você baixar um projeto novo do GitHub ou voltar a trabalhar no seu, o padrão de sucesso é:

1.  **Entrar na pasta:** `cd caminho/do/projeto`
2.  **Ativar a bolha:** `source venv/bin/activate`
3.  **Garantir que as peças estão lá:** `pip install -r requirements.txt`
4.  **Dar o play:** `python app.py`

---

## 💡 Dica de Ouro: O Arquivo `.gitignore`
Sempre verifique se a pasta `venv/` está no seu `.gitignore`. Você nunca deve enviar o ambiente virtual para o GitHub, pois ele é específico para o seu sistema operacional. O que se compartilha é o `requirements.txt`.

---
*Guia gerado por Gemini CLI para Renaldo Freire.*
