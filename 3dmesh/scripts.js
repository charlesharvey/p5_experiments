


const grid = 20;


let rows, cols;
let vertices;


let theta_x = 0;
let theta_y = 0;
let theta_z = 0;
let theta_scale = 0;
let noise_x = 0;
let noise_y = 0;


function setup() {


    createCanvas(700, 700, WEBGL);




    rows = Math.ceil(width / grid);
    cols = Math.ceil(height / grid);

    reset();
}



function reset() {

    vertices = [];
    for (let x = 0; x < cols; x++) {
        vertices[x] = [];
        for (let y = 0; y < rows; y++) {
            vertices[x][y] = createVector(x * grid, y * grid, 0);
        }

    }

}


function updateHeights() {

    for (let y = 0; y < rows; y++) {

        for (let x = 0; x < cols; x++) {
            const v = vertices[x][y];
            const z = map(noise(x / 2 + noise_x, y / 2 + noise_y), 0, 1, 0, 200);
            v.z = z;
        }

    }
}

function draw() {
    background(0);


    const sc = map(sin(theta_scale), -1, 1, 1.65, 0.75);
    scale(sc);

    rotateX(PI / 4);
    rotateZ(theta_y);

    translate(-width / 2, -height / 2);


    stroke(185);
    strokeWeight(1);
    // fill(255, 100);
    noFill();

    updateHeights();


    for (let y = 0; y < rows; y++) {
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < cols; x++) {
            const v = vertices[x][y];
            vertex(v.x, v.y, v.z);
        }
        endShape();
    }

    for (let x = 0; x < cols; x++) {
        beginShape(TRIANGLE_STRIP);
        for (let y = 0; y < rows; y++) {
            const v = vertices[x][y];
            vertex(v.x, v.y, v.z);
        }
        endShape();
    }



    noFill();
    stroke(90);
    for (let x = 0; x < cols; x++) {
        beginShape(TRIANGLE_STRIP);
        for (let y = 0; y < rows; y++) {
            const v = vertices[x][y];
            vertex(v.x, v.y, 0);
        }
        endShape();
    }



    for (let y = 0; y < rows; y++) {
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < cols; x++) {
            const v = vertices[x][y];
            vertex(v.x, v.y, 0);
        }
        endShape();
    }


    theta_x += 0.01;
    theta_y += 0.02;
    theta_z += 0.01;
    theta_scale += 0.01;
    noise_x += 0.006;
    noise_y += 0.006;

}
