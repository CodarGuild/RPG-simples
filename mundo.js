let dialogActive = false; 
  
let frameSprite = 0;
    
// — ESTADO DO JOGO —  
let area="village";  
    
let prevArea = null;  
    
// — Itens —  
const ringItem = {  
  type: "💍",  
  hpBonus: 10,      
  dmgBonus: 5
};  
    
const swordItem = {  
  type: "🗡️",  
  hpBonus: 0,      
  dmgBonus: 5  
};  
    
const poutionItem = {  
  type: "🧪",  
  bonus: 25,       
};  
    
const poutionItem1 = {  
  type: "💉",  
  bonus: false,       
};  
  
const armorItem = {  
  type: "🪖",  
  hpBonus: 10,      
  dmgBonus: 0  
};  
    
// — Player —  
const player={  
  x:3,y:0,  
  hp:50,maxHp:50, 
  dmg:5,
  inventory:[],   
  gold:0,  
  level:1,
  xp:0,
  metaDeXp:50,
  poisonTurns: 0,
  poisonDamage: 5,
  swordEquipped:false,  
  ringEquipped:false,  
  armorEquipped:false  
};  
    
// — Mapas —  
const houseVilaPos={x:0,y:2};  
let housePlayer={x:1,y:2};

const houseMap=[
  ["Baú","Cama","Wood"],  
  ["Wood","Wood","Wood"],  
  ["Wood","SaídaB","Wood"]
];
  
const villageGrid=[  
  ["NPC","Grama","Grama","SaídaD"],  
  ["Grama","Grama","Grama","Loja"],  
  ["Casa","Grama","Grama","Grama"],  
  ["Grama","Grama","Grama","NPC"]  
];  
const worldGrid=[  
  ["Floresta","Grama","Grama","Árvore","Grama"],  
  ["Grama","Grama","Grama","Grama","Grama"],  
  ["SaídaE","Grama","Casa","Grama","Grama"],  
  ["Grama","Grama","Grama","Árvore","Grama"],  
  ["Grama","Árvore","Grama","Grama","Destroço"]  
];  
    
const forestGrid = [  
  ["Árvore","Árvore","Árvore","Árvore","Árvore"],  
  ["Árvore","Grama","Grama","Grama","Árvore"],  
  ["Árvore","Grama","Árvore","Grama","Árvore"],  
  ["Árvore","Grama","Árvore","Baú","Árvore"],  
  ["Árvore","SaídaB","Árvore","Árvore","Árvore"]   
];  
  
const wizardHouseGrid = [  
  ["Wood","Wood","Wood"],  
  ["SaídaE","Wood","Mago"],  
  ["Wood","Wood","Wood"]
];  
  
// — INIMIGOS —  
const enemies=[  
  {name:"Slime",hp:15,maxHp:15,dmg:5,goldDrop:10,xp:10,canPoison:false},  
  {name:"Lobo",hp:20,maxHp:20,dmg:7,goldDrop:15,xp:15,canPoison:false},  
  {name:"Cogumelo",hp:45,maxHp:40,dmg:7,goldDrop:20,xp:30,canPoison:true},  
  {name:"Urso",hp:55,maxHp:55,dmg:12,goldDrop:25,xp:35,canPoison:false}  
];  
let currentEnemy=null,enemyPos={x:0,y:0};  
  
// — DIÁLOGO —  
const dialogBox=document.getElementById("dialog-box");  
const dialogText=document.getElementById("dialog-text");  
const dialogOK=document.getElementById("dialog-ok");  

function showDialog(msg,callback){  
  dialogActive = true;  
  dialogText.textContent=msg;  
  dialogBox.style.display="block";  
  dialogOK.onclick=()=>{  
    dialogBox.style.display="none";  
    dialogActive = false;  
    if(callback) callback();  
  };  
}  
  
// — LOJA —  
const shopModal=document.getElementById("shop-modal");  
const goldCount=document.getElementById("gold-count");  
const shopMsg=document.getElementById("shop-msg");  

