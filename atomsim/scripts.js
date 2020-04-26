



let nucleuses = [];

let showTrails = false;


function setup() {



    createCanvas(windowWidth - 10, windowHeight - 10);

    for (let i = 0; i < 30; i++) {

        addNucleus();
    }

    noStroke();


    background(0);


}

function addNucleus() {

    let types = ['electron', 'proton', 'neutron'];

    const particle = new Particle(random(types));
    const nucleus = new Nucleus(random(width), random(height));
    nucleus.addParticle(particle);
    nucleuses.push(nucleus);
}


function mousePressed() {
    showTrails = !showTrails;
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
                }

            }

        }


        nucleus.update();
        nucleus.show();




    }


    newnucleusestoadd.forEach(nm => nucleuses.push(nm));


    if (frameRate() > 35) {
        addNucleus();
    };





}



