
let theta = 0;
let phi = 0;

let grid = 5;




function setup() {


    createCanvas(windowWidth / 2, windowHeight / 2);



    colorMode(HSB, 255, 255, 255);
}



function draw() {
    background(0);
    noStroke();

    // loadPixels();


    for (let i = 0; i < width; i += grid) {
        for (let j = 0; j < height; j += grid) {

            let si = sin(i * theta / 10000);
            let co = cos(j * phi / 7054 * si);
            let h = map(si + co, -2, 2, 0, 255);

            // let h = map(noise(i, j), 0, 1, 0, 255);
            let c = color(h, 255, 255)
            // set(i, j, c);

            fill(c);
            rect(i, j, grid, grid);

        }
    }

    // updatePixels();


    theta += 0.1;
    phi -= 0.03;

}
