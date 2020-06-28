
// https://img-9gag-fun.9cache.com/photo/abGMeR8_460svav1.mp4

let a;
let b;
let f1, f2;

let paths;
let noofballs;
let percentage;



function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    reset();
}

function reset() {
    noofballs = Math.floor(random(3, 50));
    percentage = 0;
    a = random(200, 300);
    b = a / (random(1.001, 1.7));

    c = Math.sqrt(((a * a) - (b * b)));

    f1 = createVector(-c, 0);
    f2 = createVector(c, 0);

    paths = [];
    for (let i = 0; i < noofballs; i++) {
        const theta = TWO_PI / noofballs * i;
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


    // foci
    ellipse(f1.x, f1.y, 5, 5);
    ellipse(f2.x, f2.y, 5, 5);


    // draw ellipse
    beginShape();
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
        const r = (a * b) / (Math.sqrt(Math.pow(a * cos(theta), 2) + (Math.pow(b * sin(theta), 2))));
        const x = r * sin(theta);
        const y = r * cos(theta);
        vertex(x, y);



    }
    endShape(CLOSE);


    // noLoop();
    paths.forEach(path => {
        path.update();
        path.show();
    });




    percentage += 0.004;
    if (percentage > 1) {

        reset();
    }




}
