

let x;
let prevx, prevy;
let a;
let theta = 0;

const minX = -5;
const maxX = 5;
const dx = 0.09;
const maxY = 20;


let p1, p2;

function setup() {

    createCanvas(windowWidth - 20, windowHeight - 20);
    background(0);

    p1 = createVector(100, random(0, height / 2));
    p2 = createVector(width / 2, height - 100);


    reset();
}

function reset() {



    x = minX;

    a = map(sin(theta), -1, 1, 0.001, 3);
    prevx = null;
    prevy = null;
}


function draw() {

    fill(255, 0, 0);
    ellipse(p1.x, p1.y, 5, 5);
    ellipse(p2.x, p2.y, 5, 5);


    stroke(255);

    if (x < maxX) {
        x += dx;
        const y = (a * Math.cosh(x / a));

        if (y < maxY) {
            const px = map(x, minX, maxX, p1.x, width - p1.x);
            const py = map(y, 0, maxY, p2.y, p1.y);


            if (prevx) {
                line(px, py, prevx, prevy);
            }

            prevx = px;
            prevy = py;

        }
    } else {
        reset();
    }

    theta += 1.618;

}






function Olddraw() {

    fill(255);
    stroke(255);
    strokeWeight(1);



    if (x < maxX) {
        x += dx;
        const y = (a * Math.cosh(x / a));

        if (y < maxY) {
            const px = map(x, minX, maxX, 100, width - 100);
            const py = map(y, 0, maxY, height - 100, 100);


            if (prevx) {
                line(px, py, prevx, prevy);
            }

            prevx = px;
            prevy = py;

        }
    } else {
        reset();
    }
    theta += 1.618;


}

