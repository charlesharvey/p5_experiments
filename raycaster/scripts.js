
const fieldOfView = 60;
const numberOfRays = 240;
const numberOfBarriers = 6;



let barriers;
let rays;
let columns;
let theta = 0;
// let floors;



function setup() {


    createCanvas(800, 400);


    mx = width / 2;
    my = height / 2;



    randomBarriers();

    rays = [];
    columns = [];
    const f = radians(fieldOfView / 2);
    for (let i = 0; i < numberOfRays; i++) {
        const theta = map(i, 0, numberOfRays, -f, f)
        const ray = new Ray(200, 200, theta);
        rays.push(ray);

        columns.push(0);
    };


}


function randomBarriers() {

    barriers = [];
    for (let i = 0; i < numberOfBarriers + 4; i++) {
        barrier = new Wall();
        barriers.push(barrier);

    };

    barriers[0].setAsTop();
    barriers[1].setAsBottom();
    barriers[2].setAsLeft();
    barriers[3].setAsRight();

}

function mouseMoved() {
    const mx = constrain(mouseX, 0, width / 2);
    const my = mouseY;
    if (rays) {
        rays.forEach(ray => {
            ray.moveTo(mx, my);
        })
    }

}


function mousePressed() {
    randomBarriers();

}

function keyPressed() {


    theta = 0;;
    if (keyCode == LEFT_ARROW) {
        theta = -0.05;
    } else if (keyCode == RIGHT_ARROW) {
        theta = 0.05;
    }

}

function draw() {
    background(0);
    rectMode(CENTER);


    rays.forEach((ray, r) => {
        let pt = ray.cast(barriers);
        if (pt) {

            let d = dist(pt.x, pt.y, ray.pos.x, ray.pos.y); // fish eye effect for 3d;
            const a = ray.heading.heading() - ray.theta;
            d *= cos(a);

            columns[r] = d;


            stroke(255, 40);
            line(pt.x, pt.y, ray.pos.x, ray.pos.y);
        }


        if (keyIsPressed === true) {
            ray.rotate(theta);
        }
    })



    barriers.forEach(barrier => {

        strokeWeight(1);
        stroke(255);
        line(barrier.a.x, barrier.a.y, barrier.b.x, barrier.b.y);
    });





    // 3d view

    // floor
    fill(30, 60, 10);
    noStroke();
    beginShape();
    vertex(width / 2, height);
    vertex(width / 2, height / 2);
    // floors.forEach(v => {
    //     // ellipse(v.x, v.y, 10, 10);
    //     // text(v.x, v.x, v.y);
    //     vertex(v[0], v[1])
    // });
    vertex(width, height / 2);
    vertex(width, height);
    endShape(CLOSE);





    columns.forEach((column, ci) => {
        const w2 = width / 2;
        const w = w2 / numberOfRays;
        const x = w2 + (ci * w) + w / 2;
        const y = height / 2;
        const h = map(column, 0, w2, height, 90);
        // inverse square law of brightness
        const hue = map(column * column, 0, w2 * w2, 210, 30);
        fill(hue);
        noStroke();
        rect(x, y, w + 1, h);

        const hue2 = map(column * column, 0, w2 * w2, 230, 30);
        fill(hue2);
        rect(x, y, w + 1, h / 6);

        // const fx = x;
        // const fy = y + h / 2;
        // floors.push([fx, fy]);
    });






}



function intersectionPoint(x1, y1, x2, y2, x3, y3, x4, y4) {


    const part5 = (x1 - x2) * (y3 - y4);
    const part6 = (y1 - y2) * (x3 - x4);
    const dem = (part5 - part6);

    if (dem == 0) {
        return null;
    }

    const part1 = (x1 - x3) * (y3 - y4);
    const part2 = (y1 - y3) * (x3 - x4);
    const part3 = (x1 - x2) * (y1 - y3);
    const part4 = (y1 - y2) * (x1 - x3);
    const t = (part1 - part2) / dem;
    const u = -(part3 - part4) / dem;

    if (t > 0 && t < 1 && u > 0) {
        const x = x1 + t * (x2 - x1);
        const y = y1 + t * (y2 - y1);
        return createVector(x, y);
    } else {
        return null;
    }

}