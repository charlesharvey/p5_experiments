


let planets = [];
let sun;
let angle = 0;

let tangents = [];
let count = 0;
let noofpetals = 1.618;
function setup() {


    createCanvas(windowWidth - 10, windowHeight - 10);

    const noplanets = 2;
    for (let i = 0; i < noplanets; i++) {
        const radius = (width / 8) * (i + 1);
        const ecc = 0.1;
        const size = 5;
        const p = new Planet(`planet_${i}`, radius, ecc, size, (7 - (noofpetals * i)) / 50);
        planets.push(p);
    }



    sun = new Planet('sun', 0, 0, 10, 0);

}



function draw() {
    background(0);


    translate(width / 2, height / 2);



    sun.draw();

    planets.forEach(planet => {
        planet.draw();
        planet.update();


        if (count % 5 == 0) { }
        const v1 = createVector(planet.x, planet.y);
        for (let p = 0; p < planets.length; p++) {
            const other = planets[p];
            if (other !== planet && other.y) {
                const v2 = createVector(other.x, other.y);
                tangents.push([v1, v2]);

                // stroke(255, 50);
                // line(v1.x, v1.y, v2.x, v2.y);
            }
        }



    });


    tangents.forEach(tangent => {
        stroke(255, 50);
        line(tangent[0].x, tangent[0].y, tangent[1].x, tangent[1].y);
    })



    if (frameRate() < 15) {
        tangents.splice(0, 1);
    }


    count++;


}