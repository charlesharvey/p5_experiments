

const cols = 6;
let gridSize;
let cells;
let currentPlayer = 1;


function mousePressed() {

    cells.forEach(cell => {
        cell.clicked(mouseX, mouseY);
    })
    currentPlayer = (currentPlayer + 1) % 2;

}

function setup() {

    createCanvas(600, 600);

    gridSize = width / cols;


    resetBoard();

    console.log(cells);


}

function resetBoard() {

    cells = []

    for (let x = 0; x < cols; x++) {
        const row = [];
        for (let y = 0; y < cols; y++) {
            cells.push(new Cell(x, y));
        }

    }
}



function draw() {
    background(0);

    cells.forEach(cell => {
        cell.show();
    });


}
