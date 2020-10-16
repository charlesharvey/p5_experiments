


const grid = 13;


let rows, cols;
let vertices;


let theta_x = 0;
let theta_y = 0;
let theta_z = 0;
let theta_scale = 0;
let noise_x = 0;
let noise_y = 0;


function setup() {


    createCanvas(650, 650, WEBGL);


    // noiseSeed(5);

    rows = Math.ceil(width / grid);
    cols = Math.ceil(height / grid);

    reset();
}


function octaveNoise(x, y) {

    let tn = 0;
    const maxHeight = 200;

    const maxOctaves = 1;
    for (let octave = 0; octave < maxOctaves; octave++) {
        const h = maxHeight / Math.pow(2, octave);
        const lacrinarity = (octave + 1) * 10;

        const n = map(noise(noise_x + x / lacrinarity, noise_y + y / lacrinarity), 0, 1, 0, h);

        tn += n;

    }


    return tn;
    // map(noise(x / 2 + noise_x, y / 2 + noise_y), 0, 1, 0, 200);
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
            const z = octaveNoise(x, y);
            v.z = z;
        }

    }
}

function draw() {
    background(0);


    const sc = map(sin(theta_scale), -1, 1, 1.65, 0.75);
    scale(sc);

    rotateX(1);
    rotateZ(theta_y);

    translate(-width / 2, -height / 2);


    stroke(185, 100, 20);
    strokeWeight(1);
    // fill(255, 100);
    noFill();

    updateHeights();


    for (let y = 0; y < rows; y++) {
        beginShape();
        for (let x = 0; x < cols; x++) {
            const v = vertices[x][y];
            vertex(v.x, v.y, v.z);
        }
        endShape();
    }

    for (let x = 0; x < cols; x++) {
        beginShape();
        for (let y = 0; y < rows; y++) {
            const v = vertices[x][y];
            vertex(v.x, v.y, v.z);
        }
        endShape();
    }



    noFill();
    stroke(70);
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
    noise_x += 0.09;
    noise_y += 0.08;

}
