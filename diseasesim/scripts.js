
let people;
let populationSize = 260;

let graphHeight, graphWidth, graphX, graphY;

let results;

let withSocialDistancing = false;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    graphHeight = height - 40;
    graphWidth = width / 2 - 60;
    graphX = width / 2 + 20;
    graphY = 20;


    resetSimulation();



}


function resetSimulation() {
    results = [];
    people = [];

    for (let i = 0; i < populationSize; i++) {
        const person = new Person();
        people.push(person);
    }
}


function mousePressed() {
    withSocialDistancing = !withSocialDistancing;
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


    fill(255, 90);
    noStroke();
    textSize(30);
    if (withSocialDistancing) {
        text('With social distancing', width / 2 + 30, height / 2);
    } else {
        text('Without social distancing', width / 2 + 30, height / 2)

    }
    textSize(15);
    text('Click to toggle social distancing', width / 2 + 30, height / 2 + 20);


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
    textSize(20);
    text(percentp, x + 20, y);
    endShape();
}
