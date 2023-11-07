let circleStrokeWeight = 18;
let highlightCircleScaleUpFactor = 1.1;

let innerCircleScaledDownFactor = 2;
let innerCircleStrokeWeightScaleFactor = innerCircleScaledDownFactor/5;
class Circle {
    constructor(x, y, diameter) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
    }

    display(startAngle, endAngle) {
        //DRAW
        //MAIN CIRCLE
        noFill();
        //color space is in green to blue
        let circleColor = color(random(255), random(200, 255), random(100, 255));
        stroke(circleColor);

        //we save the random color to re-use later for the inner circles but darker
        let r = red(circleColor);
        let g = green(circleColor);
        let b = blue(circleColor);

        //add something red 10% of the time
        if (random(1) > 0.9) {
            //stroke(random(200, 255), random(60, 120), random(40,80) );
            //stroke(250,99,190);
            stroke(r + random(100, 250), g - random(60, 90), 100);
        }
        strokeWeight(circleStrokeWeight);
        arc(this.x, this.y, this.diameter, this.diameter, startAngle, endAngle);

        //optional: draw lines in background color on top of each circle for nice texture
        // for (let i = 1; i < 20; i = i + 4) {
        //     stroke(50);
        //     let scaleThicknessWithGridSize = globalGridSize * 0.11;
        //
        //     strokeWeight(floor(random(1, 4)) - floor(i / 2));
        //     stroke(50);
        //    
        //     //Tried adding black strokes, but only works if they are drawn below everything else, would need to store everything arrays first
        //     let randomNum2 = random(1);
        //     if (randomNum2 < 0.2) {
        //         //stroke(50);
        //         //strokeWeight(2);
        //         //arc(this.x, this.y, this.diameter - i, this.diameter - i, startAngle + startAngle*0.5, endAngle + endAngle*0.5);
        //     }
        //     if (randomNum2 > 0.2 && randomNum2 <0.4) {
        //         //arc(this.x, this.y, this.diameter-(i*9.8), this.diameter-(i*9.8), startAngle + (startAngle * i/4),endAngle + (endAngle *i/4));
        //     }
        // }


        // INNER CIRCLE ------------
        strokeWeight(circleStrokeWeight * innerCircleStrokeWeightScaleFactor);
        // we change the color here based on the parent-circle and make it darker
        stroke(r - random(20), g - random(50, 120), b - 80);
        //10% of the time we shift hue strongly
        if (random(1) > 0.9) {
            stroke(r - random(220), g - random(50, 60), b - random(200));
        }

        //we want the inner circle to be rotated based on the original angle, and sometimes shorter/longer than the original 
        let startAngleRotatet = startAngle + startAngle * random(0.1, 0.5);
        let endAngleRotatet = endAngle + endAngle * random(-0.3, 0.6);
        arc(this.x, this.y, this.diameter / innerCircleScaledDownFactor, this.diameter / innerCircleScaledDownFactor, startAngleRotatet, endAngleRotatet);


        //HIGHLIGHTS ------------
        //based on the parent color we make it very bright most often
        strokeWeight(circleStrokeWeight * 0.2);
        stroke(r + random(70, 120), g + random(70, 120), b + 180);

        //we place the highlight sometimes before and sometimes after the end of the main circle to get a bit of a fluent effect
        //also sometimes there will be a white circle which feels like another (desolving) phase of main circle
        startAngleRotatet = startAngle + startAngle * random(-0.05, 0.251);
        endAngleRotatet = endAngle + endAngle * random(-0.2, 0.2);
        arc(this.x, this.y, this.diameter * highlightCircleScaleUpFactor, this.diameter * highlightCircleScaleUpFactor, startAngleRotatet, endAngleRotatet);

    }
}
