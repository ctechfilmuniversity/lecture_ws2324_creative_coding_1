// variables for center movement
let pX = [0, 0, 0, 0, 0];
let pY = [0, 0, 0, 0, 0];
let sX = [0, 0, 0, 0, 0];
let sY = [0, 0, 0, 0, 0];

// variables for emitter movement and particle acceleration
let cX = [0, 0, 0];
let cY = [0, 0, 0];
let thX = [0, 0, 0];
let thY = [0, 0, 0];
let dirX = [0, 0, 0];
let dirY = [0, 0, 0];

let spwnDist = 50; // distance from walls for spawning movement-points
let spwnSpeed = 6; // speed of the movement points
let radius = 120; // radius for emitter`s rotation
let z = 1.3; // rotation speedeYemitters
let n = 20; // direction multiplyer
let x, y;
let angle = 0;

let words = [];
let b, c, d, e;
let bubbles;
/*
//nose
let video;
let poseNet; 
let poses = [];
let skeletons = [];
let pg;
let noseX;
let noseY;

function preload(){
  poseNet = ml5.poseNet(video, modelReady);
}
*/

function preload() {
  bubbles = loadSound("bubbles.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255, 100, 100, 30);
  angleMode(DEGREES);

  // set all movement variables to random values
  for (let i = 0; i < 5; i++) {
    pX[i] = random(spwnDist, width - spwnDist);
    pY[i] = random(spwnDist, height - spwnDist);
    sX[i] = random(-spwnSpeed, spwnSpeed);
    sY[i] = random(-spwnSpeed, spwnSpeed);
  }

  // set starting point for central circle
  x = width / 2;
  y = height / 2;

  // instanciate particle system
  system1 = new ParticleSystem(createVector(-50, -50));
  system2 = new ParticleSystem(createVector(-50, -50));
  system3 = new ParticleSystem(createVector(-50, -50));
  /*  
  // nose
  video = createCapture(VIDEO);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  */

  textSize(32);
  words = [
    "round ",
    "blob ",
    "turn ",
    "bubble ",
    "click ",
    "keep ",
    "many ",
    "bubble ",
    "create ",
    "circle ",
    "make ",
    "fun ",
    "happy ",
  ];
  b = Math.round(random(0, 12));
  c = Math.round(random(0, 12));
  d = Math.round(random(0, 12));
  e = Math.round(random(0, 12));
  bubbles.play();
}

function draw() {
  background(255, 30, 255, 100);
  fill(150, 80, 40, 100, 30);
  stroke(180, 30, 100, 100);
  strokeWeight(2);
  strokeWeight(1);

  // add movement and bounce to points
  for (let k = 0; k < 5; k++) {
    pX[k] = pX[k] + sX[k];
    pY[k] = pY[k] + sY[k];
    if (pX[k] < 0 || pX[k] > width) {
      sX[k] *= -1;
    }
    if (pY[k] < 0 || pY[k] > height) {
      sY[k] *= -1;
    }
  }

  // draw center circle and smooth out movement
  let centerX = (pX[0] + pX[1] + pX[2] + pX[3] + pX[4]) / 5;
  let centerY = (pY[0] + pY[1] + pY[2] + pY[3] + pY[4]) / 5;
  x = lerp(x, centerX, 0.02);
  y = lerp(y, centerY, 0.02);
  circle(x, y, 5);
  fill(150, 80, 40, 5, 30);
  circle(x, y, 50);
  fill(150, 80, 40, 4, 30);
  circle(x, y, 100);

  // draw emitters
  for (let p = 0; p < 3; p++) {
    cX[p] = x + radius * cos(angle + p * 120);
    cY[p] = y + radius * sin(angle + p * 120);
    fill(150, 80, 40, 60, 30);
    ellipse(cX[p], cY[p], 20);
  }

  // rotate emitters
  angle = angle + z;

  // draw movement points
  for (let m = 0; m < 5; m++) {
    fill(250, 80, 120, 7, 5);
    stroke(250, 30, 100, 20);
    ellipse(pX[m], pY[m], 15);
  }

  // draw dotted lines to movement-points
  for (let o = 0; o < 5; o++) {
    for (let n = 0; n < 1; n += 0.05) {
      stroke(250, 80, 120, 7, 50);
      strokeWeight(3);
      point(lerp(x, pX[o], n), lerp(y, pY[o], n));
    }
  }

  //spawn particles
  if (frameCount % 2 == 0) {
    system1.addParticle();
    system2.addParticle();
    system3.addParticle();
  }
  // calculate acceleration direction
  for (let r = 0; r < 3; r++) {
    let q = [thX[r], thY[r]];
    dirX[r] = cX[r] - q[0];
    dirY[r] = cY[r] - q[1];
    thX[r] = cX[r];
    thY[r] = cY[r];
  }

  // run & move systems and feed locations and directions
  system1.run();
  system2.run();
  system3.run();
  system1.move(
    createVector(cX[0], cY[0]),
    createVector(dirX[0] * n, dirY[0] * n)
  );
  system2.move(
    createVector(cX[1], cY[1]),
    createVector(dirX[1] * n, dirY[1] * n)
  );
  system3.move(
    createVector(cX[2], cY[2]),
    createVector(dirX[2] * n, dirY[2] * n)
  );
  /*
    // nose
    drawKeypoint();
    */

  fill(150, 80, 120, 7, 5);
  stroke(250, 30, 100, 20);
  ellipse(mouseX, mouseY, 20);
  if (mouseX - x < 50 && mouseX - x > -50) {
    if (mouseY - y < 50 && mouseY - y > -50) {
      fill(100, 80, 120, 20, 5);
      stroke(250, 30, 100, 20);
      ellipse(mouseX, mouseY, 20);
      if (mouseIsPressed) {
        let a = words[b] + words[c] + words[d] + words[e] + "!";
        fill(100, 80, 120, 100, 5);
        text(a, 100, 100);
      }
    }
  }
  if (bubbles.isPlaying()) {
  } else {
    bubbles.play();
  }
}

function mouseReleased() {
  b = Math.round(random(0, 12));
  c = Math.round(random(0, 12));
  d = Math.round(random(0, 12));
  e = Math.round(random(0, 12));
}

/*

// A function to draw ellipses over the detected keypoints
function drawKeypoint() {
  // Loop through all the poses detected
  for (let i = 0; i < min(poses.length, 1); i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        if (j == 0) {
          noseX = keypoint.position.x;
          noseY = keypoint.position.y;
          stroke(250, 80, 120, 7, 50);
          strokeWeight(3);
          pg.ellipse(noseX, noseY, 10);
          print(noseX, noseY);
        }
      }
    }
  }
}

// The callback that gets called every time there's an update from the model
function gotPoses(results) {
  poses = results;
}

function modelReady() {
  select("#status").html("model Loaded");
}
*/
