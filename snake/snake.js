class Snake {

    constructor(x, y, hue) {
        colorMode(HSB);
        this.x = x;
        this.y = y;
        this.drawX = x;
        this.drawY = y;
        this.color = color(hue, 100, 100);
        this.tailColor = color(hue, 100, 100, 0.8);
        this.direction = 'right';
        this.highScore = -1;
        this.reset();
    }


    show() {

        noStroke();

        if (this.tail) {
            this.tail.forEach(bit => {
                fill(this.tailColor);
                rect(bit.x * grid, bit.y * grid, grid, grid);
            });
        }


        fill(this.color);
        rect(this.drawX * grid, this.drawY * grid, grid, grid);

    }


    ai(food) {

        if (food.x < this.x && this.x >= 0) { // food is further left
            this.turn('left');
        } else if (food.x > this.x && this.x <= cols) { // food is further right
            this.turn('right');
        } else if (food.y > this.y && this.y < rows) { // food is below
            this.turn('down');
        } else if (food.y < this.y && this.y > 0) { // food is above
            this.turn('up');
        } else if (this.y === food.y && this.x !== food.x) {
            this.turn('left');
        } else if (this.x === food.x && this.y != food.y) {
            this.turn('up');
        }


        // will it hit the tail
        let newX = this.x;
        let newY = this.y;
        if (this.direction === 'left') {
            newX = this.newX(-1);
        } else if (this.direction === 'right') {
            newX = this.newX(1);
        } else if (this.direction === 'up') {
            newY = this.newY(-1);
        } else if (this.direction === 'down') {
            newY = this.newY(1);
        }

        let canAdapt = false;

        this.tail.forEach(bit => {

            if (canAdapt === false) {
                // need to check every cardinal direction to see if can move in that direction
                if (bit.x == newX && bit.y === newY) {
                    this.canAdapt = true;
                    if (this.direction === 'up') {
                        this.direction = 'down';
                    } else if (this.direction === 'down') {
                        this.direction = 'up';
                    } else if (this.direction === 'left') {
                        this.direction = 'right';
                    } else if (this.direction === 'right') {
                        this.direction = 'left';
                    }


                }
            }

        })

    }



    lerp() {


        if (this.direction === 'left') {
            this.drawX = this.newPos('drawX', -1 / speed, cols);
        } else if (this.direction === 'right') {
            this.drawX = this.newPos('drawX', 1 / speed, cols);
        } else if (this.direction === 'up') {
            this.drawY = this.newPos('drawY', -1 / speed, rows);
        } else if (this.direction === 'down') {
            this.drawY = this.newPos('drawY', 1 / speed, rows);
        }


    }


    newPos(xy, d, colrows) {
        return (this[xy] + d + colrows) % colrows;
    }

    newX(d) {
        return (this.x + d + rows) % rows;
    }
    newY(d) {
        return (this.y + d + cols) % cols;
    }


    update() {



        if (this.direction === 'left') {
            this.x = this.newX(-1);
        } else if (this.direction === 'right') {
            this.x = this.newX(1);
        } else if (this.direction === 'up') {
            this.y = this.newY(-1);
        } else if (this.direction === 'down') {
            this.y = this.newY(1);

        }

        this.drawY = this.y;
        this.drawX = this.x;

        if (this.bitToAdd) {
            this.tail.push(this.bitToAdd);
            this.bitToAdd = null;
        }


        // remove element from beginning of tail,
        this.tail.shift();
        // add current place to beginning of tail
        this.tail.push({ x: this.x, y: this.y });

        // allow another change of direction
        this.turning = false;

    }


    eaten(food) {

        if (this.x === food.x && this.y === food.y) {
            this.bitToAdd = { x: this.x, y: this.y };
            this.score += 10;
            return true;
        }
        return false;
    }


    dead(barriers) {


        // has it hit a barrier
        let hitBarrier = false;
        barriers.forEach(barrier => {
            if (barrier.x === this.x && barrier.y === this.y) {
                hitBarrier = true;

            }
        });

        // if snake interacts withitself, its dead
        let count = 0;
        if (!hitBarrier) {
            this.tail.forEach(bit => {
                if (bit.x === this.x && bit.y === this.y) {
                    count++;;
                }
            });
        }

        const isDead = (count > 1 || hitBarrier);


        if (isDead) {
            this.updateHighScore();
        }

        return (isDead);
    }

    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
    }


    turn(direction) {
        // dont allow turning too quickly
        if (this.turning === false) {
            this.turning = true;
            if (direction === 'left') {
                this.turnLeft();
            } else if (direction === 'right') {
                this.turnRight();
            } else if (direction === 'up') {
                this.turnUp();
            } else if (direction === 'down') {
                this.turnDown();
            }

        }
    }


    turnLeft() {
        if (this.direction !== 'right') {
            this.direction = 'left';
        }
    }

    turnRight() {
        if (this.direction !== 'left') {
            this.direction = 'right';
        }
    }

    turnDown() {
        if (this.direction !== 'up') {
            this.direction = 'down';
        }
    }

    turnUp() {
        if (this.direction !== 'down') {
            this.direction = 'up';
        }
    }


    reset() {


        this.tail = [];
        this.bitToAdd;
        this.turning = false;
        this.score = 0;

    }

}