
let size;
const useWebcam = false;
let img, conv, capture, temp_squished, squished;
// let energymap, energyarray, directionsarray;

const linesToRemove = 10;


const filter_x = [
    [-1, 1, 0],
    [-1, 1, 0],
    [-1, 1, 0]
];

const filter_y = [
    [-1, -1, -1],
    [1, 1, 1],
    [0, 0, 0]
]



function preload() {
    size = 201;

    if (useWebcam) {
        let constraints = {
            video: {
                mandatory: {
                    minWidth: size,
                    minHeight: size
                },
                optional: [{ maxFrameRate: 1 }]
            },
            audio: false
        };

        capture = createCapture(constraints);
        capture.hide();
    } else {

        // create random image
        // img = createImage(size, size);
        // img.loadPixels();
        // for (let i = 0; i < img.width; i++) {
        //     for (let j = 0; j < img.height; j++) {
        //         const r = map(noise(i / 7, j / 70), 0, 1, 0, 255);
        //         img.set(i, j, color(r, r, r));
        //     }
        // }
        // img.updatePixels();

        img = loadImage('balloon.jpg');
        // img = image(puppy, 0, 0, size, size);
    }
}


function setup() {


    createCanvas(size * 4, size);
    // colorMode(HSB, 255, 255, 255);

    // find edges
    // conv = createImage(size, size);
    // energymap = createImage(size, size);
    // squished = createImage(size, size);


}


function seamCarve(image) {

    const w = image.width;
    const h = image.height;

    let conv = createImage(image.width, image.height);


    //convolute image
    image.loadPixels();
    conv.loadPixels();
    for (let i = 0; i < image.width; i++) {
        for (let j = 0; j < image.height; j++) {
            const ind = index(i, j, image);
            const rgb_x = convolution(image, i, j, filter_x);
            const rgb_y = convolution(image, i, j, filter_y);
            const r = Math.sqrt(Math.pow(rgb_x.r, 2) + Math.pow(rgb_y.r, 2));
            const g = Math.sqrt(Math.pow(rgb_x.g, 2) + Math.pow(rgb_y.g, 2));
            const b = Math.sqrt(Math.pow(rgb_x.b, 2) + Math.pow(rgb_y.b, 2));
            const tot = (r + g + b) / 3
            conv.pixels[ind + 0] = tot; //r;
            conv.pixels[ind + 1] = tot; //g;
            conv.pixels[ind + 2] = tot; //b;
            conv.pixels[ind + 3] = 255;
        }
    }
    conv.updatePixels();




    // FIND THE DARKEST PATH AVAILABLE FROM BOTTOM TO TOP
    let energyarray = calculateEnergyArray(conv);

    // show the energy map as a picture
    let energymap = createEnergyMapFromArray(energyarray, w, h);
    // normalizeEnergyMap();

    // FIND THE Nth DARKEST PIXELS AT THE TOP OF THE ENERGY MAP
    let recordIndices = [];
    for (let i = 0; i < energymap.width; i++) {
        const ind = index(i, 0, energymap);
        let dark = energyarray[ind];
        recordIndices.push({ dark, ind });
    };
    recordIndices.sort((a, b) => a.dark > b.dark ? 1 : -1);
    recordIndices = recordIndices.slice(0, linesToRemove);


    // FROM THIS DARKEST PIXEL, DESCEND DOWN THE IMAGE AND FIND THE DARKEST PATH WE
    // CALCULATED IN THE ENERGY MAP
    energymap.loadPixels();
    recordIndices.forEach(record => {
        let startingI = record.ind;   // recordIndex;
        for (let j = 0; j < energymap.height; j++) {
            const ind = index(startingI, j, energymap);

            energymap.pixels[ind] = 255; // make red in image
            energymap.pixels[ind + 1] = 0; // make red in image
            energymap.pixels[ind + 2] = 0; // make red in image
            energymap.pixels[ind + 3] = 254; // make slightly as key to remove in squished image

            startingI += directionsarray[ind];
            startingI = constrain(startingI, 0, size);

        }
    })
    energymap.updatePixels();



    offsetsarray = [];


    let newimage = createImage(w - 1, h);

    image.loadPixels();
    newimage.loadPixels();
    let new_w = 0;
    for (let i = 0; i < image.width; i++) {
        offsetsarray[i] = 0;
        for (let j = 0; j < image.height; j++) {
            const ind = index(i, j, newimage);

            // image.pixels[ind + 0] = 0;
            // image.pixels[ind + 1] = 0;
            // image.pixels[ind + 2] = 0;


            // let imgindex = index(i, j, image);

            if (energymap.pixels[ind + 3] == 254) {

                offsetsarray[i] += 1;


                // should be removed
            }


            let imgindex = index(i + offsetsarray[i], j, image);
            newimage.pixels[ind + 0] = image.pixels[imgindex + 0];
            newimage.pixels[ind + 1] = image.pixels[imgindex + 1];
            newimage.pixels[ind + 2] = image.pixels[imgindex + 2];
            newimage.pixels[ind + 3] = 255;

        }
    }
    newimage.updatePixels();





    return newimage;




}




