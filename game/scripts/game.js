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
        ball.ballX = this.container.getBoundingClientRect().left + 150;
        ball.ballY = this.container.getBoundingClientRect().top + 10;
        // ball.animate(this.container);
        this.bricksContainer.loadLevel(0);
        this.mainFrame()
        this.paddle.movePaddle(this.container.getBoundingClientRect());
    }

    mainFrame() {
        requestAnimationFrame(this.mainFrame.bind(this))
        const circle = new Circle(this.ball.container.getBoundingClientRect())

        const result = circle.checkCollision(this.paddle.paddleElement.getBoundingClientRect())
        //console.log(result);

        if (result.test) {
            if (result.sideY === "top" || result.sideY === "bottom") {
                this.ball.ballVelocityY *= -1;
            }
            if (result.sideX === "left" || result.sideX === "right") {
                this.ball.ballVelocityX *= -1;
            }
        } else {
            this.paddle.paddleElement.style.background = "black"
        }
        this.ball.animate(this.container);

        for (let i = 0; i < this.bricksContainer.brickPositions.length; i++) {
            console.log(this.bricksContainer.brickPositions[i]);
            const result = circle.checkCollision(this.bricksContainer.brickPositions[i])
            console.log(result);
            if (result.test) {
                this.bricksContainer.handleBrickInteraction(this.bricksContainer.brickPositions[i].id)
                if (result.sideY === "top" || result.sideY === "bottom") {
                    this.ball.ballVelocityY *= -1;
                }
                if (result.sideX === "left" || result.sideX === "right") {
                    this.ball.ballVelocityX *= -1;
                }
                else if (result.sideY === "bottom") {
                    this.ball.ballVelocityY *= -1;
                }
                break;
            }
        }
    }
}
