// — MENU INICIAL —
let musicaAtiva = false;

function renderMenu() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const menu = document.createElement("div");
  menu.style.textAlign = "center";
  menu.style.padding = "30px";

  const titulo = document.createElement("h1");
  titulo.classList.add("titulo");
  titulo.textContent = "RPG RETRO";
  titulo.style.fontSize = "3rem";
  menu.appendChild(titulo);

  // Iniciar Jogo
  const iniciarBtn = document.createElement("button");
  iniciarBtn.classList.add("button-menu");
  iniciarBtn.textContent = "▶️ Iniciar Jogo";
  iniciarBtn.style.margin = "10px";
  iniciarBtn.style.fontSize = "18px";
  iniciarBtn.onclick = () => {
    app.innerHTML = "";
    area = "village";
    if (musicaAtiva) tocarSom();
    render();
  };

  // Configurações
  const configBtn = document.createElement("button");
  configBtn.classList.add("button-menu");
  configBtn.textContent = "⚙️ Configurações";
  configBtn.style.margin = "10px";
  configBtn.style.fontSize = "18px";
  configBtn.onclick = () => renderConfig();

  menu.appendChild(iniciarBtn);
  menu.appendChild(document.createElement("br"));
  menu.appendChild(configBtn);

  app.appendChild(menu);
}


// — Configurações —
function renderConfig() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const configDiv = document.createElement("div");
  configDiv.style.textAlign = "center";
  configDiv.style.padding = "30px";

  const titulo = document.createElement("h2");
  titulo.classList.add("titulo");
  titulo.textContent = "Configurações";
  titulo.style.fontSize = "2rem";
  configDiv.appendChild(titulo);

  const somBtn = document.createElement("button");
  somBtn.classList.add("button-menu");
  somBtn.style.margin = "10px";
  somBtn.style.fontSize = "18px";
  somBtn.textContent = musicaAtiva ? "🔊 Som: ON" : "🔇 Som: OFF";

  somBtn.onclick = () => {
    musicaAtiva = !musicaAtiva;
    somBtn.textContent = musicaAtiva ? "🔊 Som: ON" : "🔇 Som: OFF";
  };

  const voltarBtn = document.createElement("button");
  voltarBtn.classList.add("button-menu");
  voltarBtn.textContent = "⬅️ Voltar";
  voltarBtn.style.margin = "10px";
  voltarBtn.style.fontSize = "18px";

  voltarBtn.onclick = () => renderMenu();

  configDiv.appendChild(somBtn);
  configDiv.appendChild(document.createElement("br"));
  configDiv.appendChild(voltarBtn);

  app.appendChild(configDiv);
}

