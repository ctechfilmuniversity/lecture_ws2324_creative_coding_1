let circles = [];

function setup() {
  createCanvas(600, 600);

  // 8 circles
  for (let i = 0; i < 8; i++) {
    let circle = {
      x: width / 2,
      y: height / 2,
      radius: random(10, 50),
      offset: random(TWO_PI), // offset in radians
      speed: random(0.01, 0.04) // rotation speed
    };
    circles.push(circle);
  }
}

function draw() {
  background(0);
  noFill();
  stroke(255);

  for (let i = 0; i < circles.length; i++) {
    let angle = circles[i].offset + frameCount * circles[i].speed;
    let x = circles[i].x + cos(angle) * (100 + i * 20);
    let y = circles[i].y + sin(angle) * (100 + i * 20);
    ellipse(x, y, circles[i].radius * 2);
  }

  // orange circle with gradient
  noStroke();
  let centerColor = color(255, 165, 0);
  let outerColor = color(255, 0, 0);
  radialGradient(width / 2, height / 2, 70, centerColor, outerColor);
}

function radialGradient(x, y, radius, c1, c2) {
  for (let i = radius; i > 0; i--) {
    let inter = map(i, 0, radius, 0, 1);
    let c = lerpColor(c1, c2, inter);
    fill(c);
    ellipse(x, y, i * 2);
  }
}