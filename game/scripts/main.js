import { BrickBreaker } from "./bricks.js"
import { Paddle } from "./paddle.js"

function startGame() {
    const bricks = new BrickBreaker('gameContainer', 6, 8, 80, 40, 25, 0.1);
    const paddle = new Paddle();
}



startGame();


