


let angle = 360 - (360 / 1.618);
let i = 0;
let c = 10;


let total = 0;
let maxTotal = 2000;


function setup() {


    createCanvas(700, 700);
    background(0);

    angleMode(DEGREES);
    colorMode(HSB, 255, 255, 255);
}

function mouseMoved() {

    // angle = map(mouseX, 0, width, 130, 142);
    // c = map(mouseY, 0, height, 1, 10);
    // console.log(mouseX);
}



function mousePressed() {
    total = 0;
}

function draw() {

    fill(255, 100);
    noStroke();
    translate(width / 2, height / 2);

    background(0);

    for (let i = 0; i < total; i++) {

        fill(i % 256, 255, 255);

        let a = angle * i;
        let r = c * sqrt(i);
        let x = sin(a) * r;
        let y = cos(a) * r;

        let e = map(i, 0, maxTotal, 3, 10);

        ellipse(x, y, e, e);

    }

    // total = (total + 1) % maxTotal;

    if (total < maxTotal) {
        total++;
    }

    // let a = angle * i;
    // let r = c * sqrt(i);
    // let x = sin(a) * r;
    // let y = cos(a) * r;

    // ellipse(x, y, 10, 10);
    // i++;


    angle += 0.001;
    c = sin(angle) * 10 + 3;



}
