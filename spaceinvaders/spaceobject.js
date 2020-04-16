class Spaceobject {


    constructor() {

    }

    edges() {
        if (this.pos.x > width + this.r) {
            this.pos.x = 0 - this.r;
        } else if (this.pos.x < 0 - this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = 0 - this.r;
        } else if (this.pos.y < 0 - this.r) {
            this.pos.y = height + this.r;
        }
    }

}