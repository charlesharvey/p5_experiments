
let points = [];
let rotation = 0;

let r = 2;
let R = 4;
let sca = 100;
let resolution = 40;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20, WEBGL);



    reset();



}




function makeCube() {
    let sca = 100;
    points = [];
    // CUBE
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            for (let k = 0; k < 9; k++) {
                const point = createVector(i * 35, j * 35, k * 35);
                points.push(point);
            }
        }
    }
}

function makeBottle() {
    points = [];
    // KLEIN BOTTLE
    sca = 80;
    for (let gamma = 0; gamma < TWO_PI; gamma += (PI / resolution)) {
        for (let theta = 0; theta < TWO_PI; theta += (PI / resolution)) {

            const x = (-2 / 15) * cos(gamma) * (3 * cos(theta) - 30 * sin(gamma) + 90 * Math.pow(cos(gamma), 4) * sin(gamma) - 60 * Math.pow(cos(gamma), 6) * sin(gamma) + 5 * cos(gamma) * cos(theta) * sin(gamma));


            const y = (-1 / 15) * sin(gamma) * (3 * cos(theta) - 3 * Math.pow(cos(gamma), 2) * cos(theta) - 48 * Math.pow(cos(gamma), 4) * cos(theta) + 48 * Math.pow(cos(gamma), 6) * cos(theta) - 60 * sin(gamma) + 5 * cos(gamma) * cos(theta) * sin(gamma) - 5 * Math.pow(cos(gamma), 3) * cos(theta) * sin(gamma) - 80 * Math.pow(cos(gamma), 5) * cos(theta) * sin(gamma) + 80 * Math.pow(cos(gamma), 7) * cos(theta) * sin(gamma));


            const z = (2 / 15) * (3 + 5 * cos(gamma) * sin(gamma)) * sin(theta);

            const point = createVector(x * sca, y * sca, z * sca);
            points.push(point);
        }
    }
}

function makeFigureEight() {
    points = [];

    // // The figure 8 immersion 
    sca = 100;
    for (let gamma = 0; gamma < TWO_PI; gamma += (PI / resolution)) {
        for (let theta = 0; theta < TWO_PI; theta += (PI / resolution)) {
            const p1 = (r + (cos(theta / 2) * sin(gamma)) - (sin(theta / 2) * sin(2 * gamma)))
            const x = p1 * cos(theta);
            const y = p1 * sin(theta);
            const z = (sin(theta / 2) * sin(gamma)) + (cos(theta / 2) * sin(2 * gamma));
            const point = createVector(x * sca, y * sca, z * sca);
            points.push(point);
        }
    }
}


function makeMobius() {
    // // 3d PINCHED MOBIUS STRIPE
    points = [];
    sca = 30;
    for (let gamma = 0; gamma < TWO_PI; gamma += (PI / resolution)) {
        for (let theta = 0; theta < TWO_PI; theta += (PI / resolution)) {

            const x = (R + (r * cos(theta))) * cos(gamma);
            const y = (R + (r * cos(theta))) * sin(gamma);
            const z = r * sin(theta) * cos(gamma / 2);
            const point = createVector(x * sca, y * sca, z * sca);
            points.push(point);
        }
    }
}
function reset() {
    const r = Math.random();

    if (r < 0.25) {
        makeCube();
    } else if (r < 0.5) {
        makeBottle();
    } else if (r < 0.75) {
        makeFigureEight();
    } else {
        makeMobius();
    }
}



function mousePressed() {
    reset();
}

function draw() {
    background(0);

    rotateY(rotation);
    rotateZ(rotation / 3 + 1);
    rotateX(rotation / 2);

    // fill(100, 100);
    stroke(200, 100);
    noFill();

    beginShape(POINTS);
    points.forEach((point, i) => {
        vertex(point.x, point.y, point.z);
    })
    endShape();


    rotation += 0.04;

}
