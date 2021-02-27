export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 32:
          game.addBlock();
          break;

        case 27:
          game.pause();
          game.restart();
          break;
        default:
          console.log(event.keyCode);
      }
    });

    document.addEventListener("touchend", (event) => {
      navigator.vibrate(50);
      game.addBlock();
    });
  }
}
