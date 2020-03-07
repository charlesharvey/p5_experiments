
const fee = 199;
const percentage = 0.10; // bonus going to recruiter

const maxRecuitSize = 20;

const populationSize = 240;

const people = [];
let sortedValues = [];
let sorted = [];
while (people.length < populationSize) {
    people.push(new Person());
}


let maxMoney = 300;


const conman = people[0];
// first person in scheme
conman.inScheme = true;
conman.level = 1;
conman.ableToRecruit = true;






function persuadePeople() {
    people.forEach(person => {
        // if in the scheme they will try and recuit other people;
        if (person.inScheme && person.ableToRecruit && person.suckers.length <= maxRecuitSize) {
            people.forEach((other, i) => {
                if (other.inScheme === false && other !== person) {
                    const r = Math.random();
                    if (r < other.gullibility) { // if they want to join

                        if (other.money > fee) { // if they can pay the fee
                            other.inScheme = true;
                            other.level = person.level + 1;
                            other.recruiter = person;

                            other.payFeeTo(person);
                            person.suckers.push(other);

                            person.payRecruiterFee(1);


                        }

                    }
                }
            })
        }
    });

    // they can now recuit other people;
    let newrercuits = people.filter(p => p.inScheme === true);
    newrercuits.forEach(s => s.ableToRecruit = true);
}







// console.log(conman.payments);



function sortPeople() {
    sortedValues = people.map(p => p.money).sort((a, b) => {
        return b - a;
    });

    // sorted = people.sort((a, b) => {
    //     return b.money - a.money;
    // })

    // maxMoney = Math.max(sorted[0].money, 500);


}


function calcMaxMoney() {

    people.forEach(p => {
        if (p.money > maxMoney) {
            maxMoney = p.money;
        }
    });

}




function setup() {
    createCanvas(1100, 500);
    colorMode(HSB);


}




function draw() {
    background(0);
    // frameRate(1);


    strokeWeight(0.3);
    stroke(255, 30);
    noFill();
    for (let j = 0; j < maxMoney; j += 250) {
        const yy = map(j, 0, maxMoney, height - 50, 50);
        line(0, yy, width, yy);
    }


    fill(255);
    noStroke();

    if (people) {

        people.forEach((person, i) => {

            let r = 2;
            if (person.level >= 0) {
                let c = map(person.money, 0, maxMoney, 0, 255);
                fill(c, 255, 255);
                r = 20 / (person.level);
            } else {
                fill(0, 0, 250);

            }
            let x = map(i, 0, populationSize, 50, width - 50);
            let y = map(person.money, 0, maxMoney, height - 50, 50)
            ellipse(x, y, r, r);
        })
    }



    let persuadedPeople = people.filter(p => p.inScheme).length;
    if (persuadedPeople < populationSize) {
        persuadePeople();
        calcMaxMoney();
        sortPeople();

    } else {
        console.log('done');
        noLoop();
    }





    if (sortedValues) {
        noFill();
        stroke(255, 50);
        strokeWeight(0.3);
        beginShape();
        sortedValues.forEach((v, i) => {
            let x = map(i, 0, populationSize, 50, width - 50);
            let y = map(v, 0, maxMoney, height - 50, 50)
            vertex(x, y);
        })
        endShape()
    }







}