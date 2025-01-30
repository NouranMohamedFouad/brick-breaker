import { BrickBreaker } from "./bricks.js"
import { Game } from "./game.js";
import { Paddle } from "./paddle.js"
import { Ball } from "./ball.js";

function startGame() {
    const bricks = new BrickBreaker('gameContainer', 6, 8, 80, 40, 25, 0.1);
    const paddle = new Paddle();
    const ball = new Ball();
    const game = new Game(ball, paddle, bricks)
    
    document.body.append(game.container)
}



startGame();


