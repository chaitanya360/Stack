import Cutout from "./cutout.js";

const TRIM_END = {
  LEFT: 0,
  RIGHT: 1,
};

const BLOCK_COLORS = [
  "rect_black",
  "rect_brown",
  "rect_green",
  "rect_orange",
  "rect_purple",
  "rect_skyBlue",
  "rect_yellow",
  "rect_blue",
  "rect_pink",
  "rect_red",
];

export default class BLock {
  constructor(game, size, position) {
    this.game = game;
    this.size = size;
    this.position = position;
    this.blockImage = document.getElementById(
      BLOCK_COLORS[parseInt(Math.random() * 10) % BLOCK_COLORS.length]
    );
    this.speed = -4;
    this.hasCutout = false;
    this.movingToRight = false;
    this.cutout;
    this.trimEnd = false;
    this.baseBlock = this.game.blocks.length === 0 ? true : false;
    if (this.baseBlock) {
      this.position.x = this.game.gameWidth / 2 - this.size.width / 2;
      this.position.y += this.game.offset;
    }
    this.ctx;
  }

  draw(ctx) {
    this.ctx = ctx;
    ctx.drawImage(
      this.blockImage,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );

    if (this.hasCutout) {
      this.cutout.draw(ctx);
    }
  }

  update() {
    //as it will be static
    if (this.baseBlock) {
      return;
    }

    //boundry check
    if (
      this.position.x < 0 ||
      this.position.x + this.size.width > this.game.gameWidth
    ) {
      this.speed = -this.speed;
      this.movingToRight = !this.movingToRight;
    }

    //movemont
    this.position.x += this.speed;

    //movement of cutOut

    if (this.hasCutout) {
      this.cutout.update();
    }
  }

  drop(prevBlock) {
    let currBlockLeftEnd = this.position.x;
    let currBlockRightEnd = this.position.x + this.size.width;

    let prevBlockLeftEnd = prevBlock.position.x;
    let prevBlockRightEnd = prevBlock.position.x + prevBlock.size.width;

    //drop down
    this.position.y += this.game.offset;

    //stop moving
    this.speed = 0;
    let diff = 0;

    //trim left
    if (currBlockLeftEnd < prevBlockLeftEnd) {
      diff = prevBlockLeftEnd - currBlockLeftEnd;
      this.position.x += diff;
      this.trimEnd = TRIM_END.LEFT;
    }

    //trim right
    if (currBlockRightEnd > prevBlockRightEnd) {
      diff = currBlockRightEnd - prevBlockRightEnd;
      console.log(diff);
      this.trimEnd = TRIM_END.RIGHT;
    }

    //update newWidth for rest of the blocks
    let newWidth = this.size.width - diff;

    if (newWidth > 0) {
      this.size.width = newWidth;
    } else {
      alert("gameOver");
    }

    //handling cutout

    if (diff) {
      this.hasCutout = true;
      let x;

      if (this.trimEnd === TRIM_END.LEFT) {
        x = this.position.x - diff;
      } else {
        x = this.position.x + newWidth;
      }

      this.cutout = new Cutout(
        this,
        { width: diff, height: this.size.height },
        { x: x, y: this.position.y }
      );
    }

    return newWidth > 0 ? newWidth : 0;
  }
}
