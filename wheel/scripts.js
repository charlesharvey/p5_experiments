

const radius = 100;
let theta = 0;
let x1 = 200;
let cycloid = [];
const speed = 0.01;
function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);



}



function draw() {





    background(255);



    // floor
    stroke(0);
    strokeWeight(3);
    line(0, height - 50, width, height - 50);



    fill(200);
    stroke(0);
    beginShape();
    const y1 = height - 50 - radius;
    for (let i = 0; i < TWO_PI; i += speed) {

        const x = sin(i + theta) * radius + x1;
        const y = cos(i + theta) * radius + y1;
        vertex(x, y);
        if (i === 0) {
            cycloid.push({ x, y });
        }

    }
    endShape(CLOSE);



    x1 += 1;

    theta -= speed;

    noFill();
    stroke(255, 0, 0);
    strokeWeight(3);
    beginShape();
    cycloid.forEach(p => {
        vertex(p.x, p.y);
    });
    endShape();

    const cl = cycloid.length;
    if (cl > 0) {
        fill(255, 50);
        const cx = cycloid[cl - 1].x;
        const cy = cycloid[cl - 1].y;
        ellipse(cx, cy, 10, 10);
        line(cx, cy, x1, y1);
    }



    if (x1 > width - 300) {
        x1 = 300;
        theta = 0;
        cycloid = [];
    }



}
