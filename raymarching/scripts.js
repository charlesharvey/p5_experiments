let showFromAllPointsOfView = false;


let pos;
let mousePos;
let sunPosition;

let circles;

let theta;
let marchTimes = 10;
let marchMinDistance = 1;
const resolution = 6;



function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    resetCircles();
    theta = 1.1;
    pos = createVector(random(width), random(height));
    mousePos = pos.copy();

    sunPosition = createVector(width - 100, 20);


}

function keyPressed() {
    showFromAllPointsOfView = !showFromAllPointsOfView;
}

function resetCircles() {
    circles = [];
    for (let i = 0; i < 6; i++) {
        const radius = random(20, 90);
        const circle = createVector(random(width), random(height), radius);
        circles.push(circle);
    }
}

function mousePressed() {
    // resetCircles();
}

function mouseDragged() {

    mousePos.set(mouseX, mouseY);
    sunPosition.set(mouseX, mouseY);

}

function draw() {
    background(0);



    noStroke();
    fill(255, 255, 0);
    ellipse(sunPosition.x, sunPosition.y, 30, 30);



    if (showFromAllPointsOfView) {
        marchTimes = 1;
        for (let x = 0; x < width; x += resolution) {
            for (let y = 0; y < height; y += resolution) {
                pos.set(x, y);
                rayMarchAlgorithm();

            }
        }
    } else {

        pos = mousePos.copy();
        fill(255, 0, 0);
        noStroke();
        ellipse(pos.x, pos.y, 8, 8);


        marchTimes = 10;
        rayMarchAlgorithm();
        theta += 0.005;
    }



    // let sunRay = p5.Vector.sub(sunPosition, mousePos);
    // let sunTheta = sunRay.heading();

    // const d = rayMarch(mousePos, sunTheta);
    // if (d < marchMinDistance) {
    //     fill(255);
    //     ellipse(mousePos.x, mousePos.y, 5, 5);
    // }


}

function distanceToScene(p) {
    let di = Infinity;
    circles.forEach(circle => {

        if (!showFromAllPointsOfView) {
            stroke(70, 70, 100);
            fill(30, 30, 80);
            const r = circle.z * 2;
            ellipse(circle.x, circle.y, r, r);
        }

        const d = signedDistToCircle(p, circle);
        di = min(di, d);
    });

    return di;
}


function rayMarch(poss, angle) {

    let times = 0;
    let pos = poss.copy();
    let distToScene = Infinity;
    for (let i = 0; i < 10; i++) {
        times++;
        distToScene = distanceToScene(pos);


        // 
        if (Math.abs(distToScene) <= marchMinDistance) {
            i = 9999;
        } else {
            let ray = p5.Vector.fromAngle(angle);
            ray.mult(distToScene);
            ray.add(pos);

            // fill(100);
            // ellipse(pos.x, pos.y, 3, 3);
            pos = ray.copy();
        }
    }
    return { dist: distToScene, times: times };
}

function rayMarchAlgorithm() {
    let currentPosition = pos.copy();




    for (let i = 0; i < marchTimes; i++) {

        let distToScene = distanceToScene(currentPosition);



        if (distToScene < marchMinDistance + resolution) {
            i = 9999;
            noStroke();
            fill(255);
            // ellipse(currentPosition.x, currentPosition.y, 3, 3);




            // add shading
            if (showFromAllPointsOfView) {
                let sunRay = p5.Vector.sub(sunPosition, currentPosition);
                let sunTheta = sunRay.heading();
                const sunDistance = rayMarch(currentPosition, sunTheta); // 
                if (sunDistance.dist > marchMinDistance) {

                    fill(255);
                } else {
                    fill(255, 0, 0);
                }
                ellipse(currentPosition.x, currentPosition.y, 5, 5);
            }



        } else {
            let ray = p5.Vector.fromAngle(theta);
            ray.mult(distToScene);
            ray.add(currentPosition);





            if (!showFromAllPointsOfView) {
                stroke(0, 255, 255);
                strokeWeight(1);
                noFill()
                line(ray.x, ray.y, currentPosition.x, currentPosition.y);


                noStroke()
                fill(255, 0, 0)
                ellipse(currentPosition.x, currentPosition.y, 12, 12);


                noFill();
                strokeWeight(1);
                stroke(100);
                ellipse(currentPosition.x, currentPosition.y, distToScene * 2, distToScene * 2);
            }

            currentPosition = ray.copy();
        }




    }
}

function signedDistToCircle(ps, circle) {
    const radius = circle.z;
    return dist(circle.x, circle.y, ps.x, ps.y) - radius
}

function signedDistToSquare() {
    return 0;
}