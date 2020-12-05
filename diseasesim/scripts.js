
let people;
let populationSize;

let graphHeight, graphWidth, graphX, graphY;

let results;

let run = 0;

let withSocialDistancing = false;
let withPeopleShopping = false;

let initalSickPercentage = 0.03;


let shops;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);



    populationSize = ((width / 2) * height) / 2500;

    graphHeight = height - 40;
    graphWidth = width / 2 - 60;
    graphX = width / 2 + 20;
    graphY = 20;


    resetSimulation();



}


function resetSimulation() {
    results = [];
    people = [];
    shops = [];

    withSocialDistancing = (run % 2 == 1)
    withPeopleShopping = (run % 4 > 1)

    if (withPeopleShopping) {

        shops = [];
        shopamount = Math.ceil(populationSize / 20);
        for (let i = 0; i < shopamount; i++) {
            // const s = createVector(random(width / 4, width / 2), random(height / 2, height / 4));
            const s = createVector(random(0, width / 2), random(height));
            shops.push(s);
        }


    } else {

        shops = null;
    }

    for (let i = 0; i < populationSize; i++) {
        const person = new Person();
        people.push(person);
    }

    const initalSickSize = Math.round(populationSize * initalSickPercentage);
    for (let i = 0; i < initalSickSize; i++) {
        people[i].makeInfected();
    }



}


function mousePressed() {
    run++;
    resetSimulation();
}



function draw() {
    background(0);


    let amountp = 0;
    let amounti = 0;
    let amountr = 0;
    for (let i = 0; i < people.length; i++) {
        const person = people[i];

        person.update();

        if (withPeopleShopping) {
            person.goToShop(people, shops);
        }

        if (withSocialDistancing) {
            person.socialDistancing(people);
        }

        person.infect(people);
        person.show();

        if (person.state === 'p') {
            amountp++;
        } else if (person.state === 'i') {
            amounti++;
        } else if (person.state === 'r') {
            amountr++;
        }
    }

    const result = { amountp, amounti, amountr };
    results.push(result);




    if (shops) [
        shops.forEach(s => {
            fill(0, 0, 255);
            rect(s.x, s.y, 10, 10);
        })
    ]


    drawGraph();


}




function drawGraph() {


    // draw graph of change in infections over time;

    noFill();
    stroke(50);


    rect(graphX, graphY, graphWidth, graphHeight);

    const white = color(255)
    drawLine('amountp', white);

    const green = color(255, 0, 0)
    drawLine('amounti', green);

    const red = color(0, 255, 50)
    drawLine('amountr', red);


    fill(255, 170);
    noStroke();
    textSize(30);

    let info = 'Without social distancing';

    if (withSocialDistancing) {
        info = 'With social distancing'
    }
    text(info, width / 2 + 30, height / 2);

    if (withPeopleShopping) {
        text('With a central shop', width / 2 + 30, height / 2 - 30);
    }

    textSize(16);
    text('White - uninfected people', width / 2 + 30, height / 2 + 60);
    text('Red - infected people', width / 2 + 30, height / 2 + 80);
    text('Green - recovered people', width / 2 + 30, height / 2 + 100);


    fill(255);
    text('Click to toggle social distancing and going shopping', width / 2 + 30, height / 2 + 20);

}



function drawLine(property, color) {
    noFill();
    stroke(color);
    beginShape();
    let x, y;
    results.forEach((r, i) => {
        y = map(r[property], 0, populationSize, graphHeight + graphY, graphY);
        x = map(i, 0, results.length, graphX, graphX + graphWidth);
        vertex(x, y);
    });
    const percentp = Math.round(results[results.length - 1][property] / populationSize * 100);
    endShape();

    textSize(20);
    fill(color);
    noStroke();
    text(percentp, x + 20, y);

}
