


let dots, points, target;
let numberofdots;
const updateFreq = 5; // lower is faster
const threshold = 100; // lower is darker
const dottiness = 20; // lower is more dots
const grid = 4; // lower is more resolution;
let pixeldensity = 1; // get pixel density from p5
function setup() {





    createCanvas(320, 240);

    pixeldensity = displayDensity();
    numberofdots = Math.floor((width / grid) * (height / grid) / dottiness);

    dots = [];
    for (let i = 0; i < numberofdots; i++) {
        const x = width / 2;
        const y = height / 2;
        const dot = new Dot(x, y);

        dots.push(dot);

    }



    // pixelDensity(1);
    let constraints = {
        video: {
            mandatory: {
                minWidth: width,
                minHeight: height
            },
            optional: [{ maxFrameRate: 2 }]
        },
        audio: false
    };

    capture = createCapture(constraints);
    // capture.hide();




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
        for (let x = 0; x < width; x += grid) {

            // let ind = x + (y * width);

            let i = index(x, y, 0);  // 0 = red, 1 = green 2 = blue 3 = alpha
            let j = index(x, y, 1);  // 0 = red, 1 = green 2 = blue 3 = alpha
            let k = index(x, y, 2);  // 0 = red, 1 = green 2 = blue 3 = alpha


            let r = capture.pixels[i];
            let g = capture.pixels[j];
            let b = capture.pixels[k];
            let cpi = (r + g + b) / 3;
            // const cpi = capture.pixels[i];


            if (cpi > threshold) {
                // pixels[i] = cpi;
                // pixels[j] = cpi;
                // pixels[k] = cpi;

                if (x < width / pixeldensity) { // wierd bug where pix is duplicated
                    neededpositions.push({ x: x * pixeldensity, y: y, hue: [r, g, b] });

                }

            }
        }
    }



    // updatePixels();


    // sort by brightess
    neededpositions.sort((a, b) => {
        if (a.hue < b.hue) {
            return 1;
        }
        return -1;
    });

    // MOVE DOTS TO CLOSEST POINT REQUIRED
    if (frameCount % updateFreq == 0) {

        dots.forEach(d => d.beingused = false);

        neededpositions.forEach((np, npi) => {
            if (npi < dots.length) {

                let recorddist = 10000000;
                let currentdot;
                dots.forEach(dot => {
                    if (dot.beingused === false) {
                        const d = dist(np.x, np.y, dot.pos.x, dot.pos.y);
                        if (d < recorddist) {
                            recorddist = d;
                            currentdot = dot;
                        }
                    }
                });
                np.dot = currentdot;
                np.dot.beingused = true;
                np.dot.setHome(np.x, np.y);
                np.dot.setHue(np.hue)
            }
        });



    } // end if frame count mod 10 = 0 



    // MOVE ANY UNUSED DOT TO LAST DOT POS BEING USED
    const dotsbeingused = dots.filter(d => d.beingused);
    if (dotsbeingused.length > 0) {
        const lastdotbeingused = dotsbeingused[dotsbeingused.length - 1];
        dots.forEach(dot => {
            if (dot.beingused === false) {
                dot.setHome(lastdotbeingused.home.x, lastdotbeingused.home.y);
            }
        })
    }

    // SET ANY UNUSED DOTS BLACK
    dots.forEach(dot => {
        if (dot.beingused === false) {
            dot.setHue(0);
        }
    })



    dots.forEach(dot => {

        dot.moveTo(dot.home);
        dot.update();
        dot.show();

    });

    // if (frameCount % 100 == 0) {
    //     console.log('FRAMERATE', frameRate(), dots.length);
    // }

    // if (frameRate() < 10) {
    //     dots.splice(0, 1);
    // }


}
