CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 800;
CELL_SIZE = 100;


class Square {
    static #squares = [];
    static #count = 0;
    #image;
    #granulation;

    constructor() {
        this.side = 50;
        this.id = ++Square.#count;
        // Math.random() can be used here.
        this.#granulation = 60;
        this.#image = Square.#createRandomImage(this.side, this.#granulation);
    }

    static init() {
        for (let i = 0; i < 50; i++) {
            Square.#squares.push(new Square());
        }
    }

    static #createRandomImage(side, granulation) {
        const flatColorRGB = [0, 0, 0];
        const img = createImage(side, side);

        let numPixels = 4 * img.width * img.height;
        img.loadPixels();
        for (let i = 0; i < numPixels; i += 4) {
            const grainAmount = random(-granulation, granulation);

            img.pixels[i] = this.#asColor(flatColorRGB[0] + grainAmount);
            img.pixels[i + 1] = this.#asColor(flatColorRGB[1] + grainAmount);
            img.pixels[i + 2] = this.#asColor(flatColorRGB[2] + grainAmount);
            img.pixels[i + 3] = 180;
        }
        img.updatePixels();

        return img;
    }

    static #asColor(value) {
        return Math.min(Math.max(0, Math.round(value)), 255);
    }

    static random() {
        const randIdx = Math.round(Math.random() * (Square.#squares.length-1));
        return Square.#squares[randIdx];
    }

    draw(x, y) {
        image(this.#image, x, y);
    }
}

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    imageMode(CENTER);
    rectMode(CENTER);
    angleMode(DEGREES);
    Square.init();
  }
  
  function draw() {
    const backgroundColor = color('rgba(0, 0, 0, 1)');
    background(backgroundColor);

    createPatternGrid();
  }
  
  function createPatternGrid() {
    let step = 20;
    for (let x = 20; x < width; x += 100) {
      for (let y = 20; y < height; y += 100) {
        const randomSquare = Square.random();
        
        // Create a simple circle with 
        push();
        noStroke();
        translate(x + 30, y + 30);
        // Highlight circle rows and columns under the current mouse position.
        if (mouseX <= x + 100 && mouseY <= y + 100) {
            fill(color('rgba(255, 255, 255, 1)'));
        }
        else {
            fill(color('rgba(255, 255, 255, 0.6)'));
        }
        ellipse(0, 0, 100 - step);
        pop();

        // Create a custom square with granulated texture
        push();
        translate(x + 50, y + 50);
        /** If the circle is not highlighted, rotate the square. Here, 
         * one can experiment with different transformations, e.g. scale(),
         * rotate(), translate(), etc.
        */
        if (mouseX > x + 100 || mouseY > y + 100) {
            translate(5, 5);
        }
        else {
            // TODO: try different transformations.
            
        }
        randomSquare.draw(0,  0);
        pop();
      }
      step+=10;
    }
}
