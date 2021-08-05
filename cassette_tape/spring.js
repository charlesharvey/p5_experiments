class Spring {


    constructor(a, b) {



        this.restLength = 3;
        this.k = 0.9;

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
        stroke(200, 120, 30);
        strokeWeight(5);
        line(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);


    }
}