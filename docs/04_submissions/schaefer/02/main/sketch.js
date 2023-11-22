"use strict";

var capture
var poseNet
var poses = []
let num = 100;
let Particles = []
var img

  function preload() {
    //img = loadImage('assets/mycubes.png')
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    //img.resize(windowWidth,windowHeight)

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
    //background(255,15);
    image(capture,0,0,windowWidth, windowWidth * capture.height / capture.width);
    //image(img,0,0)
    //updateParticles()
    drawShapes()   
    
    if (mouseIsPressed === true) {
      line(mouseX, mouseY, pmouseX, pmouseY)
      //colorParticlesFromImage(img)
      //save("staticPattern.png")
      for(let i in Particles){
        //Particles[i].setPos(createVector(random(windowWidth),random(windowHeight)))
        //Particles[i].drawLines(createVector(random(windowWidth),random(windowHeight)))

      }
    }

  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  function drawShapes() {
    for (var i = 0; i < poses.length; i++) {
      var currentPose = poses[i].pose
      for (var j = 0; j < currentPose.keypoints.length; j++) {
        var keypoint = currentPose.keypoints[j]

        if (keypoint.score > 0.2 ) {
          for(let i = 0; i< num;i++){     
            if(random(1)>0.8){
              //Particles[i].drawLines(createVector(keypoint.position.x,keypoint.position.y))
              circle(keypoint.position.x,keypoint.position.y,50,50)
            }
          }
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
    }
  }



 function onScreen(v){
  return v.x>= 0 && v.x <=windowWidth && v.y>=0 && v.y <=windowHeight
 }