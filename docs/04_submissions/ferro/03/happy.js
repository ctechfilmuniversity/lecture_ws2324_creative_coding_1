let video;

function setup() {
  createCanvas(windowWidth,windowHeight);

  // video input
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

function draw() {
background(255);

  //set the size of the grid
let gridSize = 35;
 
// get every pixel from the video input
video.loadPixels();
  
  for (let y = 0; y < video.height; y+= gridSize) {
    for (let x = 0; x < video.width; x+= gridSize) {
 
  // create a circle for every pixel
    let index = (y * video.width + x) * 4;
    
      // set the size according to the brightness
      let r = video.pixels[index];
      let dia = map(r,0,255, gridSize,2);
      
      fill(255,200,0);
      noStroke();
      circle(x,y,dia);
 
    // smily or not smily face depending on the size of the circle
      if (dia > 20 ){
      noFill(); 
      stroke(2);
      arc(x+dia/6,y-3,dia/4,dia/4,radians(180),radians(360));
      arc(x-dia/6,y-3,dia/4,dia/4,radians(180),radians(360));
      arc(x,y+dia/10,dia/1.5,dia/2,radians(360),radians(180)); 
      }
      else{
        
      
      noFill(); 
      stroke(2);
      arc(x+dia/6,y-3,dia/4,dia/4,radians(180),radians(360));
      arc(x-dia/6,y-3,dia/4,dia/4,radians(180),radians(360));
      arc(x,y+dia/4,dia/1.5,dia/2,radians(180),radians(360));
        }
    }
  }
}