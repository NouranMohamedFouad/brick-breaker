import { BrickBreaker } from "./bricks.js";
import { levels } from "./levels.js";
import { Game } from "./game.js";
import { Paddle } from "./paddle.js"
import { Ball } from "./ball.js";
import { Menu, SFX } from "./world.js";

const sfx = new SFX()
function startGame() {
    
    const paddle = new Paddle();
    const ball = new Ball();
    const bricks = new BrickBreaker(levels, ball);
    const game = new Game(ball, paddle, bricks);
    document.body.append(game.container);
}


function main() {
    const mainMenu = new Menu("Main menu")
    mainMenu.addItem("New Game", () => {
        sfx.playSound("GAME_START")
        startGame()
        mainMenu.close()
        // main_menu.close()
    })
}



// startGame();
main()

