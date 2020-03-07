class Orb {

    constructor(diameter, x, y, parent) {
        this.dia = diameter;
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.yin;
        this.yang;
        this.parent = parent;
        this.isYin = false;
        this.isYang = false;

    }


    addYinyang() {
        this.yin = new Orb(this.dia / 2, this.x - this.dia / 4, this.y, this);
        this.yin.isYin = true;
        this.yang = new Orb(this.dia / 2, this.x + this.dia / 4, this.y, this);
        this.yang.isYang = true;
    }


    update() {
        this.angle -= 0.01;



    }

    show() {



        translate(this.x, this.y);
        rotate(this.angle);

        fill(255); // semicircle
        arc(0, 0, this.dia, this.dia, PI, TWO_PI);

        fill(0);  // semicircle
        arc(0, 0, this.dia, this.dia, 0, PI);




        fill(255);
        ellipse(- this.dia / 4, 0, this.dia / 2 - 1, this.dia / 2 - 1);

        fill(0);
        ellipse(this.dia / 4, 0, this.dia / 2 - 1, this.dia / 2 - 1);


        if (this.parent) {
            push();
            if (this.isYin) {
                translate(this.dia / 4, 0);
                fill(0);
            } else {
                fill(255);
                translate(-this.dia / 4, 0);
            }
            ellipse(this.x, this.y, this.dia / 4, this.dia / 4);
            pop();

            push();
            if (this.isYin) {
                translate(this.dia / 4 * 5 + this.x, 0);
                fill(255);
            } else {
                translate(-this.dia / 4 * 5 + this.x, 0);
                fill(0);
            }

            ellipse(this.x, this.y, this.dia / 4, this.dia / 4);
            pop();
        }




        if (this.yin) {
            push();
            rotate(this.angle * 0);
            this.yin.show();
            this.yin.update();
            pop();
        }



        if (this.yang) {
            push();
            rotate(this.angle * 0);
            this.yang.show();
            this.yang.update();
            pop();
        }




    }

}