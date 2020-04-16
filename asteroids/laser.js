class Laser {
    constructor(pos, heading) {
        this.pos = pos.copy();
        this.heading = heading;

        this.vel = p5.Vector.fromAngle(this.heading - PI / 2);
        this.vel.setMag(9)
    }

    update() {
        this.pos.add(this.vel);
    }
    show() {

        push();
        translate(this.pos.x, this.pos.y)
        fill(255, 255, 0);
        noStroke();
        ellipse(0, 0, 6, 6);
        pop();
    }

    hits(asteroid) {
        const d = dist(asteroid.pos.x, asteroid.pos.y, this.pos.x, this.pos.y);
        if (d < asteroid.r + 10) {
            return true;
        }
        return false;
    }


    outOfBounds() {
        if (this.pos.x > width) {
            return true;
        } else if (this.pos.x < 0) {
            return true;
        }
        if (this.pos.y > height) {
            return true;
        } else if (this.pos.y < 0) {
            return true;
        }

        return false;
    }
}