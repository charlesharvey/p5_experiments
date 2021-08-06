
let drawing;
let initialDrawingLocation;
let robot;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

}

function mousePressed() {
    drawing = [];
}

function mouseDragged() {

    const mv = createVector(mouseX, mouseY);

    if (!initialDrawingLocation) {
        initialDrawingLocation = mv
    }


    drawing.push(mv);
}

function mouseReleased() {
    if (drawing) {
        robot = new Robot(drawing[0].x, drawing[0].y);
    }

}




function draw() {
    background(0);



    if (drawing) {
        stroke(255)
        strokeWeight(3);
        noFill();
        beginShape()
        drawing.forEach(v => {
            vertex(v.x, v.y);
        })
        endShape()
    }

    if (robot) {
        robot.update();
        robot.show();

    }





}
