let circles = [];
let globalGridSize = 60 + 20; //decrease when interactive
let circleDiameterMultiply = 1;
let granularityAngles = 2;
let fullCircle = granularityAngles * 2;

let circleStrokeWeight = 18 + 2; //incease decrease for comic / organic
let highlightCircleScaleUpFactor = 1.1;

let innerCircleScaledDownFactor = 2;
let innerCircleStrokeWeightScaleFactor = innerCircleScaledDownFactor / 2.3;
//TODO for interactive / animated: scale 2 from 0.5 to 4 slowly
let backgroundColor;

let angleStart;
let angleEnd;
let rare1;
let rare2;

let timerPassed = true;
let newThickness = circleStrokeWeight;

function setup() {
    createCanvas(1800 / 1.5, 920 / 1.5);
    pixelDensity(8 / 2);
    backgroundColor = color(40);
    background(backgroundColor);
    setInterval(allowChange, 2000);
    //Initialize grid of circles
    for (let i = 0; i < width; i += globalGridSize) {
        for (let k = 0; k < height; k += globalGridSize) {
            let circle = new Circle(i, k, globalGridSize * circleDiameterMultiply);
            //lets initialize variables seperately for better overview
            //initiate variables and randomize colors
            circle.initialize();
            //add circles to array
            circles.push(circle);

        }
    }
    //Fisher-Yates Shuffle method, looked up with AI, but understood  
    shuffleArray(circles);

    //Initial setup all circles
    //Randomize start and end points of circles
    for (let i = 0; i < circles.length; i++) {

        let circle = circles[i];

        //circles are drawn from even angles
        //circles are divided in quarters (or eights)
        //I think 0 puts the start point of the arc to the right, 1 to bottom, 2 to left, 3 to top and 4 to right again
        let circleSegmentStart = random(0, fullCircle);
        circleSegmentStart = floor(circleSegmentStart);
        let circleSegmentEnd = random(0, fullCircle);
        circleSegmentEnd = floor(circleSegmentEnd);
        //Segment End is always at least past segment start (in counterclockwise fashion)
        circleSegmentEnd += circleSegmentStart;

        //we are dividing the circle in quarters 
        //but to loosen it up, it is also nice to have it divided in eight segments sometimes: PI / granularityAnglesCircle / 2
        let segmentResolution;
        if (random(1) < 0.6) {
            segmentResolution = 1; //nothing changes
        } else {
            segmentResolution = 2; //segments double from 4 to 8
        }
        angleStart = circleSegmentStart * PI / granularityAngles / segmentResolution;
        angleEnd = circleSegmentEnd * PI / granularityAngles / segmentResolution;
        // console.log("anglestart");
        // console.log(angleStart);

        //sometimes a circle should have special colors
        rare1 = false;
        rare2 = false;
        if (random(1) > 0.9) {
            rare1 = true;
        }
        if (random(1) > 0.9) {
            rare2 = true;
        }

        circle.angleStart = angleStart;
        circle.angleEnd = angleEnd;
        circle.rare1 = rare1;
        circle.rare2 = rare2;
        circle.thickness = circleStrokeWeight;

    }
}

function draw() {
    background(backgroundColor);

    let start;
    let end;
    let mouseInputX = limitInputRange(mouseX, width);
    let mouseInputY = limitInputRange(mouseY, height);
    //PI / width  gives me the angle increase per pixel, if the the whole witdh is one circle 
    let addX = 2 * PI / width * mouseInputX;
    let addY = 2 * PI / width * mouseInputY;
    //console.log((mouseInputY));
    
    //Update all circles
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        //circle.drawCircles(circle.angleStart, circle.angleEnd, circle.rare1, circle.rare2);
        let initialAngleStart = circle.angleStart;  //1.5;// mouseX * 0.01;
        let initialAngleEnd = circle.angleEnd; //1.5;// mouseX * 0.01;
        start = initialAngleStart + addX;
        end = initialAngleEnd  + addY;
        let bufferDistanceStartEnd = (2 * PI * 0.02);
        
        //don't let circles grow bigger than start and end values
        if (start + bufferDistanceStartEnd >= end) {
            //console.log("start bigger end");
            start = end - bufferDistanceStartEnd;
        }
        if (end - bufferDistanceStartEnd <= start) {
            //console.log("start bigger end");
            end = start + bufferDistanceStartEnd ; //+1; //das wegzunehmen hats viel besser gemacht
        }
        
        // if (timerPassed) {
        //     //newThickness = random(10,50); //TODO: compute this randomly later
        //     newThickness = mouseInputY;
        //     console.log("newthickness" + newThickness);
        // }
        
        newThickness = mouseInputY*0.08;
        circle.drawCircles(start, end, circle.rare1, circle.rare2, newThickness);
    
    }
    if (timerPassed) {
        timerPassed = false;
        //console.log("false")
    }
}

function allowChange() {
    timerPassed = true;
    //console.log("true");
}

function limitInputRange(input, limit) {
    let inputLimited = input;
    if (inputLimited <= 1) {
        inputLimited = 1;
    }
    if (inputLimited >= limit) {
        inputLimited = limit;
    }

    return inputLimited;
}

function shuffleArray(array) {
    //we go down in reverse through the array
    //array.length - 1 <- because it is the last index pos, array length starts with 1, not 0
    // i > 0, because the last pos was already shuffled once we get to that point 
    for (let i = array.length - 1; i > 0; i--) {
        //in P5 random includes the high number. (in javascript not)
        //pick a random index, but not higher than current i
        const j = Math.floor(random(i));
        // Use a temporary variable to swap array[i] and array[j]
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}