class Drop {


    constructor() {
        this.pos = createVector(random(width), random(0, height / 2));

        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.i = this.whichI(this.pos.x);
        this.j = this.whichJ(this.pos.y);


        this.m = random(4.1, 6.1);
        this.r = (9 - this.m) / 2;

        this.theta = random(1000, 100000);



    }

    update() {




        this.pos.add(this.vel);
        this.vel.add(this.acc);

        this.vel.limit(this.m);
        this.acc.limit(this.m);



        // this.acc.mult(0);

        if (this.pos.y > height - groundHeight) {
            this.pos.y = height - groundHeight;

        }
        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }






        this.i = this.whichI(this.pos.x);
        this.j = this.whichJ(this.pos.y);


        this.theta += 0.1;

    }


    applyForce(force) {
        this.acc.add(force);
    }


    turbulence() {
        const turb = createVector(map(noise(this.theta), 0, 1, -1, 1), 0);
        turb.mult(0.0007);
        this.applyForce(turb);
    }


    convect() {
        const h = map(this.pos.y * this.pos.y, 0, height * height, 0, -convectionStrength);
        const heatForce = createVector(0, h);


        // heatForce.mult((this.pos.x * 2) / width);

        this.applyForce(heatForce);

    }



    wind() {
        if (this.pos.y > (height * 2 / 3)) {
            this.applyForce(wind);
        } else if (this.pos.y < height / 3) {
            this.applyForce(negativewind);
        }
    }


    whichI(x) {
        const i = Math.floor(x / grid);

        if (i > 0 && i < cols) {
            return i;
        }
        return null;
    }

    whichJ(y) {
        const j = Math.floor(y / grid);
        if (j > 0 && j < rows) {
            return j;
        }
        return null;
    }


    show() {
        noStroke();
        fill(200, 20, 90);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);

    }
}