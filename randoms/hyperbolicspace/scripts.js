



let square;


let corners;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);


    square = new Square(0, 0);


    const corner1 = new Corner(0, 0);
    const corner2 = new Corner(100, 0);
    const corner3 = new Corner(100, 100);
    const corner4 = new Corner(0, 100);

    corners = [];
    corners.push(corner1);
    corners.push(corner2);
    corners.push(corner3);
    corners.push(corner4);




    // let newcorners = corner2.addChildren(corner1, corner3);
    // newcorners.map(nc => corners.push(nc));

}


function mousePressed() {
    square.addChildren();

    for (let i = 3; i >= 0; i--) {
        const c = corners[i];
        const prev = corners[(i - 1 + corners.length) % corners.length];
        const next = corners[(i + 1 + corners.length) % corners.length];
        let newcorners = c.addChildren(prev, next);
        newcorners.map(nc => corners.push(nc));
    }
}


function draw() {

    // translate(width / 2, height / 2);
    // corners.forEach(corner => {
    //     corner.show();
    // });

    // drawSquare();
    drawOld();
}




function drawSquare() {
    // translate(width / 2, height / 2);
    // rotate(PI / 4);
    // square.show();
}


function drawOld() {
    background(0);
    stroke(255);
    strokeWeight(3);

    translate(width / 2, height / 2);
    rotate(PI / 4);

    fill(100, 0, 80);
    beginShape();
    let square = []
    for (let i = 0; i < TWO_PI; i += (TWO_PI / 4)) {
        const r = 100;
        const x = sin(i) * r;
        const y = cos(i) * r;
        vertex(x, y);
        square.push([x, y]);
    }
    endShape();



    let outersquares = []
    for (let i = 0; i < 20; i++) {
        let theta = i / 20 * TWO_PI
        let r = 200;

        if (i % 5 == 1 || i % 5 == 4) {
            r = 250;
        }
        const x = sin(theta) * r;
        const y = cos(theta) * r;
        outersquares.push([x, y]);
    }

    let farthestquares = []
    for (let i = 0; i < 100; i++) {
        let theta = i / 100 * TWO_PI
        let r = 270;

        if (i % 5 == 1 || i % 5 == 4) {
            r = 270;
        }
        const x = sin(theta) * r;
        const y = cos(theta) * r;
        farthestquares.push([x, y]);

        ellipse(x, y, 5, 5);
    }



    square.forEach((corner, i) => {
        const f2 = (i * 5) + 2;
        const f3 = (i * 5) + 3;
        const nextcorner = (i + 1) % square.length;


        let h = (i + (2 / 3)) / 4 * 255;
        fill(h, 100, 100);
        beginShape();
        vertex(corner[0], corner[1]);
        vertex(outersquares[f2][0], outersquares[f2][1]);
        vertex(outersquares[f3][0], outersquares[f3][1]);
        vertex(square[nextcorner][0], square[nextcorner][1]);
        endShape();


        const f1 = ((i * 5) + 1) % outersquares.length;
        const f0 = ((i * 5) + 0) % outersquares.length;
        const ff = ((i * 5) + outersquares.length - 1) % outersquares.length;
        const fe = ((i * 5) + outersquares.length - 2) % outersquares.length;
        const fd = ((i * 5) + outersquares.length - 3) % outersquares.length;


        h = (i + (1 / 3)) / 4 * 255;
        fill(h, 100, 100);
        beginShape();
        vertex(corner[0], corner[1]);
        vertex(outersquares[f0][0], outersquares[f0][1]);
        vertex(outersquares[f1][0], outersquares[f1][1]);
        vertex(outersquares[f2][0], outersquares[f2][1]);
        endShape();

        h = i / 4 * 255;
        fill(h, 100, 100);
        beginShape();
        vertex(corner[0], corner[1]);
        vertex(outersquares[f0][0], outersquares[f0][1]);
        vertex(outersquares[ff][0], outersquares[ff][1]);
        vertex(outersquares[fe][0], outersquares[fe][1]);
        endShape();






    })






}
