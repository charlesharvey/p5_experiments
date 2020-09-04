class Wall {
    constructor() {
        const padding = 50;
        this.pos1 = createVector(padding + random(width - padding), padding + random(height - padding));
        this.pos2 = createVector(padding + random(width - padding), padding + random(height - padding));


    }


    update() {

    }

    show() {

        strokeWeight(2);
        stroke(255);
        line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);

    }


    intersection(pos, vel) {


        const x1 = pos.x;
        const y1 = pos.y;
        const x2 = pos.x + vel.x;
        const y2 = pos.y + vel.y;
        const x3 = this.pos1.x;
        const y3 = this.pos1.y;
        const x4 = this.pos2.x;
        const y4 = this.pos2.y;



        const part5 = (x1 - x2) * (y3 - y4);
        const part6 = (y1 - y2) * (x3 - x4);
        const dem = (part5 - part6);




        if (dem == 0) {
            return null;
        }

        const part1 = (x1 - x3) * (y3 - y4);
        const part2 = (y1 - y3) * (x3 - x4);
        const part3 = (x1 - x2) * (y1 - y3);
        const part4 = (y1 - y2) * (x1 - x3);
        const t = (part1 - part2) / dem;
        const u = -(part3 - part4) / dem;




        if (t > 0 && t < 1 && u > 0) {
            const x = x1 + t * (x2 - x1);
            const y = y1 + t * (y2 - y1);
            return createVector(x, y);
        } else {
            return null;
        }

    }

}