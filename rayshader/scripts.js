
let resolution = 314;


let mx, my;

let barrier;

function setup() {


    createCanvas(600, 600);


    mx = width / 2;
    my = height / 2;


    barrier = randomBarrier();
}


function randomBarrier() {


    return { x1: random() * width, y1: random() * height, x2: random() * width, y2: random() * height };

}

function mouseMoved() {
    mx = mouseX;
    my = mouseY;
}


function mousePressed() {
    barrier = randomBarrier();

}

function draw() {
    background(0);



    strokeWeight(1);



    stroke(255);
    line(barrier.x1, barrier.y1, barrier.x2, barrier.y2);


    for (let i = 0; i < resolution; i++) {
        const theta = TWO_PI / resolution * i;
        const r = 100;
        const x = sin(theta) * r + mx;
        const y = cos(theta) * r + my;

        const point = intersectionPoint(mx, my, x, y, barrier.x1, barrier.y1, barrier.x2, barrier.y2);
        stroke(100);
        line(mx, my, point.x, point.y);
        line(mx, my, x, y);
    }

    // noLoop();

}



function intersectionPoint(x1, y1, x2, y2, x3, y3, x4, y4) {

    const part1 = x1 * y2 - y1 * x2;
    const part2 = x3 - x4;
    const part3 = (x1 - x2);
    const part4 = x3 * y4 - y3 * x4;
    const part5 = (x1 - x2) * (y3 - y4);
    const part6 = (y1 - y2) * (x3 - x4);

    const part7 = (y3 - y4);
    const part8 = y1 - y2;

    const px = (part1 * part2 - part3 * part4) / (part5 - part6);

    const py = (part1 * part7 - part8 * part4) / (part5 - part6);


    return { x: px, y: py };
}