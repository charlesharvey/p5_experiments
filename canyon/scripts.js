


let rows;
let cols;
const grid = 5;


let startCliffNoise;
let endCliffNoise;
let canyonNoise;
let paddingNoise;
let canyonPadding;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    rows = height / grid;
    cols = width / grid;
    startCliffNoise = random(10000);
    endCliffNoise = random(10000);
    canyonNoise = random(10000);
    paddingNoise = random(10000);
}



function draw() {


    background(20, 185, 60);


    let riverpoints = [];
    let skypoints = [];


    let canyonPadding = map(noise(paddingNoise), 0, 1, 100, 200);


    for (let y = 0; y < rows; y++) {

        beginShape();
        noFill();
        stroke(10, 105, 30, 190);
        strokeWeight(1);
        // line(0, y * grid, width, y * grid);



        const startCliffN = noise(startCliffNoise + (y / 30));
        const endCliffN = noise(endCliffNoise + (y / 30));
        const startCliffPos = map(startCliffN, 0, 1, canyonPadding, width / 2 - (canyonPadding / 2));
        const endCliffPos = map(endCliffN, 0, 1, width / 2 + (canyonPadding / 2), width - canyonPadding);

        const midPoint = (endCliffPos + startCliffPos) / 2;



        const maxDepth = map(y, 0, rows, height / 2, height * 2);
        const maxNoise = map(y, 0, rows, 1, 10);

        for (let x = 0; x < width; x += grid) {


            let yy = y * grid;
            if (x > startCliffPos && x < endCliffPos) {

                const canyonN = noise(canyonNoise + (x / 9) + (y))
                const canyonpos = map(canyonN, 0, 1, -10, maxNoise);

                let z = map(x, startCliffPos, endCliffPos, 0, 1);
                if (z > 0.5) {
                    z = 1 - z;
                }
                const depth = z * maxDepth;



                yy += canyonpos + depth;


                if (x > midPoint && x < midPoint + grid) {
                    const rp = createVector(midPoint, yy);
                    riverpoints.push(rp);
                }


                if (y == 0) {
                    const sp = createVector(x, yy);
                    skypoints.push(sp);
                }


            }


            vertex(x, yy);
        }
        endShape();

    }


    stroke(50, 170, 255);
    strokeWeight(8);
    beginShape();
    riverpoints.forEach(rp => {
        vertex(rp.x, rp.y);
    });
    endShape();



    fill(200, 220, 255);
    noStroke();
    beginShape();
    skypoints.forEach(rp => {
        vertex(rp.x, rp.y);
    });

    endShape(CLOSE);


    // noLoop();


    paddingNoise += 0.02;
    startCliffNoise += 0.05;
    endCliffNoise += 0.05;
    canyonNoise += 0.001;
}