function openShop(){ goldCount.textContent=`🪙 Ouro: ${player.gold}`; shopMsg.textContent=""; shopModal.style.display="block"; }  
function closeShop(){ shopModal.style.display="none"; }  
function buyPotion(){  
  if(player.gold>=10){ player.gold-=10; player.inventory.push({id: "poção 01", type: poutionItem.type}); goldCount.textContent=`🪙 Ouro: ${player.gold}`; shopMsg.textContent="Poção comprada!"; }  
  else shopMsg.textContent="Ouro insuficiente!";  
}  
function buyPotion1(){  
  if(player.gold>=15){ player.gold-=15; player.inventory.push({id: "poção 02", type: poutionItem1.type}); goldCount.textContent=`🪙 Ouro: ${player.gold}`; shopMsg.textContent="Antídoto comprada!"; }  
  else shopMsg.textContent="Ouro insuficiente!";  
}  
function buySword(){  
  if(player.gold>=30){ player.gold-=30; player.inventory.push({id: "espada 01", type: swordItem.type}); goldCount.textContent=`🪙 Ouro: ${player.gold}`; shopMsg.textContent="Espada comprada!"; }  
  else shopMsg.textContent="Ouro insuficiente!";  
}  
function buyArmor(){  
  if(player.gold>=50){ player.gold-=50; player.inventory.push({id: "armadura 01", type: armorItem.type}); goldCount.textContent=`🪙 Ouro: ${player.gold}`; shopMsg.textContent="Armadura comprada!"; }  
  else shopMsg.textContent="Ouro insuficiente!";  
}  
  
// — INVENTÁRIO —  
const inventoryModal=document.getElementById("inventory-modal");  
const invGrid=document.getElementById("inventory-grid");  
const invStats=document.getElementById("inv-stats");
document.getElementById("close-inv").onclick=()=> inventoryModal.style.display="none";  
  
function openInventory(){  
  invGrid.innerHTML="";  
  invStats.textContent=`❤️ HP: ${player.hp}/${player.maxHp}   ⚔️ AD: ${player.dmg}   🪙 Ouro: ${player.gold}`;  
  
  player.inventory.forEach((item,i)=>{  
    const slot=document.createElement("div");  
    slot.classList.add("inventory-slot");  
    slot.textContent=item.type;  
    if(item.id==="espada 01" && player.swordEquipped) slot.classList.add("equipped");  
    if(item.id==="anel 01" && player.ringEquipped) slot.classList.add("equipped");  
    if(item.id==="armadura 01" && player.armorEquipped) slot.classList.add("equipped");  
      
    let pressTimer;  
  
    // quando começa a pressionar  
    slot.addEventListener("mousedown", () => {  
      pressTimer = setTimeout(() => {  
        // DELETAR item após segurar 800ms  
        player.inventory.splice(i, 1);  
        openInventory();  
      }, 800); // duração do “segurar”  
    });  
    
    slot.addEventListener("touchstart", () => {  
      pressTimer = setTimeout(() => {  
        player.inventory.splice(i, 1);  
        openInventory();  
      }, 800);  
    });  
    
    // quando solta antes do tempo  
    slot.addEventListener("mouseup", () => clearTimeout(pressTimer));  
    slot.addEventListener("mouseleave", () => clearTimeout(pressTimer));  
    slot.addEventListener("touchend", () => clearTimeout(pressTimer));  
    slot.addEventListener("touchcancel", () => clearTimeout(pressTimer));  
  
    slot.onclick=()=>{  
      if(item.id==="poção 01"){  
        player.hp=Math.min(player.maxHp,player.hp + poutionItem.bonus);  
        player.inventory.splice(i,1);  
        openInventory();  
      }  
      
      else if(item.id==="poção 02"){  
        player.poisoned=poutionItem1.bonus;  
        player.inventory.splice(i,1);  
        openInventory();  
      }  
        
      else if(item.id==="espada 01"){  
        player.swordEquipped=!player.swordEquipped;  
        if (player.swordEquipped) {  
          player.dmg+=swordItem.dmgBonus;    
        }  
          
        else {  
          player.dmg-=swordItem.dmgBonus;   
        }  
        openInventory();  
      }  
        
      else if(item.id==="anel 01"){  
        player.ringEquipped=!player.ringEquipped;  
        if (player.ringEquipped) {  
          player.maxHp+=ringItem.hpBonus;  
            
          player.dmg+=ringItem.dmgBonus;  
        }  
          
        else {  
          player.maxHp-=ringItem.hpBonus;  
            
          player.dmg-=ringItem.dmgBonus;  
        }  
        openInventory();  
      }  
        
      else if(item.id==="armadura 01"){  
        player.armorEquipped=!player.armorEquipped;  
        if (player.armorEquipped) {  
          player.maxHp+=armorItem.hpBonus;   
        }  
          
        else {  
          player.maxHp-=armorItem.hpBonus;    
        }  
        openInventory();  
      }  
    };  
  
    invGrid.appendChild(slot);  
  });  
  
  inventoryModal.style.display="block";  
}  
  
// — MOVIMENTO ADJACENTE —  
function isAdjacent(x,y,obj){  
  return Math.abs(obj.x-x)<=1 && Math.abs(obj.y-y)<=1 && !(obj.x===x && obj.y===y);  
}  
  
