class Particle {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = grid; //* 0.66;
        // this.hue = 255; //random(100);
        this.bounced = false;

        this.vel_x = 0;
        this.vel_y = 0;
        const r = Math.random();
        if (r < 0.25) {
            this.vel_x = 1;
        } else if (r < 0.5) {
            this.vel_x = -1;
        } else if (r < 0.75) {
            this.vel_y = 1;
        } else {
            this.vel_y = 1;
        }



    }

    show() {
        fill(255, 90);
        ellipse(this.x * grid, this.y * grid, this.r, this.r);
    }

    update() {

        if (this.x < 0 || this.x > cols) {
            this.vel_x *= -1;
        }
        if (this.y < 0 || this.y > rows) {
            this.vel_y *= -1;
        }

        this.x += this.vel_x;
        this.y += this.vel_y;
    }

    collide(others) {
        others.forEach(other => {
            if (other != this) {

                if (other.x == this.x && other.y == this.y) {
                    if (this.vel_x == 0 && other.vel_x == 0) {
                        other.vel_x = other.vel_y;
                        this.vel_x = other.vel_y * -1;
                        other.vel_y = 0;
                        this.vel_y = 0;
                    } else if (this.vel_y == 0 && other.vel_y == 0) {
                        other.vel_y = other.vel_x;
                        this.vel_y = other.vel_x * -1;
                        other.vel_x = 0;
                        this.vel_x = 0;
                    }

                }

            }
        });
    }
}