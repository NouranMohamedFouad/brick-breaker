export class Paddle {
    initialX
    initialY
    sucessfulInteractions = 0;
    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("paddle-container");

        this.paddleElement = document.createElement("div");
        this.paddleElement.classList.add("paddle-initial");
        this.container.appendChild(this.paddleElement);
        // let bodyElement = document.body;
        this.isDragged = true; //initial state
        //this.movePaddle();

    }

    movePaddle(gameRect) {

        document.addEventListener("mousemove", (e) => {
            this.positionX = e.clientX;
            if (this.isDragged === true) {
                //calculate the distance the mouse has moved, then update the posisition of the paddle.
                //e.g., 200(current mouse x) - 100(previous position of paddle) = 100
                let deltaX = e.clientX - this.positionX;
                //position of the paddle is now 100 + 100 (for example)
                this.positionX += deltaX;

                //preventing from moving beyond the left edge of the viewport
                if (this.positionX < gameRect.left) {
                    this.positionX = gameRect.left - 1;
                }

                // Prevent the paddle from moving off the right edge of the viewport
                let maxX = gameRect.right - this.paddleElement.offsetWidth;
                if (this.positionX > maxX) {
                    this.positionX = maxX;
                }
                this.paddleElement.style.left = `${this.positionX}px`; // Move the paddle
                //this.startX = e.clientX; // Update the starting point for the next move
            }
        });
        // document.addEventListener("mouseup", (e) => {
        //     this.isDragged = false;
        // });
    }

    expandPaddle() {
        this.paddleElement.classList.add("paddle-expanded");
    }
    shrinkPaddle() {
        this.paddleElement.classList.remove("paddle-expanded");
    }

    // interact(physicalObject) {
    //     if (physicalObject instanceof Ball) {
    //         this.sucessfulInteractions++;
    //         if (this.sucessfulInteractions > 5) {
    //             this.expandPaddle();
    //         }
    //     }
    //     if (physicalObject instanceof Heart) {
    //         this.expandPaddle();
    //     }
    // }

}