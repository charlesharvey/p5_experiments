class Cat extends Animal {

    constructor(settings) {
        super(settings);
    }


    hunt(mouse) {

        if (this.inObstacle(pondPos, pondRadius)) {

        } else {
            const force = p5.Vector.sub(mouse.pos, this.pos);
            this.applyForce(force);
        }


    }

    stop() {


    }

    killed(mouse) {
        const d = dist(this.pos.x, this.pos.y, mouse.pos.x, mouse.pos.y);
        if (d < ((this.r + mouse.r)) / 2) {
            return true;
        }
        return false;
    }



}