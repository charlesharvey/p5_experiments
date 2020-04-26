class Molecule {


    constructor(x, y) {
        this.particles = [];
        this.pos = createVector(x, y);
        this.vel = createVector(random(), random());
        this.acc = createVector(0, 0);
        this.charge = 0;
    }



    addParticle(particle) {
        this.particles.push(particle);
        this.particles.forEach((p, i) => {
            p.angle = i / this.particles.length * TWO_PI;
        })
        this.updateCharge();
    }



    updateCharge() {
        let t = 0;
        this.particles.forEach(p => {
            t += p.charge
        });
        this.charge = t;
    }

    applyForce(force) {
        this.acc.add(force);
    }


    collided(other) {

        if (other.vel.mag() + this.vel.mag() > 10) {
            const d = dist(other.pos.x, other.pos.y, this.pos.x, this.pos.y);
            if (d < 10) {
                return true;

            }
        }



    }

    splitInTwo() {

        const m1 = new Molecule();
        const m2 = new Molecule();
        this.particles.forEach(p => {
            if (Math.random() > 0.5) {
                m1.addParticle(p);
            } else {
                m2.addParticle(p)
            }
        });
        m1.pos.x = random(width);
        m2.pos.x = random(width);


        return [m1, m2];


    }

    bonded(other) {
        if (this.oppositeCharge(other)) {
            const d = dist(other.pos.x, other.pos.y, this.pos.x, this.pos.y);
            if (d < 15) {

                other.particles.forEach(op => {
                    this.addParticle(op);
                });

                this.pos.add(other.pos);
                this.pos.div(2);
                this.vel.add(other.vel);
                this.vel.div(2);


                return true;
            }
        }

    }

    oppositeCharge(other) {
        let oc = other.charge;
        let tc = this.charge;

        return (oc < 0 && tc > 0) || (oc > 0 && tc < 0);

    }

    sameCharge(other) {
        let oc = other.charge;
        let tc = this.charge;
        return (oc < 0 && tc < 0) || (oc > 0 && tc > 0);
    }


    attracted(other) {

        let oc = other.charge;
        let tc = this.charge;



        let attracting = (oc < 0 && tc > 0) || (oc > 0 && tc < 0);
        let repelling = (oc < 0 && tc < 0) || (oc > 0 && tc > 0);

        const force = p5.Vector.sub(other.pos, this.pos);
        let dir2 = force.magSq(); // square the distance between the other and current position;
        dir2 = constrain(dir2, 0, 1000);
        const g = 0.487;
        const strength = g / dir2;
        force.setMag(strength);

        if (attracting) {

        } else if (repelling) {
            force.mult(-0.4);
        } else {
            const d = dist(other.pos.x, other.pos.y, this.pos.x, this.pos.y);
            if (d > 10) {
                force.mult(0.01);
            } else {
                force.mult(-3);
            }

        }




        this.applyForce(force);


        //  if ((oc != 0 && tc != 0)) {
        // } // end of if they are opposite charges
    }




    update() {


        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(6);
        this.acc.mult(0); // createVector(0, 0);

        // this.pushawayfromedges();
        this.edges();
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        this.particles.forEach(p => {
            p.show();
        })
        pop();
    }




    pushawayfromedges() {
        if (this.pos.x > width) {
            this.vel.x *= -1;
        } else if (this.pos.x < 0) {
            this.vel.x *= -1;
        }
        if (this.pos.y > height) {
            this.vel.y *= -1;
        } else if (this.pos.y < 0) {
            this.vel.y *= -1;
        }
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



}