class Spline {


    constructor(theta) {
        this.theta = theta;
        this.percentage = 0;



        const p1x = map(theta, 0, 1, 100, 200);
        const p1y = 100;

        const p2x = map(theta, 0, 1, width - 100, width - 200);
        const p2y = 100;

        const c1x = map(theta, 0, 1, width / 2 - 100, width / 2 + 100);
        const c1y = height;


        this.point1 = createVector(p1x, p1y);
        this.point2 = createVector(p2x, p2y);
        this.control1 = createVector(c1x, c1y);
        this.dotsize = 3;
        this.numberofdots = 50;
        // this.speed = map(theta, 0, 1, 0.001, 0.006);
        // this.speed = random(0.001, 0.006);
        this.speed = 0.003;


    }


    update() {
        this.percentage += this.speed;
    }


    show() {

        noStroke();


        for (let i = 0; i < this.numberofdots; i++) {
            const p = (this.percentage + (i / this.numberofdots)) % 1;
            let d1 = p5.Vector.lerp(this.point1, this.control1, p);
            let d2 = p5.Vector.lerp(this.control1, this.point2, p);
            let dot = p5.Vector.lerp(d1, d2, p);
            const v = p - 0.5;
            const w = 1 / Math.exp(v * v);
            const b = map(w, 0.8, 1, 0, 255);
            fill(b);
            ellipse(dot.x, dot.y, this.dotsize, this.dotsize);
        }

        // fill(255, 0, 0);
        // ellipse(this.point1.x, this.point1.y, 10, 10);
        // ellipse(this.point2.x, this.point2.y, 10, 10);
        // fill(0, 255, 0);
        // ellipse(this.control1.x, this.control1.y, 10, 10);

    }
}