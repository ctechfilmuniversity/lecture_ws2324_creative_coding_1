// System parameters
const MIN_DIST_OTHERS_CONNECTED = 20;
const MAX_DIST_CONNECTED = 30;
const MIN_DIST_OTHERS = 50;

const ATTRACT_FORCE = 0.2;
const REPULSE_FORCE = -1.0;
const LERP_PARAM = 0.2;

class GrowthSystem {

    constructor(nodes) {
        this.nodes = nodes;
    }

    addNewNode(nodes) {
        for (let i = 0; i < nodes.length-1; i++) {
            let curr = nodes[i];
            let next = nodes[i+1];
    
            let distNext = next && p5.Vector.dist(curr.position, next.position);
    
            if (distNext >= MAX_DIST_CONNECTED) {
                const newPos = p5.Vector.lerp(curr.position, next.position, LERP_PARAM);
    
                const newNode = new Node(createVector(newPos.x, newPos.y));
                let currNodeIndex = nodes.indexOf(curr);
                nodes.splice(currNodeIndex+1, 0, newNode);
            }
        }
    }

    attract(nodes) {
        for (let i = 0; i < nodes.length; i++) {
            let curr = nodes[i];
    
            let next;
            let prev;
    
            next = nodes[i+1];
            prev = nodes[i-1];
    
            const dNext = next && curr.position.dist(next.position);
            const dPrev = prev && curr.position.dist(prev.position);
    
            if (dNext > MIN_DIST_OTHERS_CONNECTED) {
                let newPos = p5.Vector.lerp(curr.position, next.position, ATTRACT_FORCE);
                curr.position = newPos;
            }
    
            if (dPrev > MIN_DIST_OTHERS_CONNECTED) {
                let newPos = p5.Vector.lerp(curr.position, prev.position, ATTRACT_FORCE);
                curr.position = newPos;
            }
        }
    }

    repulse(nodes) {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes.length; j++) {
                let curr = nodes[i];
                let other = nodes[j];
    
                if (curr !== other) {
                    let d = curr.position.dist(other.position);
    
                    if (d < MIN_DIST_OTHERS) {
                        let newPos = p5.Vector.lerp(curr.position, other.position, REPULSE_FORCE/nodes.length);
                        curr.position = newPos;
                    }
                }
            }
        }
    }
}
