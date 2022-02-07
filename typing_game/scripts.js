let score;
let current_letter;
let speed;
let game_over;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const WORDS = ["QUICK", "BROWN", "FOX", "JUMPED", "OVER", "LAZY", "DOG"];

class Letter {
  constructor(key, x) {
    if (key) {
      this.key = key;
    } else {
      this.key = random(LETTERS);
    }

    if (x) {
      this.x = x;
    } else {
      this.x = random(20, width - 20);
    }

    this.font_size = 30;
    this.y = 0;
    this.been_typed = false;
    this.should_remove = false;
  }

  typed(key) {
    if (!this.been_typed) {
      this.been_typed = key.toUpperCase() === this.key;
      return this.been_typed;
    }
  }

  dead() {
    return this.y > height;
  }

  update() {
    this.y += speed;

    if (this.been_typed) {
      this.font_size--;
    }
    if (this.font_size <= 0) {
      this.should_remove = true;
    }
  }

  show() {
    if (!this.should_remove) {
      if (this.been_typed) {
        fill(0, 255, 0);
      } else {
        fill(255);
      }
      textSize(this.font_size);
      text(this.key, this.x, this.y);
    }
  }
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  textAlign(CENTER);
  reset();
}

function reset() {
  score = 0;
  speed = 1;
  current_letters = [];
  game_over = false;

  addNewLetter();
}

function addNewLetter() {
  if (Math.random() > 0.5) {
    current_letters.push(new Letter());
  } else {
    const word = random(WORDS);
    const ls = word.split("");
    const rx = random(10, width - 200);
    ls.forEach((l, i) => {
      const x = rx + i * 20;
      current_letters.push(new Letter(l, x));
    });
  }
}

function removeLetter(letter) {
  this.current_letters = this.current_letters.filter((l) => l !== letter);
}

function mouseClicked() {
  if (game_over) {
    reset();
  }
}

function keyPressed() {
  let has_removed = false;
  current_letters.forEach((letter) => {
    if (!has_removed) {
      const typed = letter.typed(key);
      if (typed === true) {
        has_removed = true;
        // removeLetter(letter); //
        score += 1;
      }
    }
  });
  if (!has_removed) {
    addNewLetter();
  }
}

function draw() {
  background(0);

  if (game_over == false) {
    current_letters.forEach((letter) => {
      letter.update();
      letter.show();
      if (letter.dead()) {
        game_over = true;
      }

      if (letter.should_remove) {
        removeLetter(letter);
      }
    });

    if (frameCount % 50 == 49) {
      speed += 0.0125;
      addNewLetter();
    }
  }

  textSize(14);
  fill(255);
  text(`Score: ${score}`, 20, 20);
  text(`Speed: ${round(speed * 10)}`, 20, 40);

  if (game_over) {
    text("Game Over", 20, 60);
  }
}
