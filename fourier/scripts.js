

let signalX;
let fourierX;
let signalY;
let fourierY;
let time;
let path;


let drawing;
let initialDrawingLocation;






function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    drawing = [];
    setDrawing();
    setPenis();

}



function dft(sig) {
    let X = [];

    const N = sig.length;
    // change this <N to a smaller number fo a less precisie result
    for (let k = 1; k < N; k++) {

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
    if (time > TWO_PI - 0.01) {
        path = [];
        time = 0;
    }







    if (drawing) {
        noFill();
        stroke(255, 0, 0);
        beginShape();
        drawing.forEach((ve, i) => {
            vertex(ve.x, ve.y);
        })
        endShape();

    }

}


function mouseDragged() {

    const mv = createVector(mouseX, mouseY);

    if (!initialDrawingLocation) {
        initialDrawingLocation = mv
    }


    drawing.push(mv);
}

function mouseReleased() {
    setDrawing();
}


function setPenis() {
    signalX = JSON.parse("[0,-8,-24,-38,-53,-64,-77,-92,-96,-98,-98,-98,-96,-89,-85,-82,-76,-61,-46,-32,-23,-11,0,9,10,10,10,10,10,11,11,12,12,12,13,13,14,13,13,13,11,11,8,6,4,2,0,0,0,0,1,6,7,10,12,14,17,22,28,36,50,56,64,77,82,88,95,100,105,109,116,120,126,129,130,130,129,128,124,121,115,97,76,61,50,47,41,35,24,15,12,10,8,8,9,15,21,29,46,55,73,83,105,123,128,129,133,138,138,137,135,132,130,126,127,128,128,128,128,127,127,127,126,126,126,125,125,126,126,129,132,138,145,154,162,169,178,191,195,199,203,205,205,204,204,203,202,198,195,189,182,181]");

    signalY = JSON.parse("[0,-1,-7,-13,-20,-26,-35,-61,-77,-89,-93,-96,-102,-112,-116,-118,-122,-127,-128,-127,-125,-121,-115,-109,-108,-109,-110,-111,-113,-114,-116,-118,-123,-131,-146,-153,-175,-187,-205,-242,-260,-277,-313,-325,-348,-361,-377,-388,-396,-400,-405,-413,-416,-421,-423,-426,-428,-431,-434,-436,-438,-439,-439,-438,-437,-434,-431,-427,-423,-419,-410,-405,-391,-386,-380,-377,-372,-370,-368,-366,-364,-361,-356,-354,-356,-357,-359,-363,-369,-375,-380,-385,-392,-397,-402,-409,-417,-423,-428,-428,-428,-426,-421,-416,-413,-411,-403,-392,-382,-362,-342,-310,-294,-249,-232,-220,-201,-189,-170,-154,-137,-125,-117,-113,-110,-109,-111,-114,-117,-123,-127,-131,-133,-136,-136,-134,-130,-120,-114,-107,-98,-92,-84,-75,-64,-50,-39,-26,-19,-5,7,9]");
    fourierX = dft(signalX);
    fourierY = dft(signalY);
    path = [];
    drawing = [];
    initialDrawingLocation = null;
}


function setDrawing() {
    time = 0;
    signalX = [];
    signalY = [];

    if (drawing.length == 0) {
        for (let i = 0; i < 100; i++) {
            signalX.push(sin(i / 25 * TWO_PI) * 30 + sin(i * TWO_PI / 100) * 100);
            signalY.push(cos(i / 50 * TWO_PI) * 100 + cos(i * TWO_PI / 20) * 50);
        }
    } else {

        drawing.forEach(d => {
            signalX.push(d.x - initialDrawingLocation.x);
            signalY.push(d.y - initialDrawingLocation.y);
        })

    }




    fourierX = dft(signalX);
    fourierY = dft(signalY);
    path = [];
    drawing = [];
    initialDrawingLocation = null;
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