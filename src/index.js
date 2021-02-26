import InputHandler from "./input.js";
import Game from "./game.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.setAttribute(
  "width",
  window.innerWidth > 1000 ? 800 : window.innerWidth
);
canvas.setAttribute("height", window.innerHeight);

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
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
