


let noiseX;
let noiseY;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);

    noiseX = random(123789);
    noiseY = random(123789);
}



function draw() {

    const numberOfHexes = 5;
    background(0);
    noFill();
    stroke(255);
    const size = width / (numberOfHexes * 2);
    const colors = [0, 50, 100];
    // strokeWeight(size / 6);
    strokeWeight(2);


    let mm = 0;
    for (let i = 0; i <= numberOfHexes; i++) {
        for (let j = 0; j <= numberOfHexes; j++) {

            let xoff = (i * size * 2);
            let yoff = (j * size * 1.6666667);
            if (j % 2 == 1) {
                xoff += size;
            }



            for (let t = 0; t < 6; t++) {
                const growth = 1.11;
                beginShape();
                stroke(colors[t % 3], 200, 200);
                let theta1 = TWO_PI / 6 * ((t + 0 + mm) % 6);
                let theta2 = TWO_PI / 6 * ((t + 1 + mm) % 6);
                let x1 = xoff + sin(theta1) * size * growth;
                let y1 = yoff + cos(theta1) * size * growth;
                let x2 = xoff + sin(theta2) * size * growth;
                let y2 = yoff + cos(theta2) * size * growth;

                const offset = 20;
                let x3 = offset + xoff + sin(theta1) * size * growth;
                let y3 = offset + yoff + cos(theta1) * size * growth;

                let wobbleX = map(noise(noiseX + t + i + j), 0, 1, 0.97, 1.03)
                let wobbleY = map(noise(noiseY + t + i + j), 0, 1, 0.97, 1.03)

                let x4 = wobbleX * xoff + offset;
                let y4 = wobbleY * yoff + offset;
                let x5 = wobbleX * xoff + sin(theta2) * size * growth;
                let y5 = offset + yoff + cos(theta2) * size * growth;




                vertex(x1, y1);
                vertex(xoff, yoff);
                vertex(x2, y2);
                // vertex(x5, y5);
                // vertex(x4, y4);
                // vertex(x3, y3);


                // endShape(CLOSE);
                endShape();

                // mm++;
            }




        }

    }


    noiseX += 0.01;
    noiseY += 0.01;

}
