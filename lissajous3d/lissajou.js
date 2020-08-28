class Lissajou {


    constructor(i, j, k) {
        this.i = i;
        this.j = j;
        this.k = k;

        this.r = (grid * 0.8) / 2;
        this.x = (this.i * grid) + (grid * 0.5);
        this.y = (this.j * grid) + (grid * 0.5);
        this.z = (this.k * grid) + (grid * 0.5);

        this.hi = map(i, 1, cols, 0, 255);
        this.hj = map(j, 1, rows, 0, 255);
        const p = i / Math.max(1, j + i);
        this.hue = (this.hi * p) + (this.hj * (1 - p));




        this.speed = 0.033;
        this.points = [];
        this.pointsSize = map(this.i + this.j, 0, cols + rows, 100, 200);

        this.thetaX = PI;
        this.thetaY = PI;
        this.thetaZ = PI;
    }

    clearHistory() {
        this.points = [];
    }


    update() {

        if (this.i == 0) {
            this.thetaX -= (this.j) * this.speed;
            this.thetaY -= (this.j) * this.speed;
        } else if (this.j == 0) {
            this.thetaX -= (this.i) * this.speed;
            this.thetaY -= (this.i) * this.speed;
        } else {
            this.thetaX -= (this.i) * this.speed;
            this.thetaY -= (this.j) * this.speed;
        }
        this.thetaZ -= (this.k) * this.speed;



        if (this.points.length > this.pointsSize) {
            this.points.splice(0, 1);
        }
    }

    show() {


        if (this.i > 0 || this.j > 0) {

            push();
            translate(this.x - width / 2, this.y - height / 2, 0);

            noFill();
            stroke(this.hue, 150, 150);
            strokeWeight(grid / 50);

            beginShape();
            this.points.forEach(pt => {
                vertex(pt.x, pt.y, pt.z);
            })
            endShape();




            const x = sin(this.thetaX) * this.r;
            const y = cos(this.thetaY) * this.r;
            const z = (Math.pow(cos(this.thetaZ), 2)) * this.r;
            const pt = createVector(x, y, z);

            // fill(this.hue, 230, 230);
            // noStroke();
            // ellipse(pt.x, pt.y, grid / 15, grid / 15);


            // if (Math.random() > 0.9) {
            this.points.push(pt);
            // }


            // stroke(0, 0, 30);
            // strokeWeight(grid / 100);
            // if (this.i == 0 && this.j > 0) {
            //     line(pt.x, pt.y, width, pt.y);
            //     noFill();
            //     // ellipse(0, 0, this.r * 2, this.r * 2);

            // }
            // if (this.j == 0 && this.i > 0) {
            //     line(pt.x, pt.y, pt.x, height);
            //     noFill();
            //     // ellipse(0, 0, this.r * 2, this.r * 2);
            // }


            pop();

        }




    }
}