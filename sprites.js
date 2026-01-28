// — SPRITES —

const colorMap = {
    b: "#000000",
    w: "#ffffff",
    a: "#9fa8da",
    r: "#d32f2f",
    p: "#932121",
    l: "#9ccc65",
    g: "#7cb342",
    m: "#689f38",
    i: "#c26842",
    u: "#965136",
    c: "#b5bdbb",
    n: "#7e8483",
    y: "#dba976",
    t: "#7d422d",
    z: "#ffd5ab"
  };
  
// - Update -
function updateSprites() {
  document.querySelectorAll(".sprite").forEach(canvas => {
    const scale = canvas.dataset.scale ?? 3;
    const frame = frameSprite;
    const newCanvas = createSprite("player", frame, parseInt(scale));
    
    newCanvas.classList.add("sprite");
    newCanvas.dataset.scale = scale; // manter escala

    // substitui o canvas antigo
    canvas.replaceWith(newCanvas);
  });
  
  document.querySelectorAll(".spriteNpc").forEach(canvas => {
    const scale = canvas.dataset.scale ?? 3;
    const frame = frameSprite;
    const newCanvas = createSprite("npc", frame, parseInt(scale));
    
    newCanvas.classList.add("spriteNpc");
    newCanvas.dataset.scale = scale; // manter escala

    // substitui o canvas antigo
    canvas.replaceWith(newCanvas);
  });
    
  document.querySelectorAll(".spriteMago").forEach(canvas => {
    const scale = canvas.dataset.scale ?? 3;
    const frame = frameSprite;
    const newCanvas = createSprite("mago", frame, parseInt(scale));
    
    newCanvas.classList.add("spriteMago");
    newCanvas.dataset.scale = scale; // manter escala

    // substitui o canvas antigo
    canvas.replaceWith(newCanvas);
  });  
}

// - Juntar -
function createSprite(imageF, frame, scale = 3) {
  let bgCanvas = null;
  let fgCanvas = null;
  
  // chão
  if (area==="village" || area==="forest" || area==="world"){
    bgCanvas = createGrass(scale);
  }
  
  else if (area==="wizardHouse" || area==="house"){
    bgCanvas = createWood(scale);
  }
  
  // imagem
  if (imageF==="player"){
    if (player.armorEquipped){
        fgCanvas = createNPC(frame, scale);
    }
      
    else {
        fgCanvas = createPlayer(frame, scale);
    }  
  }
  
  else if (imageF==="npc"){
    fgCanvas = createNPC(frame, scale);
  }
    
  else if (imageF==="mago"){
    fgCanvas = createMago(frame, scale);
  }   
  
  else if (imageF==="tree"){
    fgCanvas = createTree(scale);
  }
    
  else if (imageF==="house"){
    fgCanvas = createHouse(scale);
  }
    
  else if (imageF==="shop"){
    fgCanvas = createShop(scale);
  }  
    
  else if (imageF==="forest"){
    fgCanvas = createForest(scale);
  }    
    
  else if (imageF==="chest"){
    fgCanvas = createChest(scale);
  }   
    
  else if (imageF==="bad"){
    fgCanvas = createBad(scale);
  }
    
  else if (imageF==="wreck"){
    fgCanvas = createWreck(scale);
  }  
    
  else if (imageF==="setaD"){
    fgCanvas = createSeta1(scale);
  }  
    
  else if (imageF==="setaE"){
    fgCanvas = createSeta2(scale);
  }    

  else if (imageF==="setaC"){
    fgCanvas = createSeta3(scale);
  }    
    
  else if (imageF==="setaB"){
    fgCanvas = createSeta4(scale);
  }    
    
  const tileSize = bgCanvas.width; // assume que os 2 têm o mesmo tamanho

  // cria o canvas final
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // desenha o fundo primeiro
  ctx.drawImage(bgCanvas, 0, 0);

  // depois desenha o sprite por cima
  ctx.drawImage(fgCanvas, 0, 0);

  canvas.style.imageRendering = "pixelated";

  return canvas;
}

