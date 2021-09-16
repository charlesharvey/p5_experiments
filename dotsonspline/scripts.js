

let splines;


let target;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    target = createVector(0, 0);
    splines = [];
    for (let i = 0; i < 10; i++) {
        splines.push(new Spline(i / 10));

    }


}

function mouseMoved() {
    target.set((mouseX - width) / 2, (mouseY - height) / 2);
}



function draw() {
    background(0);


    splines.forEach(spline => {
        spline.update();
        spline.show();
    });




}
