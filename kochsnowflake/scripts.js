


let maxw;
let parts;
let colortheta = 0;
const grid = 3;
let pointyness;
function setup() {


    createCanvas(windowWidth - 12, windowHeight - 12);
    colorMode(HSB);

    maxw = min(width / 2.5, height / 2.5);



    reset();


}

function reset() {
    pointyness = random(0.7, 5);
    parts = [];
    for (let i = 0; i < 3; i++) {
        const w = maxw;
        const theta1 = TWO_PI / 3 * i;
        const theta2 = TWO_PI / 3 * (i + 1);
        const x2 = sin(theta2) * w;
        const y2 = cos(theta2) * w;
        const x1 = sin(theta1) * w;
        const y1 = cos(theta1) * w;

        const cx = 0;// width / 2;
        const cy = 0;// height / 2;
        const p = new Part(x1 + cx, y1 + cy, x2 + cx, y2 + cy);
        parts.push(p);

    };


}

function draw() {
    background(0);

    // translate(width / 2, height / 2);



    // loadPixels();

    // updatePixels();

    // for (let x = 0; x < width; x += grid) {
    //     for (let y = 0; y < height; y += grid) {


    //         record_d = 100000;
    //         parts.forEach(part => {
    //             d = dist(part.e.x, part.e.y, x, y);
    //             if (d < record_d) {
    //                 record_d = d;
    //             }
    //         })

    //         fill((record_d * 3 + colortheta) % 255, 100, 100);
    //         noStroke();
    //         rect(x, y, grid, grid);

    //     }
    // }



    parts.forEach(part => {
        part.show();


        part.grow();
    });



    if (frameCount % 30 == 0) {
        splitParts();
    }



}
function splitParts() {
    loop();
    if (parts.length > 5000) {
        reset();
    } else {
        newparts = [];
        parts.forEach(part => {
            const np = part.splitInThree();
            np.map(np => newparts.push(np));
        });

        parts = newparts;

    }

}

function keyPressed() {
    // splitParts();
    reset();
}