
let sidesAmount;
let quadpoints;
let shortestmidpoints;
let shortestMidLength;
let theta;
let midpoints;

let results;
let graphHeight, graphWidth, graphX, graphY;





function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    graphHeight = height / 2;
    graphWidth = width / 2 - 60;
    graphX = width / 2 + 20;
    graphY = 20;

    reset();

}

function mousePressed() {
    reset();
}

function reset() {

    sidesAmount = 4; // Math.floor(random(3, 6));
    quadpoints = [];
    shortestmidpoints = [];
    shortestMidLength = 9999999;
    theta = 0;
    midpoints = [];
    results = [];

    for (let i = 0; i < sidesAmount; i++) {
        const x = sin(TWO_PI / sidesAmount * i) * 200 + 300 + random(230);
        const y = cos(TWO_PI / sidesAmount * i) * 200 + 300 + random(230);
        const vector = createVector(x, y, i / sidesAmount);
        quadpoints.push(vector)

    }



}


function midpoint(begin, end, percent) {
    const mx = ((begin.x * percent) + (end.x * (1 - percent)));
    const my = ((begin.y * percent) + (end.y * (1 - percent)));
    const m = createVector(mx, my);
    return m;
}


function drawQuad(points) {
    for (let i = 0; i < points.length; i++) {
        const v = points[i];
        const next = points[(i + 1) % points.length]
        line(v.x, v.y, next.x, next.y);
    }
}


function quadLength(points) {
    let distance = 0;
    for (let i = 0; i < points.length; i++) {
        const v = points[i];
        const next = points[(i + 1) % points.length]
        const d = dist(v.x, v.y, next.x, next.y);
        distance += d;
    }
    return distance;
}

function draw() {
    background(0);



    noFill();

    stroke(255);
    strokeWeight(2);
    drawQuad(quadpoints);


    // const a = quadpoints[0];
    // const b = quadpoints[1];
    // reflectQuad(quadpoints, a, b);
    // noLoop();


    randomizePointsOnQuads();


}



function reflectQuad(points, a, b) {



    const abv = p5.Vector.sub(b, a);

    const midpoint = p5.Vector.lerp(a, b, 0.5);
    fill(255, 255, 0);
    noStroke();
    ellipse(midpoint.x, midpoint.y, 4, 4);

    strokeWeight(5);
    stroke(255, 100, 100, 120);
    line(a.x, a.y, b.x, b.y);

    points.forEach(point => {
        fill(255, 0, 0);
        noStroke();
        ellipse(point.x, point.y, 4, 4);


        const dx = midpoint.x - point.x;
        const dy = midpoint.y - point.y;


        const ex = point.x + dx + dx;
        const ey = point.y + dy + dy;

        const d1x = point.x - a.x;
        const d1y = point.y - a.y;

        const d2x = point.x - b.x;
        const d2y = point.y - b.y;


        stroke(0, 0, 255);
        strokeWeight(1);
        // line(d1x, d1y, point.x, point.y);
        // line(d2x, d2y, point.x, point.y);
        // line(ex, ey, point.x, point.y);

        const dd = dist(point.x, point.y, midpoint.x, midpoint.y);


        const arrow = p5.Vector.sub(point, abv);
        arrow.setMag(dd);
        // arrow.add(midpoint);
        console.log(arrow.mag(), arrow.heading())


        // const arrow = point.copy();
        // arrow.reflect(midpoint);

        // arrow.setMag(1);
        fill(0, 0, 255);
        // ellipse(arrow.x, arrow.y, 4, 4);



        line(arrow.x, arrow.y, point.x, point.y);


    });


}

function randomizePointsOnQuads() {
    midpoints = [];

    for (let i = 0; i < quadpoints.length; i++) {
        const v = quadpoints[i];
        const next = quadpoints[(i + 1) % quadpoints.length];
        // let percent = map( noise(theta + (i * 1000)), 0, 1, 0, 1);
        let percent = map(sin(v.z + 1), -1, 1, 0.02, 0.98);
        if (i == 0) {
            percent = 0.5
        }

        v.z += 0.01 * (i + 1) + (noise(v.z) / 200);

        const md = midpoint(v, next, percent);
        midpoints.push(md);
    }

    const midlength = quadLength(midpoints);
    results.push(midlength);
    if (midlength < shortestMidLength) {
        shortestMidLength = midlength;
        shortestmidpoints = midpoints;
    }


    stroke(90, 90, 10);
    strokeWeight(1);
    drawQuad(midpoints);


    stroke(100, 255, 100);
    strokeWeight(1);
    drawQuad(shortestmidpoints);


    drawGraph();

    theta += 0.03;
}


function drawGraph() {
    noFill();
    stroke(50);
    rect(graphX, graphY, graphWidth, graphHeight);


    beginShape();
    let x, y;
    const maxSize = max(results) + 10;
    const minSize = min(results) - 10;
    results.forEach((r, i) => {
        y = map(r, minSize, maxSize, graphHeight + graphY, graphY);
        x = map(i, 0, results.length, graphX, graphX + graphWidth);
        vertex(x, y);
    });
    endShape();

    text(results[results.length - 1], width - 30, y);

    stroke(100, 255, 100);
    text(minSize, width - 30, graphHeight + graphY - 10);





}
