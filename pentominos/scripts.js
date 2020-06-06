

let pieces;
const squaresize = 35;
let curX, curY;

let x1, y1, x2, y2;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);
    reset();
}

function reset() {
    pieces = [];

    const b01 = new Block(0, 0);
    const b02 = new Block(1, 0);
    const b03 = new Block(2, 0);
    const b04 = new Block(3, 0);
    const b05 = new Block(4, 0);
    const p0 = new Piece(0, 1, 1, [b01, b02, b03, b04, b05]);
    pieces.push(p0);



    const b11 = new Block(0, 0);
    const b12 = new Block(1, 0);
    const b13 = new Block(1, 1);
    const b14 = new Block(1, 2);
    const b15 = new Block(1, 3);
    const p1 = new Piece(1, 1, 3, [b11, b12, b13, b14, b15]);
    pieces.push(p1);


    const b21 = new Block(0, 0);
    const b22 = new Block(1, 0);
    const b23 = new Block(2, 0);
    const b24 = new Block(1, 1);
    const b25 = new Block(2, 1);
    const p2 = new Piece(2, 1, 13, [b21, b22, b23, b24, b25]);
    pieces.push(p2);

    const b31 = new Block(0, 1);
    const b32 = new Block(1, 1);
    const b33 = new Block(2, 1);
    const b34 = new Block(1, 0);
    const b35 = new Block(1, 2);
    const p3 = new Piece(3, 12, 1, [b31, b32, b33, b34, b35]);
    pieces.push(p3);

    const b41 = new Block(0, 2);
    const b42 = new Block(1, 2);
    const b43 = new Block(2, 2);
    const b44 = new Block(2, 1);
    const b45 = new Block(2, 0);
    const p4 = new Piece(4, 14, 13, [b41, b42, b43, b44, b45]);
    pieces.push(p4);

    const b51 = new Block(0, 0);
    const b52 = new Block(0, 1);
    const b53 = new Block(0, 2);
    const b54 = new Block(1, 1);
    const b55 = new Block(2, 1);
    const p5 = new Piece(5, 10, 13, [b51, b52, b53, b54, b55]);
    pieces.push(p5);

    const b61 = new Block(0, 0);
    const b62 = new Block(1, 0);
    const b63 = new Block(1, 1);
    const b64 = new Block(2, 1);
    const b65 = new Block(2, 2);
    const p6 = new Piece(6, 5, 13, [b61, b62, b63, b64, b65]);
    pieces.push(p6);

    const b71 = new Block(0, 0);
    const b72 = new Block(0, 1);
    const b73 = new Block(1, 1);
    const b74 = new Block(1, 2);
    const b75 = new Block(1, 3);
    const p7 = new Piece(7, 1, 8, [b71, b72, b73, b74, b75]);
    pieces.push(p7);


    const b81 = new Block(0, 0);
    const b82 = new Block(1, 0);
    const b83 = new Block(0, 1);
    const b84 = new Block(0, 2);
    const b85 = new Block(1, 2);
    const p8 = new Piece(8, 16, 1, [b81, b82, b83, b84, b85]);
    pieces.push(p8);

    const b91 = new Block(0, 1);
    const b92 = new Block(1, 1);
    const b93 = new Block(2, 1);
    const b94 = new Block(3, 1);
    const b95 = new Block(2, 0);
    const p9 = new Piece(9, 7, 1, [b91, b92, b93, b94, b95]);
    pieces.push(p9);

    const ba1 = new Block(2, 0);
    const ba2 = new Block(0, 1);
    const ba3 = new Block(1, 1);
    const ba4 = new Block(2, 1);
    const ba5 = new Block(1, 2);
    const pa = new Piece(10, 13, 5, [ba1, ba2, ba3, ba4, ba5]);
    pieces.push(pa);

    const bb1 = new Block(1, 2);
    const bb2 = new Block(0, 2);
    const bb3 = new Block(1, 1);
    const bb4 = new Block(2, 0);
    const bb5 = new Block(1, 0);
    const pb = new Piece(11, 14, 9, [bb1, bb2, bb3, bb4, bb5]);
    pieces.push(pb);

}


function mouseMoved() {
    curX = Math.floor(mouseX / squaresize);
    curY = Math.floor(mouseY / squaresize);


}


function mousePressed() {
    let noneselected = true;
    pieces.forEach(piece => {
        if (noneselected) {
            piece.unselect();
            if (piece.highlighted) {
                piece.select();
                x1 = mouseX;
                y1 = mouseY;
                noneselected = false;
            }
        }

    });
}


function mouseDragged() {
    x2 = mouseX;
    y2 = mouseY;

    dx = Math.floor((x2 - x1) / squaresize);
    dy = Math.floor((y2 - y1) / squaresize);

    pieces.forEach(piece => {
        if (piece.selected) {
            piece.moveTo(dx, dy)
        }
    });



}

function mouseReleased() {
    pieces.forEach(piece => {
        if (piece.selected) {
            piece.setNewOrig()
            piece.unselect();
        }
    });

    x1 = null;
    y1 = null;
    x2 = null;
    y2 = null;
}

// function keyPressed(e) {
//     pieces.forEach(piece => {
//         if (piece.selected) {
//             if (key == 'ArrowRight') {
//                 piece.moveRight();
//             } else if (key == 'ArrowLeft') {
//                 piece.moveLeft();
//             } else if (key == 'ArrowDown') {
//                 piece.moveDown();
//             } else if (key == 'ArrowUp') {
//                 piece.moveUp();
//             }
//         }
//     });
// }



function draw() {
    background(0);

    pieces.forEach(piece => {
        piece.highlight(curX, curY);
        piece.show();
    });


    // DRAW GAME BOARD
    stroke(255);
    strokeWeight(4);
    noFill();
    rect(4 * squaresize, 4 * squaresize, 8 * squaresize, 8 * squaresize)




}
