import { Circle } from "./circle.js"


export class Game {
    container = document.createElement("div")
    constructor(ball, paddle, bricksContainer) {
        this.ball = ball
        this.paddle = paddle

        this.container.classList.add("game-container")
        document.body.append(this.container)

        this.container.append(bricksContainer.container, ball.container, paddle.container)
        ball.ballX = this.container.getBoundingClientRect().left + 150;
        ball.ballY = this.container.getBoundingClientRect().top + 10;
        // ball.animate(this.container);
        this.mainFrame()
        this.paddle.movePaddle(this.container.getBoundingClientRect());
    }


    mainFrame() {
        requestAnimationFrame(this.mainFrame.bind(this))
        const circle = new Circle(this.ball.container.getBoundingClientRect())

        const result = circle.checkCollision(this.paddle.paddleElement.getBoundingClientRect())
        console.log(result);

        if (result.test) {
            if (!result.sideX && result.sideY === "top") {
                this.ball.ballVelocityY *= -1;
            }
            else if (result.sideX && result.sideY === "top") {
                this.ball.ballVelocityX *= -1;
                // this.ball.ballVelocityY *= -1;

            }
            // this.ball.ballVelocityY *= -1;
            // document.getElementById("log").innerHTML += `${result.sideX} - ${result.sideY}<br>`

        }
        else {
            this.paddle.paddleElement.style.background = "black"
        }
        this.ball.animate(this.container);

    }
}