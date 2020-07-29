class Wire {
    constructor(chipa, posa, chipb, posb) {
        this.chipa = chipa;
        this.posa = posa;
        this.chipb = chipb;
        this.posb = posb;

        this.hue, this.val;
        this.setPositions();
    }

    setPositions() {
        this.x1 = this.chipa.x;
        this.y1 = this.chipa.y;

        if (this.posa == 'O') {
            this.x1 += this.chipa.ox2;
            this.y1 += this.chipa.oy;

        } else if (this.posa == 'A') {
            this.x1 += this.chipa.ax2;
            this.y1 += this.chipa.ay;

        } else if (this.posa == 'B') {
            this.x1 += this.chipa.bx2;
            this.y1 += this.chipa.by;
        }

        this.x2 = this.chipb.x;
        this.y2 = this.chipb.y;

        if (this.posb == 'O') {
            this.x2 += this.chipb.ox2;
            this.y2 += this.chipb.oy;
        } else if (this.posb == 'A') {
            this.x2 += this.chipb.ax2;
            this.y2 += this.chipb.ay;
        } else if (this.posb == 'B') {
            this.x2 += this.chipb.bx2;
            this.y2 += this.chipb.by;
        }
    }


    update() {


        if (this.posa == 'O') {
            this.hue = this.chipa.hueo;
            this.val = this.chipa.o;
        } else if (this.posa == 'A') {
            this.hue = this.chipa.huea;
            this.val = this.chipa.a;
        } else if (this.posa == 'B') {
            this.hue = this.chipa.hueb;
            this.val = this.chipa.b;
        }


        if (this.posb == 'A') {
            this.chipb.setA(this.val);
        } else if (this.posb == 'B') {
            this.chipb.setB(this.val);
        }

    }

    show() {
        strokeWeight(3);
        stroke(this.hue);
        line(this.x1, this.y1, this.x2, this.y2);

    }

}