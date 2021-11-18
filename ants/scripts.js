

const numberOfAnts = 50;
let ants;


let repellant;
let attractant;

function setup() {


    // createCanvas(windowWidth - 20, windowHeight - 20);
    createCanvas(300, 300);

    ants = [];

    for (let i = 0; i < numberOfAnts; i++) {
        const ant = new Ant();
        ants.push(ant);
    }


    repellant = [];
    attractant = [];
    for (let x = 0; x < width; x++) {
        repellant[x] = [];
        attractant[x] = [];
        for (let y = 0; y < height; y++) {
            repellant[x][y] = 0;
            attractant[x][y] = 0;
        }
    }


}



function draw() {
    background(0);


    repellant = diffusePheremone(repellant);
    attractant = diffusePheremone(attractant);


    showPheremones();



    ants.forEach(ant => {
        ant.sense(repellant, 'avoid');
        ant.update();
        ant.layTrail();
        // ant.show();
    });


}


function showPheremones() {
    // show pheremones
    loadPixels();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let r = repellant[x][y] * 255;
            let g = attractant[x][y] * 255;
            const c = color(r, g, 0);
            set(x, y, c);
        }
    }
    updatePixels();
}



function diffusePheremone(pheremone) {
    const newpheremones = [];
    for (let i = 0; i < width; i++) {
        newpheremones[i] = [];
        for (let j = 0; j < height; j++) {
            newpheremones[i][j] = 0;
        }
    }
    for (let i = 1; i < width - 1; i++) {
        for (let j = 1; j < height - 1; j++) {
            //         const a = pheremone[i - 1][j];
            //         const b = pheremone[i][j - 1];
            //         const c = pheremone[i + 1][j];
            //         const d = pheremone[i][j + 1];
            //         newpheremones[i][j] += ((a + b + c + d) / 4) * 0.9995; // diffuse

            newpheremones[i][j] = pheremone[i][j] * 0.8999; // fade away
        }
    }



    return newpheremones;


}