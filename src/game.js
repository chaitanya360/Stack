import Block from "./block.js";
import Cutout from "./cutout.js";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.blockSize = { width: gameWidth - gameWidth * 0.3, height: 30 };
    this.blockPosition = {
      x: 30,
      y: this.gameHeight - this.blockSize.height,
    };
    this.blocks = [];
    this.gameScreenOffset = 0; //used to move screen down when it is overflowed
    this.GAME_SCREEN_OFFSET = 3.1;
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
      this.blocks.forEach(
        (block) =>
          (block.position = {
            ...block.position,
            y: block.position.y,
          })
      );
    }

    if (
      this.gameScreenOffset < this.GAME_SCREEN_OFFSET &&
      this.blocks.length > 10
    ) {
      this.gameScreenOffset +=
        this.GAME_SCREEN_OFFSET / (this.blockSize.height / 2);
      console.log(this.gameScreenOffset);
      if (this.blocks) {
        // this.blocks.forEach((block) => block.update());
        this.blocks.forEach(
          (block) =>
            (block.position = {
              ...block.position,
              y: block.position.y + this.gameScreenOffset,
            })
        );
      }
    }
  }

  addBlock() {
    this.gameHeight += this.gameScreenOffset * 9;
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
    this.gameScreenOffset = 0;
  }
}
