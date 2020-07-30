class Powerrail {
    constructor(charge) {
        this.charge = charge;
        this.y = 20;

        if (this.charge == 0) {
            this.y = height - 20;
        }
    }


    show() {
        strokeWeight(3);
        if (this.charge == 1) {
            stroke(GREEN);
        } else {
            stroke(RED);
        }
        line(0, this.y, width, this.y);
    }
}