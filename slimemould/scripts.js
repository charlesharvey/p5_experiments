

let cells;


let cols, rows;

let pheremones;

const numberOfCells = 1000;
const grid = 4;  // size of grid
const degredationSpeed = 0.93;            // pheremones degrade over time
const cellSenseRange = 40;       // how far can they sense pheremone
const cellSensePrecision = 10;         // how many angles does the cell check around it
const cellMaxSpeed = 1.3;         // how many angles does the cell check around it

function setup() {


    createCanvas(700, 400);
    colorMode(HSB);
    // createCanvas(windowWidth - 20, windowHeight - 20);

    cols = width / grid;
    rows = height / grid;

    reset();


}

function reset() {
    cells = [];

    for (let i = 0; i < numberOfCells; i++) {
        const cell = new Cell();
        cells.push(cell);
    }

    pheremones = [];

    for (let i = 0; i < cols; i++) {
        pheremones[i] = [];
        for (let j = 0; j < rows; j++) {
            pheremones[i][j] = 0;
        }
    }
}



function mousePressed() {
    reset();
}

function draw() {
    background(0);


    noStroke();




    // SHOW ALL THE PHEREMONES DEPOSITED BY CELLS
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const h = map(pheremones[i][j], 0, 10, 0, 255);
            fill(100, 30, h);
            rect(i * grid, j * grid, grid, grid)
            pheremones[i][j] *= degredationSpeed;


        }
    }


    /// DIFFUSE PHEREMONES
    diffusePheremones();



    cells.forEach(cell => {
        cell.update();
        cell.sensePheremone();
        cell.depositPheremone();
        // cell.show();
    });



}


function diffusePheremones() {
    const newpheremones = [];
    for (let i = 0; i < cols; i++) {
        newpheremones[i] = [];
        for (let j = 0; j < rows; j++) {
            newpheremones[i][j] = 0;
        }
    }
    for (let i = 1; i < cols - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            let amount = pheremones[i][j];
            // add the center one twice so diffusion is less storng
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    amount += pheremones[i + x][j + y];
                }
            }
            newpheremones[i][j] = amount / 10;
        }
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            pheremones[i][j] = newpheremones[i][j];
        }
    }
}