import { BrickBreaker } from "./bricks.js";
import { levels } from "./levels.js";
import { Game } from "./game.js";
import { Paddle } from "./paddle.js"
import { Ball } from "./ball.js";

function startGame() {

    const bricks = new BrickBreaker(levels);
    const paddle = new Paddle();
    const ball = new Ball();
    const game = new Game(ball, paddle, bricks);
    document.body.append(game.container);
}



startGame();


