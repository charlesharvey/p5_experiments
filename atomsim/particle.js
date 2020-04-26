class Particle {





    constructor(type) {
        this.index = 0;
        this.companions = 1;
        this.angle = 0;
        this.pos = createVector(0, 0);
        this.vel = createVector(random(), random());
        this.acc = createVector(0, 0);
        this.size = 12;
        this.type = type;   // gloopton   blargon zeptron
        this.charge = 0;

        if (this.type == 'electron') {
            this.hue = color(255, 200, 55); // yellow
            this.charge = -1;
            this.size = 5;
        } else if (this.type == 'neutron') {
            this.hue = color(100, 100, 205); // blue
        } else if (this.type == 'proton') {
            this.hue = color(200, 55, 100); //red
            this.charge = 1;

        }
    }

    update() {


    }






    show() {


        push();

        let rad = this.size * 0.3;
        if (this.type == 'electron') {
            rad += 15 + (this.companions / 2);
            if (this.index >= 2) {
                rad += 15;
            }
        } else {
            rad += (this.companions * 0.6);
        }

        const x = sin(this.angle) * rad;
        const y = cos(this.angle) * rad;
        translate(x, y);



        fill(this.hue);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        pop();

    }




}
