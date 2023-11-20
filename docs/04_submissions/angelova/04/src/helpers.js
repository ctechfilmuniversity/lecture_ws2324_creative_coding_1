/**
 * A simple function that returns the coordinates of the tip of a given finger
 * for a given hand.
 * 
 * @param {Object} hand - Two hands of one person, or one hand per person if two.
 * @param {*} index - Finger tip of index, middle ring finger or pinky.
 * 
 * @returns {Object} - Coordinates (x, y) of the finger tip.
 */
export function getFingerTipCoordinates(hand, index, canvasElement) {
    if (hand) {
        const handFingerTipX = hand[index].x * canvasElement.width;
        const handFingerTipY = hand[index].y * canvasElement.height;

        return {
            x: handFingerTipX,
            y: handFingerTipY
        };
    }
}
/**
 * A simple function that draws a line between two finger tip coordinates.
 * 
 * @param {Object} coordsFingerHandOne - Coordinates (x, y) of the finger tip of first hand.
 * @param {*} coordsFingerHandTwo - Coordinates (x, y) of the finger tip of second hand.
 */
export function drawLine(coordsFingerHandOne, coordsFingerHandTwo, canvasCtx) {
    const controlPoint1 = getControlPoint(coordsFingerHandOne);
    const controlPoint2 = getControlPoint(coordsFingerHandTwo);

    canvasCtx.beginPath();
    canvasCtx.moveTo(coordsFingerHandOne.x, coordsFingerHandOne.y);
    // Add two random control points -- bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
    canvasCtx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, coordsFingerHandTwo.x, coordsFingerHandTwo.y);
    canvasCtx.stroke();
}

/**
 * A function that returns a random control point, near the given main point.
 * 
 * @param {Object} coordsFinger - Coordinates (x, y) of the main point.
 * @returns Coordinates (x, y) of the control point.
 */
export function getControlPoint(coordsFinger) {
    const coordsFingerX = coordsFinger.x - getRandomArbitrary(-50, 50);
    const coordsFingerY = coordsFinger.y - getRandomArbitrary(-50, 200);

    return {
        x: coordsFingerX,
        y: coordsFingerY,
    };
}

export function getRandomArbitrary(min, max) {
    return Math.random() * ((max - min) + min);
}
