
let w, h, levels;

function setup() {

    levels = 2;


    createCanvas(320, 240);



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
    capture.hide();




}

function index(x, y, channel) {

    return ((x + (y * width)) * 4 * 4) + channel; // 4 for pixel density, 4 for each r,g,b,a channels
}

function draw() {
    background(0);
    noStroke();



    capture.loadPixels();
    loadPixels();

    // let clength = capture.pixels.length;


    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            // for (let ch = 0; ch < 4; ch++) {
            // }

            let i = index(x, y, 0);  // 9 = red, 1 = green 2 = blue 3 = alpha

            let cpi_r = capture.pixels[i];

            let simp_r = round(cpi_r * levels / 255) * (255 / levels);
            let diff_r = cpi_r - simp_r;


            capture.pixels[index(x + 1, y, 0)] += (diff_r * (7 / 16));
            capture.pixels[index(x - 1, y + 1, 0)] += (diff_r * (7 / 16));
            capture.pixels[index(x, y + 1, 0)] += (diff_r * (5 / 16));
            capture.pixels[index(x + 1, y + 1, 0)] += (diff_r * (1 / 16));

            pixels[i] = simp_r;


            // fill(simp_r);
            // ellipse(x, y, 5, 5);

        }
    }


    updatePixels();




}
