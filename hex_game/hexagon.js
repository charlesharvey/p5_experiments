class Hexagon {


    constructor(col, row) {
        this.col = col;
        this.row = row;
        this.player = -1;
        this.highlighted = false;
        this.center;
        this.vertices = [];
        this.colouredVertices = [[], []];


        // top and bottom edges should be coloured with player0 color,
        // left and right edges should be coloured with player1 color,

        this.wallOfPlayer;
        if (this.row == 0 || this.row == rows - 1) {
            this.wallOfPlayer = 0;
        }
        if (this.col == 0 || this.col == cols - 1) {
            this.wallOfPlayer = 1;
        }


        this.calculateVertices();
        // console.log(this.row, this.col, this.wallOfPlayer, this.colouredVertices);


    }


    calculateVertices() {


        const sides = 6;

        for (let i = 0; i < sides; i++) {
            let theta = TWO_PI / sides * i;

            let xoff = (this.row * size) + (this.col * size * 2) + size + size;
            let yoff = (this.row * size * 1.6666667) + size + size;


            let x = (sin(theta) * size) + xoff;
            let y = (cos(theta) * size) + yoff;
            let vector = createVector(x, y);
            this.vertices.push(vector);


            if (i == 0) {
                this.center = createVector(xoff, yoff);
            }


            if (
                (this.row == 0 && [3, 4].includes(i)) ||
                (this.row == rows - 1 && [1, 0].includes(i))
            ) {

                this.colouredVertices[0].push(vector);
            }

            if (
                (this.col == 0 && [4, 5].includes(i)) ||
                (this.col == cols - 1 && [1, 2].includes(i))
            ) {

                this.colouredVertices[1].push(vector);
            }



        }

    }

    show() {

        if (this.player >= 0) {

            if (this.player == 0) {
                fill(player0Color);
                stroke(darkPlayer0Color);
            } else {
                fill(player1Color);
                stroke(darkPlayer1Color);
            }

        } else {
            noStroke();
            if (this.highlighted) {

                if (player == 0) {
                    fill(lighterPlayer0Color);
                } else {
                    fill(lighterPlayer1Color);
                }

            } else {
                fill(255);
            }
        }


        beginShape();
        this.vertices.forEach(v => {
            vertex(v.x, v.y);
        });
        endShape(CLOSE);

        // noStroke();
        // fill(0, 100);
        // text(`${Math.round(this.center.x)},${Math.round(this.center.y)}`, this.center.x, this.center.y);



        // COLOURED VERTICES
        strokeWeight(5);
        noFill();
        stroke(darkPlayer0Color);
        beginShape();
        this.colouredVertices[0].forEach(v => {
            vertex(v.x, v.y);
        });
        endShape();

        stroke(darkPlayer1Color);
        beginShape();
        this.colouredVertices[1].forEach(v => {
            vertex(v.x, v.y);
        });
        endShape();
        // COLOURED VERTICES

    }


    highlight(mpos) {
        this.highlighted = false;
        const d = p5.Vector.dist(mpos, this.center);
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