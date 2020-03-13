
let theta = 0;


function setup() {


    createCanvas(windowHeight / 2, windowWidth / 2);



    colorMode(HSB, 255, 255, 255);
}



function draw() {
    background(0);

    loadPixels();


    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {

            let h = map(sin(i + j + theta), -1, 1, 0, 255);
            let c = col*or(h, 255, 255)
            set(i, j, c);

        }
    }

    updatePixels();


    theta += 0.1;

}
