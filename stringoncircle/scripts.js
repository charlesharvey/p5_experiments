

const r = 300;
const numberOfCrossings = 250;
let percentageToCover = 0.01;
const detailInSquiggle = 120;
let zeta = 0;
let rippyzeta = 0;
let ripplyness;
function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

}



function draw() {
    background(255);

    stroke(0, 100);
    strokeWeight(1);

    translate(width / 2, height / 2);
    rotate(PI * 5 / 7 + (zeta / 10));

    noFill();



    ripplyness = map(sin(rippyzeta), -1, 1, 1, 10);

    let currentAngle = PI;
    const anglestep = TWO_PI / (numberOfCrossings + 1);
    let j = 0;
    let prevX, prevY, prevAngle;
    let minAngle = (PI) - PI * percentageToCover;
    let maxAngle = (PI) + PI * percentageToCover;
    while (currentAngle > minAngle && currentAngle < maxAngle) {



        let clockwise = 1;
        if (j % 2 == 0) {
            clockwise = -1;
        }
        currentAngle += (j * anglestep * clockwise);



        const x = sin(currentAngle) * r;
        const y = cos(currentAngle) * r;


        if (prevX && prevY && prevAngle) {



            heading = p5.Vector.add(createVector(prevX, prevY), createVector(x, y)).heading();

            if (clockwise == 1) {
                heading += PI;
            }

            beginShape();
            for (let d = 0; d <= detailInSquiggle; d++) {

                const dd = Math.pow(d / detailInSquiggle, 1);

                const bx = (ripplyness * 3) * map(Math.sin((j / (ripplyness + 20)) + (d / ripplyness + 2) + zeta), -1, 1, 0, 1);
                const by = (ripplyness * 9) * map(Math.cos((j / (ripplyness + 20)) + (d / ripplyness) + zeta), -1, 1, 0, 1);

                let dx = lerp(x, prevX, dd) + bx;
                let dy = lerp(y, prevY, dd) + by;



                vertex(dx, dy);



            }
            endShape();
            // line(prevX, prevY, x, y);
        }

        prevX = x;
        prevY = y;
        prevAngle = currentAngle;

        j++;

    }



    if (percentageToCover < 1) {
        percentageToCover += 0.01;
    }


    zeta += 0.08;
    ripplyness += 0.09;

}

function mousePressed() {
    percentageToCover = 0;
}


function sigmoid(z) {
    const k = 1;
    return 1 / (1 + Math.exp(-z / k));
}