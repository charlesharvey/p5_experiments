


const radius = 120;
const maxHeight = 90;
const barCount = 80;



let dayOfYear = 0;
let offset = 0;



function setup() {


    createCanvas(500, 500);


}





function hours(lat) {
    const p = asin(0.39795 * cos(0.2163108 + 2 * atan(0.09671396 * tan(0.00860 * (dayOfYear - 186)))));
    const D = 24 - (24 / PI) * acos((sin(0.8333 * PI / 180) + (sin(lat * PI / 180) * sin(p))) / (cos(lat * PI / 180) * cos(p)));
    return D;



}


function draw() {
    background(51);

    translate(width / 2, height / 2);



    // 24 hours sunlight
    stroke(10, 120, 230, 90);
    strokeWeight(2);
    noFill();
    ellipse(0, 0, (radius + maxHeight) * 2, (radius + maxHeight) * 2);
    // 12 hours sunlight
    ellipse(0, 0, (radius + maxHeight / 2) * 2, (radius + maxHeight / 2) * 2);

    // rays
    for (let i = 0; i < barCount; i++) {
        const angle = (PI / barCount) * i;

        const lat = map(i, 0, barCount, 90, -90);
        const daylength = hours(lat);
        const height = map(daylength, 0, 24, 0, maxHeight);

        const x0 = sin(angle) * radius;
        const y0 = cos(angle) * radius;

        const x1 = sin(angle) * (radius + height);
        const y1 = cos(angle) * (radius + height);


        const x2 = sin(angle * -1) * radius;
        const y2 = cos(angle * -1) * radius;

        const x3 = sin(angle * -1) * (radius + height);
        const y3 = cos(angle * -1) * (radius + height);

        strokeWeight(3);
        stroke(255, 255, 0);
        line(x0, y0, x1, y1);

        line(x2, y2, x3, y3);



    }
    offset += 0.007;


    //earth
    fill(0);
    noStroke();
    ellipse(0, 0, radius * 2, radius * 2);





    fill(255);
    textSize(16);
    text(`dayOfYear: ${dayOfYear}`, -width / 2 + 20, -height / 2 + 20);

    dayOfYear = (dayOfYear + 1) % 365;

    // frameRate(19);


}
