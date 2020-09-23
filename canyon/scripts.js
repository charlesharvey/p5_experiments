


let rows;
let cols;
let grid = 15;
const speed = 0.05;


let startCliffNoise;
let endCliffNoise;
let canyonNoise;
let paddingNoise;
let depthNoise;
let canyonPadding;

function reset() {
    startCliffNoise = random(10000);
    endCliffNoise = random(10000);
    canyonNoise = random(10000);
    paddingNoise = random(10000);
    depthNoise = random(10000);

}
function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    rows = height / grid;
    cols = width / grid;


    reset();
}

function mousePressed() {
    reset();
}

function draw() {


    background(20, 185, 60);



    let skypoints = [];



    let canyonPadding = map(noise(paddingNoise), 0, 1, 00, 300);

    // mobile friendlyness
    if (windowWidth < 600) {
        canyonPadding = 10;
    }
    // mobile friendlyness


    let previousshadow = [];
    let shadow = [];

    for (let y = 0; y < rows; y++) {

        beginShape();
        noFill();
        fill(20, 185, 60);
        stroke(10, 105, 30, 190);
        strokeWeight(1);


        // line(0, y * grid, width, y * grid);



        const startCliffN = noise(startCliffNoise + (y / 30));
        const endCliffN = noise(endCliffNoise + (y / 30));
        const startCliffPos = map(startCliffN, 0, 1, canyonPadding, width / 2 - (canyonPadding / 2));
        const endCliffPos = map(endCliffN, 0, 1, width / 2 + (canyonPadding / 2), width - canyonPadding);

        const midPoint = (endCliffPos + startCliffPos) / 2;


        let depthDistance = map(y, 0, rows, 0.5, 1);

        let maxDepth = map(noise(y / 100 + depthNoise), 0, 1, 50, height * 2.6);
        maxDepth *= depthDistance;
        const maxNoise = map(y, 0, rows, 1, 10);

        // mobile friendlyness
        if (windowWidth < 600) {
            maxDepth /= 2;
        }
        // mobile friendlyness

        let riverpoint;


        shadow = [];

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
                    riverpoint = createVector(midPoint, yy);

                }


                if (y == 0) {
                    const sp = createVector(x, yy);
                    skypoints.push(sp);
                }


                if (x > midPoint && x < endCliffPos) {
                    shadow.push(createVector(x, yy))
                }



            }


            vertex(x, yy);
        }

        vertex(width, height);
        vertex(0, height);
        endShape();


        if (shadow && previousshadow) {
            noStroke()
            fill(10, 105, 30, 140);

            beginShape();
            shadow.forEach(s => {
                vertex(s.x, s.y);
            })
            previousshadow.reverse().forEach(s => {
                vertex(s.x, s.y);
            })
            endShape();
        }
        previousshadow = shadow;


        if (riverpoint) {
            noStroke();
            fill(50, 170, 255);
            ellipse(riverpoint.x, riverpoint.y, grid * 2, grid * 4);
        }


    }




    fill(200, 220, 255);
    noStroke();
    beginShape();
    vertex(skypoints[0].x, skypoints[0].y - 30);
    skypoints.forEach(rp => {
        vertex(rp.x, rp.y);
    });
    vertex(skypoints[skypoints.length - 1].x, skypoints[skypoints.length - 1].y - 30);
    endShape(CLOSE);


    // noLoop();


    paddingNoise += 0.02;
    startCliffNoise += speed;
    endCliffNoise += speed;
    canyonNoise += 0.001;
    depthNoise += 0.004;



    if (frameRate() > 10 && grid > 8) {
        grid--;
        rows = height / grid;
        cols = width / grid;

    }


}
