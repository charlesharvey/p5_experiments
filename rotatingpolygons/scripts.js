
const numberPolygons = 16;
let sides = 7;
let radius = 200;
let percentage = 0.5;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

}

function mouseMoved() {

    sides = Math.ceil(mouseX / width * 10) + 2;
    radius = Math.ceil(mouseY / height * 200) + 150;

}

function draw() {
    background(0);

    translate(width / 2, height / 2);
    rotate(frameCount / 300 * TWO_PI);

    let polygons = [];



    let polygon = []
    for (let i = 0; i < sides; i++) {
        const theta = i / sides * TWO_PI
        const x = sin(theta) * radius;
        const y = cos(theta) * radius;
        const v = createVector(x, y);
        polygon.push(v);

    }
    polygons.push(polygon);


    for (let j = 0; j < numberPolygons; j++) {

        const prev = polygons[polygons.length - 1];
        const a = prev[0];
        const b = prev[1];
        const c = prev[2];

        const polygon = []
        for (let i = 0; i < sides; i++) {
            const j = (i + 1) % sides;
            const a = prev[i];
            const b = prev[j];
            const newv = p5.Vector.lerp(a, b, percentage);
            polygon.push(newv);
        }

        polygons.push(polygon);

    }


    fill(100, 205, 30, 10);
    stroke(255, 100);
    polygons.forEach((polygon, ii) => {

        if (ii == polygons.length - 1) {
            fill(0, 200);
        }

        beginShape();
        polygon.forEach(point => {
            vertex(point.x, point.y);
        })
        endShape(CLOSE);
    })


    percentage = (percentage + 0.003) % 1;




}
