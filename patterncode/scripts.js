const alphabet = " abcdefghijklmnopqrstuvwxyz";
const paragraph = getParapraph();
const grid = 70;

let rows, cols;

let dictionary;

const letters = paragraph.split("");
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);

  rows = floor(width / grid);
  cols = floor(height / grid);

  textSize(grid / 5);

  dictionary = {};
}

function draw() {
  background(0);

  translate(40, 40);

  letters.forEach((p, i) => {
    const x = (i % rows) * grid;
    const y = floor(i / rows) * grid;

    // noStroke();
    // fill(255);
    // text(p, x, y - 10);

    const j = alphabet.indexOf(p);
    const a = indexToA(j);
    const b = indexToB(j);
    const c = indexToC(j);

    if (a == 0) {
      noFill();
      stroke(90);
      strokeWeight(5);
      rect(x, y, grid / 2, grid / 2);
    } else if (a == 1) {
      fill(90);
      noStroke();
      rect(x, y, grid / 2, grid / 2);
    }

    fill(255);
    noStroke();
    if (b == 0) {
    } else if (b == 1) {
      ellipse(x + grid / 4, y + grid / 4, grid / 10, grid / 10);
    } else if (b == 2) {
      ellipse(x + grid / 4 + grid / 10, y + grid / 4, grid / 10, grid / 10);
      ellipse(x + grid / 4 - grid / 10, y + grid / 4, grid / 10, grid / 10);
    }

    noFill();
    stroke(0, 200, 200);
    strokeWeight(grid / 11);

    if (c == 0) {
    } else if (c == 1) {
      line(x + grid / 2, y + grid / 2, x, y + grid / 2);
    } else if (c == 2) {
      line(x, y, x + grid / 2, y);
      line(x + grid / 2, y + grid / 2, x, y + grid / 2);
    } else if (c == 3) {
      line(x + grid / 2, y, x + grid / 2, y + grid / 2);
      line(x + grid / 2, y + grid / 2, x, y + grid / 2);
    } else if (c == 4) {
      line(x, y, x, y + grid / 2);
      line(x, y, x + grid / 2, y);
    }

    // const d = `${a}${b}${c}`;
    // if (typeof dictionary[d] === "undefined") {
    //   dictionary[d] = 1;
    // } else {
    //   dictionary[d]++;
    // }
    // console.log(p, i, a, b, c, d);
  });

  noLoop();
}

function indexToA(i) {
  return i % 2;
}
function indexToB(i) {
  return i % 3;
}
function indexToC(i) {
  return i % 5;
}

function getParapraph() {
  var _cs = [
    "rme",
    "or",
    "fie",
    "tion",
    "ns ",
    "he ",
    "ing",
    "do",
    "n ",
    "fa",
    " an",
    " f",
    "ld",
    "ment",
    "k t",
    " is",
    " u",
    "ypt",
    "we",
    "cr",
    "s ",
    " de",
    " bu",
    " tr",
    "ath",
    "ch",
    "ri",
    "sag",
    "ree",
    "oa",
    "d ",
    "ure",
    "nde",
    " t",
    " ol",
    "mes",
    " in",
    "k ",
    "rne",
    "hi",
    "ed",
    " ",
    "r j",
    "eas",
    "est",
    " i",
    "e ",
    "ll ",
    "the",
    "oh",
    "ne",
  ];

  const a =
    _cs[18] +
    _cs[47] +
    _cs[7] +
    _cs[50] +
    _cs[11] +
    _cs[1] +
    _cs[21] +
    _cs[19] +
    _cs[17] +
    _cs[6] +
    _cs[33] +
    _cs[39] +
    _cs[20] +
    _cs[35] +
    _cs[27] +
    _cs[46] +
    _cs[48] +
    _cs[23] +
    _cs[43] +
    _cs[31] +
    _cs[15] +
    _cs[22] +
    _cs[26] +
    _cs[40] +
    _cs[36] +
    _cs[10] +
    _cs[34] +
    _cs[30] +
    _cs[29] +
    _cs[37] +
    _cs[25] +
    _cs[44] +
    _cs[16] +
    _cs[32] +
    _cs[38] +
    _cs[24] +
    _cs[33] +
    _cs[5] +
    _cs[29] +
    _cs[14] +
    _cs[28] +
    _cs[45] +
    _cs[8] +
    _cs[9] +
    _cs[0] +
    _cs[42] +
    _cs[49] +
    _cs[4] +
    _cs[2] +
    _cs[12];

  return a;
}
