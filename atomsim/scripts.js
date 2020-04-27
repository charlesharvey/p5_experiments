



let nucleuses = [];

let showTrails = false;
let biggestElement = '';
let biggestAtomicNumber = 0;

let types = ['electron', 'proton', 'neutron'];

let counts = {
    proton: 0,
    neutron: 0,
    electron: 0
}
let t = 0;

function setup() {



    createCanvas(windowWidth - 10, windowHeight - 10);

    for (let i = 0; i < 30; i++) {

        addNucleus();
    }

    noStroke();


    background(0);


}

function addNucleus() {


    const tt = types[t % 3];
    counts[tt] = counts[tt] + 1;
    const particle = new Particle(tt);
    const nucleus = new Nucleus(random(width), random(height));
    nucleus.addParticle(particle);
    nucleuses.push(nucleus);
    t++;
}


function mousePressed() {
    showTrails = !showTrails;
}


function increaseAtom() {
    const biggest = nucleuses.sort((a, b) => {
        if (a.atomicnumber < b.atomicnumber) {
            return 1;
        }
    })[0];
    const proton = new Particle('proton');
    const electron = new Particle('electron');
    biggest.addParticle(proton);
    biggest.addParticle(electron);
}

function draw() {

    if (!showTrails) {
        background(0);
    }


    newnucleusestoadd = [];
    for (let i = 0; i < nucleuses.length; i++) {
        const nucleus = nucleuses[i];



        for (let j = nucleuses.length - 1; j > 0; j--) {
            if (j != i) {
                const other = nucleuses[j];
                nucleus.electromagnetism(other);


                if (nucleus.eletrobonded(other)) {
                    nucleuses.splice(j, 1);
                } else if (nucleus.strongforcebonded(other)) {
                    nucleuses.splice(j, 1);
                } else if (nucleus.covalentlyBond(other)) {
                    nucleuses.splice(j, 1);

                }

            }

        }


        nucleus.update();
        nucleus.show();



        if (nucleus.atomicnumber > biggestAtomicNumber) {
            biggestAtomicNumber = nucleus.atomicnumber;
            biggestElement = nucleus.label;
        }



    }


    newnucleusestoadd.forEach(nm => nucleuses.push(nm));


    if (frameRate() > 35) {
        addNucleus();
    };



    fill(255);
    text('Biggest: ' + biggestElement, 20, height - 20);


}



