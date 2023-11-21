let bg;
let pizza;
let mozz;
let pros;
let olives;
let basil;
let sal;
let sauce;

let gui;

// Create a variable for your Toggle
let startBut;
let finishBut;

let sauceBut;
let mozzBut;

let salBut;
let prosBut;

let oliveBut;
let basBut;

function preload() {
  pizza = loadImage("Pizza_Dough.png");
  mozz = loadImage("Mozarella_group.png");
  pros = loadImage("Prosciutto_group.png");
  sauce = loadImage('Sauce.png');
  olives = loadImage("Olives_group.png");
  basil = loadImage("Basil_Group.png");
  sal = loadImage('Salami_group.png')
}

function setup() {
  //noLoop();

  gui = createGui();


  // Create Toggle
  startBut = createToggle("Start", 30, 30, 100, 50);
  
  
  
  sauceBut = createToggle("Sauce", 150, 530, 100, 50);
  mozzBut = createToggle("Mozzarella", 270, 530, 100, 50);
  
  salBut = createToggle("Salami", 390, 530, 100, 50);
  prosBut = createToggle("Prosciutto", 510, 530, 100, 50);
  
  oliveBut = createToggle("Olive", 630, 530, 100, 50);
  basilBut = createToggle("Basilico",750, 530, 100, 50);
  
// load the background image
  bg = loadImage("Tischhintergrund.png");
  createCanvas(1000, 600);
}

function draw() {
  background(bg);
  //  imageMode(CENTER);
 
  drawGui();

  
// let's start the pizza!
  
 if(startBut.val){
   startBut.labelOn = "Re-do";
   image(pizza, 130, 0, 750, 500);

}

  // re-do the pizza
if (startBut.val == false){
  sauceBut.val = false;
  mozzBut.val = false;
  salBut.val = false;
  prosBut.val = false;
  oliveBut.val = false;
  basilBut.val = false;
}
  
 if(sauceBut.val){
    image(sauce,157,-10,750,500);  
 }
  
 if(mozzBut.val){
    image(mozz,150,0,750,500)
  }
   
 
if(salBut.val){
  image(sal,150,0,750,500)
}

  if(oliveBut.val){
    image(olives,150,0,750,500)
  }

   
  if(prosBut.val){
    image(pros,150,0,750,500)
  }
  
  if(basilBut.val){
    image(basil,150,0,750,500)
  }
  
}
  
/// Add these lines below sketch to prevent scrolling on mobile
function touchMoved() {
  // do some stuff
  return false;
}