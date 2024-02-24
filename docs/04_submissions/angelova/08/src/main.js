const MAX_WIDTH = window.innerWidth;
const MAX_HEIGHT = window.innerHeight;

let FREEZE = false;
let CLEAR = false;

// Colors 💚
const backgroundColor = "#0b3d2b";
const colors = ["#9cd95b", "#3fa831", "#51f73b", "#41cc99", "#18c0cc"];

const nodes = [];

function setup() {
    createCanvas(MAX_WIDTH, MAX_HEIGHT);
    background(color(backgroundColor));
    angleMode(RADIANS);
}

function isOutOfBoundaries(pos) {
    const horizontalBoundaries = pos.x <= 0 || pos.x >= MAX_WIDTH;
    const verticalBoundaries = pos.y <= 0 || pos.y >= MAX_HEIGHT;

    if (horizontalBoundaries || verticalBoundaries) {
        return true;
    }
}

function findNearestNode(currNode) {
    let minD = 1000;
    let d;
    let nearest;

    for (let i = 0; i < nodes.length; i++) {
        d = currNode.position.dist(nodes[i].position);
        if (d < minD) {
            minD = d;
            nearest = nodes[i];
        }
    }

    return nearest;
}

function createNodeAtMousePosition(mouseX, mouseY) {
    const vec = createVector(mouseX, mouseY);
    const newNode = new Node(vec);

    return newNode;
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

addEventListener("click", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    const newNode = createNodeAtMousePosition(x, y);
    const nearest = findNearestNode(newNode);
    const nearestNodeIndex = nodes.indexOf(nearest);

    nodes.splice(nearestNodeIndex+1, 0, newNode);
});

addEventListener("keydown", (event) => {
    if (event.code === "KeyF") {
        FREEZE = true;
    } 
});

function draw() {
    if (FREEZE) {
        return;
    }

    // clear();
    const system = new GrowthSystem(nodes);
    system.attract(nodes);
    system.repulse(nodes);
    system.addNewNode(nodes);
  
    const colorIndex = randomInteger(0, colors.length-1);

    push();
    beginShape();

    strokeWeight(0.5);
    stroke(color(colors[colorIndex]));
    noFill();

    nodes.forEach(n => vertex(n.position.x, n.position.y));

    endShape();
    pop();
}
