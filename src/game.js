import Block from "./block.js";
import Cutout from "./cutout.js";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.blockSize = { width: 300, height: 30 };
    this.blockPosition = { x: 30, y: this.gameHeight - this.blockSize.height };
    this.blocks = [];
    this.offset = 20; // space between stack and live block
    this.addBlock(); // this is base
    this.addBlock(); // this is first live block
  }

  draw(ctx) {
    if (this.blocks) {
      this.blocks.forEach((block) => block.draw(ctx));
    }
  }

  update(deltaTime) {
    if (this.blocks) {
      this.blocks.forEach((block) => block.update());
    }
  }

  addBlock() {
    console.log("adding new block");
    let block = new Block(
      this,
      { ...this.blockSize },
      {
        ...this.blockPosition,
        y:
          this.gameHeight -
          (this.blocks.length + 1) * this.blockSize.height -
          this.offset,
      }
    );

    if (this.blocks.length > 1) {
      //this will drop block on stack , trim it and return new width
      let newWidth = this.blocks[this.blocks.length - 1].drop(
        this.blocks[this.blocks.length - 2]
      );
      block.size.width = newWidth;
    }

    this.blocks.push(block);
  }
}
