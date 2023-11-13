"use strict";

let num = 25;

  function preload() {
    //img = loadImage('assets/mycubes.png')
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
  }
  
  function draw() {
  
    
    circleAssignment();
    happyText();

  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }


  function onScreen(v){
    return v.x>= 0 && v.x <=windowWidth && v.y>=0 && v.y <=windowHeight
  }

  function circleAssignment(){
    let mouseV = createVector(mouseX,mouseY);
    for(let i = 0; i<num;i++){
      for(let j = 0; j<num;j++){
        stroke(0);
        let x = map(i,0,num,0,windowWidth);
        let y = map(j,0,num,0,windowHeight);
        let pos = createVector(x,y);

        // task 03.01
        circle(x, y, map(pos.dist(mouseV),0,750,75,2));
      }
    }

  }

  function happyText(){
    let mouseV = createVector(mouseX,mouseY);
    let theText = "When I see you, it makes me happy.";
    let words = theText.split(" "); // evaluates to an array of strings
    num = words.length;
    for(let i = 0; i<num;i++){
      for(let j = 0; j<num;j++){
        stroke(255);
        let x = map(i,0,num,0,windowWidth);
        let y = map(j,0,num,0,windowHeight);
        let pos = createVector(x,y);

        // task 03.02
        textSize(theText.length/i);
        text(words[i],map(pos.dist(mouseV),0,750,0,750),y)
        text(words[j],x,map(pos.dist(mouseV),0,750,750,0))

      }
    }
  }