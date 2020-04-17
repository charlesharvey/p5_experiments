class Enemy {

    constructor(x, y) {



        this.pos = createVector(x, y);
        this.vel = createVector(4, 0);
        this.width = grid - 10;
        this.height = 15;

    }


    update() {
        this.pos.add(this.vel);
        this.edges();

    }




    edges() {
        if (this.pos.x > width - grid) {
            this.vel.x *= -1.01;
            this.pos.y += this.height * 1.5;
        } else if (this.pos.x < 0) {
            this.vel.x *= -1.01;
            this.pos.y += this.height * 1.5;
        }

    }

    show() {

        push();
        translate(this.pos.x, this.pos.y);
        fill(255, 0, 0);
        noStroke();
        rectMode(CENTER);
        rect(0, 0, this.width, this.height);


        pop();
    }




    collided(ship, offset) {
        const d = dist(ship.pos.x, ship.pos.y, this.pos.x, this.pos.y);
        if (d < this.r + offset) {
            return true;
        }
        return false;
    }


}