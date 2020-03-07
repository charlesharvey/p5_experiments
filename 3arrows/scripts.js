

class Arrow {

    constructor(color) {
        this.col = color;

        this.points = [
            [0, 0],
            [0, 100],
            [200, 100],
            [200, 200],
            [300, 50],
            [200, -100],
            [200, 0],
        ]
    }

    show() {

        fill(this.col);
        stroke(0);
        strokeWeight(3);

        beginShape();
        this.points.forEach(point => {
            vertex(point[0], point[1], 0);
        })
        endShape();

        beginShape();
        this.points.forEach(point => {
            vertex(point[0], point[1], 100);
        })
        endShape();

        // strokeWeight(1);
        // stroke(this.col);
        // noFill();
        // this.points.forEach(point => {
        //     line(point[0], point[1], 0, point[0], point[1], 100);
        // });

        for (let i = 0; i < this.points.length; i++) {
            const first = this.points[i];
            const second = this.points[(i + 1) % this.points.length];
            beginShape();
            vertex(first[0], first[1], 0);
            vertex(first[0], first[1], 100);
            vertex(second[0], second[1], 100);
            vertex(second[0], second[1], 0);
            endShape();
        }



    }

}

let angle = 0;

function setup() {


    createCanvas(600, 800, WEBGL);

    arrow1 = new Arrow(color(255, 100, 20));
    arrow2 = new Arrow(color(20, 100, 200));
    arrow3 = new Arrow(color(100, 100, 100));




}



function draw() {
    background(255);


    let locX = mouseX - width / 2;
    let locY = mouseY - height / 2;
    camera(locX, locY, 600, 0, 0, 0, 0, 1, 0);


    // lights();

    // spotLight(0, 250, 0, 100, 100, 100, 0, 0, -1, Math.PI / 16);
    // pointLight(locX, locY, 250, 100, 100, 1000);
    // normalMaterial();
    // pointLight();

    translate(-100, -100, -300);

    // rotateX(PI / 10);
    // rotateZ(-PI / 6);
    // rotateY(PI / 5);


    rotateY(angle);
    rotateZ(angle);
    // rotateX(angle);
    angle += 0.014;



    push();
    arrow1.show();
    pop();

    push();
    translate(200, 100, 100);
    rotateZ(PI / 2);
    rotateY(PI / 2);
    arrow2.show();
    pop();

    push();
    translate(100, 200, -100);
    rotateX(PI / 2);
    rotateY(-PI / 2);
    arrow3.show();
    pop();


    // noLoop();
    // fill(100);
    // noStroke();
    // sphere(1);
}
