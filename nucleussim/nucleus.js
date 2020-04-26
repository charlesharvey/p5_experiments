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
    }


    updateAngles() {
        this.electrons.forEach((p, i) => {
            p.angle = i / this.electrons.length * TWO_PI;
        })
        this.quarks.forEach((p, i) => {
            p.angle = i / this.quarks.length * TWO_PI;
        })
    }


    addParticle(particle) {
        if (particle.type == 'electron') {
            particle.inAtom = true;
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

        const prot = this.quarks.filter(q => q.type == 'proton').length;
        if (prot > 0) {
            const labels = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne']
            this.label = labels[prot - 1]
        }



    }

    applyForce(force) {
        this.acc.add(force);
    }





    weakforcebonded(other) {

        const other_neut_number = other.quarks.filter(q => q.type === 'neutron').length;
        const other_prot_number = other.quarks.filter(q => q.type === 'proton').length;
        const this_neut_number = this.quarks.filter(q => q.type === 'neutron').length;
        const this_prot_number = this.quarks.filter(q => q.type === 'proton').length;
        const nn = Math.abs(other_neut_number + this_neut_number - this_prot_number - other_prot_number);

        if (this.charge == 0 && other.charge == 0) {

            if (this_prot_number + this_neut_number < 12 && other_neut_number + other_prot_number < 12) {
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

        } else if (repelling) {
            force.mult(-0.4);
        } else {
            const d = dist(other.pos.x, other.pos.y, this.pos.x, this.pos.y);
            if (d > 30) {
                force.mult(0.001);
            } else {
                force.mult(-3);
            }
        }


        this.applyForce(force);


    }




    update() {


        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.acc.mult(0); // createVector(0, 0);

        // this.pushawayfromedges();
        this.edges();


        if (this.electrons.length > 0 && this.quarks.length > 0) {
            this.theta += 0.1;
        }
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        this.quarks.forEach(p => {
            p.show();
        })


        push();
        rotate(this.theta);
        this.electrons.forEach(p => {
            p.show();
        })
        pop();


        if (this.label) {

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