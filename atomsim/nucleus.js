class Nucleus {


    constructor(x, y) {
        this.quarks = [];
        this.electrons = [];
        this.pos = createVector(x, y);
        this.vel = createVector(random(), random());
        this.acc = createVector(0, 0);
        this.charge = 0;
        this.theta = 0;
        this.label = '';
        this.atomicnumber = 0;
    }


    updateAngles() {
        const el = (this.electrons.length);
        const ql = (this.quarks.length);
        this.electrons.forEach((p, i) => {
            if (i < 2) {
                p.angle = (i % 2) / 2 * TWO_PI;
            } else {

                let m = 4;
                if (el == 3) {
                    m = 1
                } else if (el == 4) {
                    m = 2;
                } else if (el == 5) {
                    m = 3;
                }
                p.angle = (((i % m) / m) * TWO_PI) + PI / 2;
                if (i >= 6) {
                    p.angle += 0.23;
                }
            }

            p.index = i;
            p.companions = el;
        })
        this.quarks.forEach((p, i) => {
            p.angle = i / ql * TWO_PI;
            p.index = i;
            p.companions = ql;
        })
    }


    addParticle(particle) {
        if (particle.type == 'electron') {
            this.electrons.push(particle);
        } else {
            this.quarks.push(particle);

        }
        this.updateAngles();
        this.updateCharge();
    }



    updateCharge() {
        let t = 0;
        this.quarks.forEach(p => {
            t += p.charge
        });
        this.electrons.forEach(p => {
            t += p.charge
        });
        this.charge = t;

        this.atomicnumber = this.quarks.filter(q => q.type == 'proton').length;
        if (this.atomicnumber > 0) {
            const labels = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne']
            this.label = labels[this.atomicnumber - 1]
        }



    }

    applyForce(force) {
        this.acc.add(force);
    }





    strongforcebonded(other) {

        const other_neut_number = other.quarks.filter(q => q.type === 'neutron').length;
        const other_prot_number = other.atomicnumber;
        const this_neut_number = this.quarks.filter(q => q.type === 'neutron').length;
        const this_prot_number = this.atomicnumber;
        const nn = Math.abs(other_neut_number + this_neut_number - this_prot_number - other_prot_number);

        const totch = Math.abs(this.charge + other.charge);
        if (totch < 1) {

            if (this_prot_number + other_prot_number <= 10) {
                if (this_prot_number > 0 || other_prot_number > 0) {
                    if (this_neut_number == 1 || other_neut_number == 1) {
                        if (nn == 0 || nn == 1) {
                            const d = dist(other.pos.x, other.pos.y, this.pos.x, this.pos.y);
                            if (d < 20) {
                                this.joinParticles(other);
                                return true;
                            }
                        }
                    }
                }
            }
        }


    }


    joinParticles(other) {
        other.quarks.forEach(op => {
            this.addParticle(op);
        });
        other.electrons.forEach(op => {
            this.addParticle(op);
        });

        this.pos.add(other.pos);
        this.pos.div(2);
        this.vel.add(other.vel);
        this.vel.div(2);

        // if (this.quarks.filter(q => q.type == 'proton').length > 1) {
        //     console.log(this.label);
        // }

    }



    eletrobonded(other) {
        if (this.oppositeCharge(other)) {

            const d = dist(other.pos.x, other.pos.y, this.pos.x, this.pos.y);
            if (d < 15) {
                this.joinParticles(other);
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



    calculateNewtonsForce(other) {
        const force = p5.Vector.sub(other.pos, this.pos);
        let dir2 = force.magSq(); // square the distance between the other and current position;
        dir2 = constrain(dir2, 0, 300);
        const g = 6.487;
        const strength = g / dir2;
        force.setMag(strength);
        return force;
    }

    electromagnetism(other) {

        let oc = other.charge;
        let tc = this.charge;

        let force = this.calculateNewtonsForce(other);


        let attracting = (oc < 0 && tc > 0) || (oc > 0 && tc < 0);
        let repelling = (oc < 0 && tc < 0) || (oc > 0 && tc > 0);

        if (attracting) {
            force.mult(3);
        } else if (repelling) {
            force.mult(-1.5);
        } else {
            const d = dist(other.pos.x, other.pos.y, this.pos.x, this.pos.y);
            if (d > 20) {
                force.mult(0.001);
            } else {
                force.mult(-30);
            }
        }


        this.applyForce(force);


    }




    update() {


        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(4);
        this.acc.mult(0); // createVector(0, 0);

        // this.pushawayfromedges();
        this.edges();


        if (this.electrons.length > 0 && this.quarks.length > 0) {
            this.theta += 0.05;
        }
    }

    show() {



        push();
        translate(this.pos.x, this.pos.y);

        const ql = this.quarks.length;
        if (ql >= 6) {
            fill(200, 55, 100);
            ellipse(0, 0, 10 + ql, 10 + ql);
        }

        this.quarks.forEach(p => {
            p.show();
        })


        push();
        rotate(this.theta);
        this.electrons.forEach(p => {
            p.show();
        })
        pop();


        if (this.label && !showTrails) {

            fill(255);
            noStroke();
            text(this.label, 10, 10);
        }



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