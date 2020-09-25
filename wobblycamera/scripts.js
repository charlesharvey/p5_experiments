

let capture;

let vw, vh;


let wobble1;
let wobble2;
let wobble3;
let wobble4;
let wobble5;


function setup() {


    createCanvas(640, 480);
    // colorMode(HSB);
    noStroke();


    randomize();


    pixelDensity(1);
    let constraints = {
        video: {
            mandatory: {
                minWidth: 640,
                minHeight: 480
            },
            optional: [{ maxFrameRate: 2 }]
        },
        audio: false
    };



    capture = createCapture(constraints);
    capture.hide();



}


function index(x, y, channel) {

    return ((Math.floor(x) + (Math.floor(y) * width)) * 4) + channel;
    // 4 for pixel density, 4 for each r,g,b,a channels
}

function mouseMoved() {
    // mx = mouseX;
    // my = mouseY;
}


function mousePressed() {
    // randomize();
}

function randomize() {


    wobble1 = random(-5, 5);
    wobble2 = random(-5, 5);
    wobble3 = random(-5, 5);
    wobble4 = random(-5, 5);
    wobble5 = random(-5, 5);



    points = [];
    let minx = Infinity;
    let maxx = -Infinity;
    let miny = Infinity;
    let maxy = -Infinity;
    for (let x = 0; x < width; x += 1) {
        for (let y = 0; y < height; y += 1) {
            // const xx = Math.floor(map(x, 0, width, 0, vw));
            // const yy = Math.floor(map(y, 0, height, 0, vh));
            const pt = new Point(x, y);
            points.push(pt);

            if (pt.output.x > maxx) {
                maxx = pt.output.x;
            }
            if (pt.output.x < minx) {
                minx = pt.output.x;
            }
            if (pt.output.y > maxy) {
                maxy = pt.output.y;
            }
            if (pt.output.y < miny) {
                miny = pt.output.y;
            }


        }
    }
    // console.log(minx, maxx, miny, maxy);



    points.forEach(p => p.normalize(minx, maxx, miny, maxy));
}


function draw() {
    background(255);

    if (capture.loadedmetadata) {


        capture.loadPixels();

        loadPixels();
        points.forEach(p => {


            let i = index(p.output.x, p.output.y, 0);  // 0 = red, 1 = green 2 = blue 3 = alpha
            let j = index(p.output.x, p.output.y, 1);  // 0 = red, 1 = green 2 = blue 3 = alpha
            let k = index(p.output.x, p.output.y, 2);  // 0 = red, 1 = green 2 = blue 3 = alpha

            let r = capture.pixels[i];
            let g = capture.pixels[j];
            let b = capture.pixels[k];


            const ind = index(p.x, p.y, 0);
            pixels[ind] = r;
            pixels[ind + 1] = g;
            pixels[ind + 2] = b;
            pixels[ind + 3] = 255;


            // fill(255, 0, 0);
            // ellipse(p.x, p.y, 2, 2);



        });
        updatePixels();



        // image(capture, 0, 0, 64 * 2, 48 * 2);

        // noLoop();
    }


    // frameRate(1);



}
