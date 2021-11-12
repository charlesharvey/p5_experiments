
const r = 200;
let t = 0;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20, WEBGL);
    colorMode(HSB, 255, 255, 255);
}



function draw() {
    background(0);
    strokeWeight(5);
    stroke(255);
    noFill();

    rotateX(PI / 6);
    rotateY(t / 10);
    rotateZ(t / 10);


    const gamma = map(sin(t), -1, 1, 0, 1);

    for (let theta = 0; theta < PI; theta += 0.14) {
        for (let phi = 0; phi < TWO_PI; phi += 0.14) {

            const x1 = r * cos(phi) * sin(theta);
            const y1 = r * sin(phi) * sin(theta);
            const z1 = r * cos(theta);

            const x2 = r * phi / PI;
            const y2 = r * theta / TWO_PI;
            const z2 = 1;

            const x = lerp(x1, x2, gamma);
            const y = lerp(y1, y2, gamma);
            const z = lerp(z1, z2, gamma);

            const h = map(theta, 0, PI, 0, 255);
            stroke(h, 255, 255);
            point(x, y, z);

        }

    }



    t += 0.03;


}
