class Chip {
    constructor(type, x, y) {

        this.x = x;
        this.y = y;

        this.ax, this.ay, this.bx, this.by, this.ox, this.oy;


        this.width = 70;
        this.w4 = this.width / 4;

        this.type = type;

        this.a = 0; // (Math.random() > 0.5) ? 1 : 0;
        this.b = 0; // (Math.random() > 0.5) ? 1 : 0;
        this.o;

        this.huea;
        this.hueb;
        this.hueo;

        this.selected = false;
        this.highlighted = false;

        this.setPositions();
        this.setOutput();

    }


    toggleInputs() {
        if (!this.type == 'NOT') {
            if (this.a == 0 && this.b == 0) {
                this.a = 0;
                this.b = 1;

            } else if (this.a == 0 && this.b == 1) {
                this.a = 1;
                this.b = 0;

            } else if (this.a == 1 && this.b == 0) {
                this.a = 1;
                this.b = 1;

            } else if (this.a == 1 && this.b == 1) {
                this.a = 0;
                this.b = 0;

            }

        } else if (this.type == 'NOT') {
            if (this.a == 1) {
                this.a = 0;
            } else {
                this.a = 1;
            }
        }

        this.setOutput();


    }



    setA(a) {
        this.a = a;
        this.setOutput();
    }
    setB(b) {
        this.b = b;
        this.setOutput();
    }

    setAB(a, b) {
        this.a = a;
        this.b = b;
        this.setOutput();
    }

    updateRandomly() {
        this.a = (Math.random() > 0.5) ? 1 : 0;
        this.b = (Math.random() > 0.5) ? 1 : 0;
        this.setOutput();
    }


    setOutput() {
        if (this.type == 'AND') {
            this.o = (this.a == 1 && this.b == 1) ? 1 : 0
        } else if (this.type == 'OR') {
            this.o = (this.a == 1 || this.b == 1) ? 1 : 0;
        } else if (this.type == 'XOR') {
            this.o = (this.a + this.b == 1) ? 1 : 0;

        } else if (this.type == 'NOT') {
            this.o = (this.a == 0) ? 1 : 0;
        } else {
            this.o = 0;
        }
        this.setHues();
    }


    setHues() {
        if (this.a == 1) {
            this.huea = GREEN;
        } else {
            this.huea = RED;
        }
        if (this.b == 1) {
            this.hueb = GREEN;
        } else {
            this.hueb = RED;
        }
        if (this.o == 1) {
            this.hueo = GREEN;
        } else {
            this.hueo = RED;
        }
    }


    show() {




        const w4 = this.w4;

        push();
        translate(this.x, this.y);




        noFill();
        strokeWeight(3);

        stroke(this.huea);
        line(this.ax, this.ay, this.ax2, this.ay);

        stroke(this.hueo);
        line(this.ox, this.oy, this.ox2, this.oy);


        if (this.type == 'AND' || this.type == 'OR' || this.type == 'XOR') {
            stroke(this.hueb);
            line(this.bx, this.by, this.bx2, this.by);

        };

        noStroke();
        fill(this.huea);
        text(this.a, this.ax2 + 5, this.ay - 5);

        fill(this.hueo);
        text(this.o, this.ox2 - 5, this.oy - 5);

        if (this.type == 'AND' || this.type == 'OR' || this.type == 'XOR') {
            fill(this.hueb);
            text(this.b, this.bx2 + 5, this.by - 5);
        };



        if (this.selected) {
            fill(0, 0, 100);
        } else if (this.highlighted) {
            fill(0, 0, 90);
        } else {
            fill(GREY);
        }


        noStroke();

        if (this.type == 'AND') {

            rect(0, 0, this.width * 0.5, this.width);
            arc(this.width / 2, this.width / 2, this.width, this.width, 3 * PI / 2, PI / 2);

        } else if (this.type == 'OR' || this.type == 'XOR') {

            const h = this.width;
            beginShape();
            vertex(-w4, 0);
            vertex(0, this.width / 2);
            vertex(-w4, this.width);
            vertex(this.width - w4 - w4, this.width);
            vertex(this.width, this.width / 2);
            vertex(this.width - w4 - w4, 0);
            endShape(CLOSE);

            if (this.type == 'XOR') {
                stroke(0, 0, 0);
                strokeWeight(10);
                line(-w4, 0, 0, this.width / 2);
                line(-w4, this.width, 0, this.width / 2);

                stroke(GREY);
                strokeWeight(3);
                line(-w4, 0, 0, this.width / 2);
                line(-w4, this.width, 0, this.width / 2);

            }


        } else if (this.type == 'NOT') {
            beginShape();
            vertex(0, 0);
            vertex(0, this.width);
            vertex(this.width, w4 * 2);
            endShape(CLOSE);
            ellipse(this.width + 4, w4 * 2, w4 - 4, w4 - 4);
        }


        fill(0, 0, 20);
        text(this.type, w4 * 2, w4 * 2);



        pop();
    }




    distA(x, y) {
        return dist(x, y, this.x + this.ax2, this.y + this.ay);
    }
    distB(x, y) {
        return dist(x, y, this.x + this.bx2, this.y + this.by);
    }
    distO(x, y) {
        return dist(x, y, this.x + this.ox2, this.y + this.oy);
    }



    setPositions() {
        const w4 = this.w4;

        this.ax = 0;
        this.ay = w4;


        this.ax2 = this.width * -0.5;

        this.bx = 0;
        this.by = w4 * 3;

        this.bx2 = this.width * -0.5;


        if (this.type == 'NOT') {
            this.ay = w4 * 2;
            this.by = 1238091;
        }


        this.ox = this.width;
        this.oy = w4 * 2;

        this.ox2 = this.width * 1.5;
    }




    select() {
        this.selected = true;
        this.origx = this.x;
        this.origy = this.y;

    }

    unselect() {
        this.selected = false;

    }



    moveTo(newx, newy) {
        this.x = newx + this.origx;
        this.y = newy + this.origy;
        this.setPositions();
    }



    highlight(mx, my) {
        this.highlighted = false;
        const d = dist(mx, my, this.x, this.y);
        this.highlighted = (d < this.width - 10)

    }



}