

const vidWidth = 320;
const vidHeight = 240;
const grid = 9; // lower is more resolution;
let pixeldensity = 1; // get pixel density from p5

let theta = 0;


function setup() {





    createCanvas(vidWidth, vidHeight);
    ellipseMode(CENTER);

    pixeldensity = Math.ceil(displayDensity());





    // pixelDensity(1);
    let constraints = {
        video: {
            mandatory: {
                minWidth: vidWidth,
                minHeight: vidHeight
            },
            optional: [{ maxFrameRate: 2 }]
        },
        audio: false
    };

    capture = createCapture(constraints);
    capture.hide();




}

function index(x, y, channel) {

    return ((x + (y * width)) * 4 * 4) + channel;
    // 4 for pixel density, 4 for each r,g,b,a channels
}

function draw() {
    background(0);
    noStroke();


    // frameRate(1);

    capture.loadPixels();
    // loadPixels();




    let neededpositions = [];




    for (let y = 0; y < height; y += grid) {
        for (let x = 0; x < width / pixeldensity; x += grid) {

            // let ind = x + (y * width);

            let i = index(x, y, 0);  // 0 = red, 1 = green 2 = blue 3 = alpha
            let j = index(x, y, 1);  // 0 = red, 1 = green 2 = blue 3 = alpha
            let k = index(x, y, 2);  // 0 = red, 1 = green 2 = blue 3 = alpha


            let r = capture.pixels[i];
            let g = capture.pixels[j];
            let b = capture.pixels[k];

            const ra = map(sin(theta + x / 180 + y / 230), -1, 1, grid * 3, grid * 14);


            fill(r, g, b);
            ellipse(x * pixeldensity, y, ra, ra);



        }
    }



    // updatePixels();


    theta += 0.1;


}
