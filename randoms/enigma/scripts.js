
const keySize = 50;
const keyboardLines = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

let keys;




function setup() {




    createCanvas(windowWidth - 20, windowHeight - 20);

    textAlign(CENTER);

    keys = [];
    keyboardLines.forEach((keyboardLine, yy) => {
        keyboardLine.forEach((letter, xx) => {
            const x = (10 + xx - keyboardLine.length / 2) * (keySize * 1.1);
            const y = yy * (keySize * 1.1) + 100;
            keys.push(new Key(letter, x, y));
        });
    });
}



function draw() {
    background(0);



    keys.forEach(key => {
        key.show();
        key.hovered(mouseX, mouseY);
        if (mouseIsPressed) {
            key.clicked(mouseX, mouseY);
        }
    })


}
