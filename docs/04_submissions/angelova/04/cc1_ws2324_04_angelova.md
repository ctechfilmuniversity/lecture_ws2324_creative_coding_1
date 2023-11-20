---
layout: default
title: Session
nav_exclude: true
---


# Creative Coding I

Prof. Dr. Lena Gieseke \| l.gieseke@filmuniversitaet.de  \| Film University Babelsberg KONRAD WOLF

# Session 04 - Connection (10 points)

Please complete this session by November 23rd, 10:00 (just before class). Completing the session should take < 4h.  

In this session we are dealing with the topic of *connection* and what the web means. In terms of tech, this session introduces you to p5 libraries and the different components a website is made of. Also, this will be the last exercise with p5 and in 2D. 

* [Creative Coding I](#creative-coding-i)
* [Session 04 - Connection (10 points)](#session-04---connection-10-points)
    * [The Web](#the-web)
        * [Task 04.01 - Ingredient of the Web](#task-0401---ingredient-of-the-web)
    * [Connection](#connection)
        * [Task 04.02 - Connection to the Outside](#task-0402---connection-to-the-outside)
    * [Learnings](#learnings)

## The Web

Re-capture [Script 06 - The Web](../../02_scripts/cc1_ws2324_06_web_script.md).

### Task 04.01 - Ingredient of the Web

I chose my old simple sketch about [finding the circle](https://editor.p5js.org/gallllina/sketches/YrWhzcuAL) and added some nice styling to my *h1* and *p* tags, using the following css properties:

```css
font-variant: small-caps slashed-zero;
font-style: oblique 20deg;
```

I also adjusted the positioning of some elements. For example, I took the header outside of the normal flow with `position: absolute`, in order to make it cover the top edge of the canvas just a little bit. Moreover, I added some dynamic styling in the `.js` sketch.

<img src="./img/find-circle.gif" width=400 />

## Connection

### Task 04.02 - Connection to the Outside

I did this task in group with Joel. Our initial idea was to make a simple sketch which uses the camera and tracks our hands. On detection of landmarks of *two* hands, some wavy lines should be drawn between the corresponding fingers, *connecting* the hands to one another. We chose to use the *Mediapipe library API* for the browser, because it allows tracking of more than one hand, contrary to the ml5 implementation. All source files are in the `./src` folder.

Some examples here:

<img src="./img/lines-0.gif" width=400 />
<img src="./img/lines-1.gif" width=400 />

## Learnings

For this session, I tried out the [ml5](https://ml5js.org/) library for the first time and I was impressed that the pre-trained models work pretty well off-the-shelf. Moreover, I explored further the *MediaPipe Hands* pre-trained model, since this one offers hand recognition of two or more hands, which was our idea for [Task 04.02](#connection). In addition to the practical exercises, I also really enjoyed the lecture. On the one hand, because I simply love web development, and on the other, because while refreshing my knowledge of the basics, I could ask myself some interesting questions and, therefore, explore further topics I have not thought about much before - for instance - *Why is the DOM represented as a tree structure* or *Why do we have all the different browsers*. I also spent some time on [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/CSS), reading about how different css properties behave, because one can never really learn them all. 🤯

---
