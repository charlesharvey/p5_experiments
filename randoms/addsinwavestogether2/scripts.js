




let waves = [];
let time = 0;
let sin1, sin2, sin3;
const numberOfWaves = 20;
const speed = 0.011;

let n1, n2, n3;

function setup() {


    createCanvas(850, 500);



    n1 = random(100);
    n2 = random(100);
    n3 = random(100);
    setSinValues();


    for (let i = 0; i < numberOfWaves; i++) {
        waves.push(new Wave(i));

    }





}

function setSinValues() {
    sin1 = map(noise(n1), 0, 1, 3, 5);
    sin2 = map(noise(n2), 0, 1, 7, 13);
    sin3 = map(noise(n3), 0, 1, 16, 24);


    n1 += 0.0002;
    n2 += 0.0005;
    n3 += 0.0003;
}

function mousePressed() {
    // setSinValues();
}


function draw() {
    background(0);
    fill(255);
    noStroke();

    // translate(-100, 0);


    setSinValues();



    waves.forEach(wave => {
        wave.update();
        wave.show();
    })

    time += speed;

}
