---
layout: default
title: Session
nav_exclude: true
---

# CC1 WS2324 01 Maas
23.10.2023

### Task 01.01

Are there any open questions regarding the syllabus and the administration of this course? If so, please mention them next class.


### Task 01.02

Please answer the following questions truthfully so that I can setup the lecture accordingly.

* Overall, how would you rate your skill level of programming?
    * [ ] Never done it
    * [X] Novice
    * [ ] Intermediate
    * [ ] Advanced
    * [ ] God-like
* Have you used object oriented programming before?
    * [X] I don't know what that is
    * [ ] I know the concept but I have never implemented it
    * [ ] Yes
* Overall, how would you rate your skill level of using web technologies, such as JavaScript?
    * [X] Never done it
    * [ ] Novice
    * [ ] Intermediate
    * [ ] Advanced
    * [ ] God-like
* How would you rate your skill level of working with Git and GitHub?
    * [X] Never done it
    * [ ] Novice
    * [ ] Intermediate
    * [ ] Advanced
    * [ ] God-like
* Are there any specific topics that would interest you in the context of this lecture and that haven't been mentioned so far? *If not, you can skip this question.*
* Is there anything else that you would like me to know in regard to this class? *If not, you can skip this question.*



### Task 01.02

Are there any languages, tools or environments for creative coding that you know of and which are not included in the script? *If not, you can skip this question.*

### Task 01.03

Think a bit about your own personal motivation to learn creative coding. What would you like to do with coding and the topics in this class? What kind of final creative coding project is of interest to you? 

*Bullet points as answer are sufficient.*

```
So far I lack a basic understanding of coding. While I have managed to create a first game using Unity and C#, I would describe the code as very poor and inefficient. So I hope to understand and learn coding principles to be able to tackle more complex projects in the future. I am particularly interested in game and interactive media development, so I would like to learn common languages for game development, such as C++ and C#. 

```

### Task 01.04

#### Option B

Come up with your own creative coding project idea of any scope (no worries, you don't have to actually implement it). Coding needs to play a significant role for the project, also ideally it is web-based (this is not a hard requirement). Describe why you think the idea represents creative coding and why you want to do it.

Submit a short text and any other material you like (weblinks, images, videos).

____
Answer:
```
Idea:

I decided to create my own coding project. I got some inspiration for it from the last CC1 meeting: the examples of coding projects that bring people together impressed me a lot. Also, over the weekend I finally watched the Netflix documentary "My Teacher the Octopus", which has been on my watchlist for a long time as an octopus fan. 

Link: https://www.youtube.com/watch?v=3s0LTDhqe5A 

I was particularly fascinated by the arms of an octopus, in which their highly developed nervous system is located for the most part. In the book "Rendezvous with an octopus" which I read this summer, it is described that the arms of an octopus virtually have a life of their own and can act and react independently.
From this I derived my Creative Coding project: The 8 arms of an octopus should be controllable in multiplayer mode. The goal is to control the animal together with 8 other players so that the everyday tasks of an octopus can be solved, e.g. fleeing from predators, unscrewing a jar with food in it, building a hiding place.

This is supposed to be an online multiplayer game in which people all over the world come together randomly. They have no possibility to communicate verbally with each other. They have to interact only through the gestures of their octopus arm, and work together collectively - across any language barriers. Thus, for example, pointing or waving movements can be used as a means of communication, the players can invent their own form of communication to solve the respective tasks.

The project could be implemented in Unity, for example, but I think it makes more sense for a learing in this course to implement it in the browser using Three.js. Here is a visually very successful example of a browser game with Three.js:

Link: https://summer-afternoon.vlucendo.com

For this, the position of the mouse pointer must be tracked, which correlates with the tip of the octopus arm in the game. The rest of the arm follows this via an inverse IK chain. In addition, actions such as "grabbing" or "sucking" must be possible, triggered via button control. In addition, the camera must be controllable in order to have an overview of the entire room. This could be achieved using web-socket: Mouse movement triggers an event at the other clients, they read current mouse coordinates, and render the position of the octopus arm accordingly.

The idea is for me a good example of creative coding: the focus is not on the usefulness of the code, no existing problem is solved. Rather, coding is done to express an idea - in this case, "Look how hard it is to coordinate 8 arms!" Coding becomes a tool to realize a creative idea.

Sadly as I went deeper into resarch I came across a similar game mechanic https://www.youtube.com/watch?v=AJKtJG7bDME , but I still wanted to share my idea in class. It is quite frustrating that almost every idea I have has already been implemented by someone... 

```
____

### Task 01.06

#### Level 1

With which tool / environment will you work with GitHub?
     *I urge you to not simply use the basic functionality on the GitHub website (e.g. to upload a file). This might feel easier in the beginning but will not function later on...*

```
Since I´ve already worked with VS Code my first setup is VS Code as text editor and Github. I practiced a bit, created a repository and committed files between my locale machine and Github, using the VSCode Source Control. So I feel quite comfortable with this setup. Additionally, I set up GitKraken to get used to a visualization of branches. 

```

With which development environment will you use?

```
macOS, VSCode, GitHub

```

Are there any open questions for working with the course material and GitHub? 

```
Not at the moment!

```

## Learnings

Please summarize your personal learnings (text or bullet points - whatever you prefer). What was challenging for you in this session? How did you challenge yourself?

    - learned what a markdown is 
    - I learned how to implement Git into my VSCode setup and how to work with the CC1 repository
    - I learned the basics of how to navigate the console!
    - the main challange was to get an overview of the Syllabus and to decide what my setup should be as a beginner
    - I challanged myself by creating some example repositorys and practicing with them,looking deeper into the Package Manager Homebrew and taking a look at GitKraken to grasp the concept of branches 
