

let character;
let candies;
let platforms;
let has_won;

function setup() {


    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB);

    reset();

}


function reset() {
    character = new Puppy(60, height - 150);
    has_won = false;
    candies = [];
    platforms = [];
    platforms.push(new Platform(30, height - 20, 100))
    platforms.push(new Platform(170, height - 80, 100))
    platforms.push(new Platform(310, height - 130, 100))
    platforms.push(new Platform(450, height - 180, 100))
    platforms.push(new Platform(580, height - 230, 100))

    candies.push(new Candy(630, height - 350))
}


function draw() {
    background(0);
    noStroke();

    platforms.forEach(platform => {
        platform.show();
    })
    candies.forEach(candy => {
        if (character.eat(candy)) {
            candy.eaten = true;
        }
        candy.show();
    })


    if (keyIsDown(UP_ARROW)) {
        character.jump();
    } else if (keyIsDown(DOWN_ARROW)) {
        character.crouch();
    }
    if (keyIsDown(LEFT_ARROW)) {
        character.walk('left');
    } else if (keyIsDown(RIGHT_ARROW)) {
        character.walk('right');
    }



    character.isFalling(platforms);
    character.show();
    character.update();


    fill(255);
    noStroke();
    textSize(30);
    if (character.score > 0) {

        text('You win', 600, height - 300);
    } else if (character.pos.y > height) {
        text('You dead', 600, height - 300);
    }


    candies = candies.filter(c => c.eaten == false);
}


function mousePressed() {
    reset();
}