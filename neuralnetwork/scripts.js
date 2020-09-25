


const inputsize = 2;
const hiddensize = 6;
const outputsize = 1;

const layer_sizes = [inputsize, hiddensize, outputsize];


const randomSliding = false;
const usingBrain = true;

let brain;

let b1sliders, b2sliders, w1sliders, w2sliders;

// let x;
let w1;
let b1;
let w2;
let b2;

let w1x, a1, w2a1, a2;


let maxgrid = 11;
let scale = 250;
let grid = maxgrid;
let theta = Math.random();
const graphsize = 300;
const diagramsize = 240;
let graphVisible = false;
let automatic = false;


function activation(n) {
    return (1 / 1 + Math.pow(Math.E, -n));
}

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 180);

    if (usingBrain) {
        brain = new Neuralnetwork(inputsize, hiddensize, outputsize);
        scale = 1;
    }

    reset();

}


function mousePressed() {
    if (mouseX < graphsize && mouseY < graphsize) {
        reset();
    }

}


function createSliders() {

    createP('Biases');
    b1sliders = [];
    b1.map((v, i, a) => {
        b1sliders.push(createSlider(-scale, scale, v, scale / 100));
    });


    b2sliders = [];
    b2.map((v, i, a) => {
        b2sliders.push(createSlider(-scale, scale, v, scale / 100));
    });

    createP('Weights');
    w1sliders = [];
    w1.map((v, i, a) => {
        w1sliders.push(createSlider(-1, 1, v, 0.001));
    });

    w2sliders = [];
    w2.map((v, i, a) => {
        w2sliders.push(createSlider(-1, 1, v, 0.001));
    });

}

function mousePressed() {
    // grid = maxgrid;
}

function reset() {

    grid = maxgrid;

    graphVisible = false;

    w1 = math.ones(hiddensize, inputsize).map((v, i, a) => Math.random() * 2 - 1);;
    w2 = math.ones(outputsize, hiddensize).map((v, i, a) => Math.random() * 2 - 1);;

    b1 = math.ones(hiddensize).map((v, i, a) => Math.random() * scale);;
    b2 = math.ones(outputsize).map((v, i, a) => Math.random() * scale);;

    if (typeof b1sliders === 'undefined') {
        createSliders();
    }


    b1.map((v, i, a) => {
        const index = i;
        b1sliders[index].elt.value = v;
    });
    b2.map((v, i, a) => {
        const index = i;
        b2sliders[index].elt.value = v;
    });
    w1.map((v, i, a) => {
        const index = i[1] * hiddensize + i[0];
        w1sliders[index].elt.value = v;
    });
    w2.map((v, i, a) => {
        const index = i[1] * outputsize + i[0];
        w2sliders[index].elt.value = v;
    });


    setTimeout(() => {
        graphVisible = true;
    }, 400);




}

