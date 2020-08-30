class Cell {

    constructor() {
        this.pos = createVector(random(width), random(height));

        this.i = this.whichI(this.pos.x);
        this.j = this.whichJ(this.pos.y);


        this.vel = p5.Vector.random2D();
        this.vel.setMag(2);
        this.r = grid / 2;


        this.heading = 0; // this.vel.heading();



        this.maxSpeed = cellMaxSpeed;  // how fast can cell go


        this.senseRange = cellSenseRange;
        this.distancesToCheck = 4;
        this.sensePrecision = cellSensePrecision;

        // how much pheremone does the cell put down
        this.pheremoneStrength = random(0.5, 1);
    }

    update() {
        this.pos.add(this.vel);
        this.i = this.whichI(this.pos.x);
        this.j = this.whichJ(this.pos.y);

        // this.heading = this.vel.heading();


        // if about to go off board, bounce them;
        if (this.pos.x < 0) {
            this.pos.x = width;
        } else if (this.pos.x > width) {
            this.pos.x = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
        } else if (this.pos.y > height) {
            this.pos.y = 0;
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

    depositPheremone() {

        if (this.i && this.j) {

            pheremones[this.i][this.j] += this.pheremoneStrength;

        }

    }



    sensePheremone() {

        // see which direction the most amount of pheremone is
        let recordtheta;
        let recordAmount = -1;


        const starttheta = this.heading;
        for (let theta = starttheta; theta < TWO_PI + starttheta; theta += (TWO_PI / this.sensePrecision)) {

            // another loop to check different positions away at a specif angle;
            // ie check 90 degrees , but at 1m 2m 3m and 4m away. add them all up

            let amountAtThisAngle = 0;
            for (let d = 1; d <= this.distancesToCheck; d++) {
                const r = (this.senseRange * (d / this.distancesToCheck))
                const x = sin(theta) * r;
                const y = cos(theta) * r;
                const ti = this.whichI(this.pos.x + x);
                const tj = this.whichJ(this.pos.y + y);
                if (ti && tj) {
                    const tval = pheremones[ti][tj];
                    amountAtThisAngle += tval;
                }

            }

            if (amountAtThisAngle > recordAmount) {

                recordAmount = amountAtThisAngle;
                recordtheta = theta;
            }



        }

        if (recordtheta) {
            const newDir = p5.Vector.fromAngle(recordtheta);
            this.vel = p5.Vector.lerp(this.vel, newDir, 0.2);
            this.vel.setMag(this.maxSpeed);
        }




    };




    show() {

        noStroke();
        fill(0, 0, 100);
        ellipse(this.pos.x, this.pos.y, this.r, this.r)

    }
}