// - Player -
function createPlayer(frame, scale = 3) {
  const sprite1 = [
  "xxxxbbbbbbbbxxxx",
  "xxxbwwwwwwwabxxx",
  "xxbawwwwwwwwabxx",
  "xxbwwwwwwwwwwbxx",
  "xxbwwwwbwwwbwbxx",
  "xxbwwwwbwwwbwbxx",
  "xxbwwwwbaaabwbxx",
  "xxbawwwwwwwwabxx",
  "xxxbwwwwwwwabxxx",
  "xxxbbawwaabbxxxx",
  "xxxbwwwwwwwbxxxx",
  "xxxbwwwwwwwbxxxx",
  "xxxbwwwwwwwbxxxx",
  "xxxbwwwbwaabxxxx",
  "xxxbwwwbaaabxxxx",
  "xxxbwwbbaabxxxxx"
  ];

  const sprite2 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxbbbbbbbbxxxx",
  "xxxbwwwwwwwabxxx",
  "xxbawwwwwwwwabxx",
  "xxbwwwwwwwwwwbxx",
  "xxbwwwwbwwwbwbxx",
  "xxbwwwwbwwwbwbxx",
  "xxbwwwwbaaabwbxx",
  "xxbawwwwwwwwabxx",
  "xxxbwwwwwwwabxxx",
  "xxxbbawwaabbxxxx",
  "xxxbwwwwwwwbxxxx",
  "xxxbwwwwwwwbxxxx",
  "xxxbwwwbwaabxxxx",
  "xxxbwwwbaaabxxxx",
  "xxxbwwbbaabxxxxx"
  ];

  const spriteData = frame === 0 ? sprite1 : sprite2;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Mago -
