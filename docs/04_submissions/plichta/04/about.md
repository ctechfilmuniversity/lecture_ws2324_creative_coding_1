---
layout: default
title: Session
nav_exclude: true
---


## Connection

### Task 04.02 - Connection to the Outside

## Idea: 

We started out by taking a look at all the libraries listed on the P5 website, especially the ML5.js library. Here we liked the face mesh library the most, so we decided to work with that one! (https://learn.ml5js.org/#/reference/facemesh)

The idea of "connecting" two faces came up really early, so we brainstormed a bit on how to achieve something visually and conceptional interesting. 

### Here are some pictures of our WIP:
![wip_image_0.jpg](pictures%2Fwip_image_0.jpg)
![wip_image_1.png](pictures%2Fwip_image_1.png)
![wip_image_2.jpg](pictures%2Fwip_image_2.jpg)
![wip_image_4.gif](pictures%2Fwip_image_4.gif)
![video](Bildschirmaufnahme 2023-11-22 um 16.05.27.mov)


We also found the Perlin Noise example from the c2.js library very interesting (https://renyuan.io/c2.js/examples.html?name=Perlin),so we wanted to incorporate this into the face tracking. The idea was to take the term "connecting" very literal and connect the two faces by electricity.
As it turned out, merging the two different libraries together wasn´t that easy, so we tried to recreate the noise effect ourself in vanilla P5- which worked pretty well! 
(@marek maybe talk about the wandering face lines)

Afterwards we added a glow effect to make it prettier and sound to make it a bit more immersive :smile: 

## Challenges: 

It was a bit tricky to figure out how to access the individual tracked points of the mesh. Also we needed to do some math 😵‍💫 to be able to connect the two points by a line depending on their x and y values. 