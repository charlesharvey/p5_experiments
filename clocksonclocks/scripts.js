
let clock;

let speed;

function setup() {


    createCanvas(600, 600);

    speed = 0.5; // how quick do the hands move
    let w = 300;
    clock = new Clock({
        x: width / 2,
        y: height / 2,
        width: w,
        time: 0,
        isParent: true
    });

    clock.addChildren();







}


function mouseMoved() {
    speed = map(mouseX, 0, width, -0.6, 1.4);

}



function mousePressed() {
    if (mouseY < height / 2) {

        clock.addChildren();

    } else {
        clock.removeChildren();
    }

}



function draw() {
    background(205, 220, 255);


    // translate(50, 50);


    clock.show();
    clock.update();




}
