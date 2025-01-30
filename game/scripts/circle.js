export class Circle {
    /**@type {number} */
    cx;
    /**@type {number} */
    cy;
    /**@type {number} */
    radius;


    /**
     * 
     * @param {DOMRect} rect 
     */
    constructor(rect) {
        this.radius = rect.width / 2
        this.cx = rect.left + this.radius
        this.cy = rect.top + this.radius
    }

    /**
     * 
     * @param {DOMRect} rect 
     */
    checkCollision(rect) {
        // temporary variables to set edges for testing
        let testX = this.cx;
        let testY = this.cy;
        /**@type {"left" | "right"} */
        let sideX

        /**@type {"top" | "bottom"} */
        let sideY

        // which edge is closest?
        if (this.cx < rect.x) {
            // test left edge
            sideX = 'left'
            testX = rect.x;
        }
        else if (this.cx > rect.x + rect.width) {
            // right edge
            sideX = 'right'
            testX = rect.x + rect.width
        }

        if (this.cy < rect.y) {
            // top edge
            sideY = 'top'
            testY = rect.y
        }
        else if (this.cy > rect.y + rect.height) {
            // bottom edge
            sideY = 'bottom'
            testY = rect.y + rect.height
        };

        // get distance from closest edges
        const distX = this.cx - testX;
        const distY = this.cy - testY;
        const distance = Math.sqrt((distX * distX) + (distY * distY));

        const result = {
            test: distance <= this.radius,
            sideX,
            sideY
        }
        return result
    }
}