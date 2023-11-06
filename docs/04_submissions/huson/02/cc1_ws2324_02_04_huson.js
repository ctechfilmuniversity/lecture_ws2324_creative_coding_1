var stepSize = 30;
var circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  for (var y = 0; y <= windowHeight; y += stepSize) {
    for (var x = 0; x <= windowWidth; x += stepSize) {
      var randomSize;
      if (y <= 90) {
        //top layer, greens "vegetation"
        randomSize = int(random(8, 40));
        fill(random(30, 80), random(150, 255), random(15, 50));
      } else if (y >= 90 && y <= 600) {
        //middle layer, browns "soil"
        randomSize = int(random(30, 60));
        fill(random(70, 110), random(30, 60), 0);
      } else {
        //bottom layer, reds "lava"
        randomSize = int(random(50, 80));
        fill(random(100, 255), random(0, 5), random(0, 5));
      }
      ellipse(x, y, randomSize, randomSize);
      circles.push([x, y, randomSize, randomSize]);
    }
  }
}

function draw() {
  if (mouseIsPressed) {
    pressCircle(circles);
  }
  if (keyIsPressed == true) {
    text("🍄", random(0, windowWidth), random(0, windowHeight));
  }
}

function sameSizeSingle(circleArray, singleCircle) {
  //find all circles in circleArray that match singleCircle's size
  for (var i = 0; i < circleArray.length; i++) {
    if (singleCircle[2] == circleArray[i][2]) {
      //set stroke color and weights depending on layer: 
      if (mouseY <= 90) { 
        stroke(0, 30 + i / 5, 0); 
        strokeWeight(13);
      } else if (mouseY > 90 && mouseY < 600) {
        stroke(50 + i / 6, 50 + i / 12, 0);
        strokeWeight(7);
      } else {
        stroke(255 - i / 8, 0, 0);
        strokeWeight(5);
      }

      line( //draw a line between singleCircle and circleArray[i] that matches in size 
        singleCircle[0],
        singleCircle[1],
        circleArray[i][0],
        circleArray[i][1]
      );
    }
  }
}

function findCircle(circleArray, circleXY) {
  var foundCircle;
  for (var i = 0; i < circleArray.length; i++) {
    if (circleArray[i][0] == circleXY[0] && circleArray[i][1] == circleXY[1]) { 
      //if X,Y coordinates are the same:
      foundCircle = circleArray[i];
    }
  }
  return foundCircle;
}

function pressCircle(circleArray) {
  var x = mouseX - (mouseX % stepSize); //find the nearest X circle coordinate of the mouse
  var y = mouseY - (mouseY % stepSize); //find the nearest Y circle coordinate of the mouse

  var singleCircle = findCircle(circleArray, [x, y]); //since instantiated p5js ellipses have no properties, we need to find ellipses "manually" 
  sameSizeSingle(circleArray, singleCircle);
}