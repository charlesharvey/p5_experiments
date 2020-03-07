class Particle {


    constructor() {
        this.pos = createVector(random(width), random(height));
        this.z = random(0, 5);
        this.xoff = random(100, 200000);
        this.yoff = random(10, 2000);
        this.influence = random(30, 200); // mwill make vertexes if this many pixels away 
        // this.maxNeighbours = random(6, 13);
        this.age = 1;
        this.deathRate = random(0.001, 0.007);
    }


    update() {
        this.xoff += 0.0001 * this.z;
        this.yoff += 0.0001 * this.z;
        this.pos.x = (noise(this.xoff) * (width + 500)) - 250;
        this.pos.y = (noise(this.yoff) * (height + 500)) - 250;
        this.age -= this.deathRate;
    }

    show() {

        stroke(255, 40 * this.z * this.age);
        strokeWeight(this.z);
        point(this.pos.x, this.pos.y);

    }

    dead() {
        return this.age < 0;
    }


    vertexes(others) {
        strokeWeight(1);


        let count = 0;

        others.forEach(other => {
            if (other != this) {

                // const d = pow(this.pos.x - other.pos.x, 2) + pow(this.pos.y - other.pos.y, 2);
                const d = pow(this.pos.x - mouseX, 2) + pow(this.pos.y - mouseY, 2);

                if (d < pow(this.influence, 2)) {

                    const dod = pow(this.pos.x - other.pos.x, 2) + pow(this.pos.y - other.pos.y, 2);


                    if (dod < pow(this.influence, 2)) {
                        // const d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
                        // if (d < this.influence && count < this.maxNeighbours ) {
                        count++;
                        stroke(255, 50 * this.age * other.age);
                        line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
                    }
                }
            }
        });
        // const neighbours = [];
        // neighbours.push(other);
        // neighbours.forEach(other => {
        // })

    }
}
