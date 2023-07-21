// Configuração inicial
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

// Variáveis do jogo
let dinoX = 50;
let dinoY = height - 50;
let jump = false;
let obstacles = [];
let score = 0;
let gameOverFlag = false;

// Função para criar obstáculos
function createObstacle() {
  const obstacle = {
    x: width, // Posição inicial do obstáculo (x)
    y: height - 50, // Posição inicial do obstáculo (y)
    width: 20, // Largura do obstáculo
    height: 50 // Altura do obstáculo
  };
  
  obstacles.push(obstacle);
}

// Função para desenhar o dinossauro
function drawDino() {
  ctx.fillStyle = 'black';
  ctx.fillRect(dinoX, dinoY, 50, 50);
}

// Função para desenhar os obstáculos
function drawObstacles() {
  ctx.fillStyle = 'red';
  
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
}

// Função para atualizar a posição dos obstáculos
function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    obstacle.x -= 3; // Movimentação do obstáculo (ajuste a velocidade conforme necessário)
    
    // Verificar colisão com o dinossauro
    if (dinoX < obstacle.x + obstacle.width &&
        dinoX + 50 > obstacle.x &&
        dinoY < obstacle.y + obstacle.height &&
        dinoY + 50 > obstacle.y) {
      // Colisão detectada
      gameOver();
      return; // Encerrar a função para evitar a atualização da posição do dinossauro
    }
    
    // Remover obstáculos que saem da tela
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(i, 1);
      i--;
      score++; // Aumentar a pontuação ao evitar o obstáculo
    }
  }
}

// Função para encerrar o jogo
function gameOver() {
  gameOverFlag = true;
  alert('Game Over. Pontuação: ' + score);
  resetGame();
}

// Função para resetar o jogo
function resetGame() {
  dinoX = 50;
  dinoY = height - 50;
  jump = false;
  obstacles = [];
  score = 0;
  gameOverFlag = false;
}

// Função principal do jogo
function gameLoop() {
  // Limpar o canvas
  ctx.clearRect(0, 0, width, height);
  
  // Desenhar o dinossauro
  drawDino();
  
  // Desenhar os obstáculos
  drawObstacles();
  
  // Atualizar a posição do dinossauro
  if (jump && dinoY > height - 100) {
    dinoY -= 5;
  } else if (!jump && dinoY < height - 50) {
    dinoY += 5;
  }
  
  // Atualizar a posição dos obstáculos
  updateObstacles();
  
  // Loop do jogo
  if (!gameOverFlag) {
    requestAnimationFrame(gameLoop);
  }
}

// Controle de teclas
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 32 && !jump && !gameOverFlag) {
    jump = true;
  }
});

document.addEventListener('keyup', function(event) {
  if (event.keyCode === 32) {
    jump = false;
  }
});

// Iniciar o jogo
createObstacle();
gameLoop();
setInterval(createObstacle, 2000); 