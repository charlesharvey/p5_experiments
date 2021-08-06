
let vehicles;

let target;





function setup() {



    createCanvas(windowWidth - 20, windowHeight - 20);


    vehicles = [];
    for (let i = 0; i < 10; i++) {
        const vehicle = new Vehicle(random(width), random(height));
        vehicles.push(vehicle);
    }


    target = createVector(0, 0);

}


function mouseDragged() {
    target.x = mouseX;
    target.y = mouseY;
}


function draw() {


    background(0);


    vehicles.forEach(vehicle => {


        if (mouseIsPressed) {
            vehicle.seek(target)
        } else {
            vehicle.seek(vehicle.target);
        }
        vehicle.update();
        vehicle.show();


    });




    // noStroke();
    // fill(0, 255, 0);
    // ellipse(target.x, target.y, 10, 10);




}
