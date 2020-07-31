class Mandy {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.r, this.i;
        this.iterations = 0;
        this.outOfSet = false;



    }


    calculate() {

        this.iterations = 0;
        this.outOfSet = false;

        this.r = map(this.x, 0, width, -range, range) + cx;
        this.i = map(this.y, 0, width, -range, range) + cy;



        this.zr = this.r;
        this.zi = this.i;



        for (let it = 0; it < iterations; it++) {
            if (!this.outOfSet) {

                this.iterations++;



                // c = this.r + i * this.i
                //zn+1 =  z2 + c;
                const squared = complexMult(this.zr, this.zi, this.zr, this.zi);
                this.zr = squared[0] + this.r;
                this.zi = squared[1] + this.i;

                if (this.pastLimit()) {
                    this.outOfSet = true;
                    break;
                }
            }
        }

    }


    pastLimit() {
        return (this.zr * this.zr + this.zi * this.zi) > 4;
    }


    show() {
        if (this.outOfSet) {
            const hue = map(this.iterations % stripyness, 0, stripyness, 0, 255);
            fill(hue, 100, 100);
        } else {
            fill(0, 0, 0);
        }

        rect(this.x, this.y, grid, grid);
    }


}