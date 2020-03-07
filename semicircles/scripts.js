
let size = 25;
let theta = 0;
let zeta = 0;
let speed = 0.012;

let numberofcircles = 8;

let offsetX = 0;
let offsetY = 0;

function setup() {


    createCanvas(600, 600);
    colorMode(HSB);



}


// function mouseMoved() {
//     offset = map(mouseX, 0, width, -5, 5);
// }



function draw() {

    background(0);

    translate(height / 2, width / 2);

    stroke(255);
    strokeWeight(size * 0.4);
    noFill();

    for (let i = 1; i <= numberofcircles; i++) {

        let h = map(i, 1, numberofcircles - 1, 0, 255);
        stroke(h, 80, 80);

        arc(i * offsetX, i * offsetY, i * size, i * size, theta * i, PI + theta * i);
    };



    offsetX = sin(zeta) * 3;
    offsetY = cos(zeta) * 3;



    zeta += (3 * speed);
    theta += speed;


}