function createMago(frame, scale = 3) {
  const sprite1 = [
  "xxxbbbbbbbbxxxxx",
  "xxbuiiiiiiubbxxx",
  "xbuiiiiiiuuuubxx",
  "xbuuyyyyuuuuuubx",
  "xbuybbbbyuuuuubx",
  "xbybabbabyuuubbx",
  "xbybabbabyuttbxx",
  "xbtybbbbyttttbxx",
  "xxbyyyyyttttbxxx",
  "xxxbbaawwabbxxxx",
  "xxxbwwwwwwwbxxxx",
  "xxxbwwwwwwwbxxxx",
  "xxxbwwwwwwwbxxxx",
  "xxxbaawbwwwbxxxx",
  "xxxbaaabwwwbxxxx",
  "xxxxbaabbwwbxxxx"
  ];

  const sprite2 = [
  "xxxxxxxxxxxxxxxx",
  "xxxbbbbbbbbxxxxx",
  "xxbuiiiiiiubbxxx",
  "xbuiiiiiiuuuubxx",
  "xbuuyyyyuuuuuubx",
  "xbuybbbbyuuuuubx",
  "xbybabbabyuuubbx",
  "xbybabbabyuttbxx",
  "xbtybbbbyttttbxx",
  "xxbyyyyyttttbxxx",
  "xxxbbaawwabbxxxx",
  "xxxbwwwwwwwbxxxx",
  "xxxbwwwwwwwbxxxx",
  "xxxbaawbwwwbxxxx",
  "xxxbaaabwwwbxxxx",
  "xxxxbaabbwwbxxxx"
  ];

  const spriteData = frame === 0 ? sprite1 : sprite2;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - NPC -
function createNPC(frame, scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxxxxx",
  "xxxxxxxbbbbbbxxxxxx",
  "xxxxxxbzzzzzzbxxxxx",
  "xxxxxbyyzzzzzzbxxxx",
  "xxxxxbyyyzzzzzbxxxx",
  "xxxbbpppprrrrrrbbxx",
  "xxbyyyyyzzzzzzzzzbx",
  "xxbbbbbbbbbbbbbbbbx",
  "xxxxbaaaabaaababxxx",
  "xxxxbwwwwbwwwbwbxxx",
  "xxxxbwwwwbaaabwbxxx",
  "xxxxbawwwwwwwwabxxx",
  "xxxxxbwwwwwwwabxxxx",
  "xxxxxbbawwaabbxxxxx",
  "xxxxxbwwwwwwwbxxxxx",
  "xxxxxbwwwwwwwbxxxxx",
  "xxxxxbwwwbwaabxxxxx",
  "xxxxxbwwwbaaabxxxxx",
  "xxxxxbwwbbaabxxxxxx"
  ];

  const sprite2 = [
  "xxxxxxxbbbbbbxxxxxx",
  "xxxxxxbzzzzzzbxxxxx",
  "xxxxxbyyzzzzzzbxxxx",
  "xxxxxbyyyzzzzzbxxxx",
  "xxxbbpppprrrrrrbbxx",
  "xxbyyyyyzzzzzzzzzbx",
  "xxbbbbbbbbbbbbbbbbx",
  "xxxxbaaaabaaababxxx",
  "xxxxbwwwwbwwwbwbxxx",
  "xxxxbwwwwbaaabwbxxx",
  "xxxxbawwwwwwwwabxxx",
  "xxxxxbwwwwwwwabxxxx",
  "xxxxxbbawwaabbxxxxx",
  "xxxxxbwwwwwwwbxxxxx",
  "xxxxxbwwwwwwwbxxxxx",
  "xxxxxbwwwwwwwbxxxxx",
  "xxxxxbwwwbwaabxxxxx",
  "xxxxxbwwwbaaabxxxxx",
  "xxxxxbwwbbaabxxxxxx"
  ];

  const spriteData = frame === 0 ? sprite1 : sprite2;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    -2, 0, tileSize + 5, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Grass -
function createGrass(scale = 3) {
  const sprite1 = [
  "mmmmmgmggmmgggmm",
  "mggggggggggggggm",
  "mgglglgggggggggm",
  "mggglggggggggggm",
  "gggggggggggggggg",
  "gggggggggggggggm",
  "mggggggggglglggm",
  "mgggggggggglgggg",
  "gggggggggggggggm",
  "mggggggggggggggm",
  "mggggggggggggggg",
  "ggglglgggggggggg",
  "mggglggggggggggm",
  "mggggggggggggggm",
  "mggggggggggggggm",
  "mmgggmmggmgmmmmm"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Tábua -
function createWood(scale = 3) {
  const sprite1 = [
  "uuiuuuuiuiuuuiiu",
  "uiiiiuiiiiuiiiiu",
  "uiiiiuiiiiuiiiiu",
  "iiiiiuiiiiuiiiiu",
  "uiiiiuiiiiuiiiiu",
  "uiiiiuiiiiuiiiii",
  "uiiiiuiiiiuiiiii",
  "uiiiiuiiiiuiiiii",
  "iiiiiuiiiiuiiiiu",
  "iiiiiuiiiiuiiiiu",
  "iiiiiuiiiiuiiiiu",
  "uiiiiuiiiiuiiiiu",
  "uiiiiuiiiiuiiiii",
  "uiiiiuiiiiuiiiiu",
  "uiiiiuiiiiuiiiiu",
  "uiiuuuiuiuuuuiuu"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Árvore -
function createTree(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxbbbbxxxxxx",
  "xxxxxbllllbxxxxx",
  "xxxxbllllllbxxxx",
  "xxxbllllllllbxxx",
  "xxbgllllllllgbxx",
  "xbggllllllllggbx",
  "xbgggllllllgggbx",
  "xbmgggllllgggmbx",
  "xbmggggggggggmbx",
  "xxbmggggggggmbxx",
  "xxxbmmmmmmmmbxxx",
  "xxxxbbuuuubbxxxx",
  "xxxxxbiiuubxxxxx",
  "xxxxbiiiiuubxxxx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Casa -
function createHouse(scale = 3) {
  const sprite1 = [
  "xxxxxxbbbbbbbxxx",
  "xxxxxxblglglbbxx",
  "xxxxxxblglglgbbx",
  "xxxxxbblglglglbb",
  "xxxxbbllglglglgb",
  "xxbbbglmmmglglgb",
  "xbbglglnnnmmglgb",
  "bblglglcccnnmlgb",
  "bglglglcbbccnmmb",
  "bglglgmcbbcccnbb",
  "bglglmucccccccub",
  "bglmmniuuuuuuuib",
  "bmmnncnnnnnnnnbb",
  "bbncccbbccbbccbx",
  "xbccccbbccbbccbx",
  "xbccccccccbbccbx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Loja -
function createShop(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxbbbbxxxxxx",
  "xxxxxbbggbbxxxxx",
  "xxxxbblgglbbbxxx",
  "xxbbbglgglglbbxx",
  "xbbglglgglglgbbb",
  "bblglglmmlglglgb",
  "bglglgmnnmglglgb",
  "bglglmnccnmmglgb",
  "bglmmnccccnnmlgb",
  "bmmnncccccccnmmb",
  "bbnccccccccccnbb",
  "xbcccccbbciiucbx",
  "xbcccccbbciuucbx",
  "xbcccccbbcccccbx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Floresta -
function createForest(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxxxxbbxxxxx",
  "xxxxxbbxxxxbbxxxxbllbxxxx",
  "xxxxbllbxxbllbxxbllllbxxx",
  "xxxbllllbbllllbbllllllbxx",
  "xxbllllllbllllbgllllllgbx",
  "xbgllllllgbllbggllllllggb",
  "bggllllllggbbbgggllllgggb",
  "bgggllllgggbgbmgggllgggmb",
  "bmgggllggbbbgbmggggggggmb",
  "bmggggggbllbmgbmggggggmbx",
  "xbmggbbbllllbggbmmbbmmbxx",
  "xxbmbllblllllbggbbllbbxxx",
  "xxxbllllbllllgbmbllllbxxx",
  "xxbllllllblllggbllllllbxx",
  "xbgllllllgblggbgllllllgbx",
  "bggllllllggbgbggllllllggb",
  "bgggllllgggbgbgggllllgggb",
  "bmgggllgggmbgbmgggllgggmb",
  "bmggggggggmbmbmggggggggmb",
  "xbmggggggmbbbxbmggggggmbx",
  "xxbmmmmmmbubxxxbmmmmmmbxx",
  "xxxbbuubbiiubxxxbbuubbxxx",
  "xxxxbiubxxxxxxxxxbiubxxxx",
  "xxxbiiiubxxxxxxxbiiiubxxx",
  "xxxxxxxxxxxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Baú -
function createChest(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxbbbbbbbbbbbbxx",
  "xxbuuyyyyyyyybxx",
  "xxbuuyyyuuyyybxx",
  "xxxbttttuuttbxxx",
  "xxbuuuutuutuubxx",
  "xxbuuyyuttuyybxx",
  "xxbuuyyuyyuyybxx",
  "xxbuuyyuyyuyybxx",
  "xxbuuyyuyyuyybxx",
  "xxbuuyyuyyuyybxx",
  "xxbbbbbbbbbbbbxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Cama -
function createBad(scale = 3) {
  const sprite1 = [
  "xxxxxbbbbbbxxxxx",
  "xxxxbiiuuiibxxxx",
  "xxxbiubbbbuibxxx",
  "xxxbubwwwwbubxxx",
  "xxxbbawwwwabbxxx",
  "xxxbprrrrrrpbxxx",
  "xxxbprrrrrrpbxxx",
  "xxxbprrrrrrpbxxx",
  "xxxbprrrrrrpbxxx",
  "xxxbprrrrrrpbxxx",
  "xxxbprrrrrrpbxxx",
  "xxxbppppppppbxxx",
  "xxxbpbbbbbbpbxxx",
  "xxxbbuiiiiubbxxx",
  "xxxbubbbbbbubxxx",
  "xxxbbxxxxxxbbxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Destroços -
function createWreck(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxbbbbxxxxxxxx",
  "xxxxbyybxxxxxxxx",
  "xxxxbyybbbbbbbbx",
  "xxxxbyyyyyyyyybx",
  "xbbbbyyyyyyyyybx",
  "xbiytytytytytybx",
  "xbiytitititttybx",
  "xbiytiiiiiiiyybx",
  "xbiytititttyyubx",
  "xbiytitittyyutbx",
  "xbiybututyyuttbx",
  "xbuubututyutttbx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Seta Direita -
function createSeta1(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxbbbxxxxx",
  "xxxxxxxxbwbbxxxx",
  "xxxbbbbbbwwbbxxx",
  "xxxbawwwwwwabxxx",
  "xxxbaawwwwwabxxx",
  "xxxbbbbbbwabbxxx",
  "xxxxxxxxbabbxxxx",
  "xxxxxxxxbbbxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Seta Esquerda -
function createSeta2(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxbbbxxxxxxxx",
  "xxxxbbwbxxxxxxxx",
  "xxxbbwwbbbbbbxxx",
  "xxxbawwwwwwabxxx",
  "xxxbawwwwwaabxxx",
  "xxxbbawbbbbbbxxx",
  "xxxxbbabxxxxxxxx",
  "xxxxxbbbxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Seta Cima -
function createSeta3(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxbbbbxxxxxx",
  "xxxxxbbaabbxxxxx",
  "xxxxbbwwwabbxxxx",
  "xxxxbwwwwwabxxxx",
  "xxxxbbbwwbbbxxxx",
  "xxxxxxbwwbxxxxxx",
  "xxxxxxbwwbxxxxxx",
  "xxxxxxbwabxxxxxx",
  "xxxxxxbaabxxxxxx",
  "xxxxxxbbbbxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Seta Baixo -
function createSeta4(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxbbbbxxxxxx",
  "xxxxxxbaabxxxxxx",
  "xxxxxxbawbxxxxxx",
  "xxxxxxbwwbxxxxxx",
  "xxxxxxbwwbxxxxxx",
  "xxxxbbbwwbbbxxxx",
  "xxxxbawwwwwbxxxx",
  "xxxxbbawwwbbxxxx",
  "xxxxxbbaabbxxxxx",
  "xxxxxxbbbbxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Anel -
function createRing1(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxbbbbxxxxxx",
  "xxxxxbuiiibxxxxx",
  "xxxxbuubbiibxxxx",
  "xxxxbubxxbibxxxx",
  "xxxxbtbxxbibxxxx",
  "xxxxbttbbuubxxxx",
  "xxxxxbttuubxxxxx",
  "xxxxxxbbbbxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Espada De Madeira -
function createSword1(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxbbbxxxxxxx",
  "xxxxxbbibbxxxxxx",
  "xxxxxbiuubxxxxxx",
  "xxxxxbiuubxxxxxx",
  "xxxxxbiuubxxxxxx",
  "xxxxxbitubxxxxxx",
  "xxxxbbtttbbxxxxx",
  "xxxxbuuuuubxxxxx",
  "xxxxbbbtbbbxxxxx",
  "xxxxxxbubxxxxxxx",
  "xxxxxxbbbxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Poção de cura -
function createPc1(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxbbbbbbbbxxxx",
  "xxxxbwzzzzwbxxxx",
  "xxxxxbwyywbxxxxx",
  "xxxxxbwrrwbxxxxx",
  "xxxxxbwrrwbxxxxx",
  "xxxxxbwrrwbxxxxx",
  "xxxxxbwrrwbxxxxx",
  "xxxxxbwprwbxxxxx",
  "xxxxxbwppwbxxxxx",
  "xxxxxbwppwbxxxxx",
  "xxxxxbwppwbxxxxx",
  "xxxxxbwppwbxxxxx",
  "xxxxxxbwwbxxxxxx",
  "xxxxxxxbbxxxxxxx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Antídoto -
function createPc2(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxbbbbbbbbxxxx",
  "xxxxbwzzzzwbxxxx",
  "xxxxxbwyywbxxxxx",
  "xxxxxbwggwbxxxxx",
  "xxxxxbwggwbxxxxx",
  "xxxxxbwggwbxxxxx",
  "xxxxxbwggwbxxxxx",
  "xxxxxbwmgwbxxxxx",
  "xxxxxbwmmwbxxxxx",
  "xxxxxbwmmwbxxxxx",
  "xxxxxbwmmwbxxxxx",
  "xxxxxbwmmwbxxxxx",
  "xxxxxxbwwbxxxxxx",
  "xxxxxxxbbxxxxxxx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

// - Chapéu De Palha -
function createHat1(scale = 3) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxbbbbbbxxxxx",
  "xxxxbzzzzzzbxxxx",
  "xxxbbzzzzzzbbxxx",
  "xxbyyyyyyyyyybxx",
  "xxbbbbbbbbbbbbxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx"
  ];

  const spriteData = sprite1;

  const width = spriteData[0].length;
  const height = spriteData.length;

  // Tamanho final do título
  const tileSize = 48;

  // escala proporcional pra caber no título
  const finalScale = Math.min(tileSize / width, tileSize / height);

  // Define canvas destino
  const canvas = document.createElement("canvas");
  canvas.width = tileSize;
  canvas.height = tileSize;
  const ctx = canvas.getContext("2d");
  
  // desabilita suavização no contexto
  ctx.imageSmoothingEnabled = false;
  
  // cria um canvas temporário para o sprite original
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = width;
  temp.height = height;
  
  // desenha sprite original em escala 1:1 no temp
  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== "x") {
        tctx.fillStyle = colorMap[cell] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });
  
  // agora desenha no canvas destino usando drawImage
  ctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );
  
  canvas.style.imageRendering = "pixelated";
  
  return canvas;
}

