



let points;
let w, h;
const range = 10;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    w = min(height, width);
    h = w;


    points = [];
    for (let theta = 0; theta < TWO_PI; theta += (TWO_PI / 30)) {
        const i = sin(theta) * range;
        const j = cos(theta) * range;
        const point = new Point(i, j);
        points.push(point);
    }






}



function draw() {
    background(0);

    noFill();
    strokeWeight(1);
    stroke(255, 100);


    for (let i = -range; i < range; i += (range / 10)) {
        const x = map(i, -range, range, 0, w);
        const y = map(i, -range, range, 0, h);
        line(x, 0, x, h);
        line(0, y, w, y);
    }

    points.forEach(point => {
        point.show();

    });







}
