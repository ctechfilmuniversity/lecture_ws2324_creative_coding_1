//Using p5js and ml5 

let video;
let mobileNet; 
let label = '';
let happySound;
let milliseconds;

function setup() {
    createCanvas(windowWidth, windowHeight);
    happySound = loadSound("lecture_ws2324_creative_coding_1/docs/04_submissions/huson/03/happy/happy-happy-happy.mp3");
    video = createCapture(VIDEO); //webcam feed
    video.hide(); 

    mobileNet = ml5.imageClassifier('MobileNet', video, modelReady); //set ImageClassifier to continously classify the webcam feed, once the model is loaded 
}

function draw() {
    if (happySound.isPlaying()){
        background(random(240, 255), random(150, 190), random(130, 250)); //random pink(ish) background every frame 
    } else {
        background(255); 
    }
    textSize(60);
    textAlign(CENTER);
    text("I long for my kin...", windowWidth/2, 100);
    imageMode(CENTER);
    image(video, windowWidth/2, windowHeight/2); //display webcam feed in the middle of the window  

    if (label.includes("cellular telephone") || label.includes("cellular phone") || label.includes("computer")){ //if desired object predicted by mobileNet 
        wheniSeeYou(); 
    }
}

function modelReady(){
    console.log('Model is ready!');
    mobileNet.predict(gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else {
        label = results[0].label; //get an array of names of what mobileNet predicted
        mobileNet.predict(gotResult); //recursive call to continuosly predict what can be seen by the webcam 
    }
}

function wheniSeeYou(){ 
    filter(POSTERIZE, 25); 
    if (!happySound.isPlaying()){ //only start playing tune if it isn't playing 
        happySound.play();
    } 
}



//Code based on tutorials by The Coding Train 

