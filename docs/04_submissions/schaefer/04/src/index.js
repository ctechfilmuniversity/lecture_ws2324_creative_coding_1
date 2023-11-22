import { drawLine } from "./helpers.js";
import { getFingerTipCoordinates } from "./helpers.js";

const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

/**
 * This function draws on the canvas if hand landmarks are found.
 * 
 * @param {Object} results - Results of found hands returned from the 
 *                           Mediapipe API.
 */
function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    let hands;
    let handOne;
    let handTwo;
    
    if (results.multiHandLandmarks) {
        hands = results.multiHandLandmarks;
        handOne = hands[0];
        handTwo = hands[1];
/*         for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 5});
            drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
        } */

        draw(handOne, handTwo);
    }
    
    canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});

hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({image: videoElement});
    },
    width: 1280,
    height: 720
});

function setup(){

    createCanvas(windowWidth, windowHeight);
    background(255);
}

function draw(handOne, handTwo) {
    if (handOne && handTwo) {
        // First get all needed coordinates
        const coordsIndexFinerHandOne = getFingerTipCoordinates(handOne, 8, canvasElement);
        const coordsIndexFinerHandTwo = getFingerTipCoordinates(handTwo, 8, canvasElement);

        const coordsMiddleFinerHandOne = getFingerTipCoordinates(handOne, 12, canvasElement);
        const coordsMiddleFinerHandTwo = getFingerTipCoordinates(handTwo, 12, canvasElement);

        const coordsRingFinerHandOne = getFingerTipCoordinates(handOne, 16, canvasElement);
        const coordsRingFinerHandTwo = getFingerTipCoordinates(handTwo, 16, canvasElement);

        const coordsPinkyFinerHandOne = getFingerTipCoordinates(handOne, 20, canvasElement);
        const coordsPinkyFinerHandTwo = getFingerTipCoordinates(handTwo, 20, canvasElement);
        
        // Then, draw lines between them.
        canvasCtx.lineWidth = 2;

        //strokeWeight(0.1);

        drawLine(coordsIndexFinerHandOne, coordsIndexFinerHandTwo, canvasCtx);
        drawLine(coordsMiddleFinerHandOne, coordsMiddleFinerHandTwo, canvasCtx);
        drawLine(coordsRingFinerHandOne, coordsRingFinerHandTwo, canvasCtx);
        drawLine(coordsPinkyFinerHandOne, coordsPinkyFinerHandTwo, canvasCtx);
    }
}

camera.start();
