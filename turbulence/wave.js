class Wave {
    constructor(h) {
        this.height = h;
        this.points = [];
        this.theta = random();
        this.thetaSpeed = random(0.1, 0.3);

        this.ratio = random();
        this.numberofpoints = 50;
        this.heightRange = 15;

        this.seed = random(1000, 10000);
        this.zetaSpeed = 0.1;
        this.zeta = random();
        this.sinratio = random(1, 10);
        noiseSeed(this.seed);

        this.opacity = map(h, 0, height, 10, 200);

        for (let i = 0; i < this.numberofpoints; i++) {
            const x = map(i, 0, this.numberofpoints - 1, 100, width - 100);
            const p = createVector(x, this.height);
            this.points.push(p);

        }

    }

    update() {
        this.theta += this.thetaSpeed;
        this.zeta += this.zetaSpeed;
        this.ratio = map(sin(this.theta), -1, 1, 0.3, 0.7);
        this.heightRange = map(sin(this.theta), -1, 1, 6, 26);


        this.points.forEach((p, i) => {
            const newY = map((noise(i + this.theta) * (1 / this.ratio)) + (sin((i / this.sinratio) + this.theta) * this.ratio), -1, 2, this.heightRange * -1, this.heightRange);
            p.y = newY + this.height;
        })




    }

    show() {


        stroke(100, 190, 255, this.opacity);
        strokeWeight(1);
        noFill();

        beginShape();
        this.points.forEach(p => {
            vertex(p.x, p.y);
        })
        endShape();

        // push();

        // translate(0, this.height);

        // line(0, 0, width, 0);
        // pop();
    }
}