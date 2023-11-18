let video;
let detector;
let detections = [];
let emoji = []; 
let systems = [];

function preload() {
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  detector.detect(video, gotDetections);

  // instanciate particle systems//
  system0 = new ParticleSystem(createVector(-100, -100), 0);
  system1 = new ParticleSystem(createVector(-100, -100), 1);
  system2 = new ParticleSystem(createVector(-100, -100), 2);
  system3 = new ParticleSystem(createVector(-100, -100), 3);
  systems = [system0, system1, system2, system3];
}


function draw() {
  image(video, 0, 0);

  for (let i = 0; i < detections.length; i++) {
    if (detections.length <= systems.length){ //once all systems have been initiated, do not load new ones
      let object = detections[i];
      let objectLabelNoStrings = object.label.replaceAll(' ',"");
    
    // get emojis from library
      emoji[i] = emojs[objectLabelNoStrings];

      // rund and move particle system
      let pos = createVector(object.x + object.x/2, object.y + object.y/2);
      if (frameCount % 2 == 0) {
        systems[i].addParticle();
      }
      systems[i].run();
      //systems[i].run(emoji[0]);
      systems[i].move(pos); 
      console.log("i "+i+": "+object.label +" & emoji "+i+ "= " + emoji[i]);
    }
    
    

    /* //rectangle and text
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label + " "+emoji, object.x + 10, object.y + 24);
    */
  }
}