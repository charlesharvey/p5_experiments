class Drop {


    constructor() {
        this.pos = createVector(random(width), random(height));

        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.i = this.whichI(this.pos.x);
        this.j = this.whichJ(this.pos.y);

        this.r = 2;
        this.m = random(2.1, 5.1);

        this.theta = random(1000, 100000);



    }

    update() {




        this.pos.add(this.vel);
        this.vel.add(this.acc);
        // this.acc.mult(0);

        if (this.pos.y > height - groundHeight) {
            this.pos.y = height - groundHeight;

        }
        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }


        this.acc.limit(this.m);
        this.vel.limit(this.m);

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
        const h = map(this.pos.y * this.pos.y, 0, height * height, 0, -0.07);
        const heatForce = createVector(0, h);
        this.applyForce(heatForce);

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
        ellipse(this.pos.x, this.pos.y, this.m / 2, this.m / 2)

    }
}