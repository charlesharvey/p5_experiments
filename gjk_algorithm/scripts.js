

let polygon1, polygon2;


let direction, theta, inverted_direction;
let simplex;
let origin;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);

    frameRate(1);


    simplex = [];


    origin = createVector(0, 0);

    polygon1 = [];
    polygon1.push(createVector(-300, 100));
    polygon1.push(createVector(0, 100));
    polygon1.push(createVector(-250, -100));

    polygon2 = [];
    polygon2.push(createVector(-180, 0));
    polygon2.push(createVector(150, -100));
    polygon2.push(createVector(200, 100));
    polygon2.push(createVector(-100, 300));


    theta = random(0, TWO_PI);
    setDirection();


}



function setDirection() {
    direction = p5.Vector.fromAngle(theta)
    inverted_direction = direction.copy().mult(-1);
}




function draw() {
    background(0);


    translate(width / 2, height / 2);


    noFill();
    strokeWeight(3);

    // draw arrow
    stroke(220, 255, 255);
    const dx1 = direction.x;
    const dy1 = direction.y;
    let dir2 = direction.copy().mult(100);
    const dx2 = dir2.x;
    const dy2 = dir2.y;
    line(dx1, dy1, dx2, dy2);
    ellipse(dx2, dy2, 3, 3);
    // draw arrow




    stroke(100, 255, 255);

    beginShape();
    polygon1.forEach(v => {
        vertex(v.x, v.y)
    });
    endShape(CLOSE);

    beginShape();
    polygon2.forEach(v => {
        vertex(v.x, v.y)
    });
    endShape(CLOSE);



    stroke(30, 200, 200);
    const fp_1 = furthestPoint(polygon1, direction);
    ellipse(fp_1.x, fp_1.y, 8, 8);
    const fp_2 = furthestPoint(polygon2, inverted_direction);
    ellipse(fp_2.x, fp_2.y, 8, 8);


    const sp_1 = p5.Vector.sub(fp_1, fp_2);
    simplex.push(sp_1);

    theta = p5.Vector.sub(origin, sp_1).heading();
    setDirection();

    if (simplex.length == 2) {
        const B = simplex[0];
        const A = simplex[1];
        const AB = B.sub(A);
        const AO = origin.sub(A);
        const AB_perp = triple_product(AB, AO, AB);
        theta = AB_perp.heading();
        setDirection();

    } else {
        const C = simplex[0];
        const B = simplex[1];
        const A = simplex[2];
    }



    // draw simplex
    stroke(180, 255, 255);
    beginShape()
    simplex.forEach(v => {
        vertex(v.x, v.y);
    });
    endShape(CLOSE);




    // origin
    stroke(255, 0, 50);
    strokeWeight(1);
    ellipse(0, 0, 5, 5);
    line(0, height * -0.5, 0, height * 0.5);
    line(width * -0.5, 0, width * 0.5, 0);





}


function furthestPoint(polygon, direction) {
    let recordpoint;
    let recorddistance = -Infinity;

    polygon.forEach(v => {
        const dt = direction.dot(v);
        if (dt > recorddistance) {
            recorddistance = dt;
            recordpoint = v;
        }
    });
    return recordpoint;
}

function triple_product(a, b, c) {
    const f1 = a.cross(b);
    const f2 = f1.cross(c);
    return f2;
}