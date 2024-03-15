const vidWidth = 360;
const vidHeight = 360;

const theta_d = 0.04;
const radi_d = 5;

// https://twitter.com/fubiz/status/1725519415611953418

function setup() {
  createCanvas(vidWidth * 2, vidHeight);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(vidWidth, vidHeight);
  video.hide();
}

function draw() {
  background(255);
  if (video.loadedmetadata) {
    video.loadPixels();
    // loadPixels();
    // for (let y = 0; y < vidWidth; y++) {
    //   for (let x = 0; x < vidHeight; x++) {
    //     let i = (y * vidWidth + x) * 4;
    //     let r = video.pixels[i];
    //     let g = video.pixels[i + 1];
    //     let b = video.pixels[i + 2];
    //     pixels[i] = r;
    //     pixels[i + 1] = g;
    //     pixels[i + 2] = b;
    //     pixels[i + 3] = 255;
    //   }
    // }

    for (let r = 2; r < vidWidth; r += radi_d) {
      for (let theta = 0; theta < TWO_PI; theta += theta_d) {
        const x1 = sin(theta) * r + vidWidth / 2;
        const y1 = cos(theta) * r + vidHeight / 2;
        const newtheta = theta + theta_d;
        const x2 = sin(newtheta) * r + vidWidth / 2;
        const y2 = cos(newtheta) * r + vidHeight / 2;

        let i = (floor(y1) * vidWidth + floor(x1)) * 4;
        let re = video.pixels[i];
        let gr = video.pixels[i + 1];
        let bl = video.pixels[i + 2];
        let bri = (re + gr + bl) / 3;
        let w = map(bri, 0, 255, 7, 0);

        noFill();
        stroke(120);
        strokeWeight(w);
        line(x1, y1, x2, y2);
      }
    }

    // updatePixels();
    image(video, width / 2, 0);
  }
}
