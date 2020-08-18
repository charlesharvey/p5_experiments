class Ray {

    constructor(x, y, angle) {
        this.pos = createVector(x, y);
        this.dir = p5.Vector.fromAngle(angle);
        this.heading;
        this.theta = 0;
        this.rotate(this.theta);

    }


    rotate(theta) {
        this.theta += theta;
        this.heading = this.dir.copy().rotate(this.theta);
    }

    moveTo(x, y) {
        this.pos.set(x, y);



    }

    show() {

        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.heading.x, this.heading.y);
        pop();
    }


    cast(walls) {

        let recordPoint = null;
        let recordDist = 99999999;
        walls.forEach(wall => {
            const pt = this.getIntersectionPoint(wall);

            if (pt) {
                const d = dist(pt.x, pt.y, this.pos.x, this.pos.y);
                if (d < recordDist) {
                    recordDist = d;
                    recordPoint = pt;
                }
            }
        });

        return recordPoint;

    }



    getIntersectionPoint(wall) {

        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
        const x3 = this.pos.x
        const y3 = this.pos.y
        const x4 = this.pos.x + this.heading.x;
        const y4 = this.pos.y + this.heading.y;
        let pt = intersectionPoint(x1, y1, x2, y2, x3, y3, x4, y4);
        return pt;
    }
}