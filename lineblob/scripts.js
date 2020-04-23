

// https://gfycat.com/graypointedchrysalis

let grid = 20;
let cols;
let rows;
let theta = 0;

let blob;

function setup() {


    createCanvas(windowWidth - 5, windowHeight - 5);


    cols = Math.floor(width / grid);
    rows = Math.floor(height / grid);


}



function draw() {
    background(0);


    // blob = [];
    // let radius = height * 0.4;
    // for (let i = 0; i < TWO_PI; i += TWO_PI / 50) {
    //     let n = map(noise(i + theta), 0, 1, 0.4, 1);
    //     let x = width / 2 + sin(i) * (radius * n);
    //     let y = height / 2 + cos(i) * (radius * n);
    //     blob.push(createVector(x, y));
    // }


    // fill(255);
    // noStroke();
    // beginShape();
    // blob.forEach(v => {
    //     vertex(v.x, v.y);
    // })
    // endShape(CLOSE);



    stroke(155);
    strokeWeight(grid / 3);
    noFill();


    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {

            push();
            translate(x * grid, y * grid);
            const r = noise(theta + sin(y / 10), theta + cos(30 + x / 10) + 1000);
            let otherdiag = r < 0.5;

            // let n = noise(theta + x + y + ((mouseX + mouseY) / 1000)) * 200;
            // let d = dist(mouseX, mouseY, x * grid, y * grid);
            // let otherdiag = d < 100 + n;

            if (otherdiag) {
                line(0, 0, grid, grid);

                // fill(255, 50, 50, 100);
                // noStroke();
                // ellipse(0, 0, grid / 2, grid / 2);
            } else {
                line(0, grid, grid, 0);
            }
            pop();

        }
    }


    theta += 0.01;



}
