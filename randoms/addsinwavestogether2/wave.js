class Wave {

    constructor(index) {
        this.index = index;
        this.dots = [];
        this.number = 300;
        this.gridsize = width / this.number;

        // for (let i = 0; i < this.number; i++) {
        let i = 0;
        for (let x = -200; x < width + 200; x += (width / this.number)) {

            x = x;

            // let x = (i * this.gridsize + (this.index * width)); //% width;
            let y = height / 2;
            this.dots.push(new Dot(x, y, (i / this.number)));
            i++;
        }




    }

    update() {


        this.dots.forEach(dot => {

            dot.addWave(sin1);
            dot.addWave(sin2);
            dot.addWave(sin3);


            dot.update();
        })


    }


    show() {
        push();

        translate(this.index * 5, 0);
        noFill();
        stroke(255, this.index / numberOfWaves * 255);
        strokeWeight(1);
        beginShape();
        this.dots.forEach(dot => {
            // dot.show();

            vertex(dot.pos.x, dot.pos.y);
        })
        endShape();
        pop();
    }

}