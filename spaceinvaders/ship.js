class Ship extends Spaceobject {

    constructor() {

        super();

        this.pos = createVector(width / 2, height / 2);
        this.vel = createVector(0, 0);
        this.r = 20;
        this.heading = 0;
        this.isRotating = false;
        this.isThrusting = false;
        this.rotateDirection;

        this.lasers = [];
    }


    update() {

        this.pos.add(this.vel);
        this.vel.mult(0.98); // add friction to slow down

        this.rotateShip();
        this.thrustShip();
        this.edges();

    }


    rotateShip() {
        if (this.isRotating) {
            if (this.rotateDirection == 'left') {
                this.heading -= 0.1;
            } else if (this.rotateDirection == 'right') {
                this.heading += 0.1;
            }
        }
    }

    thrustShip() {
        if (this.isThrusting) {
            const force = p5.Vector.fromAngle(this.heading - PI / 2);
            force.setMag(2);
            this.addForce(force);
        }
    }

    shoot() {
        const laser = new Laser(this.pos, this.heading);
        this.lasers.push(laser);
    }


    addForce(force) {
        this.vel.add(force);
        this.vel.limit(4);
    }


    show() {


        this.lasers.forEach(laser => {
            laser.show();
            laser.update();
        })


        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading)
        stroke(255);
        strokeWeight(2);
        fill(0);

        beginShape();
        vertex(0, -this.r);
        vertex(-this.r, this.r * 1.5);
        vertex(this.r, this.r * 1.5);
        endShape(CLOSE);
        pop();


    }



    thrust() {
        this.isThrusting = true;
    }

    rotateRight() {
        this.rotateDirection = 'right';
        this.isRotating = true;

    }

    rotateLeft() {
        this.rotateDirection = 'left';
        this.isRotating = true;

    }
}