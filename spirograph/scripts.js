

let theta = 0; // main circular angle
let phi = 0;   // secondary angle for x
let gamma = 0; // secondary angle for y
let hue = 0; // starting color of point;


// OPTIONS
let radius, minor_radius, size, theta_d, phi_d, gamma_d;



let points = [];



function setup() {

    createCanvas(600, 600);

    colorMode(HSB, 255, 100, 100);

    radius = random(100, 200);
    minor_radius = random(10, 100);
    size = 3;
    theta_d = 1 / floor(random(50, 100));
    phi_d = 0.01;//  1 / floor(random(1, 10));  
    gamma_d = -0.5; //1 / floor(random(1, 100));  


}



function draw() {


    background(0);

    translate(height / 2, width / 2);



    const rr = radius * map(sin(phi), -1, 1, 0.8, 1);
    const x = sin(theta) * rr;
    const y = cos(theta) * rr;

    const dx = sin(gamma) * minor_radius;
    const dy = cos(gamma) * minor_radius;

    const v = createVector(x + dx, y + dy);
    points.push(v);




    theta -= theta_d;
    phi -= phi_d;
    gamma -= gamma_d;


    strokeWeight(size);
    stroke(hue, 100, 100);
    noFill();
    beginShape();
    points.forEach((point, i) => {
        vertex(point.x, point.y);
        // let h = i % 255; //  map(i, 0, points.length, 0, 255);
        // fill(h, 100, 100, 50);
        // noStroke();
        // ellipse(point.x, point.y, size, size);

    })
    endShape();


    if (points.length > 2300) {
        points.splice(0, 1);
    }

    hue = (hue + 0.01) % 255;


}