// — RENDER —  
function render(){  
  document.getElementById("app").innerHTML="";  
  shopModal.style.display="none";  
  inventoryModal.style.display="none";  
  dialogBox.style.display="none";  
  if(area==="village") renderVillage();  
  if(area==="world") renderWorld();  
  if(area==="battle") renderBattle();  
  if(area==="house") renderHouse();  
  if(area==="forest") renderForest(); 
  if(area==="wizardHouse") renderWizardHouse();
}

// — RENDER TITLE —
const tileRenderers = {
  "Grama": () => createGrass(3),
  "Wood": () => createWood(3),
  "Cama": () => createSprite("bad", 3),
  "Loja": () => createSprite("shop", 3),
  "Baú": () => createSprite("chest", 3),
  "Casa": () => createSprite("house", 3),
  "Árvore": () => createSprite("tree", 3),
  "SaídaD": () => createSprite("setaD", 3),
  "SaídaE": () => createSprite("setaE", 3),
  "SaídaC": () => createSprite("setaC", 3),
  "SaídaB": () => createSprite("setaB", 3),
  "Destroço": () => createSprite("wreck", 3),
  "Floresta": () => createSprite("forest", 3),
  "NPC": () => {
    const el = createSprite("npc", frameSprite, 3);
    el.classList.add("spriteNpc");
    return el;
  },
  "Mago": () => {
    const el = createSprite("mago", frameSprite, 3);
    el.classList.add("spriteMago");
    return el;
  },
};

function renderTile(cell, x, y) {
  const tileContainer = document.createElement("div");
  tileContainer.classList.add("tile");

  // tenta rendarizar a cena
  const renderer = tileRenderers[cell];
  if (renderer) {
    const spriteEl = renderer();
    tileContainer.appendChild(spriteEl);
  }

  return tileContainer;
}
  
// — CASA DO MAGO —  
function renderWizardHouse(){  
  const cont=document.createElement("div"); cont.innerHTML="<h3>🏚️ Destroços</h3>";  
  const map=document.createElement("div"); map.classList.add("map","Wizard-House-map");  
  
  wizardHouseGrid.forEach((row,y)=>{  
    row.forEach((cell,x)=>{  
      const t = renderTile(cell, x, y);
      
      if(player.x===x && player.y===y){
        t.innerHTML = "";
        const sprite = createSprite("player", frameSprite, 3);
        sprite.classList.add("sprite");
        sprite.dataset.scale = 3;
        t.appendChild(sprite);
      };
      
      t.onclick=()=>{  
        if(!isAdjacent(x,y,player)) return; 
        
        player.x=x; 
        player.y=y;  

        if(cell==="Mago"){  
          const rnd = Math.random();  
          let textoNPC;  
          
          if (true) {  
            textoNPC = "Jubiscreu: Olá, viajante! Se me der um 'Cristal de Mana', eu darei um efeito aleatório para sua arma!";  
          } 
            
          else {  
            textoNPC = "Jubiscreu:";  
          }  
          
          render();   
          showDialog(textoNPC, ()=>render());  
        }  
        else if(cell==="SaídaE"){ player.x=4; player.y=4; area="world"; render(); }  
        else render();  
      };  
  
      map.appendChild(t);  
    });  
  });  
  
  cont.appendChild(map); document.getElementById("app").appendChild(cont);  
}

// — FLORESTA —  
function renderForest(){  
  checkLevelUp();
  const cont=document.createElement("div"); cont.innerHTML="<h3>🌲 Floresta</h3>";  
  const map=document.createElement("div"); map.classList.add("map","forest-map");  
  
  forestGrid.forEach((row,y)=>{  
    row.forEach((cell,x)=>{  
      const t = renderTile(cell, x, y);
      
      if(player.x===x && player.y===y){
        t.innerHTML = "";
        const sprite = createSprite("player", frameSprite, 3);
        sprite.classList.add("sprite");
        sprite.dataset.scale = 3;
        t.appendChild(sprite);
      };
  
      t.onclick=()=>{  
        if(!isAdjacent(x,y,player)) return;  
        
        player.x=x; 
        player.y=y;  
        
        if(cell==="Árvore"){  
          forestPlayer.x = x;  
          forestPlayer.y = y;  
          render();  
        }  
        else if(cell==="Baú"){   
          render();   
          player.inventory.push({id: "anel 01", type: ringItem.type});  
          forestGrid[3][3] = "Grama";  
          showDialog("Você achou um anel!",()=>render());   
          return;  
        }  
        else if(cell==="SaídaB"){ player.x=0; player.y=0; area="world"; render(); }  
          
        else render();  
          
        if (tryRandomEncounter()) {  
          return;  
        }  
      };  
  
      map.appendChild(t);  
    });  
  });  
  
  cont.appendChild(map);   
  document.getElementById("app").appendChild(cont);  
}  
  
