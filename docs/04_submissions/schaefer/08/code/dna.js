class Dna {
    constructor(_basedna){
      this.genes = [];
      this.base = _basedna;
      this.pos = createVector(0,0)
      this.mutationRate = 0.05
    }



    generateGenes() {
      for(var i = 0; i < this.base.length;i++){
        if(random(1)<this.mutationRate){
          this.genes[i] = Math.random(1)
        } else {
        this.genes[i] = map(this.base[i],0,9,0.0,1.0)
        this.genes[i] += random(-0.1,0.1)
        this.genes[i] = clamp(this.genes[i],0,1)
        }
      }

      return this.genes
    }
    
    
    visualize(){
      for(var i = 0; i < this.base.length;i++){
        circle(this.pos.x+i*15,this.pos.y,map(this.genes[i],0,1,1,20));
      }
    
  
    }
      
  }