let facemesh;
let video;
let face = [];

//face 1 coordinates (will be filled later) 
let face1_X;
let face1_Y;
let face1_Z;
//face 2 coordinates 
let face2_X;
let face2_Y;
let face2_Z;
let normalizedDistanceBetweenFaces;
let twoFacesDetected = false;

//Electricity 
let time = 0;
let strokeThicknessConnectionLine = 4;
let strokeThicknessFaceLines = 2;

//the point we are connecting between the faces
let pointOnTheFaceMesh1 = 127;
let pointOnTheFaceMesh2 = 356;
const noiseStrength = 100;
const noiseStrength2 = 50;

//Face Viz
let faceLinesArray = [];
let countFaceLines = 50;

function preload() {
    SOUND = loadSound("Sound.wav")
    font = loadFont('OpenSans-Medium.ttf');
}

function setup() {
    createCanvas(640, 480) //hmm don't scale the video, it seems the ml library doesn't like that
    video = createCapture(VIDEO);
    filter(POSTERIZE, 3);
    video.size(width, height);
    video.hide();

    // Initialize the Facemesh model
    facemesh = ml5.facemesh(video, modelReady);
    // When predictions are made
    facemesh.on('predict', results => {
        face = results;
    });

    for (let i = 0; i < countFaceLines; i++) {
        faceLinesArray[i] = new faceLine();
    }
}


function draw() {
    image(video, 0, 0, width, height);
    //filter(GRAY);
    //drawFaceMesh();
    //lets assign the mesh coordinates of one point to our global face1 and face2 variables
    assignCoordinates();
    //now we can use face1_X, face1_Y....etc
    drawLinesOnFace();
    let thickness = 2 + (strokeThicknessConnectionLine * 2 * normalizedDistanceBetweenFaces);
    if (twoFacesDetected) {
        drawElectricityBetweenFaces(thickness);
    } else {
        noStroke();
        fill(255, 225, 251);
        rect(25, 23, 230, 40, 10);
        fill(0); // sets the color of the text
        textSize(21); // sets the size of the text
        textFont('OpenSans-Medium.ttf');
        text("Connect another face", 40, 50);
    }
}

function assignCoordinates() {
    //face is an array and "length" means the amount of faces we detected, so how many object there are in the array
    //if we have 1 face or more:

    if (face.length >= 1) {
        //coordFace is an Array. It stores three points, x,y, and z on position 0,1, and 2
        let coordFace1 = face[0].scaledMesh[pointOnTheFaceMesh1];
        //assign x,y and z coordinates to variables for better readability 
        let t_face1_X = coordFace1[0];
        let t_face1_Y = coordFace1[1];
        let t_face1_Z = coordFace1[2];
        // let t_face2_X = coordFace1[0];
        // let t_face2_Y = coordFace1[1];
        // let t_face2_Z = coordFace1[2];
        let t_face2_X = width / 6;
        let t_face2_Y = height / 6;
        let t_face2_Z = 0;

        //check for 2 faces
        if (face.length >= 2) {
            twoFacesDetected = true;
            //get also coordinates from face 2
            let coordFace2 = face[1].scaledMesh[pointOnTheFaceMesh2];
            t_face2_X = coordFace2[0];
            t_face2_Y = coordFace2[1];
            t_face2_Z = coordFace2[2];

            // Sound
            // Play sound only if it's not already playing
            if (!soundAlreadyPlaying) {
                SOUND.setVolume(normalizedDistanceBetweenFaces);
                SOUND.loop();
                soundAlreadyPlaying = true;
            }
        } else {
            twoFacesDetected = false;

            //Stop sound and set variable to false
            SOUND.stop();
            soundAlreadyPlaying = false;
        }

        //while we are here lets get the distance between the faces
        // let face1Middle = face[0].scaledMesh[1];
        // let face2Middle = face[1].scaledMesh[1];
        let distance = Math.abs(t_face1_X - t_face2_X);
        //now normalize it so the distance is ranging between 0 and 1
        normalizedDistanceBetweenFaces = distance / width * 1.9; //0.75 because faces will never reach the edge of the screen
        //to make it easier for us lets have the shorter the distance the higher the value, as we want the intensity to rise when faces get closer
        normalizedDistanceBetweenFaces = 1 - normalizedDistanceBetweenFaces;
        //console.log(normalizedDistanceBetweenFaces);

        //make sure we always go from inside the head to the other inside of the other head
        if (t_face1_X < t_face2_X) {
            face2_X = t_face1_X;
            face2_Y = t_face1_Y;
            face2_Z = t_face1_Z;

            face1_X = t_face2_X;
            face1_Y = t_face2_Y;
            face1_Z = t_face2_Z;
        } else {
            face1_X = t_face1_X;
            face1_Y = t_face1_Y;
            face1_Z = t_face1_Z;

            face2_X = t_face2_X;
            face2_Y = t_face2_Y;
            face2_Z = t_face2_Z;
        }

    } else { //reset coordinates if one face gets lost 
        face2_X = 0;
        face2_Y = 0;
        face2_Z = 0;

        face1_X = 0;
        face1_Y = 0;
        face1_Z = 0;

    }
    //TODO: fix mesh gets lost by saving array 
    //save face mesh if we had 2 but suddenly only 1 is left 

}

