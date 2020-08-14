class Wire {
    constructor(chipa, posa, chipb, posb, powerrail = null, powerx = null) {
        this.chipa = chipa;
        this.posa = posa;
        this.chipb = chipb;
        this.posb = posb;

        this.powerrail = powerrail;
        this.powerx = powerx;


        this.x1, this.x2, this.y1, this.y2;

        this.theta = Math.random();
        this.hue = GREY;
        this.val;
        this.setPositions();
    }

    setPositions() {

        if (this.chipa) {
            this.setPositionsForStartChip();
        } else if (this.powerrail) {
            this.setPositionsForPowerrail();
        }

        this.setPositionsForEndChip();

    }


    setPositionsForPowerrail() {
        this.x1 = this.powerx;
        this.y1 = this.powerrail.y;

        if (this.powerrail.charge == 1) {
            this.hue = GREEN;
        } else {
            this.hue = RED;

        }
        this.val = this.powerrail.charge;
    }


    setPositionsForEndChip() {

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

    setPositionsForStartChip() {

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

    }


    update() {


        if (this.powerrail) {

        } else {


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


        }

        if (this.posb == 'A') {
            this.chipb.setA(this.val);
        } else if (this.posb == 'B') {
            this.chipb.setB(this.val);
        }


        if (this.val == 1) {
            this.theta += 0.005;

        }



    }

    resetChips() {

        if (this.chipa) {
            if (this.posa == 'A') {
                this.chipa.setA(0);
            } else if (this.posa == 'B') {
                this.chipa.setB(0);
            }
        }
        if (this.chipb) {
            if (this.posb == 'A') {
                this.chipb.setA(0);
            } else if (this.posb == 'B') {
                this.chipb.setB(0);
            }
        }
    }

    show() {
        strokeWeight(3);
        stroke(this.hue);
        line(this.x1, this.y1, this.x2, this.y2);


        if (this.val == 1) { // ON
            // DRAW ELECTRONS
            for (let i = 0; i < 1; i += 0.1) {
                fill(this.hue);
                const x = lerp(this.x1, this.x2, (i + this.theta) % 1);
                const y = lerp(this.y1, this.y2, (i + this.theta) % 1);
                ellipse(x, y, 3, 3);
            }
        }


    }

}