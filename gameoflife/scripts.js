

const grid = 9;


let rows, cols;
let cells;


let globalhue;

function setup() {


    createCanvas(windowWidth - 10, windowHeight - 10);


    colorMode(HSB, 255, 255, 255, 255);



    rows = Math.ceil(width / grid);
    cols = Math.ceil(height / grid);

    reset();
}

function mousePressed() {
    // reset();
}

function mouseDragged() {
    const gx = Math.floor(mouseX / grid);
    const gy = Math.floor(mouseY / grid);

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const ind = index(gx + i, gy + j);
            cells[ind].setTo(1);
        }
    }





}

function index(x, y) {
    const xx = (x + rows) % rows;
    const yy = (y + cols) % cols;
    return (xx) * cols + yy;
}

function reset() {
    globalhue = random(255);
    cells = [];
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            const cell = new Cell(x, y);
            cells.push(cell);

        }

    }
}


function draw() {
    background(130, 230, 230);


    cells.forEach(cell => {
        cell.update();
    });

    cells.forEach(cell => {
        cell.applyNewValue();
        cell.show();
    });


    fill(0, 0, 255);
    textSize(30);
    text('Game of Earth', 40, 40);
    textSize(15);
    text('Drag to add land', 43, 63);


}
