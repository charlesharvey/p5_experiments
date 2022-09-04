class Node {
  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.x = r * grid;
    this.y = c * grid;

    this.radius = grid / 4;
    this.pipeWidth = grid / 12;
    this.onlyShowSquares = true;
    this.hue = random(0, 255);

    this.reset();
  }

  reset() {
    this.px = random(0, 1) > prob;
    this.py = random(0, 1) > prob;
    this.ancestor_hue = null;
    this.filled = false;
  }

  flood(ancestor = null) {
    this.filled = true;

    if (ancestor) {
      this.ancestor_hue = ancestor.hue;
    } else {
      ancestor = this;
    }

    const nr = this.r;
    const nc = this.c - 1;
    const north = nodes.find((o) => o.r === nr && o.c === nc);

    const er = this.r - 1;
    const ec = this.c;
    const east = nodes.find((o) => o.r === er && o.c === ec);

    const sr = this.r;
    const sc = this.c + 1;
    const south = nodes.find((o) => o.r === sr && o.c === sc);

    const wr = this.r + 1;
    const wc = this.c;
    const west = nodes.find((o) => o.r === wr && o.c === wc);

    if (north) {
      if (north.py && !north.filled) {
        north.filled = true;
        north.flood(ancestor);
      }
    }
    if (east) {
      if (east.px && !east.filled) {
        east.filled = true;
        east.flood(ancestor);
      }
    }
    if (south) {
      if (this.py && !south.filled) {
        south.filled = true;
        south.flood(ancestor);
      }
    }
    if (west) {
      if (this.px && !west.filled) {
        west.filled = true;
        west.flood(ancestor);
      }
    }
  }

  show() {
    const h = this.ancestor_hue ? this.ancestor_hue : this.hue;

    if (this.onlyShowSquares) {
      if (this.filled) {
        noStroke();
        fill(h, 190, 220);
        rect(this.x, this.y, grid, grid);
      }
    } else {
      push();
      translate(grid * 0.5, grid * 0.5);

      strokeWeight(this.pipeWidth);
      if (this.filled) {
        stroke(h, 190, 220);
      } else {
        stroke(0, 0, 120);
      }

      if (this.px) {
        line(this.x, this.y, this.x + grid, this.y);
      }
      if (this.py) {
        line(this.x, this.y, this.x, this.y + grid);
      }

      // BULB
      noStroke();
      if (this.filled) {
        fill(h, 190, 220);
      } else {
        fill(0, 0, 200);
      }
      ellipse(this.x, this.y, this.radius, this.radius);
      pop();
    }
  }
}
