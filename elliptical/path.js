class Path {

    constructor(theta) {
        this.theta = theta;
        this.bouncedPoint;
        this.percentAtBounce;



        this.pos = f1.copy();
        this.vel = p5.Vector.fromAngle(theta);
        this.vel.setMag(1);
        this.bounced = false;
        this.finished = false;

        this.c = map(this.theta % TWO_PI, 0, TWO_PI, 0, 255);

        // this.calcBouncePoint();

    }

    calcBouncePoint() {
        for (let p = 0; p < 3140; p++) {
            if (!this.bouncedPoint) {


                const x1 = sin(this.theta) * (p / 3140 * a) + f1.x;
                const y1 = cos(this.theta) * (p / 3140 * a) + f1.y;

                if (this.outsideEllipse(x1, y1)) {
                    this.bouncedPoint = createVector(x1, y1);
                }
            }
        }
    }

    update() {
        this.pos.add(this.vel);

        if (this.bounced) {
            const d = this.pos.dist(f2);
            if (d < 5) {
                this.finished = true;
            }
        } else {


            if (this.outsideEllipse(this.pos.x, this.pos.y)) {
                this.vel = p5.Vector.sub(f2, this.pos);
                this.vel.setMag(1);
                this.bounced = true;
            }
        }
    }

    radiusAtAngle(theta) {
        const r = (a * b) / (Math.sqrt(Math.pow(a * cos(theta), 2) + (Math.pow(b * sin(theta), 2))));
        return r;
    }

    outsideEllipse(x, y) {

        const d1 = dist(x, y, f1.x, f1.y);
        const d2 = dist(x, y, f2.x, f2.y);

        if (d1 + d2 >= 2 * a) {
            return true;
        }
        return false;
    }

    show() {

        // fill(255, 0, 205, 90);

        fill(this.c, 100, 100);
        ellipse(this.pos.x, this.pos.y, 2, 2);


        // const x1 = sin(this.theta) * (percentage * a) + f1.x;
        // const y1 = cos(this.theta) * (percentage * a) + f1.y;

        // if (this.outsideEllipse(x1, y1)) {

        //     if (!this.bouncedPoint) {
        //         this.bouncedPoint = createVector(x1, y1);
        //         this.percentAtBounce = percentage;
        //     }

        //     const p = map(percentage, this.percentAtBounce, 1, 0, 1);
        //     const x2 = lerp(this.bouncedPoint.x, f2.x, p);
        //     const y2 = lerp(this.bouncedPoint.y, f2.y, p);
        //     ellipse(x2, y2, 1, 1);


        // } else {
        //     ellipse(x1, y1, 1, 1);
        // }


        // noStroke();
        // fill(255, 100);


        // if (this.bouncedPoint) {
        //     if (percentage < 0.5) {
        //         const x1 = lerp(f1.x, this.bouncedPoint.x, percentage * 2);
        //         const y1 = lerp(f1.y, this.bouncedPoint.y, percentage * 2);
        //         ellipse(x1, y1, 2, 2);
        //     } else {
        //         const x2 = lerp(this.bouncedPoint.x, f2.x, (percentage - 0.5) * 2);
        //         const y2 = lerp(this.bouncedPoint.y, f2.y, (percentage - 0.5) * 2);
        //         ellipse(x2, y2, 2, 2);
        //     }
        // }





    }
}