
let blobs;

let grid = 7;
let numberofblobs = 7;
let rows, cols;
let w, h;

function setup() {

    createCanvas(windowWidth - 5, windowHeight - 5);
    w = 450;
    h = 450;


    colorMode(HSB);
    calcGrid();
    rectMode(CENTER);

    blobs = [];
    for (let i = 0; i < numberofblobs; i++) {
        const blob = new Blob();
        blobs.push(blob);
    }
}

function calcGrid() {
    cols = w / grid;
    rows = h / grid
}


function distSq(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}


function showSquares() {
    for (let x = 0; x < cols + 1; x++) {
        for (let y = 0; y < rows + 1; y++) {
            let d = 0;
            blobs.forEach(blob => {
                d += blob.r / dist(x * grid, y * grid, blob.pos.x, blob.pos.y);
                // d += (blob.r * blob.r) / distSq(x * grid, y * grid, blob.pos.x, blob.pos.y);
            });

            fill(d * 500, 200, 200);
            rect(x * grid, y * grid, grid, grid);
        }
    }

}


function draw() {
    background(0);
    noStroke();

    translate((width - w) / 2, (height - h) / 2);
    showSquares();

    // push();
    // translate(0, rows * grid);
    // showSquares();
    // pop();


    blobs.forEach(blob => {
        // blob.show();
        blob.update();

    });





    if (frameCount % 100 == 0) {
        const fr = frameRate();
        console.log(fr);
        //     if (fr > 60) {
        //         grid -= 1;
        //         calcGrid();
        //     } else if (fr < 10) {
        //         grid += 1;
        //         calcGrid();
        //     }
    }


}
