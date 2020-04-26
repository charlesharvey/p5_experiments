class Particle {





    constructor(type) {
        this.index = 0;
        this.angle = 0;
        this.pos = createVector(0, 0);
        this.vel = createVector(random(), random());
        this.acc = createVector(0, 0);
        this.size = 10;
        this.type = type;   // gloopton   blargon zeptron

        if (this.type == 'blargon') {
            this.hue = color(100, 100, 255); // blue
            this.charge = -1.5;
            this.repelDistance = 20;
        } else if (this.type == 'zeptron') {
            this.hue = color(100, 205, 100); // green
            this.repelDistance = 20;
            this.charge = 1;

        } else if (this.type == 'gloopton') {
            this.hue = color(200, 55, 100); //red
            this.repelDistance = 3;
            this.charge = 2;

        }
    }

    update() {


    }






    show() {

        // if (this.index == 1) {
        //     translate(0, 10);
        // } else if (this.index == 2) {
        //     translate(10, 0);
        // } else if (this.index == 3) {
        //     translate(0, -10);
        // } else if (this.index == 4) {
        //     translate(-10, 0);
        // } else if (this.index == 5) {
        //     translate(0, 20);
        // } else if (this.index == 6) {
        //     translate(20, 0);
        // } else if (this.index == 7) {
        //     translate(0, -20);
        // } else if (this.index == 8) {
        //     translate(-20, 0);
        // } else if (this.index == 9) {
        //     translate(10, 20);
        // } else if (this.index == 10) {
        //     translate(20, 10);
        // } else if (this.index == 11) {
        //     translate(10, -20);
        // } else if (this.index == 12) {
        //     translate(-20, 10);
        // }


        const x = sin(this.angle) * this.size;
        const y = cos(this.angle) * this.size;
        translate(x, y);




        fill(this.hue);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }




}
