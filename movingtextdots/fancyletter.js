class Fancyletter {

    constructor(x, y, dts) {
        this.pos = createVector(x, y);
        this.dots = dts;

        console.log(this.dots);

        this.dots.forEach(dot => {
            dot.moveTo(this.pos);
        })

    }




    show() {
        push();
        translate(this.pos.x, this.pos.y);



        this.dots.forEach(dot => {
            if (target) {

                dot.avoid(target);
            }

            dot.moveTo(dot.home);
            dot.update();
            dot.show();
            // vertex(dot.pos.x, dot.pos.y);
        });

        pop();


    }
}