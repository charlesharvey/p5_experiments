
let vertices = [];

let orthocenter;
let medicenter;
let circumcenter;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 100);
    colorMode(HSB);

    for (let i = 0; i < 3; i++) {
        const v = new Vertex(i);
        vertices.push(v)
    }

    orthocenter = createVector(0, 0);
    medicenter = createVector(0, 0);
    circumcenter = createVector(0, 0);

}


function calculateCircumcenter() {

    const p1 = vertices[0].pos;
    const p2 = vertices[1].pos;
    const p3 = vertices[2].pos;


    const A = vertices[0].angle;
    const B = vertices[1].angle;
    const C = vertices[2].angle;

    const x = (p1.x * sin(2 * A) + p2.x * sin(2 * B) + p3.x * sin(2 * C)) / (sin(2 * A) + sin(2 * B) + sin(2 * C));
    const y = (p1.y * sin(2 * A) + p2.y * sin(2 * B) + p3.y * sin(2 * C)) / (sin(2 * A) + sin(2 * B) + sin(2 * C));


    circumcenter.x = x;
    circumcenter.y = y;


}



function calculateMedicenter() {
    const p1 = vertices[0].pos;
    const p2 = vertices[1].pos;
    const p3 = vertices[2].pos;


    const x1 = p1.x;
    const y1 = p1.y;
    const x2 = p2.x;
    const y2 = p2.y;
    const x3 = p3.x;
    const y3 = p3.y;

    medicenter.x = (x1 + x2 + x3) / 3;
    medicenter.y = (y1 + y2 + y3) / 3;
}

function calculateOrthocenter() {

    const p1 = vertices[0].pos;
    const p2 = vertices[1].pos;
    const p3 = vertices[2].pos;


    const x1 = p1.x;
    const y1 = p1.y;
    const x2 = p2.x;
    const y2 = p2.y;
    const x3 = p3.x;
    const y3 = p3.y;

    const A = vertices[0].angle;
    const B = vertices[1].angle;
    const C = vertices[2].angle;


    const x = (x1 * tan(A) + x2 * tan(B) + x3 * tan(C)) / (tan(A) + tan(B) + tan(C));
    const y = (y1 * tan(A) + y2 * tan(B) + y3 * tan(C)) / (tan(A) + tan(B) + tan(C));

    orthocenter.x = x;
    orthocenter.y = y;


}



function draw() {



    background(0);

    vertices.forEach((v, i) => {

        v.setAngle(vertices);
        v.update();
        v.show();
    });


    calculateOrthocenter();
    fill(50);
    ellipse(orthocenter.x, orthocenter.y, 5, 5);
    text('o', orthocenter.x + 10, orthocenter.y + 10);


    calculateCircumcenter();
    fill(80);
    ellipse(circumcenter.x, circumcenter.y, 5, 5);
    text('c', circumcenter.x + 10, circumcenter.y + 10);

    calculateMedicenter();
    fill(80);
    ellipse(medicenter.x, medicenter.y, 5, 5);
    text('m', medicenter.x + 10, medicenter.y + 10);


    strokeWeight(1);
    stroke(40, 00, 40);
    line(medicenter.x, medicenter.y, orthocenter.x, orthocenter.y);
    line(medicenter.x, medicenter.y, circumcenter.x, circumcenter.y);




    const r = dist(circumcenter.x, circumcenter.y, vertices[0].pos.x, vertices[0].pos.y) * 2;
    if (r < width) {
        noFill();
        stroke(40, 0, 10);
        ellipse(circumcenter.x, circumcenter.y, r, r);

    }


    stroke(120);
    strokeWeight(2);
    noFill();
    beginShape();
    vertices.forEach((v, i) => {
        vertex(v.pos.x, v.pos.y);
    });
    endShape(CLOSE);






}
