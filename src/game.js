import Block from "./block.js";
let score = document.getElementById("score");

const STATE = {
  RUNNING: 0,
  PAUSE: 1,
  MENU: 2,
  OVER: 3,
};

export default class Game {
  constructor(gameWidth, gameHeight, ctx) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.score = 0;
    this.gameState = STATE.RUNNING;
    this.mobile = window.innerWidth < 1000 ? true : false;
    this.blockSize = {
      width: this.mobile
        ? gameWidth - gameWidth * 0.5
        : gameWidth - gameWidth * 0.6,
      height: this.mobile ? 60 : 30,
    };
    this.blockPosition = {
      x: 30,
      y: this.gameHeight - this.blockSize.height,
    };
    this.blocks = [];
    this.gameScreenOffset = 0; //used to move screen down when it is overflowed
    this.GAME_SCREEN_OFFSET = 3;
    this.offset = 10; // space between stack and live block
    this.addBlock(); // this is base
    this.addBlock(); // this is first live block
  }

  draw(ctx) {
    if (this.blocks) {
      this.blocks.forEach((block) => block.draw(ctx));
    }
  }

  update(deltaTime) {
    if (this.gameState === STATE.RUNNING) {
      score.innerHTML = this.score;

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
    } else if (this.gameState === STATE.PAUSE) {
      this.ctx.globalCompositeOperation = "destination-over";
      this.ctx.fillStyle = "white";
      this.ctx.font = "50px sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Pause", canvas.width / 2, canvas.height / 2);
    } else if (this.gameState === STATE.OVER) {
      this.ctx.globalCompositeOperation = "destination-over";
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
      this.ctx.font = "30px sans-serif";
      this.ctx.fillText(
        "Press and Hold Esc To Restart",
        canvas.width / 2,
        canvas.height / 2 + 70
      );
    }
  }

  addBlock() {
    if (this.gameState === STATE.RUNNING) {
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
      if (this.blocks.length > 15) {
        this.gameHeight += this.blockSize.height;
        this.blocks.forEach((block) => block.moveDown());
      }
    }
  }

  pause() {
    console.log("paused is called");
    console.log(this.gameState);
    if (this.gameState === STATE.PAUSE) {
      this.gameState = STATE.RUNNING;
    } else if (this.gameState === STATE.RUNNING) this.gameState = STATE.PAUSE;
  }

  over() {
    if (this.gameState != STATE.PAUSE) this.gameState = STATE.OVER;
  }

  restart() {
    if (this.gameState === STATE.OVER) {
      window.location.reload(false);
    }
  }
}
