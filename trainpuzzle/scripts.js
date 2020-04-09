
const target = 800;

const trainCapacity = 500;


let currentFuelStatus = trainCapacity;
let distanceTravelled = 0;
let currentPosition = 0;

const fuelDumps = []



function trainProblem() {



    moveTrainForwards(100);
    moveTrainForwards(200)
    moveTrainForwards(300)




}


function moveTrainForwards(distance) {
    const absdistance = Math.abs(distance);
    distanceTravelled += absdistance;
    currentPosition += distance;
    currentFuelStatus -= absdistance;

    const dumpedFuelsOutside = fuelDumps.filter(fd => fd.pos == currentPosition);
    if (dumpedFuelsOutside) {
        dumpedFuelsOutside.forEach(f => {
            currentFuelStatus += f.fuel;

            if (currentFuelStatus > trainCapacity) {
                currentFuelStatus = trainCapacity;
                f.fuel = currentFuelStatus - trainCapacity;
            } else {
                f.fuel = 0;
            }

        })
    }


    // dump excess fuel out, and then go back
    const excess = currentFuelStatus - currentPosition;
    const fueldump = { pos: currentPosition, fuel: excess };
    fuelDumps.push(fueldump);

    console.log('distance', distance, 'travelled', distanceTravelled, 'pos', currentPosition, 'fuel', currentFuelStatus);
    console.log(fuelDumps);

    if (excess < 0) {
        console.log('out of fuel');
    }





    // now move back to start and refuel;
    refuel();

    // if (currentPosition == 0) {
    //     currentFuelStatus = trainCapacity;
    //     console.log('refuelled');
    // }

    // if (currentFuelStatus < 0) {
    //     console.log('out of fuel');
    // }


}

function refuel() {

    currentFuelStatus = trainCapacity;
    distanceTravelled += currentPosition;
    currentPosition = 0;
}



function setup() {


    trainProblem();


    createCanvas(windowWidth - 20, windowHeight - 20);

}



function draw() {
    background(0);


}
