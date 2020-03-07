

let number = 3000;
let dots = [];

let gridsize;
let time = 0;
let specialwave = 1;

let sin1, sin2, sin3, hasSpecial;;



function setup() {


    createCanvas(850, 500);

    gridsize = width / number;



    for (let i = 0; i < number; i++) {
        let x = i * gridsize;
        let y = height / 2;
        dots.push(new Dot(x, y, i / number));
    }


    setSinValues();





}

function setSinValues() {
    sin1 = Math.random() * 10;
    sin2 = Math.random() * 5;
    sin3 = Math.random() * 16;
    hasSpecial = Math.random() > 0.5;
}

function mousePressed() {
    setSinValues();
}


function draw() {
    background(0);
    fill(255);
    noStroke();

    translate(-100, 0);


    for (let i = 0; i < dots.length; i++) {
        dots[i].show();

        dots[i].addWave(sin1);
        dots[i].addWave(sin2);
        dots[i].addWave(sin3);

        if (hasSpecial) {
            dots[i].addWave(specialwave);

        }


        dots[i].update();
    }


    specialwave = sin(time) * 0.5;

    time += 0.021;
    // time += 0.0004;

}
