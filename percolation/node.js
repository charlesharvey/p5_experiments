class Node {
  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.x = c * grid;
    this.y = r * grid;

    this.filled = false;
    this.radius = grid / 4;
    this.pipeWidth = grid / 12;
    this.onlyShowSquares = true;
    this.hue = random(20, 185);

    this.randx = random(0, 1);
    this.randy = random(0, 1);

    this.reset();
  }

  reset() {
    this.px = this.randx > prob;
    this.py = this.randy > prob;
    this.ancestor_hue = null;
    this.filled = false;
  }

  flood(opts = null) {
    if (opts) {
      if (opts.ancestor) {
        this.ancestor_hue = opts.ancestor.hue;
      } else {
        opts.ancestor = this;
      }
      if (opts.depth) {
      } else {
      }
    } else {
      opts = {};
      opts.depth = -1;
      opts.ancestor = this;
    }

    this.filled = true;

    const nr = this.r - 1;
    const nc = this.c;
    const north = nodes.find(
      (o) => o.r === nr && o.c === nc && o.filled == false
    );

    const er = this.r;
    const ec = this.c + 1;
    const east = nodes.find(
      (o) => o.r === er && o.c === ec && o.filled == false
    );

    const sr = this.r + 1;
    const sc = this.c;
    const south = nodes.find(
      (o) => o.r === sr && o.c === sc && o.filled == false
    );

    const wr = this.r;
    const wc = this.c - 1;
    const west = nodes.find(
      (o) => o.r === wr && o.c === wc && o.filled == false
    );

    // if (opts.depth <= maxDepth) {
    // }

    if (north) {
      if (north.py) {
        north.flood({ ancestor: opts.ancestor });
      }
    }
    if (east) {
      if (this.px) {
        east.flood({ ancestor: opts.ancestor });
      }
    }
    if (south) {
      if (this.py) {
        south.flood({ ancestor: opts.ancestor });
      }
    }
    if (west) {
      if (west.px) {
        west.flood({ ancestor: opts.ancestor });
      }
    }

    // return (
    //   north !== undefined ||
    //   west !== undefined ||
    //   south !== undefined ||
    //   east !== undefined
    // );
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
