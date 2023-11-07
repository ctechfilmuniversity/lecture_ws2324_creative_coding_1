class Circle {
    constructor(x, y, diameter) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;

        this.storeInitialValuesPermanently = true;
        
        this.angleStart = null;
        this.angleEnd = null;
        this.rare1 = null;
        this.rare2 = null;
        this.thickness = null;

    }

    initialize() {
        //MAIN CIRCLE
        //color space is in green to blue
        this.colorSpectrum = color(random(255), random(200, 255), random(100, 255));
        //we save the random color to re-use later for the inner circles but darker
        this.r = red(this.colorSpectrum);
        this.g = green(this.colorSpectrum);
        this.b = blue(this.colorSpectrum);
        //highlight for the main circle, based on its rspective color
        this.colorHighlight = color(this.r + random(70, 120), this.g + random(70, 120), this.b + 180);
        //rotate for organic look
        //this.randomAngleStartHighlight = random(-0.05, 0.25); //only spot where start can overtake end
        //this.randomAngleEndHighlight =  random(0.15, 0.3);
        this.randomAngleStartHighlight = random(-0.05, 0.15);
        this.randomAngleEndHighlight = random(0.16, 0.3);
        //red tone
        this.colorRare = color(this.r + random(100, 250), this.g - random(60, 90), 100);
        // we change the color here based on the parent-circle and make it darker
        this.colorSpectrumShift = color(this.r - random(20), this.g - random(50, 120), this.b - 80);

        //INNER CIRCLE
        //Values for rotating all circles a bit for organic look, 
        // they are based off MAIN CIRCLE which rotation is defined at instance creation
        this.colorSpectrumStrongShift = color(this.r - random(220), this.g - random(50, 60), this.b - random(200));
        this.randomStrokeWeight = random(0.1, 0.2);
        this.randomAngleStartInner = random(0.21, 0.3);
        this.randomAngleEndInner = random(0.31, 0.45);
        this.randomAngleStartInnerThin = random(-0.5, 0.3);
        this.randomAngleEndInnerThin = random(0.31, 0.9);

    }

    //drawing all circles in here


    drawCircles(angleStart, angleEnd, rare1, rare2, newThickness) {

        //pass values to instance of class so we can acess this later
        //do only once
        if (this.storeInitialValuesPermanently) {
            this.angleStart = angleStart;
            this.angleEnd = angleEnd;
            this.rare1 = rare1;
            this.rare2 = rare2;
            this.thickness = newThickness;
            //this.thickness = newThickness;

            this.storeInitialValuesPermanently = false;
        }
        
        //TODO: put each circle in its own function for cleaner code
        //------------MAIN CIRCLE------------
        noFill();

        //add some rare color 10% of the time
        if (rare1) {
            stroke(this.colorRare);
        } else {
            stroke(this.colorSpectrum);
        }
        //shift weight over time
        //let weight = this.shiftedOverTime(this.thickness, newThickness, this.shiftThickness);

        //check if we are already there
        let difference = Math.abs(this.thickness - newThickness);
        if (difference < 20){
            this.thickness = newThickness;
            //this.keepShifting = false;
        }else{
            this.thickness = newThickness; //temp fix
            //TODO: why does this not work:
            //this.thickness = this.equalize(this.thickness, newThickness);
        }
        
        


        strokeWeight(this.thickness);
        arc(this.x, this.y, this.diameter, this.diameter, angleStart, angleEnd);

        //------------INNER CIRCLE ------------
        strokeWeight(this.thickness * innerCircleStrokeWeightScaleFactor);
        // we change the color here based on the parent-circle and make it darker

        //10% of the time we shift the hue strongly to make it more pretty
        if (rare2) {
            stroke(this.colorSpectrumStrongShift);
        } else {
            stroke(this.colorSpectrumShift);
        }
        //we want the inner circle to be rotated based on the original angle, and sometimes shorter/longer than the original 
        let angleStartRotated = angleStart + angleStart * this.randomAngleStartInner
        let angleEndRotated = angleEnd + angleEnd * this.randomAngleEndInner;
        //arc(x, y, diameter / innerCircleScaledDownFactor, diameter / innerCircleScaledDownFactor, startAngleRotatet , endAngleRotatet );
        //mod to avoid small circles clipping. Quick hack
        arc(this.x, this.y, this.diameter / innerCircleScaledDownFactor, this.diameter / innerCircleScaledDownFactor, angleStartRotated / innerCircleScaledDownFactor, angleEndRotated / innerCircleScaledDownFactor);

        //INNER CIRCLE THIN STROKE
        //based on the parent color we make it very bright most often
        strokeWeight((this.thickness * innerCircleStrokeWeightScaleFactor) * this.randomStrokeWeight);
        //we place the highlight sometimes before and sometimes after the end of the main circle to get a bit of a motion effect
        //randomly there will be a almost full white circle which feels like another (dissolving) phase of main circle
        angleStartRotated = angleStart + angleStart * this.randomAngleStartInnerThin;
        angleEndRotated = angleEnd + angleEnd * this.randomAngleEndInnerThin;
        arc(this.x, this.y, this.diameter / innerCircleScaledDownFactor, this.diameter / innerCircleScaledDownFactor, angleStartRotated, angleEndRotated);


        //------------HIGHLIGHTS MAIN CIRCLE------------
        //based on the parent color (main circle) we make it very bright most often
        strokeWeight(this.thickness * 0.2);
        stroke(this.colorHighlight);
        //we place the highlight sometimes before and sometimes after the end of the main circle to get a bit of a motion effect
        angleStartRotated = angleStart + angleStart * this.randomAngleStartHighlight;
        angleEndRotated = angleEnd + angleEnd * this.randomAngleEndHighlight;
        arc(this.x, this.y, this.diameter * highlightCircleScaleUpFactor, this.diameter * highlightCircleScaleUpFactor, angleStartRotated, angleEndRotated);

    }

    equalize(currentValue, endValue) {
        
        let difference = currentValue - endValue;
        //*-1 makes sure start value makes sure the difference is substracted when start is bigger than end, and vice versa
        let step = (difference / 1000) * -1;
        currentValue = currentValue + step;


        return currentValue;

    }
}
