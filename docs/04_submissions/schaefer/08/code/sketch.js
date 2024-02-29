"use strict";

let num = 100;
let Particles = []
let Dnas = []
let Groups = []

var ipaddress = ""
var ip_dna = []
var particlesCreated = false

// IP Adress Fetching 

  let ipAddressPromise = new Promise((resolve, reject) => {
              fetch('https://ipinfo.io/json')
                  .then(response => response.json())
                  .then(data => {
                      const ipAddress = data.ip;
                      ipaddress = ipAddress;
                      console.log("IP Address:", ipAddress);
                      document.getElementById('ipAddress').innerText = `Mother Number (Your IP Address): ${ipAddress}`;
                      resolve(ipAddress); // Resolve the promise with the obtained IP address
                  })
                  .catch(error => {
                      console.error('Error fetching IP address:', error);
                      reject(error); // Reject the promise if there is an error
                  });
          });
          
          ipAddressPromise.then(ipAddress => {
              // Once the IP address is available, call setupParticles()
              setupParticles();
          });


  function preload() {
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);    
  }
  
  function draw() {
    background(50);
    updateParticles()
    updateGroups()
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  function setupDna(){
    const ipAddressWithoutDots = ipaddress.split('.').join('');
    ip_dna = ipAddressWithoutDots.split('').map(Number);
    print(ip_dna)
  }

  function setupParticles(){
    //  init Particles 
    setupDna();
    for(let i = 0; i< num;i++){
      let rx = random(windowWidth)
      let ry = random(windowHeight)
      //randomSeed(i)
      Dnas[i] = new Dna(ip_dna)
      
      Particles[i] = new Particle(createVector(rx,ry),i,Dnas[i].generateGenes())
      
    }
    particlesCreated = true
  }

  function updateParticles(){
    if(particlesCreated===true){
      for(let i = 0; i< Particles.length;i++){
        Particles[i].update()
        Particles[i].checkOtherParticles(Particles,Groups)
        if (mouseIsPressed === true) {     
        Dnas[i].pos = Particles[i].pos
        Dnas[i].visualize()
        }
      }
    }
  }

  function updateGroups(){
    for(let i = 0; i< Groups.length;i++){
      Groups[i].update()
    }
  }

 function onScreen(v){
  return v.x>= 0 && v.x <=windowWidth && v.y>=0 && v.y <=windowHeight
 }

 function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function exponentialCurve(x) {
  // Choose a suitable value for 'a' to control the shape of the curve
  const a = 2; // You can adjust this value to change the curve shape
  return Math.exp(a * x) / Math.exp(a) - 1 / Math.exp(a);
}
