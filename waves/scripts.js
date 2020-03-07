


let waves = [];
let topwaves = [];

let size = 70;
let showWaves = true;
let mag = 1.3; // lower the higher the wavelength

function setup() {


    createCanvas(900, 700);


    let cols = width / size;
    let rows = height / size;


    for (let i = -2; i < cols + 2; i++) {
        for (let j = 4; j < rows - 0; j++) {
            const wave = new Wave(i * size, j * size, (rows - j) / rows * size, i / (mag));
            waves.push(wave);
            if (j == 4) {
                topwaves.push(wave);
            }
        }
    }
}


function mouseMoved() {
    showWaves = (Math.round(mouseX / 200) % 2 == 0)
}


function draw() {
    background(180, 220, 255);




    fill(0, 100, 200, 200);
    noStroke();
    beginShape();
    topwaves.forEach(wave => {
        vertex(wave.dx, wave.dy);
    });
    vertex(width, height)
    vertex(0, height)
    endShape();


    waves.forEach(wave => {
        if (showWaves) {
            wave.show();
        }

        wave.update();
    });


}
