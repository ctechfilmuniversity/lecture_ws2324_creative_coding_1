let SPACE = 20;
let font;
let COLORS = [  "#F01A52"," #F590CD", "#1723F3", "#EBD8DA"];

function preload() {
  //Creates a p5.Font object.
  font = loadFont("font2.otf");
}

function setup() {
  createCanvas(800, 800);
  //noLoop();
}

function draw() {
  noCursor();
  background("#000000");

  //nested for Loop for creating the grid
  for (let y = 0; y < width; y += SPACE) {
    for (let x = 0; x < height; x += SPACE) {
      
      //noStroke();
      noFill();

      //chose a random character from the list
      let CHARACTERS = ["*", "+", "." ];
      let CHARACTER = random(CHARACTERS);

      //Change text size depending on mouseX and clamp (thank you ChatGPT!)
      let textSizeValue = map(mouseX, 0, width, 10, 80);
      textSizeValue = max(10, min(textSizeValue, 80));

      
      
      //create text
      textSize(textSizeValue);
      fill(random(COLORS));
      textFont(font);
      textAlign(CENTER);
      text(CHARACTER,x,y);
      
      //custom curser
      fill("#9EFF5F");
      noStroke();
      textSize(50);
      text("+", mouseX, mouseY);
      
      //instructions
  fill("#F3F3F4");
  rect(0, 0, 800, 50);
  textSize(20);
  fill("#14110F");
  textFont(font);
  textAlign(LEFT);
  text("move mouse to change size", 10, 25);
  text("scroll to chnage spacing",10, 40);
    }
  }
}


// This function is called whenever the mouse wheel is scrolled
function mouseWheel(event) {
  // Change SPACE based on the wheel delta
  SPACE += event.deltaY * 0.01;
  // Constrain SPACE to a reasonable range to prevent it from getting too small or too large
  SPACE = constrain(SPACE, 20, 60);

  
}
