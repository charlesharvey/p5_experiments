class Checkpoint {


    constructor() {

        const buffer = 100;
        const x = random(buffer, width - buffer);
        const y = random(buffer, height - buffer);
        this.pos = createVector(x, y);

        this.r = 40;
        this.car = null;
        this.time = 0;

    }


    hitCheckpoint(car) {
        if (!this.touched) {
            const d = dist(this.pos.x, this.pos.y, car.pos.x, car.pos.y);
            if (d < this.r) {

                this.car = car;
                this.time = 0;

            }
        }


    }

    update() {
        if (this.car) {
            this.time += 0.5;
        }

        if (this.time > 100) {
            this.car = null;
            this.time = 0;
        }
    }


    show() {

        if (this.car) {
            const b = map(this.time, 0, 100, 255, 0);
            fill(this.car.hue, 255, b);
        } else {
            fill(0, 0, 0);
        }

        stroke(0, 0, 0);
        strokeWeight(5);


        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }


}