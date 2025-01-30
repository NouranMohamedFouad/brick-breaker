
class Paddle {

    sucessfulInteractions = 0;
    constructor() {
        this.paddleContainer = document.createElement("div");
        this.paddleContainer.classList.add("paddle-container");

        this.paddleElement = document.createElement("div");
        this.paddleElement.classList.add("paddle-initial");
        this.paddleContainer.appendChild(this.paddleElement);
        let bodyElement = document.body;
        bodyElement.appendChild(this.paddleContainer);
        this.isDragged = false; //initial state
        this.movePaddle();
    }

    movePaddle() {
        this.paddleElement.addEventListener("mousedown", (e) => {
            //left is 0
            this.isDragged = true;
            //clientX is the horizontal position of the mouse pointer when the event is triggered, relative to the left edge of the browser’s viewport.
            this.positionX = e.clientX; //initial position is the x position of the cursor
        });
        this.paddleContainer.addEventListener("mousemove", (e) => {
            if (this.isDragged === true) {
                //calculate the distance the mouse has moved, then update the posisition of the paddle.
                //e.g., 200(current mouse x) - 100(previous position of paddle) = 100
                let deltaX = e.clientX - this.positionX;
                //position of the paddle is now 100 + 100 (for example)
                this.positionX += deltaX;

                //preventing from moving beyond the left edge of the viewport
                if (this.positionX < 0) {
                    this.positionX = 0;
                }

                // Prevent the paddle from moving off the right edge of the viewport
                let maxX = window.innerWidth - this.paddleElement.offsetWidth;
                if (this.positionX > maxX) {
                    this.positionX = maxX;
                }
                this.paddleElement.style.left = `${this.positionX}px`; // Move the paddle
                //this.startX = e.clientX; // Update the starting point for the next move
            }
        });
        this.paddleContainer.addEventListener("mouseup", (e) => {
            this.isDragged = false;
        });
    }

    expandPaddle() {
        this.paddleElement.classList.add("paddle-expanded");
    }

    interact(physicalObject) {
        if (physicalObject instanceof Ball) {
            this.sucessfulInteractions++;
            if (this.sucessfulInteractions > 5) {
                this.expandPaddle();
            }
        }
        if (physicalObject instanceof Heart) {
            this.expandPaddle();
        }
    }

}
let paddle = new Paddle();
//paddle.expandPaddle();