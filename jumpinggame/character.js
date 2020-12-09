class Puppy {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.gravity = createVector(0, 1);
        this.friction = 0.8
        this.w = 20;
        this.hue = 150;
        this.maxV = 4;
        this.falling = true;
        this.jumping = false;
        this.score = 0;
    }


    isFalling(platforms) {

        this.falling = true;
        platforms.forEach(platform => {
            if (this.falling) {
                const dy = (platform.y - this.pos.y);
                // console.log(dy);
                if (dy > 0 && dy < platform.h) {
                    const x = this.pos.x;
                    const w = this.w;
                    if (x > platform.x - w && x < (platform.x + platform.w)) {


                        this.falling = false;
                        this.vel.y = 0;
                    }
                }
            }

        })
    }


    eat(candy) {
        if (candy.eaten == false) {
            const d = dist(candy.x, candy.y, this.pos.x, this.pos.y);
            if (d < 5) {
                this.score++;
                return true;
            }
            return false;
        }
        return false;
    }


    jump() {

        this.walk('up');


    }
    crouch() {

    }
    walk(dir) {
        let force;
        if (dir == 'left') {
            force = createVector(-5, 0);
        } else if (dir == 'right') {
            force = createVector(5, 0);
        } else if (dir == 'up') {
            force = createVector(0, -5);
        }

        this.applyForce(force);
    }

    applyForce(force) {
        this.acc.add(force);
    }


    update() {

        if (this.falling) {
            this.applyGravity();
        }


        this.vel.add(this.acc);
        this.vel.limit(this.maxV);
        this.pos.add(this.vel);
        this.vel.mult(this.friction); // friction
        this.acc.mult(0);





    }

    applyGravity() {
        this.applyForce(this.gravity);
    }

    show() {

        push();

        translate(this.pos.x, this.pos.y);
        if (this.jumping) {
            fill(this.hue, 200, 200);
        } else {
            fill(this.hue + 100, 200, 200);
        }

        rect(0, 0, this.w, this.w)
        pop();
    }
}