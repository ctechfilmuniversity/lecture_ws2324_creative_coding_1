class Particle {
    constructor(_pos, _size){
        this.pos = _pos;
        this.size = _size;
        this.color = 255;
        this.vel = createVector(random(2)-1,random(2)-1);
        this.acc = createVector(0,0);
        this.maxForce = 0.3;
        this.maxSpeed = 0.5;
        this.noiseScale = createVector(0.02,0.02); 
        this.noiseMult = random(2)-1;
        this.alpha = 1;

    }


    update(){
        this.checkBoundaryCollision();
		this.computeForces();
		this.move();
		this.drawParticle();
        
	} // Update End 

    setColor(_color){
        this.color = _color; 
    }

    setPos(_pos){
        this.pos = _pos
    }
    getPos(){
        return this.pos
    }

    drawParticle(){
        push();
        fill(this.color,this.alpha)
        ellipse(this.pos.x,this.pos.y,this.size,this.size);
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
		push();
        strokeWeight(0.1);
        line(this.pos.x,this.pos.y,_target.x,_target.y);
      	pop();
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
		this.applyForce(this.computeNoiseForce(this.noiseMult,this.noiseScale).mult(1));
        //this.applyForce(createVector(random(2),random(2)))

	    }

    
}