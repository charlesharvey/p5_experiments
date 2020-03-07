

let rays = 230;
let r;
let gamma;
let phi;
let mincirclesize = 5;
let maxcirclesize = 30;
function setup() {


    createCanvas(600, 600);

    gamma = 0;
    phi = 0;
    reset();
}


function mousePressed() {
    reset();
}

function reset() {
    background(255);
    r = 0;

    loop();
}

function draw() {


    translate(width / 2, height / 2);

    fill(255);

    strokeWeight(2);

    for (let i = 0; i < rays; i++) {

        const theta = TWO_PI / rays * i;


        stroke(255, 0, 0);
        if (i % 2 == 0) {
            stroke(0, 0, 255);
        }

        const xoff = noise(i + gamma);
        const yoff = noise(i + 100 + gamma + gamma);
        const radoff = sin(i + phi);

        const x = sin(theta + xoff) * r;
        const y = cos(theta + yoff) * r;


        const rad = map((radoff), -1, 1, mincirclesize, maxcirclesize);
        ellipse(x, y, rad, rad);




    }


    r += 10;
    gamma += 0.001;
    phi += 0.28;

    if (r > width / 2) {
        noLoop();
    }



}
