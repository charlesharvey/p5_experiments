class Ball {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = ballSize;
        this.reset();
        this.bouncing = false;


    }


    reset() {
        this.pos = createVector(this.x, this.y);
        const ranx = random([-3, -4, -5, 3, 4, 5]);
        const rany = random([-3, -4, -5, 3, 4, 5]);
        this.vel = createVector(ranx, rany);
    }


    update(player1, player2) {

        let x = this.pos.x;
        let y = this.pos.y;



        if (y <= 0) {

            this.bounceY();
        } else if (y > (height - this.size)) {
            this.bounceY();
        }



        if (x < paddleThickness) {

            if (y < (player2.y + player2.height) && y > (player2.y)) {
                this.bounceX(player2.y);
            }

        } else if (x > (width - paddleThickness - this.size)) {
            if (y < (player1.y + player1.height) && y > (player1.y)) {
                this.bounceX(player1.y);
            }
        }



        this.pos.add(this.vel);

        if (this.x > paddleThickness && this.x < (width - paddleThickness)) {
            this.bouncing = false;
        }

    }

    bounceY() {
        if (this.bouncing == false) {
            this.bouncing = true;

            this.vel.y *= -1;
        }
    }

    bounceX(ypos) {
        if (this.bouncing == false) {
            this.bouncing = true;

            // change the angle of the ball based on
            // where it hit the paddle
            const newy = map(this.pos.y, ypos, ypos + paddleHeight, -5, 5);
            this.vel.y = newy;
            this.vel.x *= -1.07; // get a bit faster each time
        }
    }

    pointScored() {
        if (this.pos.x <= 0) {
            this.bounceX();
            this.reset();
            return 2;

        } else if (this.pos.x > (width - this.size)) {
            this.bounceX();
            this.reset();
            return 1;

        }
        return null;
    }

    show() {
        fill(255, 255, 100);

        rect(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size);
        // ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}