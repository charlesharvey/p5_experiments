
// https://img-9gag-fun.9cache.com/photo/abGMeR8_460svav1.mp4

let a;
let b;
let f1, f2;

let paths;
let noofballs;



function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);
    reset();
}

function reset() {
    noofballs = Math.floor(random(3, 33));

    a = random(200, 300);
    b = (a / (random(2.001, 3))) * 2;

    c = Math.sqrt(((a * a) - (b * b)));


    const switchs = (Math.random() > 0.5) ? 1 : -1;
    f1 = createVector(c * switchs, 0);
    f2 = createVector(c * (switchs * -1), 0);

    paths = [];
    const ranang = random(0, 0.1);
    console.log(ranang);
    for (let i = 0; i < noofballs; i++) {
        const theta = TWO_PI / noofballs * i + ranang;
        const path = new Path(theta);
        paths.push(path);
    }

    background(0);


}



function draw() {


    translate(width / 2, height / 2);


    stroke(255);
    strokeWeight(1);
    noFill();

    // draw ellipse
    beginShape();
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
        const r = (a * b) / (Math.sqrt(Math.pow(a * cos(theta), 2) + (Math.pow(b * sin(theta), 2))));
        const x = r * sin(theta);
        const y = r * cos(theta);
        vertex(x, y);
    }
    endShape(CLOSE);

    // foci
    fill(100);
    noStroke();
    ellipse(f1.x, f1.y, 8, 8);
    ellipse(f2.x, f2.y, 8, 8);




    // noLoop();
    paths.forEach(path => {
        path.update();
        path.show();
    });


    if (paths.every(p => p.finished)) {
        reset();
    }





}
