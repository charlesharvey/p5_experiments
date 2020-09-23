
let h, w;

let lines = 40;
let grid;
let mx, my;
let gamma = 0;
let capture;
let maxAmp = 15;


let vw = 320;
let vh = 240;
function setup() {


    createCanvas(640, 480);
    colorMode(HSB);
    h = height;
    w = width;
    grid = height / lines;

    mx = 0;
    my = 0;




    let constraints = {
        video: {
            mandatory: {
                minWidth: vw,
                minHeight: vh
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

function mouseMoved() {
    mx = mouseX;
    my = mouseY;
}


function draw() {
    background(255);

    if (capture.loadedmetadata) {


        capture.loadPixels();

        for (let y = 0; y < height; y += grid) {

            let theta = 0;
            noFill();
            stroke(0);
            strokeWeight(1.5);
            beginShape();

            for (let x = 0; x < width; x++) {

                const xx = floor(map(x, 0, width, 0, vw / 2));
                const yy = floor(map(y, 0, height, 0, vh / 2));


                let i = index(xx, yy, 0);  // 0 = red, 1 = green 2 = blue 3 = alpha
                // let j = index(xx, yy, 1);  // 0 = red, 1 = green 2 = blue 3 = alpha
                // let k = index(xx, yy, 2);  // 0 = red, 1 = green 2 = blue 3 = alpha

                let r = capture.pixels[i];
                // let g = capture.pixels[j];
                // let b = capture.pixels[k];
                // const bri = (r + g + b) / 3;
                const bri = r;
                const amp = map(bri, 0, 255, maxAmp, 0);



                // const di = dist(x, y, mx, my);
                // const amp = map(di, 0, height, 0, 60);

                const yyy = y + sin(theta + gamma) * amp;
                vertex(x, yyy);


                theta += 0.5;
            }





            endShape();


        }

        gamma -= 1.98;



        // image(capture, 0, 0);

    }


    // noLoop();
    // frameRate(1);



}