function draw() {
    background(52);

    if (useWebcam) {
        // if (frameCount < 30) {  // }
        img = capture.get(0, 0, size, size);
    }


    if (img) {


        // copyImage(img, squished);
        let temp_squished = createImage(size, size);
        copyImage(img, temp_squished);


        for (let lr = 0; lr < linesToRemove; lr++) {
            squished = seamCarve(temp_squished);

        }




        // if (frameCount % 100 == 3) {
        //     console.log(energyarray[3124]);
        // }

        // SHOW STAGES OF CONVERSION ON SCREEN
        image(img, 0, 0);

        image(energymap, size * 1, 0);
        image(squished, size * 2, 0);
        // image(temp_squished, size * 3, 0);
        noLoop();

    }

}



function copyImage(original, cpy) {
    original.loadPixels();
    cpy.loadPixels();
    for (let i = 0; i < cpy.width; i++) {
        for (let j = 0; j < cpy.height; j++) {
            const ind = index(i, j, cpy);

            cpy.pixels[ind + 0] = original.pixels[ind + 0];
            cpy.pixels[ind + 1] = original.pixels[ind + 1];
            cpy.pixels[ind + 2] = original.pixels[ind + 2];
            cpy.pixels[ind + 3] = 255;
        }
    }
    cpy.updatePixels();

}


function calculateEnergyArray(conv, energymap) {
    let energyarray = [];
    directionsarray = [];
    for (let i = 0; i > conv.height * conv.width; i++) {
        energyarray[i] = 0;
        directionsarray[i] = 0;
    }
    for (let j = conv.height; j >= 0; j--) {
        for (let i = conv.width; i >= 0; i--) {

            const ind = index(i, j, conv);
            let conv_tot = conv.pixels[ind];

            if (j > conv.height - 2) {
                // bottom rows
            } else {
                // not bottom row
                // get the row below
                const j2 = j + 1;
                let recordBrightness = 9999999;
                let recordDirection = null;

                let vv = -1;
                let bb = 1;
                if (i == 0) {
                    vv = 0;
                } else if (i == conv.width) {
                    bb = 0;
                }

                for (let p = vv; p <= bb; p++) {
                    // find  the darkest square below
                    const ind2 = index(i + p, j2, conv);
                    // const br2 = energymap.pixels[ind2];
                    const br2 = energyarray[ind2];
                    if (br2 < recordBrightness) {
                        recordBrightness = br2;
                        recordDirection = p;
                    }
                }
                conv_tot += recordBrightness;
                directionsarray[ind] = recordDirection;
            }
            energyarray[ind] = conv_tot;

        }

    }

    return energyarray;


}

function createEnergyMapFromArray(energyarray, w, h) {

    let biggestVal = max(energyarray.filter(n => n > 0));

    energymap = createImage(w, h);
    energymap.loadPixels();
    for (let i = 0; i < energymap.width; i++) {
        for (let j = 0; j < energymap.height; j++) {

            const ind = index(i, j, energymap);
            const val = energyarray[ind];
            const nv = map(val, 0, biggestVal, 0, 255);

            energymap.pixels[ind + 0] = nv;
            energymap.pixels[ind + 1] = nv;
            energymap.pixels[ind + 2] = nv;
            energymap.pixels[ind + 3] = 255;

        }
    }

    energymap.updatePixels();
    return energymap;
}


// function normalizeEnergyMap() {

//     let biggestVal = max(energyarray.filter(n => n > 0));

//     resetEnergyMap();

//     energymap.loadPixels();
//     for (let i = 0; i < energymap.width; i++) {
//         for (let j = 0; j < energymap.height; j++) {
//             const ind = index(i, j, energymap);
//             const val = energyarray[ind]
//             const nv = map(val, 0, biggestVal, 0, 255);
//             energymap.pixels[ind + 0] = nv;
//             energymap.pixels[ind + 1] = nv;
//             energymap.pixels[ind + 2] = nv;
//             energymap.pixels[ind + 3] = 255;

//         }
//     }

//     energymap.updatePixels();
// }

function index(x, y, img) {
    return (x + y * img.width) * 4;
}

function convolution(img, x, y, filter) {
    let sumR = 0;
    let sumG = 0;
    let sumB = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let pix = index(x + i, y + j, img);
            let factor = filter[j + 1][i + 1];
            sumR += img.pixels[pix + 0] * factor;
            sumG += img.pixels[pix + 1] * factor;
            sumB += img.pixels[pix + 2] * factor;
        }
    }


    return {
        r: sumR,
        g: sumG,
        b: sumB
    };
}


function resetEnergyMap() {
    energymap = createImage(size, size);
    // create an energy map
    // energymap.loadPixels();
    // for (let i = 0; i < energymap.width; i++) {
    //     for (let j = 0; j < energymap.height; j++) {
    //         energymap.set(i, j, color(0, 0, 0));
    //     }
    // }
    // energymap.updatePixels();
}