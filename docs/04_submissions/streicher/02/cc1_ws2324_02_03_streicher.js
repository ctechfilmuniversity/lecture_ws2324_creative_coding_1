
// the probabillity of circles or rectangles beeing drawn is on a scale between 0 and 2

let probabillity = 1;
let spacing = 20;
let seed;
let diameter;
let moduleAlpha = 180;
let maxDistance = 25;

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(1);
  seed = 5 + random(10);
  ellipseMode(CORNER);
}

function draw() {
  background(240, 255, 240, seed);
  stroke(0, 0, 0, diameter * seed);

  for (let gridY = 0; gridY < width; gridY += spacing) {
    for (let gridX = 0; gridX < height; gridX += spacing) {
      diameter = dist(mouseX, mouseY, gridX, gridY);
      diameter = diameter / maxDistance;
      push();
      translate(gridX, gridY, diameter * 5);
      let floatNr = (gridX * gridY) / seed;
      if (floatNr % 2 > probabillity) {
        ellipse(0, 0, diameter, diameter);
      } else {
        rect(0, 0, diameter, diameter);
      }
      pop();
    }
  }
}