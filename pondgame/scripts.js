


let pondPos;
let pondRadius;


let cat;
let mouse;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    reset();
}


function reset() {

    pondPos = createVector(width / 2, height / 2);
    pondRadius = Math.min(height, width) / 2;

    cat = new Cat({ x: 0, y: 0, r: 15, speed: 4 });
    mouse = new Mouse({ x: width / 2 + 10, y: height / 2, r: 10, speed: 1 });
}


function draw() {
    background(0);


    // draw pond
    noStroke();
    fill(200, 210, 255);
    ellipse(pondPos.x, pondPos.y, pondRadius, pondRadius);


    cat.show();
    // if (cat.inObstacle(pondPos, pondRadius)) {
    //     cat.stop();
    // } else {
    cat.hunt(mouse)
    // }

    if (cat.killed(mouse)) {
        reset();
    }

    cat.update()

    mouse.show();
    mouse.update();



}
