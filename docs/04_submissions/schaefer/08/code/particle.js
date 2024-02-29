class Particle {
    constructor(_pos, _id, _dna){
        this.pos = _pos;
        //randomSeed(_id)
        this.dna = _dna
        this.size = map(_dna[0],0,1,1,25);
        this.id = _id;
        this.color = createVector(map(_dna[1],0,1,0,255),map(_dna[2],0,1,0,255),map(_dna[3],0,1,0,255));
        this.linesColor = createVector(255,255,255)
        this.vel = createVector(random(2)-1,random(2)-1);
        this.acc = createVector(0,0);
        this.maxForce = map(_dna[4],0,1,0.1,0.9);
        this.maxSpeed = map(_dna[5],0,1,0.3,1.7);
        this.noiseScale = createVector(0.2,0.2); 
        this.noiseMult = map(_dna[5],0,1,-0.01,0.01);
        this.alpha = 1;
        this.isConnected = 0
        this.groupID = 0
        

    }


  update(){
    //this.checkBorders(0,0,windowWidth,windowHeight)
	  this.computeForces();
		this.move();
		this.drawParticle();
    this.checkBoundaryCollision();
        
	} // Update End 


  drawParticle(){
        push();
        //fill(this.color.x*this.isConnected,this.color.y,this.color.z,this.alpha)
        noFill();
        stroke(this.color.x*(this.isConnected+0.7),this.color.y,this.color.z)
        ellipse(this.pos.x,this.pos.y,this.size,this.size);
        text(str(this.id), this.pos.x, this.pos.y);
        pop();
    }

  move(){
		  this.acc.mult(this.maxForce);
    	this.vel.add(this.acc);
    	this.vel.limit(this.maxSpeed);
    	this.pos.add(this.vel);
	  }

  computeNoiseForce(_amp, _scale){
		angleMode(RADIANS);
		let n = noise(this.pos.x*_scale.x,this.pos.y*_scale.y);
		let a = TAU * n ;
		return createVector(cos(a)* _amp,sin(a)* _amp);
	  }

	applyForce(_Force){
		this.acc.add(_Force);
	}

  drawLines(_target){
		  //push();
      strokeWeight(0.5);
      
      stroke(this.linesColor.x,this.linesColor.y,this.linesColor.z)
      line(this.pos.x,this.pos.y,_target.x,_target.y);
      //pop();
	} 

  checkBoundaryCollision() {
        if (this.pos.x > windowWidth - this.size) {
          this.pos.x = windowWidth - this.size;
          this.vel.x *= -1;
        } else if (this.pos.x < this.size) {
          this.pos.x = this.size;
          this.vel.x *= -1;
        } else if (this.pos.y > windowHeight - this.size) {
          this.pos.y = windowHeight - this.size;
          this.vel.y *= -1;
        } else if (this.pos.y < this.size) {
          this.pos.y = this.size;
          this.vel.y *= -1;
        }
  }



	computeForces(){
		this.applyForce(this.computeNoiseForce(this.noiseMult,this.noiseScale).mult(0.01));

	}

  checkOtherParticles(_particles,_groups){
    let isConnectedFlag = 0;


    for( let i = 0; i< _particles.length; i++){
      if(_particles[i].id == this.id){
        continue;
      } else {
        let distance = dist(_particles[i].pos.x,_particles[i].pos.y,this.pos.x,this.pos.y)
        let direction = createVector(this.pos.x-_particles[i].pos.x,this.pos.y-_particles[i].pos.y)
        let groupattraction = createVector(0,0)
        direction.normalize()

        // Separation Force Logic
        if(distance<this.size/2+_particles[i].size/2){
          this.applyForce(direction)
          if(Math.abs(this.groupID == _particles[i].groupID)){
     
          } 
        }

  
        // Attraction Force & Group Logic
        if(Math.abs(this.id-_particles[i].id)<4 && distance<150 ){
          groupattraction = direction.mult(-0.1*map(distance,this.size/2+_particles[i].size/2,150,0.001,2.5))
        
          this.applyForce(groupattraction)
          this.drawLines(createVector(_particles[i].pos.x,_particles[i].pos.y))
          isConnectedFlag = 1; 
          this.isConnected = 1

          let groupFound = false;
          for (let group of _groups) {
            if (group.particles.includes(this)&&_particles[i].groupID==0) {
                group.addParticle(_particles[i]);
                groupFound = true;
                break;
            }
            if (group.particles.includes(_particles[i])&&this.groupID==0) {
                group.addParticle(this);
                groupFound = true;
                break;
            }
          }

          if (!groupFound && this.groupID==0 && _particles[i].groupID==0) {
            let newGroup = new Group(_groups.length+1);
            newGroup.addParticle(this);
            newGroup.addParticle(_particles[i]);
            _groups.push(newGroup);
          }


        } 
      }
    }

    if (isConnectedFlag === 0) {
      this.isConnected = 0;
    }

  } // End of check Other Particles Function
    


  


}