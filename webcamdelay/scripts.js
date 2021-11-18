

const grid = 4; // lower is more resolution;
let pixeldensity = 1; // get pixel density from p5
let img;


let history;


function setup() {





    createCanvas(320, 240);

    pixeldensity = Math.ceil(displayDensity());




    // pixelDensity(1);
    let constraints = {
        video: {
            mandatory: {
                minWidth: 320,
                minHeight: 240
            },
            optional: [{ maxFrameRate: 2 }]
        },
        audio: false
    };

    capture = createCapture(constraints);
    capture.hide();


    history = [];






}

function index(x, y, channel) {

    return ((x + (y * width)) * 4 * 4) + channel;
    // 4 for pixel density, 4 for each r,g,b,a channels
}

function draw() {
    background(0);
    noStroke();
    noFill();





    history.push(capture.get());


    if (history.length > width) {
        history.splice(0, 1);
    }



    if (capture.loadedmetadata) {
        // image(capture, 0, 0);

    }


    let i = 0;


    if (history.length > 0) {
        for (let x = 0; x < history.length; x += grid) {

            // console.log(history[y]);
            // const yy = map(y, 0, history.length, height, 0);

            // image(img, x,y,w,h,dx,dy);
            image(history[x], x, 0, grid, height, x, 0, grid, height);
            // image(history[y], 0, y, y, height);

            i++;
        };
    };

    // frameRate(1);

    // capture.loadPixels();







    // if (frameCount % 100 == 0) {
    //     console.log('FRAMERATE', frameRate());
    // }



}
