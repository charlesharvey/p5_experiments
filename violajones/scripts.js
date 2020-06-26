
const grid = 12;
let cols, rows;
let values = [];
let integral_values

let usesin = false;

const sq_size = 5;

let sum_values;

let min_iv;
let max_iv;

let min_sv;
let max_sv;
let av_sv;

let vl; // vaules length
let vt; // values total
let va; //values average;


function setup() {


    createCanvas(windowWidth * 0.65, windowHeight * 0.65);

    reset();

}
function mousePressed() {
    reset();
}

function index(x, y) {
    return y * cols + x;
}
function reset() {
    // usesin = !usesin;

    min_iv = Infinity;
    max_iv = -Infinity;

    min_sv = Infinity;
    max_sv = -Infinity;
    values = [];
    integral_values = [];
    sum_values = [];

    cols = Math.floor(width / grid);
    rows = Math.floor(height / grid);

    vt = 0;

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            const i = index(x, y);
            if (usesin) {
                const t = map(sin(x * y), -1, 1, 1, 10);
                values[i] = t;
                vt += t;
            } else {
                const t = Math.floor(random(1, 10));
                values[i] = t;
                vt += t;
            }


        }
    }
    vl = values.length;
    va = vl / vt;


    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            const i = index(x, y);
            integral_values[i] = sumOfStuffAboveAndLeft(x, y);
        }
    }

    integral_values.forEach(iv => {
        if (iv < min_iv) {
            min_iv = iv;
        } else if (iv > max_iv) {
            max_iv = iv;
        }
    });



    // for (let x = sq_size; x < cols; x++) {
    //     for (let y = sq_size; y < rows; y++) {

    //         const s1 = sumOfStuffAboveAndLeft(x, y);
    //         const s2 = sumOfStuffAboveAndLeft(x - sq_size, y);
    //         const s3 = sumOfStuffAboveAndLeft(x, y - sq_size);
    //         const s4 = sumOfStuffAboveAndLeft(x - sq_size, y - sq_size);
    //         const s5 = s1 - s2 - s3 + s4;

    //         const i = index(x, y);
    //         sum_values[i] = s5;
    //      

    //     }
    // }
    // sum_values.forEach(sv => {
    //     if (sv < min_sv) {
    //         min_sv = sv;
    //     } else if (sv > max_sv) {
    //         max_sv = sv;
    //     }
    // });

    loop();



}

function sumOfStuffAboveAndLeft(x, y) {

    let sum = 0;
    for (let xx = 0; xx <= x; xx++) {
        for (let yy = 0; yy <= y; yy++) {
            const ii = index(xx, yy);
            sum += values[ii];
        }
    }

    return sum;
}


function draw() {
    background(0);
    noStroke();


    // for (let x = sq_size; x < cols; x++) {
    //     for (let y = sq_size; y < rows; y++) {
    //         const i = index(x, y)
    //         const color = sum_values[i];
    //         const col = map(color, min_sv, max_sv, 0, 255);
    //         // const color = integral_values[i];
    //         // const col = map(color, min_iv, max_iv, 0, 255);
    //         // const color = values[i];
    //         // const col = map(color, 0, 10, 0, 255);
    //         fill(col);
    //         rect(x * grid, y * grid, grid, grid);
    //     }
    // }

    let areallsame = true;
    for (let x = sq_size; x < cols; x++) {
        for (let y = sq_size; y < rows; y++) {

            const s1 = sumOfStuffAboveAndLeft(x, y);
            const s2 = sumOfStuffAboveAndLeft(x - sq_size, y);
            const s3 = sumOfStuffAboveAndLeft(x, y - sq_size);
            const s4 = sumOfStuffAboveAndLeft(x - sq_size, y - sq_size);
            const s5 = s1 - s2 - s3 + s4;

            const i = index(x, y);
            sum_values[i] = s5;
            const col = map(s5, 000, 200, 0, 255);
            fill(col);
            rect(x * grid, y * grid, grid, grid);

            if (true) {
                //     // values[i] = values[i] + 1;
                //     // const next = Math.floor(Math.random() * vl);
                const next = index(x + 1 % cols, y - 1 % rows);
                //     // const prev = index(x - 1 % cols, y + 1 % rows);
                //     // values[next] = values[next] - 1.02;

                const temp = values[i];
                values[i] = values[next] - 0.1;
                values[next] = temp + 0.1;



                areallsame = false;

                //     if (Math.random() > 0.9999) {
                //         console.log(s5);
                //     }

            }




        }
    }

    // if (areallsame) {
    //     console.log('all are same');
    //     noLoop();
    // }


    // frameRate(1);


    // noLoop();

}
