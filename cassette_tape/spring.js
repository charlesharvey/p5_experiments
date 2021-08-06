class Spring {


    constructor(a, b, hue) {



        this.restLength = restLength;
        this.k = 0.9;
        this.hue = hue;

        this.a = a;
        this.b = b;
    }

    update() {
        let force = p5.Vector.sub(this.b.pos, this.a.pos);
        let x = force.mag() - this.restLength;
        force.normalize();
        force.mult(this.k * x);
        this.a.applyForce(force);
        force.mult(-1);
        this.b.applyForce(force);
    }

    show() {

        noFill();
        stroke(this.hue, 255, 255);
        strokeWeight(9);
        line(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);


    }
}