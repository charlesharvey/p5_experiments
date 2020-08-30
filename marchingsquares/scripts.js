



const grid = 20;
const threshold = 0.5;
let rows, cols;

let field;
let theta = 0;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    rows = Math.floor(height / grid) + 2;
    cols = Math.floor(width / grid) + 2;

    field = [];
    for (let i = 0; i < cols; i++) {
        field[i] = [];
        for (let j = 0; j < rows; j++) {
            field[i][j] = noise(theta + ((j * cols + i)));
        }
    }


}


function mouseMoved() {

    const xx = Math.floor(mouseX / grid);
    const yy = Math.floor(mouseY / grid);

    const r = 5;
    const diff = random(-0.05, 0.05);

    if (xx > r && yy > r && xx < cols - r && yy < rows - r) {
        for (let i = -r; i < r; i++) {
            for (let j = -r; j < r; j++) {
                field[i + xx][j + yy] += diff;
            }
        }
    }
}


function draw() {
    background(0);
    noStroke();


    // for (let i = 0; i < cols; i++) {
    //     field[i] = [];
    //     for (let j = 0; j < rows; j++) {
    //         const ind = j * cols + i;
    //         field[i][j] = noise(theta + ((ind)));
    //     }
    // }





    for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows - 1; j++) {

            const a = createVector((i + 0.5) * grid, j * grid);
            const b = createVector((i + 1) * grid, (j + 0.5) * grid);
            const c = createVector((i + 0.5) * grid, (j + 1) * grid);
            const d = createVector(i * grid, (j + 0.5) * grid);


            const a1 = createVector(i * grid, j * grid);
            const b1 = createVector((i + 1) * grid, j * grid);
            const c1 = createVector((i + 1) * grid, (j + 1) * grid);
            const d1 = createVector(i * grid, (j + 1) * grid);


            const aval = field[i][j];
            const bval = field[i + 1][j];
            const cval = field[i + 1][j + 1];
            const dval = field[i][j + 1];

            const state = getState(aval, bval, cval, dval);


            // stroke(255);
            // strokeWeight(1);
            // if (state === 0) {
            // } else if (state === 1) {
            //     drawLine(c, d);
            // } else if (state === 2) {
            //     drawLine(b, c);
            // } else if (state === 3) {
            //     drawLine(b, d);
            // } else if (state === 4) {
            //     drawLine(a, b);
            // } else if (state === 5) {
            //     drawLine(b, c);
            //     drawLine(a, d);
            // } else if (state === 6) {
            //     drawLine(a, c);
            // } else if (state === 7) {
            //     drawLine(a, d);
            // } else if (state === 8) {
            //     drawLine(a, d);
            // } else if (state === 9) {
            //     drawLine(a, c);
            // } else if (state === 10) {
            //     drawLine(a, b);
            //     drawLine(c, d);
            // } else if (state === 11) {
            //     drawLine(a, b);
            // } else if (state === 12) {
            //     drawLine(b, d);
            // } else if (state === 13) {
            //     drawLine(b, c);
            // } else if (state === 14) {
            //     drawLine(c, d);
            // } else if (state === 15) {
            // }


            noStroke();
            fill(255);

            beginShape();


            if (state === 0) {
            } else if (state === 1) {
                addVertex(c);
                addVertex(d);
                addVertex(d1);
            } else if (state === 2) {

                addVertex(b);
                addVertex(c);
                addVertex(c1);
            } else if (state === 3) {
                addVertex(b);
                addVertex(c1);
                addVertex(d1);
                addVertex(d);
            } else if (state === 4) {
                addVertex(a);
                addVertex(b);
                addVertex(b1);
            } else if (state === 5) {
                addVertex(a);
                addVertex(b1);
                addVertex(b);
                addVertex(c);
                addVertex(d1);
                addVertex(d);
            } else if (state === 6) {
                addVertex(a);
                addVertex(b1);
                addVertex(c1);
                addVertex(c);
            } else if (state === 7) {
                addVertex(a);
                addVertex(b1);
                addVertex(c1);
                addVertex(d1);
                addVertex(d);
            } else if (state === 8) {
                addVertex(a);
                addVertex(d);
                addVertex(a1);
            } else if (state === 9) {
                addVertex(a);
                addVertex(c);
                addVertex(d1);
                addVertex(a1);
            } else if (state === 10) {
                addVertex(a);
                addVertex(b);
                addVertex(c1);
                addVertex(c);
                addVertex(d);
                addVertex(a1);
            } else if (state === 11) {
                addVertex(a);
                addVertex(b);
                addVertex(c1);
                addVertex(d1);
                addVertex(a1);
            } else if (state === 12) {
                addVertex(b);
                addVertex(d);
                addVertex(a1);
                addVertex(b1);
            } else if (state === 13) {
                addVertex(b);
                addVertex(c);
                addVertex(d1);
                addVertex(a1);
                addVertex(b1);

            } else if (state === 14) {
                addVertex(c);
                addVertex(d);
                addVertex(a1);
                addVertex(b1);
                addVertex(c1);
            } else if (state === 15) {
                addVertex(a1);
                addVertex(b1);
                addVertex(c1);
                addVertex(d1);
            }
            endShape();






            // const h = map(state, 0, 16, 0, 255);




        }
    }


    // for (let i = 0; i < cols; i++) {
    //     for (let j = 0; j < rows; j++) {
    //         const x = i * grid;
    //         const y = j * grid;
    //         // const h = Math.round(field[i][j]) * 170 + 30;
    //         const h = map(Math.pow(field[i][j], 3), 0, threshold, 0, 255);
    //         noStroke();
    //         fill(h);
    //         ellipse(x, y, grid / 6, grid / 6);
    //     }
    // }



    theta += 0.002;


}


function getState(a, b, c, d) {
    const aa = (a > threshold) ? 1 : 0;
    const bb = (b > threshold) ? 1 : 0;
    const cc = (c > threshold) ? 1 : 0;
    const dd = (d > threshold) ? 1 : 0;
    return aa * 8 + bb * 4 + cc * 2 + dd * 1;
}


function drawLine(a, b) {
    line(a.x, a.y, b.x, b.y);
}


function addVertex(a) {
    vertex(a.x, a.y);
}

