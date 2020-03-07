class Hexagon {


    constructor(col, row) {
        this.col = col;
        this.row = row;
        this.player = -1;
        this.highlighted = false;
        this.center;
        this.vertices = [];
        this.calculateVertices();




    }


    calculateVertices() {



        for (let i = 0; i < 6; i++) {
            let theta = TWO_PI / 6 * i;

            let xoff = (this.col * size * 2);
            let yoff = (this.row * size * 1.6666667);
            if (Math.abs(this.row) % 2 == 1) {
                xoff += size;
            }

            let x = (sin(theta) * size) + xoff;
            let y = (cos(theta) * size) + yoff;
            let vector = createVector(x, y);
            this.vertices.push(vector);


            if (i == 0) {
                this.center = createVector(xoff, yoff);
            }

        }

    }

    show() {

        if (this.player >= 0) {

            if (this.player == 0) {
                fill(0, 255, 0);
            } else {
                fill(0, 0, 255);
            }

        } else {
            if (this.highlighted) {
                fill(100);
            } else {
                fill(255);
            }
        }

        noStroke();
        beginShape();
        this.vertices.forEach(v => {
            vertex(v.x, v.y);
        });
        endShape();


    }


    highlight(mx, my) {
        this.highlighted = false;
        const d = dist(mx, my, this.center.x, this.center.y);
        if (d < size) {
            this.highlighted = true;
        }
    }


    clicked(mx, my, player) {
        if (this.player < 0) {


            const d = dist(mx, my, this.center.x, this.center.y);
            if (d < size) {
                this.player = player;
                return true;
            }
        }
        return false
    }

}