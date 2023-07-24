class Evenevenbettercell {
  constructor() {
    this.pos = createVector(width / 2, height / 2);

    this.foc1 = this.pos.copy();
    this.foc2 = this.pos.copy();

    this.vel1 = p5.Vector.random2D();
    this.vel1.setMag(0.24);
    this.vel2 = this.vel1.copy();
    this.vel2.mult(-1);

    this.growthrate = 0.3;

    this.stuff = [];
    this.numberOfBits = 300;

    // giftwrap algorithm
    // need to split into two for each focal point
    this.hulls = [[], []];
    this.points;
    this.index;
    this.current;
    this.next;
    this.leftmost;
    this.nextIndex;
    this.finished = false;
  }

  update() {
    if (this.stuff.length < this.numberOfBits) {
      const bit = new Evenevenbit(this.pos.x, this.pos.y);
      this.stuff.push(bit);
    } else {
      this.foc1.add(this.vel1);
      this.foc2.add(this.vel2);
    }
  }

  giftwrap() {
    if (this.stuff.length >= 6) {
      this.hulls = [[], []];
      this.points = [[], []];

      this.stuff.forEach((bit) => {
        const d1 = bit.pos.dist(this.foc1);
        const d2 = bit.pos.dist(this.foc2);
        const di = d1 < d2 ? 0 : 1;
        this.points[di].push(bit);
      });

      this.points.forEach((pts, pi) => {
        pts.sort((a, b) => a.pos.x - b.pos.x);

        let leftmost = pts[0];
        let current = leftmost;
        let next = pts[1];
        let index = 2;
        let nextIndex = -1;
        let checking;
        let finished = false;
        if (current) {
          this.hulls[pi].push(current);

          while (index < pts.length) {
            checking = pts[index];
            const a = p5.Vector.sub(next.pos, current.pos);
            const b = p5.Vector.sub(checking.pos, current.pos);
            const cross = a.cross(b);
            if (cross.z < 0) {
              next = checking;
              nextIndex = index;
            }

            index = index + 1;

            if (index == pts.length) {
              if (this.hulls[pi].includes(next)) {
                finished = true;
              } else {
                this.hulls[pi].push(next);
                current = next;
                index = 0;
                next = leftmost;
              }
            }
          }
        }
      });
    }
  }

  show() {
    this.stuff.forEach((bit) => {
      bit.attract(this.foc1);
      bit.attract(this.foc2);

      this.stuff.forEach((other) => {
        if (other != bit) {
          bit.repel(other.pos);
        }
      });

      bit.update();
      bit.show();
    });

    fill(95, 100, 30, 100);
    noStroke();
    this.hulls.forEach((hull) => {
      beginShape();
      hull.forEach((p) => {
        vertex(p.pos.x, p.pos.y);
      });
      endShape(CLOSE);
    });

    // fill(255, 0, 0);
    // ellipse(this.foc1.x, this.foc1.y, 20, 20);
    // ellipse(this.foc2.x, this.foc2.y, 20, 20);
  }
}
