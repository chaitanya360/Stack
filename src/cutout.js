export default class Cutout {
  constructor(game, size, position) {
    this.game = game;
    this.size = size;
    this.position = position;
    this.blockImage = document.getElementById("rect_pink");
    this.speed = 3;
  }

  draw(ctx) {
    ctx.globalCompositeOperation = "destination-over";

    ctx.drawImage(
      this.blockImage,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  update() {
    if (this.position.y >= this.game.gameHeight) {
      return;
    }

    console.log("updating");
    this.position.y += this.speed;
  }
}
