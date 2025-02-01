
export class BrickBreaker {
  container;
  levels;
  currentLevelIndex = 0;
  brickPositions = [];


  constructor(levels) {
    this.container = document.createElement("div");
    this.container.classList.add("bricks-container");
    this.levels = levels;
    this.bricks = [];
    this.clickCounts = {};
    this.loadLevel(0);
  }

  loadLevel(levelIndex) {
    if (levelIndex >= this.levels.length) {
      return;
    }

    this.currentLevelIndex = levelIndex;
    this.bricks = [];
    this.clickCounts = {};
    this.brickPositions = [];

    const level = this.levels[levelIndex];

    this.container.innerHTML = '';
    this.container.style.width = '100%';
    this.container.style.height = '80%';
    this.container.style.display = 'grid';
    this.container.style.gridTemplateColumns = `repeat(${level.cols}, ${level.brickWidth}px)`;
    this.container.style.gridTemplateRows = `repeat(${level.rows}, ${level.brickHeight}px)`;
    this.container.style.gridGap = `${level.brickPadding}px`;

    for (let r = 0; r < level.rows; r++) {
      for (let c = 0; c < level.cols; c++) {
        const brickId = `brick-${r}-${c}`;
        const brick = document.createElement('div');

        if (level.brickLayout[r][c] === 0) {
          continue;
        }

        brick.classList.add('brick');
        this.clickCounts[brickId] = 0;

        if (level.brickLayout[r][c] === 2) {
          brick.classList.add('silverBrick');
        } else {
          if (Math.random() < level.crackedChance) {
            brick.classList.add('cracked');
            this.clickCounts[brickId] = 1;
          }
        }

        brick.id = brickId;
        brick.style.gridRowStart = r + 1;
        brick.style.gridColumnStart = c + 1;


        const rect = brick.getBoundingClientRect();
        this.brickPositions.push(
          {
            id: brickId,
            ...rect
          });
        this.bricks.push(brick);
        this.container.appendChild(brick);
      }
    }
  }

  handleBrickInteraction(brickId) {
    const brick = document.getElementById(brickId);
    this.clickCounts[brickId]++;
    if (brick.classList.contains('silverBrick')) {
      return;
    }
    if (this.clickCounts[brickId] === 1) {
      brick.classList.add('cracked');
    } else if (this.clickCounts[brickId] === 2) {
      brick.classList.add('hidden');
      this.checkLevelCompletion();
    }
  }

  checkLevelCompletion() {
    if (this.bricks.every(brick => {
      return brick.classList.contains('hidden') || brick.classList.contains('silverBrick');
    })) {
      setTimeout(() => {
        this.nextLevel();
      }, 200);
    }
  }


  nextLevel() {
    this.container.innerHTML = '';
    this.loadLevel(this.currentLevelIndex + 1);
  }
}
