import { Circle } from "./circle.js"


export class Game {
    container = document.createElement("div")

    constructor(ball, paddle, bricksContainer) {
        this.ball = ball
        this.paddle = paddle
        this.bricksContainer = bricksContainer;
        this.container.classList.add("game-container")
        document.body.append(this.container)

        this.container.append(bricksContainer.container, ball.container, paddle.container)
        this.container.appendChild(ball.livesContainer)
        ball.ballX = this.container.getBoundingClientRect().left + 150;
        ball.ballY = this.container.getBoundingClientRect().top + 10;
        // ball.animate(this.container);
        this.bricksContainer.loadLevel(0);
        this.mainFrame()
        this.paddle.movePaddle(this.container.getBoundingClientRect());
        window.addEventListener('keydown', (ev) => {
            if (ev.key === "/") {
                this.bricksContainer.nextLevel();
            }
        })
    }

    mainFrame() {
        requestAnimationFrame(this.mainFrame.bind(this))

        const circle = new Circle(this.ball.container.getBoundingClientRect())

        // check collision with paddle
        const paddleRect = this.paddle.paddleElement.getBoundingClientRect()
        const paddleCollision = circle.checkCollision(paddleRect)
        if (paddleCollision.test) {
            this.paddle.sucessfulInteractions++;
            if (this.paddle.sucessfulInteractions == 2) {
                let audio = new Audio("game/success-48018.mp3");
                audio.play();
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
}
