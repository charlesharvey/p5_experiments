
let alice, bob;
let people;
function rsa() {

    alice = new Person('alice');
    bob = new Person('bob');


    if (width > 700) {
        people = [alice, bob];
    } else {
        people = [alice];
    }



    console.log(alice, bob);

}


function setup() {



    createCanvas(windowWidth - 20, windowHeight - 20);
    rsa();

}

function mousePressed() {
    people.forEach((person, index) => {
        person.setMessage();

        // const e = document.getElementById(person.name);
        // if (e) {
        //     person.setMessage(e.value);
        // } else {
        //     person.setMessage();
        // }


        person.makeKeyPair();
        person.doEncryption();
    });
    draw();
}

// function keyPressed() {
//     const e = document.getElementById('alice');
//     people[0].setMessage(e.value);

// }


function draw() {
    background(0);
    noStroke();
    fill(255);


    people.forEach((person, index) => {
        if (person.public_key) {


            push();
            translate(index * width / 2 + 100, 70);
            textSize(35);
            text(`${person.name} says "${person.message_letters.join('')}"`, 0, 0);
            textSize(25);
            text('Prime 1: ' + person.private_key.p, 000, 35);
            text('Prime 2: ' + person.private_key.q, 000, 65);
            text('Modulus (p1*p2): ' + person.public_key.modulus, 200, 35);
            text('Exponent: ' + person.public_key.exponent, 200, 65);

            // text('Message: ' + person.message, 00, 90);
            text('Encrypted message: ', 00, 135);
            text('Decrypted message: ', 00, 235);

            textSize(20);
            // text(person.message_as_number, 20, 170);
            textSize(20);
            text(person.message, 20, 170);
            textSize(15);
            text(person.public_key.exponent, 95, 153);
            textSize(20);
            text(` mod ${person.public_key.modulus} = ${person.encrypted_message} = ${person.encrypted_message_as_letters.join('')}`, 125, 170);

            textSize(20);
            text(person.encrypted_message, 20, 270);
            textSize(15);
            text(person.private_key.d, 95, 253);
            textSize(20);
            text(` mod ${person.public_key.modulus} = ${person.decrypted_message} = ${person.decrypted_message_as_letters.join('')}`, 155, 270);

            pop();
        }


    });



    noLoop();



}
