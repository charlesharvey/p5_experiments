
let noise, nodes, r;
const speed_of_sound = 10;
function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    reset();

}

function mousePressed() {
    reset();
}

function reset() {
    noise = createVector(random(width * 0.3, width * 0.7), random(height * 0.3, height * 0.7));

    nodes = [];
    nodes.push(new Node(width * 0.2, height * 0.9));
    nodes.push(new Node(width * 0.5, height * 0.1));
    nodes.push(new Node(width * 0.8, height * 0.9));

    r = 0;
}



function draw() {
    background(0);



    nodes.forEach(node => {
        node.show();
        node.listen(noise, r);
    });




    stroke(255, 255, 0, 140);
    noFill();
    ellipse(noise.x, noise.y, r, r);


    noStroke();
    fill(255, 50);
    ellipse(noise.x, noise.y, 5, 5);



    if (nodes.every(d => !!d.detection_time)) {

    } else {
        r += speed_of_sound
    }





}
