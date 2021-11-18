

const grid = 25;
let rows, cols;

let population;
let theta;
let constituencies;
let constituenciesCount = 5;

function setup() {

    createCanvas(windowWidth - 20, windowHeight - 20);
    rows = ceil(height / grid);
    cols = ceil(width / 2 / grid);

    createConstituencies();
    createPopulation();


}




function createConstituencies() {
    constituencies = [];
    for (let i = 0; i < constituenciesCount; i++) {
        let h = i / constituenciesCount * 255;
        constituencies.push({ cells: [], color: h, pos: createVector(random(width) / 2, random(height)) });
    }
}

function createPopulation() {
    theta = random(100, 10000);
    population = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let population_size = noise((i + 0) / 4, (j + 100) / 4 + theta);
            let left_ratio = noise((i + 30) / 4, (j + 200) / 4 + theta);
            let constintuency = null;
            let recorddist = Infinity;
            let pos = createVector(i * grid, j * grid);
            constituencies.forEach(c => {
                const d = pos.dist(c.pos);
                if (d < recorddist) {
                    recorddist = d;
                    constintuency = c;
                }
            });
            const cell = { i, j, pos: pos, pop: population_size, l: left_ratio, constintuency };
            population[j * cols + i] = cell;
            constintuency.cells.push(cell)
        }
    }

}


function draw() {
    background(0);

    noStroke();

    population.forEach(cell => {
        let r = cell.l * cell.pop * 255;
        let b = (1 - cell.l) * cell.pop * 255;
        let g = 0;
        fill(r, g, b);
        rect(cell.pos.x, cell.pos.y, grid, grid);
    })



    push();
    translate(width / 2, 0);
    constituencies.forEach(c => {

        if (c.cells.length > 0) {

            c.population_size = c.cells.map(ce => ce.pop).reduce((a, b) => a + b);
        }

        c.cells.forEach(cell => {
            fill(c.color, c.color, 100);
            rect(cell.pos.x, cell.pos.y, grid, grid)
        })

        fill(255);
        ellipse(c.pos.x, c.pos.y, 9, 9);
    })
    pop();



    for (let i = 0; i < 10; i++) {
        swapRandomPopulation();

    }




}


function swapRandomPopulation() {

    let f = random(constituencies);
    let g = random(constituencies);


    if (f.cells.length > 0) {
        let f_cell = random(f.cells);


        neighbours = neighbouring_constintuncies(f_cell);
        if (neighbours.length > 0) {
            let random_neighbour = random(neighbours);
            f.cells = f.cells.filter(c => c !== f_cell);
            random_neighbour.cells.push(f_cell);
            f_cell.constintuency = random_neighbour;
        }




    }



}

function neighbouring_constintuncies(cell) {

    let c = []
    for (let ii = -1; ii <= 1; ii++) {
        for (let jj = -1; jj <= 1; jj++) {

            let other = population.find(c => c.i === (cell.i + ii) && c.j === (cell.j + jj));
            if (other) {
                if (other.constintuency !== cell.constintuency) {
                    c.push(other.constintuency);
                }
            }

        }
    }

    return c

}