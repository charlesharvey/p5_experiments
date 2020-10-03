

let r = 17;
let theta = 0;
let granularity = 20;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

}



function draw() {
    background(255);


    translate(width / 2, height / 2);




    let prevx, prevy;
    let hour = 1;
    for (let i = 0; i < 1000; i++) {
        const ii = i / granularity;
        const x = sin(TWO_PI - ii + theta) * (ii * r);
        const y = cos(TWO_PI - ii + theta) * (ii * r);


        if (prevx && prevy) {
            stroke(100, 100, 0);

            noFill();
            strokeWeight(i / 20);
            line(prevx, prevy, x, y);
        }
        prevx = x;
        prevy = y;

        if (i % 15 == 0) {
            const tsz = map(i, 0, 500, 1, 30);
            const tx = sin(TWO_PI - ii + theta) * (ii * r + tsz);
            const ty = cos(TWO_PI - ii + theta) * (ii * r + tsz);
            noStroke();
            fill(0);
            if (hour == 0) {
                hour = 12;
            }
            textSize(tsz);
            text(hour, tx, ty);
            hour = (hour + 1) % 12;
        } else if (i % 3 == 0) {
            const tx = sin(TWO_PI - ii + theta) * (ii * r * 0.9);
            const ty = cos(TWO_PI - ii + theta) * (ii * r * 0.9);
            stroke(0);
            strokeWeight(1);
            line(tx, ty, x, y);
        }




    }


    theta += 0.03;
    granularity -= 0.005;
    // r += 0.01;

}
