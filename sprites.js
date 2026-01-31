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

// - Resumo -
function buildSpriteFromData(spriteData, tileSize = 48) {
  const width = spriteData[0].length;
  const height = spriteData.length;

  const temp = document.createElement("canvas");
  temp.width = width;
  temp.height = height;
  const tctx = temp.getContext("2d");
  tctx.imageSmoothingEnabled = false;

  spriteData.forEach((row, y) => {
    for (let x = 0; x < width; x++) {
      const colorKey = row[x];
      if (colorKey !== "x") {
        tctx.fillStyle = colorMap[colorKey] || "#000000";
        tctx.fillRect(x, y, 1, 1);
      }
    }
  });

  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = tileSize;
  finalCanvas.height = tileSize;
  const fctx = finalCanvas.getContext("2d");

  fctx.imageSmoothingEnabled = false;
  fctx.drawImage(
    temp,
    0, 0, width, height,
    0, 0, tileSize, tileSize
  );

  finalCanvas.style.imageRendering = "pixelated";
  return finalCanvas;
}
  
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
    fgCanvas = createPlayer(frame, scale);
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
function createPlayer(frame, scale = 3, size = 48) {
  let sprite1 = null;
  let sprite2 = null; 
    
  if (player.armorEquipped){
      sprite2 = [
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
    
      sprite1 = [
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
    }
    
  else {
      sprite1 = [      
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
    
      sprite2 = [
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
    }

  const spriteData = frame === 0 ? sprite1 : sprite2; 

  return buildSpriteFromData(spriteData, size);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
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

  return buildSpriteFromData(spriteData, 48);
}

// - Slime -
function createSlime(scale = 3, size = 48) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",  
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxbbbbbbbxxxx",
  "xxxxbgllllllbxxx",
  "xxxbgggllllllbxx",
  "xxbggggbllbgggbx",
  "xxbggmmbmmbmggbx",
  "xxbgmmmbmmbmmgbx",
  "xxbmmmmmmmmmmgbx",
  "xxbmmmmmmmmmmgbx",
  "xxxbgggmmmmmgbxx",
  "xxxxbbbbbbbbbxxx"
  ];

  const spriteData = sprite1;

  return buildSpriteFromData(spriteData, size);
}

// - Lobo -
function createWolf(scale = 3, size = 48) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxxxxx",  
  "xxxxxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxxxxx",
  "xxxxxxxxxxbbxxxbbxx",
  "xxxxxxxxxbwbxxbwbxx",
  "xxxxxxxxbwrbxbwrbxx",
  "xxxbbxxxbwrbbbwrbxx",
  "xxbwbxxxbwwwwwwwbxx",
  "xxbwbxxxbwbbwwbbbxx",
  "xxxbwbbbwwwwwwwwwbx",
  "xxxbwwwwwwwwwwwwwbx",
  "xxxxbwwwwwwwwbbbbxx",
  "xxxxbwwwwwwwwwbxxxx",
  "xxxxbwwbbbwwbwbxxxx",
  "xxxxbwbbabwbbwbxxxx",
  "xxxxbbxbbbbxbbxxxxx"
  ];

  const spriteData = sprite1;

  return buildSpriteFromData(spriteData, size);
}

// - Cogumelo -
function createCogumelo(scale = 3, size = 48) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxbbbbbbbbxxxx",
  "xxxbyzzzzrrrbxxx",
  "xxbprrzzrrrzzbxx",
  "xbyyprrrrrrzzzbx",
  "xbyyyrrrzzrrzzbx",
  "byyyyrrrzzrrrrrb",
  "byypprrrrrrrrrrb",
  "bppppprrbbbbbbzb",
  "bbpppbbbwwwbwbzb",
  "xbbbbwwbwwwbwbbx",
  "xxbwwwwbaaabwbxx",
  "xxbawwwwwwwwabxx",
  "xxbbawwwwwwabbxx",
  "xxxbbaaaaabbbxxx"
  ];

  const spriteData = sprite1;

  return buildSpriteFromData(spriteData, size);
}

// - Urso -
function createBear(scale = 3, size = 48) {
  const sprite1 = [
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxbbbbbxxxxxx",
  "xxxbbiiiiibbxxxx",
  "xxbiitttttiibxxx",
  "xbitttttttttibbx",
  "xbuttiiittiutiub",
  "buttitttittttttb",
  "buttutttutttrtrb",
  "btttutttuttttuub",
  "btttttttttttubbb",
  "btttttttttbttuub",
  "bttbtttttbbbbbbx",
  "bttbbtttbxbbttbx",
  "bttbxbttbxxbbtbx",
  "xbtubxbtubxxbttb"
  ];

  const spriteData = sprite1;

  return buildSpriteFromData(spriteData, size);
}

