



let hexagons = []
let size;
let cols = 7;
let rows = 7;


let player = 0;
const player0Color = [255, 0, 0];
const player1Color = [0, 255, 0];
const darkPlayer0Color = player0Color.map(h => h * 0.7);
const darkPlayer1Color = player1Color.map(h => h * 0.7);
const lightPlayer0Color = player0Color.map(h => h + 70);
const lightPlayer1Color = player1Color.map(h => h + 70);
const lighterPlayer0Color = player0Color.map(h => h + 150);
const lighterPlayer1Color = player1Color.map(h => h + 150);


let mousePos;

let button, resetButton, slider;
let usingAi = false;

function setup() {
    mousePos = createVector(0, 0);

    button = createButton('use AI');
    button.mousePressed(buttonClicked);
    resetButton = createButton('Restart');
    resetButton.mousePressed(createHexagons);

    slider = createSlider(3, 15, cols, 1);
    slider.mouseReleased(createHexagons);

    createCanvas(windowWidth - 10, windowHeight - 10);




    createHexagons();

}



function createHexagons() {
    player = 0;
    hexagons = [];
    cols = slider.value();
    rows = cols;

    // // we need a diagonal board so cols is actually more than the number of hexagons
    const boardColsAmount = Math.ceil(cols + rows / 2) + 3;
    const boardRowsAmount = rows + 3;
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
}



function buttonClicked() {
    usingAi = !usingAi;
    if (usingAi) {
        button.elt.innerHTML = 'AI: on';
    } else {
        button.elt.innerHTML = 'AI: off';
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
            fill(lightPlayer0Color)
        } else {
            fill(lightPlayer1Color)
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
