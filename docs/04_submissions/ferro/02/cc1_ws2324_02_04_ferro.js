let SPACING =50;
let PROBABILITY = 0.5;


function setup() {
  createCanvas(500,500);
  background(220);
 }

function draw() {
  
  for (let y = 0; y < width; y += SPACING ){
    
   for (let x = 0; x < height; x += SPACING){
     
     if (random(1) <  PROBABILITY){
      arc(x + SPACING/2 , y + SPACING/2, SPACING, SPACING,HALF_PI, - HALF_PI, CHORD);
      if(mouseIsPressed){
       fill(mouseX, mouseY, random(255)); 
        }

   else{
      arc(x + SPACING/2, y + SPACING/2, SPACING, SPACING,- HALF_PI,HALF_PI, CHORD);
      if(mouseIsPressed){
       fill(mouseX, mouseY, random(255)); 
        }
      else{
       fill(0,0,0);    
     }
   }
   }
  }
} 
}
  

