class Ant {

    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.vel;
        this.resetVelocity();
        this.r = 3;
        this.hasFood = Math.random() > 0.8;
    }


    resetVelocity() {
        this.vel = p5.Vector.random2D();
    }


    layTrail() {

        const x = Math.round(this.pos.x);
        const y = Math.round(this.pos.y);

        if (this.inBoundsX(x) && this.inBoundsY(y)) {
            if (this.hasFood) {
                attractant[x][y] += 1;
            } else {
                repellant[x][y] += 1;
            }
        }
    }

    update() {


        this.pos.add(this.vel);
        this.bounce();

    }

    inBoundsX(v) {
        return (v > 0 && v < width);
    }
    inBoundsY(v) {
        return (v > 0 && v < height);
    }

    sense(pheremone, type) {
        const nextx = Math.round(this.pos.x + this.vel.x + this.vel.x);
        const nexty = Math.round(this.pos.y + this.vel.y + this.vel.y);
        const thisx = Math.round(this.pos.x);
        const thisy = Math.round(this.pos.y);

        if (this.inBoundsX(nextx) && this.inBoundsX(thisx) && this.inBoundsY(nexty) && this.inBoundsY(thisy)) {
            if (thisx != nextx || this.y != nexty) {
                const thisph = pheremone[thisx][thisy];
                const nextph = pheremone[nextx][nexty];
                if (nextph > thisph / 2) {
                    if (type == 'avoid') {
                        this.resetVelocity();
                    }
                }

            }
        }


    }

    bounce() {
        if (this.pos.x < 0) {
            this.pos.x = 0;
            this.resetVelocity();
        } else if (this.pos.x > width) {
            this.pos.x = width;
            this.resetVelocity();
        } else if (this.pos.y < 0) {
            this.pos.y = 0;
            this.resetVelocity();
        } else if (this.pos.y > height) {
            this.pos.y = height;
            this.resetVelocity();

        }
    }


    show() {
        noStroke();
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }


}