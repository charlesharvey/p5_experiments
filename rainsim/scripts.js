
let cols, rows;
const grid = 40;  // size of grid
const numberOfDrops = 3200;
const groundHeight = 36;
const windStrength = 0.08;
const cloudThreshold = 8; // droplets per grid square needed for a cloud to form
const cloudMinHeight = 5;

let gravity, wind;

let windTheta = 0;

let humidity; // 2d array of all the humidities in the scene.

let drops;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);


    cols = Math.ceil(width / grid);
    rows = Math.ceil(height / grid);
    gravity = createVector(0, 0.02);

    windTheta = random(1000, 10000);
    wind = createVector(0.03, 0);
    negativewind = createVector(-0.03, 0);

    humidity = [];
    for (let i = 0; i < cols; i++) {
        humidity[i] = [];
        for (let j = 0; j < rows; j++) {
            humidity[i][j] = 0;
        }
    }

    drops = [];
    for (let i = 0; i < numberOfDrops; i++) {
        const drop = new Drop();
        drops.push(drop);
    }


}



function draw() {
    background(200, 100, 90);

    noStroke();


    marchingSquareRain();





    wind.x = map(noise(windTheta), 0, 1, -windStrength, windStrength);
    negativewind.x = map(noise(windTheta + 1000), 0, 1, windStrength, -windStrength);



    drops.forEach(drop => {


        if (drop.pos.x > width * 2 / 3) {
            drop.applyForce(wind);
        } else if (drop.pos.x < width / 3) {
            drop.applyForce(negativewind);
        }

        if (drop.pos.y > (height * 2 / 3)) {
            drop.applyForce(wind);
        } else if (drop.pos.y < height / 3) {
            drop.applyForce(negativewind);
        }






        drop.applyForce(gravity);
        drop.turbulence();
        drop.convect();
        drop.update();
        drop.show();
    });






    // draw ground
    fill(100, 80, 70)
    rect(0, height - groundHeight, width, groundHeight);



    windTheta += 0.01;
    // noLoop();



}

function calculateHumidity() {

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            humidity[i][j] = drops.filter(d => d.i === i && d.j === j).length;
        }
    }
}


function marchingSquareRain() {


    // how many drops per grid square
    calculateHumidity();



    noStroke();


    for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows - 1 - cloudMinHeight; j++) {

            const aval = humidity[i][j];
            const bval = humidity[i + 1][j];
            const cval = humidity[i + 1][j + 1];
            const dval = humidity[i][j + 1];


            const state = getState(aval, bval, cval, dval);

            if (state > 0) {

                const a = createVector((i + 0.5) * grid, j * grid);
                const b = createVector((i + 1) * grid, (j + 0.5) * grid);
                const c = createVector((i + 0.5) * grid, (j + 1) * grid);
                const d = createVector(i * grid, (j + 0.5) * grid);


                const a1 = createVector(i * grid, j * grid);
                const b1 = createVector((i + 1) * grid, j * grid);
                const c1 = createVector((i + 1) * grid, (j + 1) * grid);
                const d1 = createVector(i * grid, (j + 1) * grid);


                const br = map(state, 0, 15, 90, 100);
                const sa = map(state, 0, 15, 100, 30);
                fill(200, sa, br);

                beginShape();


                if (state === 0) {
                } else if (state === 1) {
                    addVertex(c);
                    addVertex(d);
                    addVertex(d1);
                } else if (state === 2) {

                    addVertex(b);
                    addVertex(c);
                    addVertex(c1);
                } else if (state === 3) {
                    addVertex(b);
                    addVertex(c1);
                    addVertex(d1);
                    addVertex(d);
                } else if (state === 4) {
                    addVertex(a);
                    addVertex(b);
                    addVertex(b1);
                } else if (state === 5) {
                    addVertex(a);
                    addVertex(b1);
                    addVertex(b);
                    addVertex(c);
                    addVertex(d1);
                    addVertex(d);
                } else if (state === 6) {
                    addVertex(a);
                    addVertex(b1);
                    addVertex(c1);
                    addVertex(c);
                } else if (state === 7) {
                    addVertex(a);
                    addVertex(b1);
                    addVertex(c1);
                    addVertex(d1);
                    addVertex(d);
                } else if (state === 8) {
                    addVertex(a);
                    addVertex(d);
                    addVertex(a1);
                } else if (state === 9) {
                    addVertex(a);
                    addVertex(c);
                    addVertex(d1);
                    addVertex(a1);
                } else if (state === 10) {
                    addVertex(a);
                    addVertex(b);
                    addVertex(c1);
                    addVertex(c);
                    addVertex(d);
                    addVertex(a1);
                } else if (state === 11) {
                    addVertex(a);
                    addVertex(b);
                    addVertex(c1);
                    addVertex(d1);
                    addVertex(a1);
                } else if (state === 12) {
                    addVertex(b);
                    addVertex(d);
                    addVertex(a1);
                    addVertex(b1);
                } else if (state === 13) {
                    addVertex(b);
                    addVertex(c);
                    addVertex(d1);
                    addVertex(a1);
                    addVertex(b1);

                } else if (state === 14) {
                    addVertex(c);
                    addVertex(d);
                    addVertex(a1);
                    addVertex(b1);
                    addVertex(c1);
                } else if (state === 15) {
                    addVertex(a1);
                    addVertex(b1);
                    addVertex(c1);
                    addVertex(d1);
                }
                endShape();


            }



        }
    }
}


function addVertex(a) {
    vertex(a.x, a.y);
}



function getState(a, b, c, d) {
    const aa = (a > cloudThreshold) ? 1 : 0;
    const bb = (b > cloudThreshold) ? 1 : 0;
    const cc = (c > cloudThreshold) ? 1 : 0;
    const dd = (d > cloudThreshold) ? 1 : 0;
    return aa * 8 + bb * 4 + cc * 2 + dd * 1;
}