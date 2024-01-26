---
layout: default
title: Session
nav_exclude: true
---


# Creative Coding I

Prof. Dr. Lena Gieseke \| l.gieseke@filmuniversitaet.de  \| Film University Babelsberg KONRAD WOLF
  


# Session 07 - Asynchronism

Please complete this session by Jan. 16. Completing the session should take < 8h (4h CC1 + 4h TABG). 


* [Creative Coding I](#creative-coding-i)
* [Session 07 - Asynchronism](#session-07---asynchronism)
    * [JavaScript Functions \& Asynchronism](#javascript-functions--asynchronism)
        * [Task 07.01](#task-0701)
        * [Task 07.02 - Practice Higher Order Functions and Using the Browser Console](#task-0702---practice-higher-order-functions-and-using-the-browser-console)
    * [Debugging](#debugging)
        * [Task 07.03 - Reading](#task-0703---reading)
        * [Task 07.04 - Level 2](#task-0704---level-2)
    * [Three.js](#threejs)
        * [Task 07.06 - Local Installation](#task-0706---local-installation)
        * [Task 07.07 - Your Own Scene](#task-0707---your-own-scene)
    * [Learnings](#learnings)



In this session we are dealing with the topic of *asynchronism*, where we encounter it in every day life and what it means for us as humans. In terms of tech, this session introduces you to some web-specific JavaScript functionality and syntax, which we will need in the upcoming sessions.  


## JavaScript Functions & Asynchronism

### Task 07.01

Re-cap the sections in the script regarding higher order functions and their different syntax formats:

* [Higher Order Functions](../../02_scripts/cc1_ws2324_04_javascript_script.md#higher-order-functions)
* [Anonymous Functions](../../02_scripts/cc1_ws2324_04_javascript_script.md#anonymous-functions)
* [Arrow Functions](../../02_scripts/cc1_ws2324_04_javascript_script.md#arrow-functions)
* [Asynchronism](../../02_scripts/cc1_ws2324_04_javascript_script.md#asynchronism)

At the very least make sure that you understand the underlying functionality and that you will be able to work with the syntax when given to you, e.g., from a framework. 

### Task 07.02 - Practice Higher Order Functions and Using the Browser Console

Re-cap the TODOs in the code comments in the given code file [`cc1_ws2324_functions.js`](cc1_ws2324_functions.js) and make sure that you can solve them on your own.

You can execute the file with `node cc1_ws2324_functions.js`.


## Debugging

### Task 07.03 - Reading

Read through the debugging script:

* [Debugging](../../02_scripts/cc1_ws2324_07_debugging_script.md)

### Task 07.04 - Level 2

Do you have any additional tips, tricks and tools that help with debugging?

Can't name any to be honest. 

## Three.js

### Task 07.06 - Local Installation

Install node and npm and all needed packages locally. Use for Task 07.07 a local installation and submit your `package.json` (do not submit the `node_modules` folder!!)


### Task 07.07 - Your Own Scene

Create a Three.js scene up to your liking. There are no constraints for what the scene should be. The result should be polished and will be graded on concept, form / design and implementation quality.

You might want to check the [three.js manual](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) for further functionality, such as [loading 3D models](https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models), or from [useful libraries](https://threejs.org/docs/index.html#manual/en/introduction/Libraries-and-Plugins).

Submit all required source files (scene, assets, `package.json`, etc.) and add or link result images in your submission file.


## Learnings

Please summarize your personal learnings (text or bullet points - whatever you prefer). What was challenging for you in this session? How did you challenge yourself?

- Node Server & NPM Workflow was completely new for me, setup was somehow challenging for me - missed some steps in the lesson 
- Anonymous Function & Arrow functions we're also totally new for, the syntax was a bit challenging because bit unusual for me, but im happy to know it now - it almost immediately enabled me to understand the code of external js scripts, i was trying around with, more in depth 
- i struggled a bit with finding a idea what i want to challenge myself with / what kind of three.js scene i want to create. I decided to check how webGl is setup in three.js materials, which wasnt really challenging, i was quite amazed how fast & easy it works inside the same js script. 
- Coming up with some cool GlSL Code however was more challenging, i started with passing time, mousePos, aspectRatio to the shader and tried to make a circle around the mouse with a formula i lately seen in a touchdesigner GLSL tutorial. 



---

Answer all questions directly in a copy of this file and also link and display your images in that file. Submit your copy as `cc1_ws2324_XX_lastname.md` in your assignments folder.

---


**Happy Building!**
