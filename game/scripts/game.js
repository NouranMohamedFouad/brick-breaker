

export class Game {
    container = document.createElement("div")


    constructor(ball, paddle, bricksContainer) {
        this.container.classList.add("game-container")
        document.body.append(this.container)

        this.container.append(bricksContainer.container, ball.container, paddle.container)
    }


}