// — VILA —  
function renderVillage(){
  const cont=document.createElement("div"); cont.innerHTML="<h3>🏡 Vila</h3>";
  const map=document.createElement("div"); map.classList.add("map","village-map");
  
  villageGrid.forEach((row,y)=>{
    row.forEach((cell,x)=>{
      const t = renderTile(cell, x, y);
      
      if(player.x===x && player.y===y){
        t.innerHTML = "";
        const sprite = createSprite("player", frameSprite, 3);
        sprite.classList.add("sprite");
        sprite.dataset.scale = 3;
        t.appendChild(sprite);
      };
      
      // interagir
      t.onclick=()=>{    
        if(!isAdjacent(x,y,player)) return;   
            
        player.x=x;   
        player.y=y;    
      
        if(cell==="NPC"){    
          const rnd = Math.random();    
          let textoNPC;    
              
          if (rnd < 0.5) {    
            textoNPC = "Morador: Olá, como vai?";    
          } else {    
            textoNPC = "Morador: Cuidado nas estradas… ouvi rumores de monstros.";    
          }    
              
          render();     
          showDialog(textoNPC, ()=>render());    
        }    
        else if(cell==="Loja"){ render(); openShop(); }    
        else if(cell==="SaídaD"){ player.x=2; player.y=2; area="world"; render(); }    
        else if(cell==="Casa"){ area="house"; housePlayer.x=1; housePlayer.y=2; render(); }    
        else render();    
      };    
      
      map.appendChild(t);    
    });
  
  });
  
  cont.appendChild(map); document.getElementById("app").appendChild(cont);
}      

// — MUNDO —  
function renderWorld(){  
  checkLevelUp();
  const cont=document.createElement("div"); cont.innerHTML="<h3>🌍 Mundo</h3>";  
  const map=document.createElement("div"); map.classList.add("map","world-map");  
  worldGrid.forEach((row,y)=>{  
    row.forEach((cell,x)=>{  
      const t = renderTile(cell, x, y);
      
      if(player.x===x && player.y===y){ 
        t.innerHTML = "";
        const sprite = createSprite("player", frameSprite, 3);
        sprite.classList.add("sprite");
        sprite.dataset.scale = 3;
        t.appendChild(sprite);
      };      
  
      t.onclick = () => {  
        if(!isAdjacent(x,y,player)) return;  
        
        // mover o player  
        player.x = x;  
        player.y = y;  
        
        if(cell==="Destroço"){  
          player.x = 0;  
          player.y = 1;  
          area="wizardHouse";  
          render();  
          return;  
        }  

        if(cell==="Árvore"){  
          forestPlayer.x = x;  
          forestPlayer.y = y;  
          render();  
        } 
          
        if(cell==="Casa"){  
          player.x = 3;  
          player.y = 0;  
          area="village";  
          render();  
          return;  
        }  
        
        if(cell==="Floresta"){  
          player.x = 1;  
          player.y = 4;  
          area="forest";  
          render();  
          return;  
        }  
        
        // renderiza o mundo primeiro  
        render();  
        
        // tenta encontro aleatório com inimigo  
        if (tryRandomEncounter()) {  
          return;  
        }  
        
        // nada aconteceu, continua no mundo  
      };  
  
      map.appendChild(t);  
    });  
  });  
  
  cont.appendChild(map); document.getElementById("app").appendChild(cont);  
}

// — CASA —
function renderHouse(){
  const cont=document.createElement("div"); cont.innerHTML="<h3>🏠 Casa</h3>";
  const map=document.createElement("div"); map.classList.add("map","house-map");

  houseMap.forEach((row,y)=>{
    row.forEach((cell,x)=>{
      const t = renderTile(cell, x, y);
      
      if(housePlayer.x===x && housePlayer.y===y){ 
        t.innerHTML = "";
        const sprite = createSprite("player", frameSprite, 3);
        sprite.classList.add("sprite");
        sprite.dataset.scale = 3;
        t.appendChild(sprite);
      };

      t.onclick=()=>{
        if(!isAdjacent(x,y,housePlayer)) return;
        
        housePlayer.x=x; 
        housePlayer.y=y;

        if(cell==="Cama"){
          player.hp = player.maxHp;
          player.poisoned = false;
          render();
          showDialog("Você descansou e recuperou toda a vida!",()=>render());
        }
        else if(cell==="Baú"){
          render();
          openInventory();
        }
        else if(cell==="SaídaB"){
          player.x=houseVilaPos.x; player.y=houseVilaPos.y;
          area="village"; render();
        }
        else render();
      };

      map.appendChild(t);
    });
  });

  cont.appendChild(map); document.getElementById("app").appendChild(cont);
}
  
tocarSom();

render();
  
setInterval(() => { frameSprite = (frameSprite + 1) % 2; updateSprites(); }, 300);

  