function draw() {
    background(0);
    noStroke();

    if (graphVisible) {


        if (usingBrain) {

            for (let i = 0; i < 150; i++) {
                trainBrain();
            }
            changeSlidersUsingBrain();
        }



        for (let x = 0; x < graphsize - grid; x += grid) {
            for (let y = 0; y < graphsize - grid; y += grid) {




                let r = 0.5;
                let p = 0.5;
                if (usingBrain) {
                    const f1 = map(x, 0, graphsize, 0, 1);
                    const f2 = map(y, 0, graphsize, 1, 0);
                    const input = [f1, f2];

                    const output = brain.feedforward(input);
                    r = output[0];
                    p = 0.5;
                    if (output.length > 1) {
                        p = output[1];
                        if (r < p) {
                            fill(255, 0, 0);
                        } else {
                            fill(0, 255, 0);
                        }
                    } else {
                        fill((1 - r) * 250)

                    }






                } else {

                    const f1 = map(x, 0, graphsize, -scale, scale);
                    const f2 = map(y, 0, graphsize, -scale, scale);
                    const input = [f1, f2];

                    while (input.length < inputsize) {
                        input.push(x);
                    }

                    let xx = math.matrix(input);

                    w1x = math.multiply(w1, xx)
                    a1 = math.add(w1x, b1).map((value, index, matrix) => activation(value));


                    w2a1 = math.multiply(w2, a1)
                    a2 = math.add(w2a1, b2).map((value, index, matrix) => activation(value));

                    r = math.subset(a2, math.index(0));
                    p = 2;
                    if (outputsize > 1) {
                        p = math.subset(a2, math.index(1));
                    }



                    if (r < p) {
                        fill(255, 0, 0);
                    } else {
                        fill(0, 255, 0);
                    }


                } // if not using brain

                rect(x + grid, y + grid, grid, grid);


                // console.log(r, p);

            }
        }

    }



    // frameRate(1);
    // noLoop();

    fill(255);

    b1 = b1.map((v, i, a) => {
        // text(`B1-${i}: ${v}`, graphsize + 230, i * 20 + 30);
        return b1sliders[i].value();
    });
    b2 = b2.map((v, i, a) => {
        // text(`B2-${i}: ${v}`, graphsize + 230, i * 20 + 190);
        return b2sliders[i].value();
    });

    w1 = w1.map((v, i, a) => {
        const index = i[1] * hiddensize + i[0];
        //  text(`W1-${index}: ${v}`, graphsize + 30, index * 20 + 30);
        // 
        if (randomSliding) {
            const val = sin(index + theta * 2);
            w1sliders[index].elt.value = val;
            return val;
        } else {
            return w1sliders[index].value();
        }
    });

    w2 = w2.map((v, i, a) => {
        const index = i[1] * outputsize + i[0];
        //  text(`W2-${index}: ${v}`, graphsize + 30, index * 20 + 190);
        // 

        if (randomSliding) {
            const val = sin(index + theta);
            w2sliders[index].elt.value = val;
            return val;
        } else {
            return w2sliders[index].value();
        }

    });



    theta += 0.01;



    for (let i = 0; i < inputsize; i++) {

        const ix = graphsize + 100;
        // const iy = i * diagramsize + diagramsize;
        const iy = map(i, 0, inputsize, 100, height - 100);

        for (let j = 0; j < hiddensize; j++) {
            const hx = graphsize + 100 + diagramsize;
            const hy = map(j, 0, hiddensize, 100, height - 100);
            stroke(128);
            strokeWeight(1);
            line(ix, iy, hx, hy);

            const index = i * hiddensize + j;
            const lx = lerp(ix, hx, 0.39);
            const ly = lerp(iy, hy, 0.39);
            const vw1 = w1sliders[index].value();
            text(`W${index}: ${vw1}`, lx, ly);

        }
        rect(ix - 10, iy - 10, 20, 20);
    }

    for (let i = 0; i < outputsize; i++) {

        const ix = graphsize + 100 + diagramsize + diagramsize;
        // const iy = i * diagramsize + diagramsize;
        const iy = map(i, 0, outputsize, 100, height - 100);

        const vb2 = b2sliders[i].value();
        text(`B1-${i}: ${vb2}`, ix - 10, iy - 20);


        for (let j = 0; j < hiddensize; j++) {
            const hx = graphsize + 100 + diagramsize;
            const hy = map(j, 0, hiddensize, 100, height - 100);
            stroke(128);
            strokeWeight(1);
            line(ix, iy, hx, hy);

            const index = i * hiddensize + j;
            const lx = lerp(ix, hx, 0.4);
            const ly = lerp(iy, hy, 0.4);
            const vw2 = w2sliders[index].value();
            text(`W${index}: ${vw2}`, lx, ly);



            if (i === 0) {
                const vb1 = b1sliders[j].value();
                rect(hx - 10, hy - 10, 20, 20);
                text(`B1-${j}: ${vb1}`, hx - 10, hy - 20);
            }

        }
        rect(ix - 10, iy - 10, 20, 20);

    }



    // if (grid > 3 && frameRate() > 10) {
    //     grid--;
    // }


}


// x = [];
// for (let i = 0; i < inputsize; i++) {
//     x.push(Math.random());
// }


// w1 = [];
// for (let i = 0; i < hiddensize; i++) {
//     let neww = []
//     for (let j = 0; j < inputsize; j++) {
//         neww.push(Math.random());
//     }
//     w1.push(neww)
// }

// b1 = [];
// for (let i = 0; i < hiddensize; i++) {
//     b1.push(Math.random());
// }

// w2 = [];
// for (let i = 0; i < outputsize; i++) {
//     let neww = []
//     for (let j = 0; j < hiddensize; j++) {
//         neww.push(Math.random());
//     }
//     w2.push(neww)
// }

// b2 = [];
// for (let i = 0; i < hiddensize; i++) {
//     b2.push(Math.random());
// }



function changeSlidersUsingBrain() {
    let biases_h = brain.bias_h.toArray();
    biases_h.forEach((b, i) => {
        b1sliders[i].elt.value = b;
    });

    let biases_o = brain.bias_o.toArray();
    biases_o.forEach((b, i) => {
        b2sliders[i].elt.value = b;
    });



    let weights_h2 = brain.weights_ho.toArray();
    weights_h2.forEach((w, i) => {
        w2sliders[i].elt.value = w;
    })
    let weights_h1 = brain.weights_ih.toArray();
    weights_h1.forEach((w, i) => {
        w1sliders[i].elt.value = w;
    })





}
function trainBrain() {
    if (outputsize == 1) {

        // XOR
        brain.train([1, 1], [0]);
        brain.train([1, 0], [1]);
        brain.train([0, 1], [1]);
        brain.train([0, 0], [0]);


        // circle
        // const x = Math.random();
        // const y = Math.random();
        // const d = dist(x, y, 0.5, 0.5);
        // brain.train([x, y], [d]);


    } else {
        brain.train([1, 1], [1, 0]);
        brain.train([1, 0], [0, 1]);
        brain.train([0, 1], [0, 1]);
        brain.train([0, 0], [0, 1]);
    }

}
