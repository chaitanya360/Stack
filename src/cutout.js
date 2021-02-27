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
    this.speed = block.game.mobile ? 8 : 6;
    this.block = block;
    this.horizontalSpeed = 0.3;
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
    if (this.block.shouldMoveDown) {
      this.position.y += this.speed + 2;
    } else this.position.y += this.speed;

    if (this.block.movingToRight) this.position.x += this.horizontalSpeed;
    else {
      this.position.x -= this.horizontalSpeed;
    }
  }
}
