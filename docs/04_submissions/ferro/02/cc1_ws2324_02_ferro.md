---
layout: default
title: Session
nav_exclude: true
---


# Creative Coding I

Prof. Dr. Lena Gieseke \| l.gieseke@filmuniversitaet.de  \| Film University Babelsberg KONRAD WOLF
  


# Session 02 - Emergence (10 points)

Please complete this session by November 7th. Completing the session should take < 4h.  

In this session we are going to think about the topic of *emergence* and what it means to create an aesthetic output with code. In terms of tech this session is all about getting into coding and doing a practical exercise with p5.

- [Creative Coding I](#creative-coding-i)
- [Session 02 - Emergence (10 points)](#session-02---emergence-10-points)
  - [JavaScript](#javascript)
  - [p5](#p5)
    - [Task 02.01 -  Motivation](#task-0201----motivation)
    - [Answer](#answer)
    - [Task 02.02 - *p5 With The Online Editor*](#task-0202---p5-with-the-online-editor)
      - [Experiments](#experiments)
    - [Task 02.03 - The 10 PRINT pattern](#task-0203---the-10-print-pattern)
    - [Answer](#answer-1)
  - [Emergence](#emergence)
    - [Task 02.04 - Conceptualization](#task-0204---conceptualization)
    - [Answer:](#answer-2)
  - [Learnings](#learnings)
      - [Personal Learnings:](#personal-learnings)
      - [Challenge:](#challenge)

## JavaScript

In this lecture, we are going to work with JavaScript. JavaScript is as language quite easy. It only becomes complicated in the context of web development. For now, we don't care about web development specifics.

As of now, you should have a working understanding of variables and basic program structures such as if, loops and functions in JavaScript. You do not need to memorize the theory of any of these topics, all I care about is that you know how to use them in the coding exercise.

As a reference there is [Script 04 - Javascript](../../02_scripts/cc1_ws2223_04_javascript_script.md). This script gets for certain topics quite into detail and it is meant as interesting reference for all, beginners to experts. I will later add to the scripts with further topics.

If you are a beginner you might want to look into these basics:

* [JavaScript.info: Variables](https://javascript.info/variables)
* [JavaScript.info: if](https://javascript.info/ifelse)
* [JavaScript.info: loops](https://javascript.info/while-for)

Or you can use any resources you like. 

## p5

If you are a beginner you can find detailed and slowly explained information in the scripts of my [*Creative Coding for Beginners Course*](https://ctechfilmuniversity.github.io/lecture_ss23_creative_coding_for_beginners/02_scripts/).

Also, please refer to [p5's reference](https://p5js.org/reference/). It is well-made.

### Task 02.01 -  Motivation

Find two p5 sketches that you like from two different sources, e.g., on [p5 examples](https://p5js.org/examples/) (btw., you can also directly access the examples in the online editor under `File -> Examples`), [OpenProcessing](https://www.openprocessing.org/), [Generative Design](http://www.generative-gestaltung.de/2/). 
  
Submit the links and a brief explanation for each why you like the sketch.

### Answer

[Link_01](http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_2_5_02)

I like that it gives the user the possibility to draw but it the meantime it would also draw on its own. It felt like a speed game between me and the visual.

[Link_02](http://www.generative-gestaltung.de/2/sketches/?02_M/M_1_5_02)

I find the visual aesthetically pleasing and captivating. I also thought it would have been nice to have the concentration of the lines mapped onto the mouse position. 

### Task 02.02 - *p5 With The Online Editor*

Create a account for the [p5 online editor](https://editor.p5js.org/) and work with the online editor (we will move on from this environment soon though).  
  
*Tipp*: Right click on the canvas in the p5 editor and chose `Save image as...` to save an image of your canvas.

#### Experiments
![Image_01](cc1_ws2324_02_02_ferro_01.png)

[Online view](https://editor.p5js.org/tanz.ania/full/Qy5FUJZ_K)
![Image_02](cc1_ws2324_02_02_ferro_02.png)


### Task 02.03 - The 10 PRINT pattern

1. Write a p5 sketch that generates a pattern with a similar logic as the 10 PRINT example. Your pattern should follow an element-by-element and row-by-row iterative creation process. If you are a beginner, you can use [the code from the slides](https://editor.p5js.org/legie/sketches/nrfQTzxMI) as basis (fully understand it first though!). The overall goal is to create a visual pleasing or interesting pattern. 
2. Make the pattern interactive by mapping at least two changeable visual characteristics to the mouse and / or keys and / or any type of user interaction you want. Look at p5's references for the different interaction possibilities.

You can find information about p5's basic interaction capabilities in [*Creative Coding for Beginners Course: Program Flow*](https://ctechfilmuniversity.github.io/lecture_ss23_creative_coding_for_beginners/02_scripts/ccfb_ss23_04_flow_script.html#interaction).

If you have further ideas about how to design the pattern and interactions but do not manage to implement them, also submit your ideas in text or image form.

Submit the sketch file as `cc1_ws2324_02_04_lastname.js` and at least one png preview image of your pattern as `cc1_ws2324_02_04_lastname_01.png` in your assignments folder `lastname/02`. Also link the image in your questions file.

### Answer
[Sketch File](cc1_ws2324_02_04_ferro.js)

[Online View](https://editor.p5js.org/tanz.ania/full/LpSVn1VtC)

[Image_01](cc1_ws2324_02_04_ferro_01.png)

![Image_01](cc1_ws2324_02_04_ferro_01.png)

[Image_02](cc1_ws2324_02_04_ferro_02.png)

![Image_02](cc1_ws2324_02_04_ferro_02.png)



## Emergence

### Task 02.04 - Conceptualization

Come up with an idea for a creation that includes emergent behavior, where the sum of its parts creates the overall piece. This can be a visual concept, e.g., once more a repetitive visual pattern, but doesn't have to. You can go beyond visual pattern and you could also consider music, language, performance, social scenarios, etc..

Submit a short description and ideally, if possible, a preview image (this can be drawn by hand).

### Answer:

Every triangle has a rondom rotation and size. The triangles do not intersect. Various option:

* Starting with a triangle, every corner is the beginning of another triangle. 
* Starting with a right triangle, every corner is the beginning of another right trinagle.
* Starting with a triangle, another one is drawn with a side parallel to one of the previous triangle.

![Image_01](cc1_ws2324_02_04_ferro_05.png)


## Learnings

Please summarize your personal learnings (text or bullet points - whatever you prefer). What was challenging for you in this session? How did you challenge yourself?
#### Personal Learnings:

* working with p5 editor 
* understanding for loops and if/else sentences
* went through the creative cording for beginners script

#### Challenge:

* trying to recreate a 2D loop
* working with different functions
* aiming to a pleasing visual outcome
* trying small changes into the visual to better understand the syntax of for loops and if/else statement
* difficulties in understanding the interaction process

  



---

Answer all questions directly in a copy of this file and also link and display your images in that file. Submit your copy as `cc1_ws2324_XX_lastname.md` in your assignments folder.

---


**Happy Emerging!**
