

let point1;
let point2;

let control1;
let control2;

let percentage = 0;

let bezier;

let isquadratic = true;

function setup() {


    createCanvas(windowWidth - 10, windowHeight - 10);


    randomizePoints();



}


function randomizePoints() {
    percentage = 0;
    isquadratic = (random() > 0.5);
    bezier = [];
    point1 = createVector(random(width), random(height));
    point2 = createVector(random(width), random(height));
    control1 = createVector(random(width), random(height));
    control2 = createVector(random(width), random(height));
}


function draw() {
    background(0);
    // frameRate(10);


    noStroke();
    fill(255, 0, 0);
    ellipse(point1.x, point1.y, 5, 5);
    fill(0, 255, 0);
    ellipse(point2.x, point2.y, 5, 5);



    fill(0, 0, 255);
    ellipse(control1.x, control1.y, 5, 5);

    if (isquadratic) {
        ellipse(control2.x, control2.y, 5, 5);
    }



    fill(150);
    let d1 = p5.Vector.lerp(point1, control1, percentage);
    ellipse(d1.x, d1.y, 5, 5);
    let d2 = p5.Vector.lerp(control1, point2, percentage);
    ellipse(d2.x, d2.y, 5, 5);
    let p1 = p5.Vector.lerp(d1, d2, percentage);

    let d3, d4, p2, g1;

    if (isquadratic) {
        d3 = p5.Vector.lerp(point1, control2, percentage);
        ellipse(d3.x, d3.y, 5, 5);
        d4 = p5.Vector.lerp(control2, point2, percentage);
        ellipse(d4.x, d4.y, 5, 5);
        p2 = p5.Vector.lerp(d3, d4, percentage);
        fill(255, 255, 0);
        ellipse(p2.x, p2.y, 5, 5);


        g1 = p5.Vector.lerp(p1, p2, percentage);
        bezier.push(g1);
        fill(255, 255, 0);
        ellipse(g1.x, g1.y, 5, 5);

    } else {
        bezier.push(p1);
        fill(255, 255, 0);
        ellipse(p1.x, p1.y, 5, 5);
    }






    stroke(50);
    strokeWeight(1);
    noFill();
    line(d1.x, d1.y, d2.x, d2.y);



    line(point1.x, point1.y, control1.x, control1.y);
    line(control1.x, control1.y, point2.x, point2.y);


    if (isquadratic) {
        line(point1.x, point1.y, control2.x, control2.y);
        line(control2.x, control2.y, point2.x, point2.y);
        line(d3.x, d3.y, d4.x, d4.y);
        line(p1.x, p1.y, g1.x, g1.y);
        line(p2.x, p2.y, g1.x, g1.y);
    }



    stroke(100, 255, 255);
    strokeWeight(3);
    beginShape();
    bezier.forEach(b => {
        vertex(b.x, b.y);
    });
    endShape();


    percentage += 0.01;


    if (percentage > 1) {
        randomizePoints();
    }




}
