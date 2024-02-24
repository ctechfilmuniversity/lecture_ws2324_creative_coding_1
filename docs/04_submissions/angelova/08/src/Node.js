class Node {
    #radius = 2;

    constructor(vector) {
        this.position = vector;
    }

    // To be used mainly for testing and debugging purposes.
    show() {
        circle(this.position.x, this.position.y, this.#radius);
    }
}
