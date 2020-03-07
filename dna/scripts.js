
let h = 0;
let r = 40;
let theta = 0;

let arm1 = [];
let arm2 = [];
let arms = [arm1, arm2];
let braces = [];

function setup() {


    createCanvas(700, 600, WEBGL);


}



function draw() {
    background(0);



    // rotateX(PI / 5);
    // rotateZ(PI / 7 + (theta / 10));
    translate(0, h, 0);
    // rotateX(PI / 9 + (-theta / 100));

    // rotateZ(theta / 100);
    rotateX(PI / 2);

    noFill();

    strokeWeight(4);



    let x1 = sin(theta) * r;
    let y1 = cos(theta) * r;
    arm1.push({ x: x1, y: y1, h: h });

    let x2 = sin(theta + PI) * r;
    let y2 = cos(theta + PI) * r;
    arm2.push({ x: x2, y: y2, h: h });


    if (h % 30 == 0) {
        let bx1 = x1;
        let by1 = y1;
        let bx2 = x2;
        let by2 = y2;
        braces.push({ bx1, by1, bx2, by2, h });
    };

    stroke(255);
    arms.forEach(arm => {
        beginShape();
        arm.forEach(point => {
            vertex(point.x, point.y, point.h);
        });
        endShape();
    });


    stroke(255, 200, 100, 100);
    braces.forEach(brace => {
        line(brace.bx1, brace.by1, brace.h, brace.bx2, brace.by2, brace.h);
    });


    h += 1.5;
    theta += 0.06;

}
