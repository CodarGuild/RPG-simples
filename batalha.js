// — BATALHA —  
function renderBattle(){  
  const cont=document.createElement("div"); cont.innerHTML=`<h3>⚔️ Batalha: ${currentEnemy.name}</h3>`;  
  const info=document.createElement("div");  
  info.innerHTML=`<p>👤 Você: ${player.hp}/${player.maxHp} HP</p><p>👾 ${currentEnemy.name}: ${currentEnemy.hp}/${currentEnemy.maxHp} HP</p>`;  
  cont.appendChild(info);  
  
  const log=document.createElement("p"); cont.appendChild(log);  
  
  // botão para inventário na batalha (sem duplicar a tela)  
  const invBtn = document.createElement("button");  
  invBtn.textContent = "🧾 Inventário";  
  invBtn.classList.add("battle-inv-btn");  
    
  invBtn.onclick = () => {  
    if(dialogActive) return;  
    // guarda HP antes de abrir inventário para aplicar dano depois  
    openInventory();  
    
    // substitui o botão de fechar para aplicar dano ao fechar  
    document.getElementById("close-inv").onclick = () => {  
      // fecha apenas o inventário  
      inventoryModal.style.display = "none";  
    
      // volta à batalha normalmente (simples render, não duplica)  
      render();  
    };  
  };  
    
  cont.appendChild(invBtn);  
  
  const btn=document.createElement("button");  
  btn.textContent="🥊 ATACAR!";  
  btn.classList.add("attack-btn");  
  cont.appendChild(btn);  
    
  // Botão de Fugir  
  const fleeBtn = document.createElement("button");  
  fleeBtn.textContent = "🏃‍♂️ Fugir";  
  fleeBtn.classList.add("battle-inv-btn"); // usa o mesmo estilo de inventário/batalha  
  cont.appendChild(fleeBtn);  
    
  fleeBtn.onclick = () => {  
    if(dialogActive) return;  
    const chance = Math.random();  
    if (chance < 0.25) {  
      showDialog("Você conseguiu fugir!", () => {  
        area = prevArea;  
        render();  
      });  
    } else {  
      // aplicar dano quando falhar  
      const edmg = Math.floor(Math.random()*currentEnemy.dmg) + 1;  
      player.hp -= edmg;  
      if (checkGameOver()) return;  
    
      if (player.poisoned) {
        player.hp -= player.poisonDamage;
        
        showDialog(`A fuga falhou! ${currentEnemy.name} causou ${edmg} e o veneno causa -${player.poisonDamage}!`, () => {  
          render(); // volta pra batalha normal  
        });  
        
        if (checkGameOver()) return; // checa se a vida acaba
      }
      
      else {
        showDialog(`A fuga falhou! ${currentEnemy.name} causou ${edmg}!`, () => {  
          render(); // volta pra batalha normal  
        });  
      }
      
    }  
  };  
  
  btn.onclick=()=>{  
    if(dialogActive) return;  
    const dmg=player.dmg;  
    const pdmg=Math.floor(Math.random()*dmg)+1;  
    currentEnemy.hp-=pdmg;  
      
    if(currentEnemy.hp<=0){  
      const goldEarned = currentEnemy.goldDrop;  
      player.gold += goldEarned;  
      const xp = currentEnemy.xp;
      player.xp += xp;
      render();  
      showDialog(`Você derrotou ${currentEnemy.name} e ganhou ${goldEarned} 🪙 e ${xp} XP!`, () => {  
        area = prevArea;  
        render();  
      }); 
      return;  
    }  
      
    const edmg=Math.floor(Math.random()*currentEnemy.dmg)+1;  
    player.hp-=edmg;  
    if (checkGameOver()) return; 
      
    if (currentEnemy.canPoison && Math.random() < 0.30 && player.poisoned !== true) {
      player.poisoned = true;
      log.textContent = `⚠️ Você foi envenenado por ${currentEnemy.name}!`;
      return;
    }
     
    if (player.poisoned) {
      player.hp -= player.poisonDamage;
      
      log.textContent = `Você causou ${pdmg}! ${currentEnemy.name} causou ${edmg}! Veneno causa -${player.poisonDamage} de dano!`;
      
      if (checkGameOver()) return; // checa se a vida acaba
    }
      
    else {
      log.textContent=`Você causou ${pdmg}! ${currentEnemy.name} causou ${edmg}!`;  
    }
    info.innerHTML=`<p>👤 Você: ${player.hp}/${player.maxHp} HP</p><p>👾 ${currentEnemy.name}: ${currentEnemy.hp}/${currentEnemy.maxHp} HP</p>`;  
  };  
  
  document.getElementById("app").appendChild(cont);  
}  

// — Game Over —  
function checkGameOver() {  
  if (player.hp <= 0) {  
    // Mostra tela de Game Over  
    document.getElementById("app").innerHTML = `  
      <div style="text-align:center; color:#f55; font-size:24px; padding:20px;">  
        <p>💀 GAME OVER 💀</p>  
        <button id="restart-btn" style="  
          padding:10px 18px;  
          font-size:18px;  
          background:#f9d423;  
          color:#111;  
          border:none;  
          border-radius:8px;  
          cursor:pointer;  
        ">Recomeçar</button>  
      </div>  
    `;  
      
    document.getElementById("restart-btn").onclick = () => {  
      location.reload(); // recarrega a página para resetar tudo  
    };  
  
    return true;  
  }  
  return false;  
}  

// — Encontros Aleatorios —  
function tryRandomEncounter() {  
  if (area !== "world" && area !== "forest") return false;  
  
  if (Math.random() < 0.25 && area === "world") {  
    prevArea = area;  
    currentEnemy = {...enemies[Math.floor(Math.random() * 2)]};  
    area = "battle";  
    render();  
    return true;  
  }  
      
  else if (Math.random() < 0.25 && area === "forest") {  
    prevArea = area;  
    currentEnemy = {...enemies[Math.floor(Math.random() * (3 - 2 + 1) + 2)]};  
    area = "battle";  
    render();  
    return true;  
  }  
      
  return false;  
}  

// — LEVEL UP —
function checkLevelUp() {
  if (player.xp >= player.metaDeXp) {
    player.xp -= player.metaDeXp;
    player.level++;
    player.maxHp += 10;     
    player.dmg += 2;        
    player.hp = player.maxHp; 
    player.poisoned = false;
    player.metaDeXp += player.metaDeXp * 0.50;
    showDialog(`✨ Você subiu para o Nível ${player.level}!`, () => render());
  }
}

