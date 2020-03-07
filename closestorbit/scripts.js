


let planets = [];
let sun;
let angle = 0;

function setup() {


    createCanvas(700, 700);



    // label, radius, eccentricty, size, barchart position
    // planets.push(new Planet('mercury', 69, 0.205, 2.4, 20));
    // planets.push(new Planet('venus', 108, 0.006, 6, 40));
    // planets.push(new Planet('earth', 149, 0.0167, 6.3, 60));
    // planets.push(new Planet('mars', 249, 0.0934, 3.4, 80));
    // // planets.push(new Planet('jupiter', 816, 0.048, 69, 100));

    const noplanets = random(1, 10);
    for (let i = 0; i < noplanets; i++) {
        const radius = random(50, width / 2);
        const ecc = random(0, 0.1);
        const size = random(1, 7);
        planets.push(new Planet(`planet_${i}`, radius, ecc, size, i * 20));
    }



    sun = new Planet('sun', 0, 0, 10, 0);

}



function draw() {
    background(0);

    // resetMatrix();
    translate(width / 2, height / 2);

    // rotateX(angle);
    // angle += 0.01;

    planets.forEach(planet => {
        planet.draw();
        planet.update();
        planet.nearest(planets);
        planet.chart();
    });

    sun.draw();







}