function drawLinesOnFace() {
    let amountLines = (countFaceLines * 0.7) * normalizedDistanceBetweenFaces;
    if (amountLines >= countFaceLines) { //should not happen but just to be sure
        amountLines = countFaceLines;
    }
    let bezierSize = 10 * normalizedDistanceBetweenFaces;
    let curviness = 3 * normalizedDistanceBetweenFaces;
    console.log(curviness);
    if (curviness < 1.5) {
        curviness = 1.5;
    }
    //let thickness = 3 * normalizedDistanceBetweenFaces;
    let thickness = strokeThicknessFaceLines; //we could dynamically change the thickness but it doesn't look good
    for (let i = 0; i < amountLines; i++) {
        faceLinesArray[i].update(bezierSize, curviness, thickness);
    }
    //console.log('distance' ,normalizedDistanceBetweenFaces);
}

function drawElectricityBetweenFaces(thickness) {
    strokeWeight(thickness);
    //Electricity 
    stroke(0, 255, 251);
    drawingContext.shadowBlur = 60;
    drawingContext.shadowColor = (0, 255, 251);

    noFill();
    var xlength = face1_X - face2_X;
    var ylenght = face1_Y - face2_Y;
    var multi = ylenght / xlength;

    beginShape();
    for (var i = 0; i <= xlength; i++) {
        var nx = map(i, face2_X, face1_X, 0, 10);
        const n = (noise(nx, time) * noiseStrength) - noiseStrength / 2;

        var y = i * multi + n;
        //coordinate
        vertex(face2_X + i, face2_Y + y);
    }
    endShape();

    stroke(255, 225, 251);

    beginShape();
    for (var i = 0; i <= xlength; i++) {
        var nx = map(i, face2_X, face1_X, 0, 10);
        const n = (noise(nx, time) * noiseStrength2) - noiseStrength2 / 2;

        var y = i * multi + n;
        //coordinate
        vertex(face2_X + i, face2_Y + y);
    }
    endShape();
    // console.log(xlength)
    // Increment time for the next frame
    time += 0.09;
}

function modelReady() {
    //console.log('Model ready!');
}

function drawFaceMesh() {
    for (let i = 0; i < face.length; i += 1) {
        const keypoints = face[i].scaledMesh;
        // Loop through all keypoints
        for (let k = 0; k < keypoints.length; k += 1) {
            const [x, y] = keypoints[k];
            // Draw each keypoint as a circle
            fill(0, 255, 0);
            ellipse(x, y, 3, 3);
        }
    }
}

class faceLine {
    constructor() {
        this.random1 = 0;
        this.random2 = 0;
        this.closePoint;
        this.lineStartX;
        this.lineStartY;
        this.lineEndX;
        this.lineEndY;
    }

    update(_beziersize, _amplitude, _thickness) {
        //1. get two points once
        //2. save the points
        //3. draw a bezier curve between them
        //4. switch around the first point for a new point every 1/3 second
        for (let i = 0; i < face.length; i += 1) {
            const keypoints = face[i].scaledMesh;

            //Do every 1/3 second 
            //if the frameCount is divisible by 60, then a second has passed. it will stop at the 0th of the seconds.
            if (frameCount % 20 === 0) {
                this.random1 = Math.floor(random(0, keypoints.length - 1));
                if (this.closePoint != null) {
                    this.random1 = this.closePoint;
                }

                this.closePoint = this.random1 + 1;

                if (this.closePoint > keypoints.length - 1) {
                    //this.closePoint = keypoints.length - 1;
                    this.closePoint = Math.floor(random(0, keypoints.length - 1));

                }
                this.random2 = this.closePoint;
            }
            [this.lineStartX, this.lineStartY] = keypoints[this.random1];
            [this.lineEndX, this.lineEndY] = keypoints[this.random2];


            let bezierSize = _beziersize;
            let multiplier1 = 1.5 * _amplitude;
            let multiplier2 = 2 * _amplitude;
            let multiplier3 = 3.5 * _amplitude;
            let multiplier4 = 7 * _amplitude;
            // let multiplier1 = 2;
            // let multiplier2 = 2.4;
            // let multiplier3 = 3;
            // let multiplier4 = 3.4;

            function randomPosOrNeg(size) {
                var multiplier;
                if (Math.random() < 0.5) {
                    multiplier = -1;
                } else {
                    multiplier = 1;
                }
                return random(0, size) * multiplier;
            }

            noFill();
            strokeWeight(_thickness);
            stroke(0, 255, 251);
            bezier(
                this.lineStartX,
                this.lineStartY,
                this.lineStartX - randomPosOrNeg(bezierSize),
                this.lineStartY - randomPosOrNeg(bezierSize * multiplier1),
                this.lineEndX - randomPosOrNeg(bezierSize * multiplier1),
                this.lineEndY - randomPosOrNeg(bezierSize),
                this.lineEndX,
                this.lineEndY
            );

            stroke(15, 205, 151, 50);
            bezier(
                this.lineStartX,
                this.lineStartY,
                this.lineStartX - randomPosOrNeg(bezierSize * multiplier1),
                this.lineStartY - randomPosOrNeg(bezierSize * multiplier1),
                this.lineEndX - randomPosOrNeg(bezierSize * multiplier4),
                this.lineEndY - randomPosOrNeg(bezierSize * multiplier2),
                this.lineEndX,
                this.lineEndY
            );

            stroke(255, 225, 251);
            bezier(
                this.lineStartX,
                this.lineStartY,
                this.lineStartX - randomPosOrNeg(bezierSize * multiplier3),
                this.lineStartY - randomPosOrNeg(bezierSize * multiplier3),
                this.lineEndX - randomPosOrNeg(bezierSize * multiplier1),
                this.lineEndY - randomPosOrNeg(bezierSize),
                this.lineEndX,
                this.lineEndY
            );
        }
    }
}
    



