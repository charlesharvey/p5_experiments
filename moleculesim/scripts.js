



let molecules = [];


function setup() {



    createCanvas(windowWidth - 10, windowHeight - 10);

    for (let i = 0; i < 30; i++) {

        addMolecule();
    }

    noStroke();

}

function addMolecule() {

    let types = ['blargon', 'blargon', 'gloopton', 'zeptron'];

    const particle = new Particle(random(types));
    const molecule = new Molecule(random(width), random(height));
    molecule.addParticle(particle);
    molecules.push(molecule);
}



function draw() {

    background(0);


    newmoleculestoadd = [];
    for (let i = 0; i < molecules.length; i++) {
        const molecule = molecules[i];




        for (let j = molecules.length - 1; j > 0; j--) {
            if (j != i) {
                const other = molecules[j];
                molecule.attracted(other);

                if (molecule.bonded(other)) {
                    molecules.splice(j, 1);
                    // } else if (molecule.collided(other)) {

                    // const newmolecules = molecule.splitInTwo();
                    // const newmoleculeso = other.splitInTwo();
                    // molecules.splice(j, 1);
                    // molecules.splice(i, 1);
                    // newmolecules.forEach(nm => newmoleculestoadd.push(nm));
                    // newmoleculeso.forEach(nm => newmoleculestoadd.push(nm));
                }

            }

        }


        molecule.update();
        molecule.show();




    }


    newmoleculestoadd.forEach(nm => molecules.push(nm));


    if (frameRate() > 30) {
        addMolecule();
    };





}



