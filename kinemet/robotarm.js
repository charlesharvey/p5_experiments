// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/RTc6i-7N3ms
// Transcribe to Javascript: Chuck England

class RobotArm {
  constructor(x, y, numSegs, segLen, angle) {
    this.base = createVector(x, y);
    this.segs = [];
    this.xoff = random(10000);
    this.yoff = random(10000);
    this.segLen = segLen;
    this.segs[0] = new Segment(x, y, segLen, angle, 0);
    for (let i = 1; i < numSegs; i++) {
      this.addSegment(segLen, 0, i + 1);
    }
  }

  addSegment(len, angle) {
    let c = this.segs[this.segs.length - 1];
    let s = new Segment(0, 0, len, angle, this.segs.length);
    c.parent = s;
    this.segs.push(s);
    s.follow(c.a.x, c.a.y);
    return s;
  }

  wind() {}

  update() {
    for (let i = 0; i < this.segs.length; i++) {
      const seg = this.segs[i];
      seg.update();
      if (i === 0) {
        // seg.follow(mouseX, mouseY);
        const nx = noise(this.xoff);
        const ny = noise(this.yoff);
        const x = map(nx, 0, 1, 0, width);
        const y = map(ny, 0, 1, 0, height);
        seg.follow(x, y);
      } else {
        const previous = this.segs[i - 1];
        seg.follow(previous.a.x, previous.a.y);
      }

      this.xoff += 0.0001;
      this.yoff += 0.0001;
    }

    const last = this.segs.length - 1;
    const s = this.segs[last];
    s.a.x = this.base.x;
    s.a.y = this.base.y;
    s.reCalculate();
    for (let i = last - 1; i >= 0; i--) {
      const seg = this.segs[i];
      const next = this.segs[i + 1];
      seg.a.x = next.b.x;
      seg.a.y = next.b.y;
      seg.reCalculate();
    }
  }

  show() {
    this.segs.forEach((s) => s.show());
  }
}
