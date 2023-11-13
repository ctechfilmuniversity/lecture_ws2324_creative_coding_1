const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1440;
canvas.height = 894;

// Helper functions
function getRandomPosition(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawParticle(positionX, positionY, radius, color) {
    ctx.beginPath();
    ctx.arc(positionX, positionY, radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

class FoodParticle {
    static #foodParticles = [];
    static #count = 87;
    x;
    y;
    r;
    color;
    isOnGround;

    constructor(x, y, r, color, isOnGround) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.isOnGround = isOnGround;
    }

    // Autumn colors
    static #getRandomColor() {
        let R = Math.floor((Math.random() * 250));
        let G = Math.floor((Math.random() * 50));
        let B = Math.floor((Math.random() * 70));
        
        let rgb = `rgb(${R},${G},${B})`;
        return rgb;
    }

    static initFoodParticles() {
        for (let i = 0; i < this.#count; i++) {
            const particleW = getRandomPosition(200, 600);
            const particleY = getRandomPosition(-100, 100);
            const particleR = getRandomPosition(0, 6);
            const color = this.#getRandomColor();
            const isOnGround = false;
            this.#foodParticles.push(new FoodParticle(particleW, particleY, particleR, color, isOnGround));
        }

        return this.#foodParticles;
    }

    drawFoodParticle
}

// Initialize the food particle
const particles = FoodParticle.initFoodParticles();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p = 0; p < particles.length; p++) {
        let foodParticle = particles[p];

        const groundPositionY = getRandomPosition(canvas.height - 300, canvas.height - 100);

        if (foodParticle.y > groundPositionY) {
            foodParticle.isOnGround = true;
            drawParticle(foodParticle.x, foodParticle.y, foodParticle.r, foodParticle.color);
        }

        else {
            drawParticle(foodParticle.x, foodParticle.y, foodParticle.r, foodParticle.color);

            foodParticle.y +=2;
        }
    }

    // If all food is on the ground, stop the animation.
    if (particles.some(p => p.isOnGround === false)) {
        myReq = requestAnimationFrame(animate);
    }
}

myReq = requestAnimationFrame(animate);
cancelAnimationFrame(myReq);

// DOM interactions
function displayContent() {
    // Hide the instructions and the button
    document.getElementById("creative-instructions").style.display = "none";
    
    // Show the jumpy robin and start the animation
    document.getElementById("scene").style.display = "flex";
    document.getElementById("canvas").style.display = "flex";
    
    setTimeout(() => {
        animate();
    }, "2000");

    setTimeout(() => {
        document.getElementById("message").style.display = "flex";
    }, "5500");
}
