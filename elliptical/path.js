class Path {

    constructor(theta) {
        this.theta = theta;
        this.bouncedPoint;
        this.percentAtBounce;

        this.calcBouncePoint();

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

        if (this.bouncedPoint) {
            if (percentage < 0.5) {
                const x1 = lerp(f1.x, this.bouncedPoint.x, percentage * 2);
                const y1 = lerp(f1.y, this.bouncedPoint.y, percentage * 2);
                ellipse(x1, y1, 1, 1);
            } else {
                const x2 = lerp(this.bouncedPoint.x, f2.x, (percentage - 0.5) * 2);
                const y2 = lerp(this.bouncedPoint.y, f2.y, (percentage - 0.5) * 2);
                ellipse(x2, y2, 1, 1);
            }
        }





    }
}