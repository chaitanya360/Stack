import Cutout from "./cutout.js";

const TRIM_END = {
  LEFT: 1,
  RIGHT: 2,
};

const SPEED = {
  THRESHOLD: 17,
  MINIMUM: window.innerWidth < 1000 ? 15 : 10,
};

const BLOCK_COLORS = [
  // "rect_black",
  "rect_brown",
  "rect_green",
  "rect_orange",
  // "rect_purple",
  "rect_skyBlue",
  // "rect_yellow",
  "rect_blue",
  "rect_pink",
  "rect_red",
];

export default class BLock {
  constructor(game, size, position) {
    this.game = game;
    this.size = size;
    this.position = position;
    this.shouldMoveDown = false;
    this.moveDownCount = 0;
    this.blockImage = document.getElementById(
      BLOCK_COLORS[parseInt(Math.random() * 10) % BLOCK_COLORS.length]
    );
    this.speed = Math.min(
      Math.max(SPEED.MINIMUM, this.game.blocks.length / 2),
      SPEED.THRESHOLD
    );
    this.shouldDrop = false;
    this.dropCount = 0;
    this.hasCutout = false;
    this.movingToRight = true;
    this.cutout;
    this.trimEnd = false;
    this.baseBlock = this.game.blocks.length === 0 ? true : false;
    if (this.baseBlock) {
      this.position.x = this.game.gameWidth / 2 - this.size.width / 2;
      this.position.y += this.game.offset;
    }
    this.ctx;

    console.log("speed:", this.speed);
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
    if (this.shouldDrop) {
      this.dropCount += 2;
      this.position.y += 2;

      if (this.dropCount == this.game.offset) {
        this.shouldDrop = false;
        this.dropCount = 0;
      }
    }

    if (this.shouldMoveDown) {
      this.moveDownCount += 3;
      this.position.y += 3;

      if (this.moveDownCount == this.size.height) {
        this.shouldMoveDown = false;
        this.moveDownCount = 0;
      }
    }

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
    this.shouldDrop = true;

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
      this.trimEnd = TRIM_END.RIGHT;
    }

    //update newWidth for rest of the blocks
    let newWidth = this.size.width - diff;

    if (newWidth > 0) {
      this.size.width = newWidth;
    } else {
      this.game.over();
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

    //perfect drop

    if (!this.trimEnd) {
      this.handlePerfectDrop();
      this.game.score += 5;
    } else {
      this.game.score += 1;
    }

    return this.size.width;
  }

  moveDown() {
    this.shouldMoveDown = true;
  }

  handlePerfectDrop() {
    console.log("perfect drop");

    let canvas = document.getElementById("canvas");
    let temp = canvas.style.backgroundColor;

    setTimeout(() => (canvas.style.backgroundColor = "white"), 50);
    setTimeout(() => (canvas.style.backgroundColor = temp), 100);
  }
}
