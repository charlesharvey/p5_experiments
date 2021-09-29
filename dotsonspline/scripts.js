

let splines;


let target;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    target = createVector(0, 0);
    splines = [];
    // for (let i = 0; i < 10; i++) {
    //     splines.push(new Spline(i / 10));
    // }

    splines.push(new Spline(51.703627, 92.780514, 0, 0, 171.680803, 184.837616, 85.248753, -4.233334, 0.1));
    splines.push(new Spline(48.237586, 100.50635, 0, 0, 168.042884, 168.58143, 84.005204, -4.233337, 0.2));
    splines.push(new Spline(46.861752, 110.34885, 0, 0, 163.736388, 148.25219, 79.639588, -8.99584, 0.3));




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
