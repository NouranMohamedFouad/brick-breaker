

export class Game {
    container = document.createElement("div")

    constructor(ball, paddle, bricksContainer) {
        this.container.classList.add("game-container")
        document.body.append(this.container)

        this.container.append(bricksContainer.container, ball.container, paddle.container)
        ball.ballX = this.container.getBoundingClientRect().left + 150 + 'px';
        ball.ballY = this.container.getBoundingClientRect().top + 10 + 'px';
        ball.animate(this.container);
    }


}