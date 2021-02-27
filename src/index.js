import InputHandler from "./input.js";
import Game from "./game.js";

let canvas = document.getElementById("canvas");
let body = document.getElementById("body");
let ctx = canvas.getContext("2d");

gameScreenSetup();

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

let game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx);
new InputHandler(game);

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function gameScreenSetup() {
  body.style.backgroundImage = "url(./assets/images/tent.jpg)";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundAttachment = "fixed";
  body.style.backgroundPosition = "center center";
  body.style.backgroundSize = "cover";

  canvas.width = window.innerWidth > 1000 ? 800 : window.innerWidth;
  canvas.height =
    window.innerWidth > 1000
      ? window.innerHeight * 0.9
      : window.innerHeight * 0.95;
  canvas.style.backgroundColor = "rgba(0,0,0,0.1)";
  canvas.style.border = "2px solid purple";
  canvas.style.position = "fixed";
}
