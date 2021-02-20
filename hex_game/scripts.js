



let hexagons = []
let size;
const cols = 7;
const rows = 7;
const boardPadding = 0;

let player = 0;
const player0Color = [255, 0, 0];
const player1Color = [0, 255, 0];
const darkPlayer0Color = player0Color.map(h => h * 0.7);
const darkPlayer1Color = player1Color.map(h => h * 0.7);


let mousePos;

let button;
let usingAi = false;

function setup() {

    button = createButton('use ai');
    button.mousePressed(buttonClicked);


    createCanvas(windowWidth - 10, windowHeight - 10);

    // // we need a diagonal board so cols is actually more than the number of hexagons
    const boardColsAmount = Math.ceil(cols + rows / 2) + 3;
    const boardRowsAmount = rows + 2;
    size = Math.floor(
        min(
            width / boardColsAmount * 0.6666,
            height / boardRowsAmount * 0.6666
        ));


    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let hexagon = new Hexagon(i, j);
            hexagons.push(hexagon);
        }
    }

    mousePos = createVector(0, 0);



}

function buttonClicked() {
    usingAi = !usingAi;
    console.log(button);
    if (usingAi) {
        button.elt.innerHTML = 'using AI';
    } else {
        button.elt.innerHTML = 'use AI';
    }

}

function playRandomMoveForPlayer1() {

    const unplayedHexagons = hexagons.filter(h => h.player == -1);
    if (unplayedHexagons.length > 1) {
        const randomIndex = () => Math.floor(random(unplayedHexagons.length));
        const hexToTry = unplayedHexagons[randomIndex()]
        hexToTry.player = 1;
        player = 0;
    } else {
        alert('Game Over');
    }
}


function mouseMoved() {

    mousePos.set(mouseX, mouseY);

    // hexagons.forEach(hexagon => {
    //     if (hexagon.clicked(curX, curY, player)) {
    //         player = (player + 1) % 2
    //     };
    // });

}


function mousePressed() {
    hexagons.forEach(hexagon => {
        if (hexagon.clicked(mousePos.x, mousePos.y, player)) {
            player = (player + 1) % 2;
            if (player == 1) {
                if (usingAi) {
                    playRandomMoveForPlayer1();
                }
            }

        };
    });
}



function draw() {
    background(190, 180, 210);




    hexagons.forEach(hexagon => {
        hexagon.show();
    });


    if (mousePos.x > 0) {

        if (player == 0) {
            fill(player0Color.map(h => h + 100))
        } else {
            fill(player1Color.map(h => h + 100));
        }
        noStroke();
        ellipse(mousePos.x, mousePos.y, size / 2, size / 2);

        hexagons.forEach(hexagon => {
            hexagon.highlight(mousePos);
        });

    }


    // let randx = random(width);
    // let randy = random(height);
    // hexagons.forEach(hexagon => {
    //     if (hexagon.clicked(randx, randy, player)) {
    //         player = (player + 1) % 2;
    //     };
    // });


    // noStroke();
    // fill(0, 100);
    // text(`${Math.round(width)},${Math.round(height)}`, 10, 10);


}
