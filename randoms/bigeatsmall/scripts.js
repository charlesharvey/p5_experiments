

let players;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);



    const p1 = new Player('orange', 100);
    const p2 = new Player('blue', 500);
    players = [p1, p2];

}



function draw() {
    background(0);

    players.forEach(player => {
        player.show();
    })


    // draw board
    stroke(255);
    noFill();
    push();
    translate(150, 150);
    const xx = 100;
    line(xx, 0, xx, xx * 3);
    line(xx * 2, 0, xx * 2, xx * 3);
    line(0, xx, xx * 3, xx);
    line(0, xx * 2, xx * 3, xx * 2);
    pop();
    // draw board
}
