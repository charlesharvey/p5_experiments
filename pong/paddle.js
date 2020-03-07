class Paddle {


    constructor(x, y, movement) {
        this.x = x;
        this.y = y;
        this.height = paddleHeight;
        this.width = paddleThickness;

        this.score = 0;
        this.movement = 10;
    };


    move(dir) {
        if (dir == 'ArrowUp') {
            this.y = Math.max(0, this.y - this.movement);
        } else if (dir == 'ArrowDown') {
            this.y = Math.min(height - this.height, this.y + this.movement);
        }
    }

    show() {
        fill(200);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }

    addPoint() {
        this.score++;
    }


    ai(ball) {



        if (ball.pos.y > this.y + this.height) {
            this.move('ArrowDown');
        } else if (ball.pos.y < (this.y + (this.height / 2))) {
            this.move('ArrowUp');
        }




    }

}