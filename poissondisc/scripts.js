
let grid = 10;
let k = 30;
let d = grid / Math.sqrt(2);

let rows, cols;

let points = [];
let activelist = [];

function setup() {



    createCanvas(windowWidth - 20, windowHeight - 20);


    rows = Math.floor(width / grid);
    cols = Math.floor(height / grid);


    for (let i = 0; i < rows * cols; i++) {
        points[i] = null;

    }

}



function draw() {
    background(0);


    if (activelist.length == 0) {

        const randompoint = createVector(random(height), random(width));
        activelist.push(randompoint);


    }


    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (points[r + c * cols] == null) {
                ellipse(r * grid, c * grid, grid / 2, grid / 2);
            }

        }
    }


}
