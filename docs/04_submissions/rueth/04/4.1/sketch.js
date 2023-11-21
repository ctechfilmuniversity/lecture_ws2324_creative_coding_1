//LASER POINTER CAT TO MAKE YOU SMILE

let x = 100,
  y = 100,
  angle1 = 0.0,
  segLength = 150;

let cat;

function preload() {
  cat = loadImage('Cat2.png');
}

function setup() {
  createCanvas(700, 700);
  noCursor(); 
}

function draw() {
  background(0);
  imageMode(CENTER);

  dx = mouseX - x;
  dy = mouseY - y;
  angle1 = atan2(dy, dx);
  x = mouseX - cos(angle1) * segLength;
  y = mouseY - sin(angle1) * segLength;

  segment(x, y, angle1);
  
  strokeWeight(70.0);
  stroke(240, 20);
  fill(255, 0, 0); 
  ellipse(mouseX, mouseY, 15, 15); //red circle
  
  noStroke();
  fill(255); 
  textSize(30);
  textAlign(LEFT, TOP);
  text("PLAY WITH YOUR CAT", 15, 15); //Text
  
}

function segment(x, y, a) {
  push();
  translate(x, y);
  let imageRotation = atan2(mouseY - y, mouseX - x);
  rotate(imageRotation);
  image(cat, 0, 0, 200, 160);
  pop();
}