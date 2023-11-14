//Using p5js and p5js.sound 

let soundSource;
let isPlaying = false;
let fft;  
let circles = [];
let colorChangeSpeed = 0.3; // Adjust the speed of color change

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  soundSource = loadSound("lecture_ws2324_creative_coding_1/docs/04_submissions/huson/03/circles/xenons-honeybaby-frankocean.mp3");
  fft = new p5.FFT(); //fast fourier transform
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  translate(windowWidth / 2, windowHeight / 2); //so that everything is calculated from the middle of the screen

  var wave = fft.waveform(); 

  for (let t = -1; t <= 1; t += 2) { //mirror the waveforms to get a full circle 
    beginShape();
    for (var i = 0; i <= 180; i++) {
      var index = floor(map(i, 0, 180, 0, wave.length - 1)); //map degrees to waveform index, so that we can represent the entire wave 
      var r = map(wave[index], -1, 1, 150, 350); //calculate radius 
      var x = r * sin(i) * t; //t = 1: right side of the circle, t = -1: left side of the circle 
      var y = r * cos(i); 

      colorMode(HSB); 
      
      let hue = (frameCount/2 * colorChangeSpeed + i) % 360; // calculate a changing hue based on frameCount and position

      // Set the fill color and stroke to be the same 
      fill((hue + 100) % 360, 60, 90, 60); 
      stroke((hue + 100) % 360, 60, 90, 60);

      ellipse(x, y, 30, 30);
    }
    endShape();
  }
}

function keyPressed() { //start and stop music and visuals 
  if (keyIsPressed) {
    if (isPlaying) {
      soundSource.pause();
      noLoop();
    } else {
      soundSource.play();
      loop();
    }
    isPlaying = !isPlaying;
  }
}

//Code based on "Code an Audio Visualizer in p5js (from scratch) | Coding Project #17" https://www.youtube.com/watch?v=uk96O7N1Yo0, I used ChatGPT to tweak the color transitions 
