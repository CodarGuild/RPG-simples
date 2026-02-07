// — MENU INICIAL —
let musicaAtiva = false;

function renderMenu() {
  // Limpa a tela
  const app = document.getElementById("app");
  col.innerHTML = "";

  // Título
  const titulo = document.createElement("h1");
  titulo.classList.add("menu-title");

  const texto = "RPG Simples";
  for (let i = 0; i < texto.length; i++) {
    const span = document.createElement("span");
    span.textContent = texto[i];
    span.classList.add("letra");
    span.style.animationDelay = `${i * 0.08}s`;
    titulo.appendChild(span);
  }

  // Botões
  const iniciarBtn = document.createElement("button");
  iniciarBtn.textContent = "▶️ Iniciar Jogo";
  iniciarBtn.className = "btn btn-primary m-2";

  const configBtn = document.createElement("button");
  configBtn.textContent = "⚙️ Configurações";
  configBtn.className = "btn btn-secondary m-2";

  // Funções
  iniciarBtn.onclick = () => {
    area = "village";
    if (musicaAtiva) tocarSom();
    render();
  };
  configBtn.onclick = () => renderConfig();

  // Montando tudo
  col.appendChild(titulo);
  col.appendChild(iniciarBtn);
  col.appendChild(configBtn);

  row.appendChild(col);         
  container.appendChild(row);    
  app.appendChild(container);   
}


// — Configurações —
function renderConfig() {
  const app = document.getElementById("app");
  col.innerHTML = "";
  
  // Título
  const titulo = document.createElement("h2");
  titulo.classList.add("menu-title");

  const texto = "Configurações";
  for (let i = 0; i < texto.length; i++) {
    const span = document.createElement("span");
    span.textContent = texto[i];
    span.classList.add("letra");
    span.style.animationDelay = `${i * 0.08}s`;
    titulo.appendChild(span);
  }

  // Botões
  const somBtn = document.createElement("button");
  somBtn.textContent = musicaAtiva ? "🔊 Som: ON" : "🔇 Som: OFF";
  somBtn.className = "btn btn-primary";

  const voltarBtn = document.createElement("button");
  voltarBtn.textContent = "⬅️ Voltar";
  voltarBtn.className = "btn btn-secondary";

  // Funções
  somBtn.onclick = () => {
    musicaAtiva = !musicaAtiva;
    somBtn.textContent = musicaAtiva ? "🔊 Som: ON" : "🔇 Som: OFF";
  };
  
  voltarBtn.onclick = () => renderMenu();
  
  // Montando tudo
  col.appendChild(titulo);
  col.appendChild(somBtn);
  col.appendChild(voltarBtn);

  row.appendChild(col);         
  container.appendChild(row);    
  app.appendChild(container);
}

