

let len = 100;
let theta = 3.14 / 6;


let offsetT;
let offsetX;
let windOffset;
let wind = 0;

function setup() {

    offsetT = random(10000);
    offsetX = random(10000);
    windOffset = random(10000);
    createCanvas(windowWidth - 20, windowHeight - 20);

    len = min(height, width) / 3;
}



function draw() {
    background(255);
    stroke(0);
    strokeWeight(1);

    translate(width / 2, height);

    branch(len, 0);

    theta += 0.008;

    offsetT += 0.001;
    offsetX += 0.001;
    windOffset += 0.004;

    wind = noise(windOffset, 0, 1, -0.005, 0.005);


}



function branch(len, index) {
    strokeWeight(len / 40);
    line(0, 0, 0, -len);

    translate(0, -len);
    if (len > 18) {

        const o = map(noise(offsetT + index), 0, 1, 0.5, 0.7);
        const noofbranches = Math.floor(map(noise(index), 0, 1, 2, 5));


        for (let i = 0; i < noofbranches; i++) {
            push();
            const newtheta = map(i, 0, noofbranches - 1, theta * -1, theta);
            const n = noise(i + o + offsetX, 0, 1, -2.3, 0.3);
            rotate((sin(sin(newtheta + wind))));

            branch(len * o, index++);
            pop();

        }




    }




}