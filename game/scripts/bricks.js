export class BrickBreaker {
  constructor(containerId, rows, cols, brickWidth, brickHeight, brickPadding, crackedChance) {
    this.container = document.createElement("div");
    this.container.classList.add("game-container");
    this.rows = rows;
    this.cols = cols;
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.brickPadding = brickPadding;
    this.crackedChance = crackedChance;
    this.bricks = [];
    this.clickCounts = {};
    this.setupGameContainer();
    this.createBricks();
  }

  setupGameContainer() {
    this.container.style.width = '80%';
    this.container.style.height = '80%';
    this.container.style.display = 'grid';
    this.container.style.gridTemplateColumns = `repeat(${this.cols}, ${this.brickWidth}px)`;
    this.container.style.gridGap = `${this.brickPadding}px`;
    this.container.style.justifyContent = 'center';
  }

  createBricks() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const brick = document.createElement('div');
        brick.classList.add('brick');
        const brickId = `brick-${r}-${c}`;
        brick.id = brickId;
        this.clickCounts[brickId] = 0;

        if (Math.random() < this.crackedChance) {
          brick.classList.add('cracked');
          this.clickCounts[brickId] = 1;
        }

        brick.addEventListener('click', () => this.handleBrickClick(brickId, brick));

        this.bricks.push(brick);
        this.container.appendChild(brick);
      }
    }
  }

  handleBrickClick(brickId, brick) {
    this.clickCounts[brickId]++;
    if (this.clickCounts[brickId] === 1) {
      brick.classList.add('cracked');
    } else if (this.clickCounts[brickId] === 2) {
      brick.classList.add('hidden');
    }
  }
}

