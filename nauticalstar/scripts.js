
let zeta = 0;
let noofpoints = 8;
let len_1 = 200;
let len_2 = 70;
let levels = 4; // how many subpoint levels hsould there be

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    len_1 = min(width, height) / 2;
    len_2 = len_1 / 3.5;

    // noofpoints = Math.floor(random(3, 6));

}


function mouseMoved() {
    noofpoints = Math.floor(map(mouseX, 0, width, 3, 9));
    levels = Math.floor(map(mouseY, 0, height, 1, 5));
    // len_1 = (map(mouseX, 0, width, 100, height / 2));
    // len_2 = (map(mouseY, 0, height, 20, 100));
}

function draw() {
    background(0);

    translate(width / 2, height / 2);


    // noofpoints = map(sin(zeta), -1, 1, 3, 6);
    // len_1 = map(sin(zeta), -1, 1, height / 4, height / 3);
    // len_2 = map(cos(zeta * 2), -1, 1, height / 7, height / 14);


    // Math.floor

    for (let lev = levels; lev >= 0; lev--) {
        const gamma = (lev / (noofpoints * levels)) * TWO_PI;
        const len_11 = map(lev, 0, levels, len_1, len_1 * 0.6);
        push();
        rotate(gamma);

        for (let i = 0; i < (noofpoints); i++) {

            const theta1 = i / noofpoints * TWO_PI;
            const x1 = sin(theta1) * len_11;
            const y1 = cos(theta1) * len_11;

            const theta2 = ((i * 2 + 1) / (noofpoints * 2)) * TWO_PI;
            const x2 = sin(theta2) * len_2;
            const y2 = cos(theta2) * len_2;

            const theta3 = (((i - 1) * 2 + 1) / (noofpoints * 2)) * TWO_PI;
            const x3 = sin(theta3) * len_2;
            const y3 = cos(theta3) * len_2;

            stroke(255);
            strokeWeight(3);
            fill(20);
            beginShape();
            vertex(x1, y1);
            vertex(x2, y2);
            vertex(0, 0);
            endShape(CLOSE);

            stroke(255);
            strokeWeight(3);
            fill(160);
            beginShape();
            vertex(x1, y1);
            vertex(x3, y3);
            vertex(0, 0);
            endShape(CLOSE);

        } // end i loop
        pop();
    } // end levels loop




    zeta += 0.005;



}
