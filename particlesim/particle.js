class Particle {





    constructor(x, y, type) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(), random());
        this.acc = createVector(0, 0);
        this.type = type;   // gloopton   blargon zeptron

        if (this.type == 'blargon') {
            this.hue = color(100, 100, 255);
            this.repelDistance = 10;
            this.attractDistance = 100;
        } else if (this.type == 'zeptron') {
            this.hue = color(255, 100, 100);
            this.repelDistance = 9;
            this.attractDistance = 100;

        } else { //gloopton
            this.hue = color(55, 200, 100);
            this.repelDistance = 3;
            this.attractDistance = 100;

        }
    }


    applyForce(force) {
        this.acc.add(force);
    }





    attracted(other) {


        const d = dist(other.pos.x, other.pos.y, this.pos.x, this.pos.y);

        if (d > this.attractDistance) {

        } else {

            const force = p5.Vector.sub(other.pos, this.pos);
            let dir2 = force.magSq(); // square the distance between the other and current position;
            dir2 = constrain(dir2, 0, 1000);
            const g = 4.987;
            const strength = g / dir2;
            force.setMag(strength);


            const multiplier = this.particleForce(this, other, d);
            force.mult(multiplier);

            if (d < this.repelDistance) {
                force.mult(0.1);
                //     // } else {
            }
            // } else {
            //     force.mult(-1);
            // }



            this.applyForce(force);
        }


    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(4);
        this.acc.mult(0); // createVector(0, 0);
        // this.acc.mult(0.9);

        this.edges();
    }


    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }


        if (this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }


    }

    show() {

        fill(this.hue);
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }


    particleForce(p1, p2, distance) {
        if (p1.type == 'gloopton' && p2.type == 'gloopton') {

            if (distance < p1.repelDistance) {
                return 3;
            } else {
                return 7;
            }

        }
        if (
            p1.type == 'gloopton' && p2.type == 'blargon' ||
            p2.type == 'gloopton' && p1.type == 'blargon') {
            if (distance < p1.repelDistance) {
                return 1;
            } else {
                return -3;
            }
        }
        if (
            p1.type == 'gloopton' && p2.type == 'zeptron' ||
            p2.type == 'gloopton' && p1.type == 'zeptron') {
            if (distance < p1.repelDistance) {
                return 2;
            } else {
                return 3;
            }
        }

        if (p1.type == 'blargon' && p2.type == 'blargon') {
            if (distance < p1.repelDistance) {
                return -3;
            } else {
                return 4;
            }
        }
        if (
            p1.type == 'blargon' && p2.type == 'zeptron' ||
            p2.type == 'blargon' && p1.type == 'zeptron') {
            if (distance < p1.repelDistance) {
                return 5;
            } else {
                return 0;
            }
        }

        if (p1.type == 'zeptron' && p2.type == 'zeptron') {
            if (distance < p1.repelDistance) {
                return -2;
            } else {
                return -2;
            }
        }

    }


}
