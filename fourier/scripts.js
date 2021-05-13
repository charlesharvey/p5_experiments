

let signalX;
let fourierX;
let signalY;
let fourierY;
let time;
let path;



function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    time = 0;

    signalX = [];
    signalY = [];
    for (let i = 0; i < 100; i++) {
        signalX.push(sin(i / 25 * TWO_PI) * 30 + sin(i * TWO_PI / 100) * 100);
        signalY.push(cos(i / 50 * TWO_PI) * 100 + cos(i * TWO_PI / 20) * 50);
    }

    fourierX = dft(signalX);
    fourierY = dft(signalY);
    path = [];

}



function dft(sig) {
    let X = [];

    const N = sig.length;
    // change this <N to a smaller number fo a less precisie result
    for (let k = 0; k < N; k++) {

        let re = 0;
        let im = 0;
        for (let n = 0; n < N; n++) {

            let theta = TWO_PI * k * n / N;

            re += cos(theta) * sig[n];
            im += sin(theta) * sig[n] * -1;


        }

        re /= N;
        im /= N;
        const mag = Math.sqrt(re * re + im * im);
        const phase = atan2(im, re);
        const freq = k;


        X.push({ re, im, mag, phase, freq })
    }

    X.sort((a, b) => b.mag - a.mag);
    return X;
}


function draw() {
    background(0);




    let v1 = drawFourier(fourierX, 400, 150, 0);
    let v2 = drawFourier(fourierY, 150, 400, HALF_PI);

    path.unshift({ x: v1.x, y: v2.y });



    stroke(255, 50)
    line(v2.x, v2.y, v1.x, v2.y)
    line(v1.x, v1.y, v1.x, v2.y)


    noFill();
    stroke(255);
    beginShape();
    path.forEach((ve, i) => {
        vertex(ve.x, ve.y);
    })
    endShape();





    const dt = (TWO_PI / signalX.length);
    time += dt;
    if (path.length > signalX.length - 10) {
        path.pop()
    }

}


function drawFourier(fourier, px, py, poffset) {
    let x = px;
    let y = py;
    for (let i = 0; i < fourier.length; i++) {


        let prevx = x;
        let prevy = y;
        const f = fourier[i];

        x += f.mag * cos(f.freq * time + f.phase + poffset);
        y += f.mag * sin(f.freq * time + f.phase + poffset);


        stroke(255, 100);
        noFill();
        ellipse(prevx, prevy, f.mag * 2, f.mag * 2);

        line(prevx, prevy, x, y);





    }
    return createVector(x, y);
}