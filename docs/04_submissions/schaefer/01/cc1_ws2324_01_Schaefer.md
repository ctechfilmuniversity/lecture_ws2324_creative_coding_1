---
layout: default
title: Session
nav_exclude: true
---


# Creative Coding I

Prof. Dr. Lena Gieseke \| l.gieseke@filmuniversitaet.de  \| Film University Babelsberg KONRAD WOLF
  

# Session 01 (10 points)

Please complete this session by October 24. Going through the scripts and answering the questions should take < 4h.  

This session is all about diving into the topic of creative coding and getting ready for action 😊.

* [Creative Coding I](#creative-coding-i)
* [Session 01 (10 points)](#session-01-10-points)
    * [Syllabus and Administration](#syllabus-and-administration)
        * [Task 01.01](#task-0101)
    * [Topics](#topics)
        * [Task 01.02](#task-0102)
    * [Introduction](#introduction)
        * [Task 01.02](#task-0102-1)
        * [Task 01.03](#task-0103)
        * [Task 01.04](#task-0104)
            * [Option A](#option-a)
            * [Option B](#option-b)
    * [Setup](#setup)
        * [Task 01.05](#task-0105)
        * [Task 01.06](#task-0106)
            * [Level 1](#level-1)
            * [Level 2](#level-2)
    * [Learnings](#learnings)

## Syllabus and Administration

Read the [Syllabus](../../index.md) carefully and know how this class works and what I expect of you.

### Task 01.01

Are there any open questions regarding the syllabus and the administration of this course? If so, please mention them next class.

## Topics

### Task 01.02

Please answer the following questions truthfully so that I can setup the lecture accordingly.

* Overall, how would you rate your skill level of programming?
    * [ ] Never done it
    * [ ] Novice
    * [x] Intermediate
    * [ ] Advanced
    * [ ] God-like
* Have you used object oriented programming before?
    * [ ] I don't know what that is
    * [ ] I know the concept but I have never implemented it
    * [x] Yes
* Overall, how would you rate your skill level of using web technologies, such as JavaScript?
    * [ ] Never done it
    * [x] Novice
    * [x] Intermediate
    * [ ] Advanced
    * [ ] God-like
* How would you rate your skill level of working with Git and GitHub?
    * [ ] Never done it
    * [x] Novice
    * [ ] Intermediate
    * [ ] Advanced
    * [ ] God-like
* Are there any specific topics that would interest you in the context of this lecture and that haven't been mentioned so far? *If not, you can skip this question.*
* Is there anything else that you would like me to know in regard to this class? *If not, you can skip this question.*



## Introduction

Recapture [Script 01 - Introduction](../../02_scripts/cc1_ws2324_01_intro_script.md).

### Task 01.02

Are there any languages, tools or environments for creative coding that you know of and which are not included in the script? *If not, you can skip this question.*

- Vex in Houdini
- Glsl (in TouchDesigner)
- (Javascript in MaxMSP (not really something not included in the script as its just normal javascript. but thought of in the combination with audio programming in max, it might be a interesting environment for the generation of audiovisual contents (tho the audio coding site in max isn't necessarily textbased)))
### Task 01.03

Think a bit about your own personal motivation to learn creative coding. What would you like to do with coding and the topics in this class? What kind of final creative coding project is of interest to you? 

Generally im interested in getting better at creative coding, especially in the languages Javascript, Glsl, Vex. What i want to do with it (in this class) can be best described as building some kind of reusable groundwork (eg. a tool, a toolkit, a pipeline or single parts) for bigger projects in the future. 

Final Project ideas and motivations regarding different languages & environments:

- Javascript & Webdevlopment: I need a portfolio website / personal website, therefore coding a website which is being a bit playful but mainly useful/functional in that terms, could be a good final creative coding project to do in this class. I used p5.js already, would be more interested in the other librarys mentioned in the slide like threed.js. 

- Javascript in Max: It would be interesting for me to code a 3D particle system / agent system and use those in the framework of the software MaxMSP as modulation source for sound synthesis. Here it would be  important for me the cotextualize it inside the bigger framework of maxMSP as a useful base for the development of a computer-graphics-inspired audiovisual instrument.

- Glsl: I made some experience in the last couple of months. What interests me in coding Glsl is less the writing of shaders to generate interesting images but more the ability to do efficient, parallel computations on the graphics card as variables and data can be stored in gpu memory buffers as textures and pixels. What i was working on in this field was also a particle system, implemented on a compute shader in TouchDesigner. For future development of it, i would be interested in implementing more complex particle behaviour and forces like physics & agent behaviours. As a general workflow i could imagine to code/sktech in Javascript first and then later implement it in Glsl. Final Project Idea: https://github.com/JoEL8129/3D-DMX-Controller


### Task 01.04

#### Option A

Find an existing creative coding project that you like. Coding needs to play a significant role for the project, also ideally it is web-based (this is not a hard requirement). Describe what you like about the project and why you think that the project represents creative coding.

Submit a short text and any other material you like (weblinks, images, videos).




##### **Datamatics**

First of all, it has to be noticed that this piece by Ryoji Ikeda & his team is purely done in the visual programming environment "PureData", therefore it seems likely that text-based programming might not have been that relevant for the development. Nevertheless i think it is a good example for creative coding. 

I especially like the aesthetics of this project. The sound and visuals feel incredibly merged. In a purely sensory experience one feels like being thrown into a server room, but more as becoming part of a server network yourself, therefore being aware and directly receptive to the massive data flow in that interconnected system full of various represantations of data and computation. For me, the meaningfulness of the expressed contents emerges intrinsically from its aesthetically rich expression.   

I think it represents creative coding because it is an artistic piece, a composition, so speaking an outcome of creative work, which has been created with the use of (high level) programming and  algorithms. 

- https://www.ryojiikeda.com/project/datamatics/

##### **Alien Project**

"**Ar**tificial **LIfe ENvironment (ALIEN)** is an artificial life simulation tool based on a specialized 2D particle engine in CUDA for soft bodies and fluids. Each simulated body consists of a network of particles that can be upgraded with higher-level functions, ranging from pure information processing capabilities to physical equipment (such as sensors, muscles, weapons, constructors, etc.) whose executions are orchestrated by neural networks. The bodies can be thought of as agents or digital organisms operating in a common environment. Their blueprints can be stored in genomes and passed on to offspring."

Extremly interesting creative coding project, very sophisticated evolutionary agent simulation, beautiful to observe digital entities evolving into more complex "creatures". 

- https://www.alien-project.org/index.html

##### **Emissaries**

Not really a classical creative coding project i would say, but the main idea behind it - Storytelling & Story Development through algorithms & AI (NPCs) relies heavily on creative coding one could argue. Therefore i find fitting to name here. The idea of creating something like a movie where there is a certain aspect of autonomy in the characters and a certain amount of freedom / unpredictability in the characters decision making ( & the relevancy for the main story in that) i found a highly interesting approach. 

- http://iancheng.com/emissaries
#### Option B

Come up with your own creative coding project idea of any scope (no worries, you don't have to actually implement it). Coding needs to play a significant role for the project, also ideally it is web-based (this is not a hard requirement). Describe why you think the idea represents creative coding and why you want to do it.

Submit a short text and any other material you like (weblinks, images, videos).
 
## Setup

In summary, for the lecture you will need to be able to work with

* a development environment, e.g. Visual Studio Code,
* GitHub, and
* the console.

For this session, our goal is for all of you to know how to access and work with the course material. This implies an understanding of Markdown and GitHub and having a development environment ready.

### Task 01.05

Get a development environment, which includes accessing GitHub, ready and familiarize yourself with it as much as you can.

The scripts

* [Script 02 - Setup](../../02_scripts/cc1_ws2324_02_setup_script.md) (Sections [Markdown](../../02_scripts/cc1_ws2324_02_setup_script.md#markdown) & [Development Environment](../../02_scripts/cc1_ws2324_02_setup_script.md#development-environment))
* [Script 03 - GitHub](../../02_scripts/cc1_ws2324_03_github_script.md)

will help you to get there. It is up to you to decide how much effort you need to put in, to get your setup working. 

### Task 01.06

#### Level 1

* With which tool / environment will you work with GitHub?
    * *I urge you to not simply use the basic functionality on the GitHub website (e.g. to upload a file). This might feel easier in the beginning but will not function later on...*
* With which development environment will you use?
* Are there any open questions for working with the course material and GitHub? 

I will work with the Github Desktop App & Visual Studio Code.

#### Level 2

* What is your setup and why does it work well for you?
* Investigate something for your environment or GitHub that you haven't used before. Describe it briefly.
* Do you have any aspects, experiences, tips, etc. for working with GitHub that could be helpful to know for beginners?
* Check with your classmates who do not have any experiences with GitHub yet and support them, if needed.
* Are there any open questions for working with the course material and GitHub?

I will work with the Github Desktop App, Visual Studio Code, and, for simple usecases (like cloning a git) also git bashes via the console.  The Github Desktop App worked well for me so far, the reasons for preferring git functionality via an app are purely bound to the fact that i got used to that when i started working with gits. When i realize that there essential advantages in using git via command line im open to switch, but till now i would stay with the Desktop App because i personally feel more comfortable with it. As i see myself as novice regarding the use of git, i can't think of useful experiences or tips i could share..

The thing i'm about to investigate which i haven't used so far will be the Github Copilot Extension (can we get access to that from the ctechfilmuniversity github account? i registered for educational github plan but somehow the Copilot functionality doesn't seem to be included)
## Learnings

Please summarize your personal learnings (text or bullet points - whatever you prefer). What was challenging for you in this session? How did you challenge yourself?

- switching to VS Code
- thinking of final project ideas and the possible environments for realization
---

Answer all questions directly in a copy of this file and also link and display your images in that file. Submit your copy as `cc1_ws2324_XX_lastname.md` in your assignments folder.

---

**Happy Motivating!**