let particleID;
// individual particle class
let Particle = function (position, particleID) {
  //this.acceleration = dir;
  this.velocity = createVector(random(-1, 1), random(-3, 1));
  this.size = random(15, 40);
  this.position = position.copy();
  this.lifespan = 255;
  this.particleID = particleID;
}

Particle.prototype.run = function () {
  this.update();
  this.display();
}

  // Method to update position
Particle.prototype.update = function () {
  // this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 1.4;
}

  // Method to display
Particle.prototype.display = function () {
  fill(0, 0, 0, this.lifespan / 2);
  textSize(this.size);
  text(emoji[this.particleID], this.position.x, this.position.y);
}

  // Is the particle still useful?
Particle.prototype.isDead = function () {
  return this.lifespan < 0;
}


   // particle system class
let ParticleSystem = function (position, id) {
  this.origin = position.copy();
  this.particles = [];
  this.particleID = id;
}

ParticleSystem.prototype.addParticle = function () {
  this.particles.push(new Particle(this.origin, this.particleID));
}



ParticleSystem.prototype.move = function (newPos){
  this.origin = newPos;  
}

ParticleSystem.prototype.run = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run(this.particleID);
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
}