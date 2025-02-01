
export class Ball {
    constructor() {

        this.ball = document.createElement('img');
        this.ball.src = 'https://cdn-icons-png.flaticon.com/256/2527/2527964.png'
        this.ball.id = 'ball'

        this.container = this.ball
        this.ballX = 10;
        this.ballY = 10;
        this.ballVelocityX = 3;
        this.ballVelocityY = 2;
        this.ballGame = null;
        this.lives=5;

    }

    animate(ballContainer) {

        const containerRect = ballContainer.getBoundingClientRect();
        const ballRect = this.ball.getBoundingClientRect();

        //updating velocity of the ball
        this.ballX += this.ballVelocityX;
        this.ballY += this.ballVelocityY;

        let ballRadius = ballRect.width / 2;
        let ballCenterX = this.ballX + ballRadius;
        let ballCenterY = this.ballY + ballRadius;

        //detecting ball collision with container edges and directing the ball within the container edges
        //x-Axis (Left and Right edges)
        if (ballCenterX + ballRadius > containerRect.right || ballCenterX - ballRadius < containerRect.left - 10) {
            this.ballVelocityX *= -1; //reverse the velocity means reversing ball direction on x-axis
        }

        //y-Axis (Top and Bottom edges)
        if (ballCenterY + ballRadius > containerRect.bottom - 5 ) {
            this.ballVelocityY *= -1; //reverse the velocity means reversing ball direction on y-axis
            this.lives--;
            if(this.lives <= 0){
                console.log('game over')
            }
        }else if(ballCenterY - ballRadius < containerRect.top - 10){
            this.ballVelocityY *= -1;


        }

        //visualize the updated ball position to the user
        this.ball.style.left = this.ballX + 'px';
        this.ball.style.top = this.ballY + 'px';

        //   setTimeout(() => this.animate(ballContainer), 10);
    }
}

new Ball();
