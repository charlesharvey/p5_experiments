
let grid;
let prisoner;
let guard;
let guardsTurn = true;
let prisonerMoving = false;
let cities;
let twoPlayer = false;
let ptimeout;
function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);

    grid = width / 9;

    reset();

}

function reset() {
    guardsTurn = true;
    prisonerMoving = false;

    cities = [];

    for (let i = 0; i < 5; i++) {
        const city = new City((i + 1) * grid, grid, false);
        cities.push(city);
    }
    for (let i = 0; i < 4; i++) {
        const city = new City((i + 1) * grid, grid * 2, false);
        cities.push(city);

        upcity = cities[i];
        city.addNeighbour(upcity);
        upcity.addNeighbour(city);

    }
    const city10 = new City((5) * grid, grid * 3, false);
    cities.push(city10);

    const city11 = new City((4) * grid, grid * 3, true);
    cities.push(city11);


    cities[0].addNeighbour(cities[1]);
    cities[1].addNeighbour(cities[0]);

    cities[1].addNeighbour(cities[2]);
    cities[2].addNeighbour(cities[1]);

    cities[2].addNeighbour(cities[3]);
    cities[3].addNeighbour(cities[2]);

    cities[3].addNeighbour(cities[4]);
    cities[4].addNeighbour(cities[3]);



    cities[5].addNeighbour(cities[6]);
    cities[6].addNeighbour(cities[5]);

    cities[6].addNeighbour(cities[7]);
    cities[7].addNeighbour(cities[6]);

    cities[7].addNeighbour(cities[8]);
    cities[8].addNeighbour(cities[7]);

    cities[4].addNeighbour(cities[9]);
    cities[9].addNeighbour(cities[4]);

    cities[8].addNeighbour(cities[9]);
    cities[9].addNeighbour(cities[8]);

    cities[8].addNeighbour(cities[10]);
    cities[10].addNeighbour(cities[8]);


    cities[9].addNeighbour(cities[10]);
    cities[10].addNeighbour(cities[9]);


    prisoner = new Person(true, cities[0]);
    guard = new Person(false, cities[6]);


}


function mouseMoved() {
    closestcity = null;
    closestdistance = 999999;
    cities.forEach(city => {
        city.highlighted = false;
        const d = dist(city.pos.x, city.pos.y, mouseX, mouseY);
        if (d < closestdistance && d < grid / 2) {
            closestdistance = d;
            closestcity = city;
        }
    })

    if (closestcity) {
        closestcity.highlighted = true;
    }


}

function mousePressed() {


    const highlightedCity = cities.find(c => c.highlighted);
    if (highlightedCity) {
        if (guardsTurn) {
            let movedcity = guard.movedCity(highlightedCity);
            if (movedcity) {
                guardsTurn = !guardsTurn;
            }
        } else {
            let movedcity = prisoner.movedCity(highlightedCity);
            if (movedcity) {
                guardsTurn = !guardsTurn;
            }
        }


    }

}


function draw() {
    background(0);


    cities.forEach(city => {
        city.show();
    });


    noStroke();
    fill(255);
    textSize(30);
    if (guardsTurn) {
        // guard.move();
        text(' Guards turn', 20, 30);
    } else {
        console.log('prisoner moving');
        text(' Prisoners turn', 20, 30);

        if (twoPlayer == false) {
            if (!prisonerMoving) {
                prisonerMoving = true;
                ptimeout = setTimeout(() => {
                    prisoner.move(guard);
                    guardsTurn = !guardsTurn;
                    prisonerMoving = false;

                }, 300);
            }
        }





    }


    textSize(15);
    text('The red prisoner is trying to escape capture. You are the blue policeman. You have to get to the same', 25, 60);
    text(' city as the prisoner to capture him. Click on a neighbouring city to move. This prisoner will', 25, 80);
    text(' then try and evade you. Your job is to get to the same city as the prisoner', 25, 100);



    prisoner.show();
    guard.show();

    if (guard.city === prisoner.city) {
        // reset();
        alert('prisoner has been caught');
        guardsTurn = true;
        clearTimeout(ptimeout);
        reset();
    }

}
