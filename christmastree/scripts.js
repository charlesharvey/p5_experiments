

let lightss;
let numberOfLights = 130;
let treeHeight;
let treeRadius;
let theta = 3;
let zeta = 0;
let mu = 0;
let planeHeight = 0;
let trunk;
let leaves;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20, WEBGL);
    colorMode(HSB, 255, 100, 100);


    treeHeight = height / 2;
    treeRadius = height / 4;

    lightss = [];
    const tripsAroundTree = 5;
    for (let i = 0; i < numberOfLights; i++) {

        const theta = (tripsAroundTree * i) / numberOfLights * TWO_PI;
        const u = (i + noise(i) * 30) / numberOfLights * treeHeight; // * (random(500, 1000) / 1000);
        const part1 = (treeHeight - u) / treeHeight;
        const x = part1 * treeRadius * cos(theta);
        const y = part1 * treeRadius * sin(theta);
        const z = -u;
        const light = createVector(x, y, z);
        lightss.push(light);
    }


    trunk = [];
    for (let h = 0; h < treeHeight + 200; h += (treeHeight / 50)) {
        let bit = [];
        for (let t = 0; t < TWO_PI; t += (TWO_PI / 15)) {

            const r = 20 * (h / treeHeight);
            const x = sin(t) * r;
            const y = cos(t) * r;
            const z = h - 480;
            bit.push(createVector(x, y, z));

        }
        trunk.push(bit);
    }
    leaves = [];
    for (let h = 0; h < treeHeight; h += (treeHeight / 10)) {
        let leaf = [];
        for (let t = 0; t < TWO_PI; t += (TWO_PI / 30)) {
            const r = treeRadius * (h / treeHeight);
            const x = sin(t) * r;
            const y = cos(t) * r;
            const z = (h - 480) * map(sin(t * 7), -1, 1, 0.985, 1.02);
            leaf.push(createVector(x, y, z));

        }
        leaves.push(leaf);
    }



}


function wobble(v, offset) {



    return v + (25 * noise(offset + zeta));

}
function draw() {
    background(120, 50, 90);


    rotateX(-PI / 2);
    rotateX(-0.25 + (sin(mu) / 5));
    rotateZ(theta / 2);
    translate(20, 10, 300);

    lights();



    fill(20, 80, 30);
    noStroke();
    trunk.forEach((tr) => {
        beginShape();
        tr.forEach((wood) => {
            vertex(wood.x, wood.y, wood.z);

        });
        endShape();
    });



    fill(70, 80, 30);
    noStroke();
    leaves.forEach((lv) => {
        beginShape();
        lv.forEach((leaf, li) => {
            vertex(leaf.x, leaf.y, leaf.z);

        });
        endShape();
    });






    lightss.forEach((light, li) => {
        push();
        const x = wobble(light.x, li);
        const y = wobble(light.y, li);
        const z = wobble(light.z, li);
        translate(x, y, z);

        // if (light.z * -1 < planeHeight) {
        //     fill(255, 80, 90);
        // } else {
        //     fill(100, 80, 90);
        // }

        const hu = map((planeHeight - light.z) % treeHeight, 0, treeHeight, 0, 255);
        fill(hu, 80, 90);



        noStroke();
        sphere(5);
        pop();

    });

    noFill();
    stroke(100, 10, 80, 50);
    strokeWeight(2);
    beginShape();
    lightss.forEach((light, li) => {
        const x = wobble(light.x, li);
        const y = wobble(light.y, li);
        const z = wobble(light.z, li);
        vertex(x, y, z);
    });
    endShape();







    theta += 0.1;
    zeta += 0.03;
    mu += 0.01;


    // planeHeight = (planeHeight + 5) % (treeHeight + 100);
    planeHeight = (planeHeight + 5);




}
