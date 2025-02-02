import { Circle } from "./circle.js"
import { Menu } from "./world.js"


export class Game {
    container = document.createElement("div")
    playing = true
    current_menu = null


    constructor(ball, paddle, bricksContainer, sfx) {
        this.ball = ball
        this.paddle = paddle
        this.bricksContainer = bricksContainer;
        this.container.classList.add("game-container")
        document.body.append(this.container)
        this.container.appendChild(ball.livesContainer)
        this.container.append(bricksContainer.container, ball.container, paddle.container)
        this.sfx = sfx;

        ball.ballX = this.container.getBoundingClientRect().left + 400;
        ball.ballY = this.container.getBoundingClientRect().top + 350;
        // ball.animate(this.container);
        this.bricksContainer.loadLevel(0);
        this.mainFrame()
        this.paddle.movePaddle(this.container.getBoundingClientRect());

        this.ball.onGameOver = function() {
            this.showGameOverMenu();
        }.bind(this);

        window.addEventListener('keydown', (ev) => {
            if (ev.key === "/") {
                this.bricksContainer.nextLevel();
            } else if (ev.key === ".") {
                if (this.current_menu) {
                    this.current_menu.close()
                    this.playing = true
                    this.current_menu = null
                } else {
                    this.playing = false
                    this.current_menu = this.showMenu()
                }
            }
        })
    }

    mainFrame() {
        requestAnimationFrame(this.mainFrame.bind(this))
        if (!this.playing) return;
        const circle = new Circle(this.ball.container.getBoundingClientRect())

        // check collision with paddle
        const paddleRect = this.paddle.paddleElement.getBoundingClientRect()
        const paddleCollision = circle.checkCollision(paddleRect)
        if (paddleCollision.test) {
            this.sfx.playSound("HIT");
            this.paddle.sucessfulInteractions++;
            if (this.paddle.sucessfulInteractions == 2) {
                this.sfx.playSound("PADLE_EXPANSION");
                this.paddle.expandPaddle();
            }
            if (paddleCollision.sideY === "top" || paddleCollision.sideY === "bottom") {
                this.ball.ballVelocityY *= -1;
            }
            if (paddleCollision.sideX === "left" || paddleCollision.sideX === "right") {
                this.ball.ballVelocityX *= -1;
            }
            this.paddle.paddleElement.style.background = "black"
        } else {
            this.paddle.paddleElement.style.background = "linear-gradient(to bottom, #36454F, #D3D3D3)"
        }

        // check collision with bricks
        for (let i = 0; i < this.bricksContainer.brickPositions.length; i++) {
            const brickRect = this.bricksContainer.brickPositions[i]
            const brickCollision = circle.checkCollision(brickRect)
            if (brickCollision.test) {
                this.sfx.playSound("HIT");
                this.bricksContainer.handleBrickInteraction(brickRect.id)
                if (brickCollision.sideY === "top" || brickCollision.sideY === "bottom") {
                    this.ball.ballVelocityY *= -1;
                }
                if (brickCollision.sideX === "left" || brickCollision.sideX === "right") {
                    this.ball.ballVelocityX *= -1;
                }
                break;
            }
        }

        // update ball position
        this.ball.animate(this.container);
    }

    showMenu() {
        this.playing = false
        const menu = new Menu("Pause")
        menu.addItem("Resume", () => {
            this.playing = true;
            this.current_menu = null
            menu.close()
        })
        return menu
    }


    showGameOverMenu() {
        this.playing = false;
        const gameOverMenu = new Menu("Game Over!");
        gameOverMenu.addItem("Play Again", () => {
            this.sfx.playSound("GAME_START");
            this.resetGame();
            gameOverMenu.close();
        });
        this.current_menu = gameOverMenu;
    }

    resetGame() {
        this.ball.lives = 5;
        this.ball.updateLivesDisplay();
        this.ball.ballX = this.container.getBoundingClientRect().left + 400;
        this.ball.ballY = this.container.getBoundingClientRect().top + 350;
        this.bricksContainer.loadLevel(0);
        this.playing = true;
    }

}
