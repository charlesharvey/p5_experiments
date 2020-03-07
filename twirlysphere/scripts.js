
let h = 0;
let r = 40;
let theta = 0;
let bleta = 0;

let arm1 = [];
let arms = []

function setup() {


    createCanvas(600, 600, WEBGL);

    arms.push(arm1);

}



function draw() {
    background(0);

    rotateY(theta / 3);
    rotateX(-theta / 5);
    rotateZ(theta / 7);

    noFill();

    strokeWeight(2);


    let gamma = cos(bleta) * r;

    let x1 = sin(theta) * gamma;
    let y1 = cos(theta) * gamma;


    arm1.push({ x: x1, y: y1, h: h });



    stroke(255);
    arms.forEach(arm => {
        beginShape();
        arm.forEach(point => {
            vertex(point.x, point.y, point.h);
        });
        endShape();
    });




    h += 0.2;
    theta += 0.06;
    bleta += 0.1;
}
