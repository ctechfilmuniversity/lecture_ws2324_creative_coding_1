let mainCircle;
let movingCircles = []; // array for the small circles

function setup() {
  createCanvas(600, 600);
  noFill();
}

function draw() {
  background(220);

  // Display the main circle
  if (mainCircle) {
    noFill();
    stroke(0);
    ellipse(mainCircle.x, mainCircle.y, mainCircle.diameter);
  }

  // Move and display the moving circles
  for (let i = 0; i < movingCircles.length; i++) {
    movingCircles[i].move();
    movingCircles[i].display();
  }
}

 // Create the main circle on mouse click
function mouseClicked() {
  mainCircle = {
    x: mouseX,
    y: mouseY,
    diameter: random(150, 300)
  };

  // Create five moving circles around the circumference
  for (let i = 0; i < 5; i++) {
    let angle = (i / 5) * TWO_PI; // Divide the circle into 5 parts
    let x = mainCircle.x + cos(angle) * mainCircle.diameter / 2; // center the circles to circunference of the big circle
    let y = mainCircle.y + sin(angle) * mainCircle.diameter / 2;
    let diameter = random(20, 50); // assign a random diameter
    let speed = random(1, 3); //assign a random speed
    let color = randomColor(); //assign a random color

    movingCircles.push(new MovingCircle(x, y, diameter, speed, color));
  }
}

  // Generate a random color
function randomColor() {
  return color(random(255), random(255), random(255));
}
class MovingCircle {
  constructor(x, y, diameter, speed, color) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.speed = speed;
    this.angle = atan2(y - mainCircle.y, x - mainCircle.x);
    this.color = color;
  }

      // Move along the circumference of the main circle
  move() {
    this.angle += this.speed * 0.01;
    this.x = mainCircle.x + cos(this.angle) * mainCircle.diameter / 2;
    this.y = mainCircle.y + sin(this.angle) * mainCircle.diameter / 2;
  }

    // Display the moving circle with a random fill color
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.diameter);
  }
}