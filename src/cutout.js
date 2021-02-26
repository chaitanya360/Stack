const TRIM_END = {
  LEFT: 0,
  RIGHT: 1,
};

export default class Cutout {
  constructor(block, size, position) {
    this.game = block.game;
    this.size = size;
    this.position = position;
    this.blockImage = block.blockImage;
    this.speed = 3;
    this.block = block;
  }

  draw(ctx) {
    // ctx.globalCompositeOperation = "destination-over";

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

    this.position.y += this.speed;
    if (this.block.movingToRight) this.position.x += 0.5;
    else {
      this.position.x -= 0.5;
    }
  }
}
