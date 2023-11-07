let cols = 10; 
let rows = 10; 
let spacing = 40; 
let squareColor;

function setup() {
  createCanvas(400, 400);
  ellipseMode(CENTER);
  squareColor = color(0, 150, 200, 100);
}

function draw() {
  background(0);
  let squareSize = map(noise(frameCount * 0.02), 0, 1, 10, 60);
  rectMode(CENTER);

  // nested loops to create the grid  --> for the nested loop I got help from ChatGPT
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * spacing + 20; // Offset by 20 pixels for margin
      let y = j * spacing + 20; // Offset by 20 pixels for margin

      // squares
      fill(squareColor);
      square(x, y, squareSize);

      // ellipse
      fill(255, 159, 0);
      noStroke();

      let ellipseSize = map(mouseX, 0, width, 5, 50);
      ellipse(x, y, ellipseSize, ellipseSize);
    }
  }
}

//Change the color of the squares

function mousePressed() { 
  if (mouseButton === LEFT) {
    squareColor = color(random(255), random(255), random(255), 150);
  }
}
