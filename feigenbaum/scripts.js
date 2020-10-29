


const padding = 90;
const iterations = 50;
const maxLambda = 4.05;
const gradations = 3300;
let visiibleLambda = 0;
let vl = 0;
function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    reset();

}



function iterate(lambda, n) {
    return lambda * n * (1 - n);
}


function mousePressed() {

    reset();
}

function reset() {

    visiibleLambda = 0;
    vl = 0;
    background(0);

    loop();

}

function draw() {
    // background(0);
    noStroke();


    // for (let lambda = 0; lambda < visiibleLambda; lambda += (1 / gradations)) { }

    let lambda = visiibleLambda;


    let results = [];

    let w = 0.5;
    for (let i = 0; i < iterations; i++) {
        w = iterate(lambda, w);
        if (i > iterations / 2) {
            results.push(w);
        }

    }

    results = results.sort((a, b) => a - b);
    for (let r = results.length; r > 0; r--) {

        const a = results[r];
        const b = results[r - 1];
        if ((a - b) < 0.0015) {
            results.splice(r, 1);
        }
    }

    results.forEach(r => {
        const x = map(lambda, 0, maxLambda, padding, width - padding);
        const y = map(r, 0, 1, height - padding, padding);

        const red = map(y, 0, height, 0, 255);
        fill(red, 60, 230, 180);
        ellipse(x, y, 1, 1);
    })






    vl += 1;
    if (vl > 50) {
        visiibleLambda += (1 / vl);
    } else {
        visiibleLambda += 0.02;
    }


    // visiibleLambda += 0.01;
    if (visiibleLambda > maxLambda) {

        noLoop();
        //   reset();
    }




    const xx = map(visiibleLambda, 0, maxLambda, padding, width - padding);
    yy = height - padding + 30;
    fill(0);
    rect(xx - 20, yy - 10, 70, 20);
    fill(150);
    // ellipse(xx, yy, 5, 5);
    const rvl = Math.round(visiibleLambda * 10) / 10;
    text(rvl, xx, yy);

    text('Lambda', width / 2, height - padding);
    strokeWeight(1);
    stroke(150);
    line(padding - 20, yy - 20, width - padding + 20, yy - 20);




}
