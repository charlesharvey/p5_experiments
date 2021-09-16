class Spline {


    constructor(theta) {
        this.theta = theta;
        this.percentage = 0;



        const p1x = map(theta, 0, 1, 100, 200);
        const p1y = height / 2;

        const p2x = map(theta, 0, 1, width - 100, width - 200);
        const p2y = height / 2;

        const c1x = map(theta, 0, 1, width / 2 - 400, width / 2 - 300);
        const c1y = map(theta, 0, 1, -50, -150)

        const c2x = map(theta, 0, 1, width / 2 + 300, width / 2 + 400);
        const c2y = map(theta, 0, 1, height + 500, height + 650)


        this.point1 = createVector(p1x, p1y);
        this.point2 = createVector(p2x, p2y);
        this.control1 = createVector(c1x, c1y);
        this.control2 = createVector(c2x, c2y);
        this.dotsize = 3;
        this.numberofdots = 50;
        // this.speed = map(theta, 0, 1, 0.001, 0.004);
        this.speed = random(0.001, 0.004);
        // this.speed = 0.003;


    }


    update() {
        this.percentage += this.speed;
    }


    show() {

        noStroke();




        const cc1 = p5.Vector.add(this.control1, target);
        const cc2 = p5.Vector.add(this.control2, target);

        for (let i = 0; i < this.numberofdots; i++) {
            const p = (this.percentage + (i / this.numberofdots)) % 1;
            let d1 = p5.Vector.lerp(this.point1, cc1, p);
            let d2 = p5.Vector.lerp(cc1, this.point2, p);


            let p1 = p5.Vector.lerp(d1, d2, p);
            let d3 = p5.Vector.lerp(this.point1, cc2, p);
            let d4 = p5.Vector.lerp(cc2, this.point2, p);
            let p2 = p5.Vector.lerp(d3, d4, p);
            let g1 = p5.Vector.lerp(p1, p2, p);


            let dot = g1; //p1;

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