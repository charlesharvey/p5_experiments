class Sun {


    constructor(x, y, seed) {
        this.x = x;
        this.y = y;


        this.r = 5 + ((seed * 701 % 5) * 4);
        this.color = (1335 + ((seed * 701 % 5) * 1125)) % 100;
    }


    show() {

        fill(this.color, 100, 100);
        noStroke();
        ellipse(this.x, this.y, this.r, this.r);

    }

}