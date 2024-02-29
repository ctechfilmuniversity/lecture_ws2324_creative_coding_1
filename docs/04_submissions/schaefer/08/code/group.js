class Group {
    constructor(_id) {
        this.particles = [];
        this.color = createVector(random(0,255),random(0,255),random(0,255))
        this.size = 30
        this.text = "empty"
        this.pos = createVector(0.0,0.0)
        this.id = _id
        this.targetPosition = createVector(windowWidth/2+random(-50,50),windowHeight/2+random(-50,50))

    }

    addParticle(particle) {
        particle.groupID = this.id
        this.particles.push(particle);

    }

    update(){
        this.calculatePosition()
        this.display()
        this.influenceParticles()
    }

    calculatePosition() {
        if (this.particles.length != 0) {
            let sumX = 0;
            let sumY = 0;
    
            for (let particle of this.particles) {
                sumX += particle.pos.x;
                sumY += particle.pos.y;
            }
    
            this.pos = createVector(sumX / this.particles.length, sumY / this.particles.length);
        }

       
    }

    display(){
        if(this.particles.length!=0){
        push();
        //noFill();
        //strokeWeight(50)
        stroke(this.color.x,this.color.y,this.color.z,20)

        fill(this.color.x,this.color.y,this.color.z,5)
        ellipse(this.pos.x,this.pos.y,this.size*this.particles.length,this.size*this.particles.length);
        //ellipse(this.particles[1].pos.x,this.particles[1].pos.y,this.size,this.size);
            
        pop();
        push();
        
        beginShape(TRIANGLE_STRIP)
        for (let particle of this.particles) {
        vertex(particle.pos.x,particle.pos.y)
            noStroke()
        fill(particle.id*2,50)
        } 
        endShape()
        pop()

  


        }
      
    }

    influenceParticles(){
        for (let particle of this.particles) {
            let centroidForce = p5.Vector.sub(this.targetPosition, this.pos)
            let particleForce = p5.Vector.sub(this.pos,particle.pos )
            particleForce.limit(0.01)
            centroidForce.limit(0.0025+this.particles.length*0.0001)
            //particleForce.add(centroidForce)
            //particleForce.normalize()
            particle.applyForce(particleForce)
            particle.applyForce(centroidForce)


            particle.linesColor = this.color
            particle.color = this.color


        
     }
    }

}