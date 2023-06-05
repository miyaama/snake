const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 5;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let score = 0;

let prevXVelocity = 0;
let prevYVelocity = 0;

let GREEN = "#223700";

function drawGame() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;

  if (prevXVelocity === 1 && xVelocity === -1) {
    xVelocity = prevXVelocity;
  }

  if (prevXVelocity === -1 && xVelocity === 1) {
    xVelocity = prevXVelocity;
  }

  if (prevYVelocity === -1 && yVelocity === 1) {
    yVelocity = prevYVelocity;
  }

  if (prevYVelocity === 1 && yVelocity === -1) {
    yVelocity = prevYVelocity;
  }

  prevXVelocity = xVelocity;
  prevYVelocity = yVelocity;

  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    document.body.removeEventListener("keydown", keyDown);
    return;
  }

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();

  if (score > 2) {
    speed = 7;
  }
  if (score > 5) {
    speed = 8;
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = "50px Verdana";
    ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = GREEN;
  ctx.font = "10px Verdana";
  ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "#B3DC04";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = GREEN;
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY));
  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = GREEN;
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = GREEN;
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX == headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(e) {
  if (e.keyCode == 38) {
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  if (e.keyCode == 40) {
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  if (e.keyCode == 37) {
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  if (e.keyCode == 39) {
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}

drawGame();
