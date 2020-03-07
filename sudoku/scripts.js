// let grid = [[5, 3, 0, 0, 7, 0, 0, 0, 0],
// [6, 0, 0, 1, 9, 5, 0, 0, 0],
// [0, 9, 8, 0, 0, 0, 0, 6, 0],
// [8, 0, 0, 0, 6, 0, 0, 0, 3],
// [4, 0, 0, 8, 0, 3, 0, 0, 1],
// [7, 0, 0, 0, 2, 0, 0, 0, 6],
// [0, 6, 0, 0, 0, 0, 2, 8, 0],
// [0, 0, 0, 4, 1, 9, 0, 0, 5],
// [0, 0, 0, 0, 8, 0, 0, 7, 9]]


let grid = [
    [8, 7, 2, 5, 3, 6, 4, 1, 9],
    [0, 9, 0, 7, 4, 2, 8, 3, 5],
    [0, 0, 0, 1, 8, 9, 7, 0, 2],
    [2, 0, 6, 0, 0, 0, 3, 9, 7],
    [3, 1, 5, 0, 9, 7, 6, 0, 8],
    [0, 4, 7, 0, 0, 0, 5, 0, 1],
    [7, 0, 0, 8, 2, 3, 1, 5, 4],
    [1, 5, 0, 9, 7, 4, 2, 8, 6],
    [4, 2, 8, 6, 1, 5, 9, 7, 3]]


let size;


let rec = 0;

function setup() {


    createCanvas(600, 600);

    size = width / 9;

}



function draw() {
    background(255);

    frameRate(1);

    // translate(30, 30);

    fill(0);
    grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell > 0) {
                text(cell, (j + 0.5) * size, (i + 0.5) * size);
            }
        })

        strokeWeight(2);
        line(0, i * size, width, i * size);
        line(i * size, 0, i * size, height);
    });





    if (frameCount == 3) {
        // noLoop();

        solve();
    }



}


function bigS(i) {
    return Math.floor(i / 3);
}


function possible(y, x, n) {
    const row = grid[y];
    if (row.includes(n)) {
        return false;
    }

    // console.log(row);

    const col = [];
    grid.forEach(row => col.push(row[x]));
    if (col.includes(n)) {
        return false;
    }

    // console.log(col);



    const square = [];
    const bigx = bigS(x);
    const bigy = bigS(y);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (bigy == bigS(i) && bigx == bigS(j)) {
                square.push(grid[i][j]);
            }
        }
    }

    if (square.includes(n)) {
        return false;
    }


    // console.log(square);

    return true;

}


function solve() {


    rec++;

    if (rec % 100000 == 0) {
        console.log('solving', rec);
    }


    grid.forEach((row, i) => {
        row.forEach((cell, j) => {

            // for (let i = 0; i < 9; i++) {
            // for (let j = 0; j < 9; j++) {
            // let cell = grid[i][j];

            // console.log(cell);
            if (cell == 0) {

                for (let n = 1; n < 10; n++) {

                    if (possible(i, j, n)) {

                        grid[i][j] = n;

                        if (rec < 4590000) {
                            solve();
                            grid[i][j] = 0;
                        }
                    }

                }

                return;
            }

            // }
            // }
        })
    })

}