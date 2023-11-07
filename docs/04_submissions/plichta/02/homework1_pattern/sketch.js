let circles = [];
let globalGridSize = 60;
let circleDiameterMultiply = 1;
let granularityAnglesCircle = 2;
let fullCircle = granularityAnglesCircle * 2;
//TODO for interactive / animated: scale 2 from 0.5 to 4 slowly


function setup() {
    createCanvas(1800, 920);
    background(40);
    //Initialize grid of circles
    for (let i = 0; i < width; i += globalGridSize) {
        for (let k = 0; k < height; k += globalGridSize) {
            circles.push(new Circle(i, k, globalGridSize * circleDiameterMultiply));
        }
    }

    // Draw grid
    // for (let i = 0; i < width; i = i + globalGridSize) {
    //     for (let k = 0; k < height; k = k + globalGridSize) {
    //          line(k, i, k, height);
    //          line(i, k, width, k);
    //     }
    // }

    //Draw all circles
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        
        let angleCircleStart = random(0, fullCircle);
        angleCircleStart = floor(angleCircleStart);
        
        let angleCircleStop = random(0, fullCircle);
        angleCircleStop = floor(angleCircleStop);

        //stop is always at least past anglestart (in counterclockiwse fashion)
        angleCircleStop += angleCircleStart;
        
        //the best setting is dividing the circle in quarters 
        //but to loosen it up, it is also nice to have it divided in eight segments sometimes
        let randomNum = random(1);
        if (randomNum < 0.6) {
            circle.display(angleCircleStart * PI / granularityAnglesCircle, angleCircleStop * PI / granularityAnglesCircle);
        }else{
            circle.display(angleCircleStart * PI / granularityAnglesCircle / 2, angleCircleStop * PI / granularityAnglesCircle / 2);
        } 
    }
}

function draw() {


}