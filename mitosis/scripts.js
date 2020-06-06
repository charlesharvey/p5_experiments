

let cells;
let bettercells;
let evenbettercells;


function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);


    reset();

}

function reset() {
    evenbettercells = [];
    const cell = new Evenbettercell();
    evenbettercells.push(cell);
    // bettercells = [];
    // const bettercell = new Bettercell();
    // bettercells.push(bettercell);
    // cells = [];
    // const cell = new Cell();
    // cells.push(cell);


}



function draw() {
    background(0);

    evenbettercells.forEach(cell => {
        cell.update();
        cell.show();
    });

    // bettercells.forEach(cell => {
    //     cell.update();
    //     cell.show();
    // });

    // cells.forEach(cell => {

    //     cell.update();
    //     cell.show();

    //     cell.addChild();

    //     newchild = cell.split();
    //     if (newchild) {
    //         cells.push(newchild);
    //     }
    // })


}
