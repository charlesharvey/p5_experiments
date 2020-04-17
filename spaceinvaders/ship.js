class Ship {

    constructor() {


        this.width = 70;
        this.pos = createVector(width / 2, height - border);
        this.vel = createVector(0, 0);

        this.direction = 'left';
        this.isMoving = false;


        this.rotateDirection;

        this.lasers = [];
    }


    update() {



        this.moveShip();


        this.edges();


    }


    moveShip() {
        if (this.isMoving) {
            if (this.direction == 'left') {
                this.vel.x = -6;
            } else if (this.direction == 'right') {
                this.vel.x = 6;
            }

            this.pos.add(this.vel);
        }
    }



    shoot() {
        const laser = new Laser(this.pos);
        this.lasers.push(laser);
    }



    edges() {
        if (this.pos.x > width) {
            this.isMoving = false;
        } else if (this.pos.x < 0) {
            this.isMoving = false;
        }

    }

    show() {


        this.lasers.forEach(laser => {
            laser.show();
            laser.update();
        })


        push();
        translate(this.pos.x, this.pos.y);

        noStroke(255);
        fill(255);

        rectMode(CENTER);
        rect(0, 0, this.width, 10);
        rect(0, -10, this.width / 3, 10);


        pop();


    }



    moveRight() {
        this.direction = 'right';
        this.isMoving = true;

    }

    moveLeft() {
        this.direction = 'left';
        this.isMoving = true;

    }
}