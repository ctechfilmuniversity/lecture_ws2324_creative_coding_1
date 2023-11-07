class Particle {
    constructor(_pos, _size){
        this.pos = _pos;
        this.size = _size;
        this.color = 255;
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxForce = 0.3;
        this.maxSpeed = 0.5;
        this.noiseScale = 0.02; 
        this.noiseMult = 1;

    }


    update(){
        this.checkBorders()
		//this.computeForces();
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
        fill(this.color)
        ellipse(this.pos.x,this.pos.y,random(this.size),random(this.size));
        pop();
    }
    move(){
		this.acc.mult(this.maxForce);
    	this.vel.add(this.acc);
    	this.vel.limit(this.maxSpeed);
    	this.pos.add(this.vel);
	}

    computeNoiseForce(){
		angleMode(RADIANS);
		let n = noise(this.pos.x*this.noiseScale,this.pos.y*this.noiseScale);
		let a = TAU * n ;
		return createVector(cos(a)* this.noiseMult,sin(a)* this.noiseMult);
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

    checkBorders(){
        if(this.pos.x>= 0 && this.pos.x <=windowWidth && this.pos.y>=0 && this.pos.y <=windowHeight){

        } else {
        this.pos = createVector(random(windowWidth),random(windowHeight))    
        }
    }

	computeForces(){
		this.applyForce(this.computeNoiseForce());
	}
}