"use strict";

var capture
var poseNet
var poses = []
let num = 100;
let Particles = []
var img

  function preload() {
    img = loadImage('assets/mycubes.png')
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    img.resize(windowWidth,windowHeight)
	  setupParticles();

    // Posenet Stuff
    capture = createCapture(VIDEO)
    capture.size(windowWidth, windowWidth * capture.height / capture.width)
    capture.hide();
    poseNet = new ml5.poseNet(capture, modelReady)
    poseNet.on('pose', function(results) {
      poses = results
    })
  }
  
  function draw() {
    //background(255);
    //image(capture,0,0,windowWidth, windowWidth * capture.height / capture.width);
    //image(img,0,0)
    updateParticles()
    drawShapes()   
    
    if (mouseIsPressed === true) {
      line(mouseX, mouseY, pmouseX, pmouseY)
      colorParticlesFromImage(img)
      for(let i in Particles){
        Particles[i].setPos(createVector(random(windowWidth),random(windowHeight)))
      }
    }

  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  function drawShapes() {
    // first, we need to loop through all of the available poses
    // that have been detected in the image
    for (var i = 0; i < poses.length; i++) {
      var currentPose = poses[i].pose
      // we are now looping through the ARRAY of keypoints for
      // this pose, and check each keypoint until we find the leftEye
      for (var j = 0; j < currentPose.keypoints.length; j++) {
        var keypoint = currentPose.keypoints[j]
        // once we find the leftEye AND our confidence score is
        // reasonably high, we're gonna draw a pink circle over it!
        if (keypoint.part === "nose" && keypoint.score > 0.2 ) {
          //fill("magenta")
          //noStroke()
          for(let i = 0; i< num;i++){     
            if(random(1)>0.8){
            Particles[i].drawLines(createVector(keypoint.position.x,keypoint.position.y))
            }
          }

          //ellipse(keypoint.position.x*2.5, keypoint.position.y*1.6, 20, 20)
        }
      }
    }
  }
  
  function modelReady() {
    console.log("Model ready!")
  }

  function setupParticles(){
    //  init Particles 
    for(let i = 0; i< num;i++){
      let rx = random(windowWidth)
      let ry = random(windowHeight)
      Particles[i] = new Particle(createVector(rx,ry),random(30))
    }
  }

  function updateParticles(){
    for(let i = 0; i< num;i++){
      Particles[i].update()
      //Particles[i].drawLines(createVector(mouseX,mouseY))
    }
  }

 function colorParticlesFromImage(_img){
  for(let i = 0; i< num;i++){
    Particles[i].setColor(_img.get(Particles[i].getPos().x,Particles[i].getPos().y))
  }
 }

 function onScreen(v){
  return v.x>= 0 && v.x <=windowWidth && v.y>=0 && v.y <=windowHeight
 }