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
    - [Task 02.02 - *p5 With The Online Editor*](#task-0202---p5-with-the-online-editor)
    - [Task 02.03 - The 10 PRINT pattern](#task-0203---the-10-print-pattern)
  - [Emergence](#emergence)
    - [Task 02.04 - Conceptualization](#task-0204---conceptualization)
  - [Learnings](#learnings)

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

* "RANDOM GROWTH" (https://editor.p5js.org/san.vanderlinden/sketches/WKUfthG7W): This sketch is a simulation of mycelium growth. I like the simplicity of the code and find this to be a good example of emergence. Watching the animation unfold I feel as if I'm watching mycelium decomposing my screen. It's eerie. 
* "Growing Waves Hover" (https://editor.p5js.org/matheusgwagner99/sketches/S8yevlcBH): I find the waves mesmerizing to watch and like the interactivity. The way the yellow circles appear small and blurry, grow clear as they peak in size, then blur, shrink and disappear, is aesthetically pleasing to me. 


### Task 02.02 - *p5 With The Online Editor*

Create a account for the [p5 online editor](https://editor.p5js.org/) and work with the online editor (we will move on from this environment soon though).  
  
*Tipp*: Right click on the canvas in the p5 editor and chose `Save image as...` to save an image of your canvas.


### Task 02.03 - The 10 PRINT pattern

1. Write a p5 sketch that generates a pattern with a similar logic as the 10 PRINT example. Your pattern should follow an element-by-element and row-by-row iterative creation process. If you are a beginner, you can use [the code from the slides](https://editor.p5js.org/legie/sketches/nrfQTzxMI) as basis (fully understand it first though!). The overall goal is to create a visual pleasing or interesting pattern. 
2. Make the pattern interactive by mapping at least two changeable visual characteristics to the mouse and / or keys and / or any type of user interaction you want. Look at p5's references for the different interaction possibilities.

You can find information about p5's basic interaction capabilities in [*Creative Coding for Beginners Course: Program Flow*](https://ctechfilmuniversity.github.io/lecture_ss23_creative_coding_for_beginners/02_scripts/ccfb_ss23_04_flow_script.html#interaction).

If you have further ideas about how to design the pattern and interactions but do not manage to implement them, also submit your ideas in text or image form.

Submit the sketch file as `cc1_ws2324_02_04_lastname.js` and at least one png preview image of your pattern as `cc1_ws2324_02_04_lastname_01.png` in your assignments folder `lastname/02`. Also link the image in your questions file.

* Images: ![Image 1, before interaction](cc1_ws2324_02_04_huson_01.png) ![Image 2, interaction](cc1_ws2324_02_04_huson_02.png)

![pattern_medium](./img/pattern_medium.gif)  
[Credits to be added]

## Emergence

### Task 02.04 - Conceptualization

Come up with an idea for a creation that includes emergent behavior, where the sum of its parts creates the overall piece. This can be a visual concept, e.g., once more a repetitive visual pattern, but doesn't have to. You can go beyond visual pattern and you could also consider music, language, performance, social scenarios, etc..

Submit a short description and ideally, if possible, a preview image (this can be drawn by hand).

* A simple apreggio is played through multiple times, lapping over the individual plays at different points in time, creating harmonies that go beyond any individual apreggio. Toward the end of the recording it becomes difficult to hear any individual apreggio, as so many are playing in parallel. Instead, an ominous drone rings, which sounds more like one entity than many individual ones. 
* Sketch, coded and recored with SuperCollider: <audio src="cc1_ws2324_02_05_huson.wav" controls title="Title"></audio> 

## Learnings

Please summarize your personal learnings (text or bullet points - whatever you prefer). What was challenging for you in this session? How did you challenge yourself?
* Started getting into p5.js & JavaScript, which are both new to me. 
* I'm not that happy with the sketch I did for Task 2.3 and it was born out of playing around without really thinking about what I wanted to do. My resolve for future assignments is to spend more time on the concept before starting to code. 
* I challenged myself by coding the interaction in 2.3, where clicking on a circle will connect it via strokes with all other circles of the same size. I hadn't considered that an instance of an ellipse doesn't have accessible properties, so I had to find a work around for accessing their location by size. 

---

Answer all questions directly in a copy of this file and also link and display your images in that file. Submit your copy as `cc1_ws2324_XX_lastname.md` in your assignments folder.

---


**Happy Emerging!**