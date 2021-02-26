import Game from "./game.js";
export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 32:
          game.addBlock();
          break;
        default:
        // console.log(event.keyCode);
      }
    });
    document.addEventListener("touchend", (event) => {
      game.addBlock();
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
      }
    });
  }
}
