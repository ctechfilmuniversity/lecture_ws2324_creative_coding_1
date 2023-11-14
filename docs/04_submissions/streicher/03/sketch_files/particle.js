// individual particle class
let Particle = function (position, dir) {
  this.acceleration = dir;
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.size = random(15, 40);
  this.position = position.copy();
  this.lifespan = 255;
}

Particle.prototype.run = function () {
  this.update();
  this.display();
}

  // Method to update position
Particle.prototype.update = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 1.4;
}

  // Method to display
Particle.prototype.display = function () {
  stroke(160, 30, 150, this.lifespan);
  strokeWeight(1);
  fill(160, 15, 240, this.lifespan / 15);
  ellipse(this.position.x, this.position.y, this.size);
}

  // Is the particle still useful?
Particle.prototype.isDead = function () {
  return this.lifespan < 0;
}


   // particle system class
let ParticleSystem = function (position) {
  this.origin = position.copy();
  this.particles = [];
}

ParticleSystem.prototype.move = function (newPos){
  this.origin = newPos;  
}

ParticleSystem.prototype.addParticle = function () {
  this.particles.push(new Particle(this.origin));
}

ParticleSystem.prototype.run = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
}