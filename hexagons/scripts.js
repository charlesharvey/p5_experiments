
let size;


let hexagons = []

let curX;
let curY;

let player = 0;

function setup() {


    createCanvas(700, 700);


    size = 50;


    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let hexagon = new Hexagon(i, j);
            hexagons.push(hexagon);
        }
    }


}


function mouseMoved() {
    curX = mouseX;
    curY = mouseY;

    // hexagons.forEach(hexagon => {
    //     if (hexagon.clicked(curX, curY, player)) {
    //         player = (player + 1) % 2
    //     };
    // });

}


function mousePressed() {
    hexagons.forEach(hexagon => {
        if (hexagon.clicked(mouseX, mouseY, player)) {
            player = (player + 1) % 2
        };
    });

}

function draw() {
    background(0);

    // translate(size, size);




    hexagons.forEach(hexagon => {
        hexagon.show();
    });




    if (curY) {
        fill(0, 200, 0);
        ellipse(curX, curY, 3, 3);

        hexagons.forEach(hexagon => {
            hexagon.highlight(curX, curY);
        });

    }


    // let randx = random(width);
    // let randy = random(height);
    // hexagons.forEach(hexagon => {
    //     if (hexagon.clicked(randx, randy, player)) {
    //         player = (player + 1) % 2;
    //     };
    // });


}
