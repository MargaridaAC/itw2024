# Como Correr o Projeto

Este projeto é desenvolvido com base em tecnologias web frontend padrão (HTML, CSS e JavaScript). Sendo assim, não requer instalação de dependências complexas (como npm/node_modules) nem compilação.

Abaixo encontram-se as principais formas de correr o projeto localmente no teu computador. O ponto de entrada principal do projeto é o ficheiro localizado em: `magui/homepage/index.html`.

---

## 1. Método Recomendado: Extensão "Live Server" no Visual Studio Code
A melhor forma de correr este tipo de projeto é utilizando um servidor HTTP local. Isto evita problemas de CORS (Cross-Origin Resource Sharing) caso o projeto faça pedidos a APIs externas ou carregue ficheiros locais usando a API `fetch`.

**Passos:**
1. Abre a pasta raiz do projeto (`itw2024`) no **Visual Studio Code**.
2. Na aba de Extensões (lado esquerdo), pesquisa por **"Live Server"** (do autor Ritwick Dey) e instala-a.
3. No explorador de ficheiros do VS Code, navega até `magui/homepage/index.html`.
4. Clica com o botão direito do rato no ficheiro `index.html` e seleciona **"Open with Live Server"**.
5. O teu navegador padrão irá abrir automaticamente com a página inicial do projeto a correr num endereço local (geralmente `http://127.0.0.1:5500`).

---

## 2. Método Alternativo: Servidor Python (Linha de Comandos)
Se tiveres o Python instalado no teu computador, podes iniciar rapidamente um servidor HTTP a partir da linha de comandos (Terminal, Command Prompt ou PowerShell).

**Passos:**
1. Abre um terminal.
2. Navega até à pasta principal do projeto.
3. Executa o seguinte comando:
   ```bash
   python -m http.server
   ```
   *(Ou `python3 -m http.server` dependendo da tua instalação)*
4. Abre o teu navegador e acede ao endereço: [http://localhost:8000/magui/homepage/index.html](http://localhost:8000/magui/homepage/index.html).

---

## 3. Método Mais Simples: Abrir Diretamente no Navegador
Se o projeto não utilizar funcionalidades que obriguem à utilização de um servidor local (como módulos ES6 ou pedidos de `fetch` a ficheiros locais), podes simplesmente abrir o ficheiro no navegador.

**Passos:**
1. Abre o Explorador de Ficheiros do Windows (ou Finder no Mac).
2. Navega até à pasta do projeto e entra na pasta `magui` -> `homepage`.
3. Faz um duplo clique no ficheiro `index.html` ou arrasta-o diretamente para dentro do teu navegador web (Chrome, Firefox, Edge, etc.).

> **Nota:** Se notares que as imagens não carregam ou se vires erros na consola (F12) relativos a políticas de CORS, deverás utilizar o **Método 1** ou o **Método 2**.
