import { BrickBreaker } from "./bricks.js"
import { Game } from "./game.js";
import { Paddle } from "./paddle.js"

function startGame() {
    const bricks = new BrickBreaker('gameContainer', 6, 8, 80, 40, 25, 0.1);
    const paddle = new Paddle();
    const game = new Game({ container: document.createElement("div") }, paddle, bricks)

    document.body.append(game.container)
}



startGame();


