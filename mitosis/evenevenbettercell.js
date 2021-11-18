class Evenevenbettercell {
    constructor() {
        this.pos = createVector(width / 2, height / 2);

        this.foc1 = this.pos.copy();
        this.foc2 = this.pos.copy();


        this.vel1 = p5.Vector.random2D();
        this.vel1.setMag(0.24);
        this.vel2 = this.vel1.copy();
        this.vel2.mult(-1);




        this.growthrate = 0.3;

        this.stuff = [];
    }


    update() {






        if (this.stuff.length < 400) {
            const bit = new Evenevenbit(this.pos.x, this.pos.y);
            this.stuff.push(bit);
        } else {
            this.foc1.add(this.vel1);
            this.foc2.add(this.vel2);
        }




    }






    show() {


        noStroke();



        this.stuff.forEach(bit => {
            bit.attract(this.foc1);
            bit.attract(this.foc2);

            this.stuff.forEach(other => {
                if (other != bit) {
                    bit.repel(other.pos);
                }
            })

            bit.update();
            bit.show();
        })


        // fill(255, 0, 0, 100);
        // ellipse(this.foc1.x, this.foc1.y, 20, 20);
        // ellipse(this.foc2.x, this.foc2.y, 20, 20);

    }
}