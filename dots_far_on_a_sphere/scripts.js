





let points = [];

const radius = 100;
function setup() {


    createCanvas(600, 600);



    for (let i = 0; i < 5; i++) {
        points.push(new Point(random(), random()));

    }
}



function draw() {
    background(0);
    noFill();
    stroke(255, 50);
    strokeWeight(1);

    translate(width / 2, height / 2);


    ellipse(0, 0, radius * 2, radius * 2);


    points.forEach(point => {
        point.show();
        point.calculateDirection(points);
        point.update();

    })



    // for (let i = 0; i < 1; i += 0.1) {
    //     for (let j = 0; j < 1; j += 0.1) {

    //     }
    // }


}
