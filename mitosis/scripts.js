let cells;
let bettercells;
let evenbettercells;
let evenevenbettercells;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  reset();
}

function reset() {
  evenevenbettercells = [];
  const cell = new Evenevenbettercell();
  evenevenbettercells.push(cell);

  // evenbettercells = [];
  // const cell = new Evenbettercell();
  // evenbettercells.push(cell);
  // bettercells = [];
  // const bettercell = new Bettercell();
  // bettercells.push(bettercell);
  // cells = [];
  // const cell = new Cell();
  // cells.push(cell);
}

function draw() {
  background(0);

  evenevenbettercells.forEach((cell) => {
    cell.update();
    cell.giftwrap();
    cell.show();
  });

  // evenbettercells.forEach(cell => {
  //     cell.update();
  //     cell.show();
  // });

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
