---
layout: default
title: Session
nav_exclude: true
---
Marek Plichta 

### Task 07.07 - Your Own Scene

### Concept: 

I wanted to learn Unity's UI system and create something that incorporates standard buttons and sliders. My concept centered around celebrating 'the interface,' making it the protagonist rather than a sidekick. The general idea was to develop a toy/game that required exploration through a strange and alien interface.

Unity is a powerful engine, but achieving many simple things can be surprisingly complicated. Unity has three different UI systems, the latest of which mimics web development. While this seems like a great idea, unfortunately, many details are not well-implemented. Thus, I spent most of my time grappling with the odd quirks of Unity and learned a lot in the process. However, I also had to program some of the features I wanted in a cumbersome manner. Other features I simply ran out of time to implement, as I was surprised by the difficulty of replicating some standard web behaviors in Unity. An example of this is creating a button that toggles instead of merely activating while pressed.  

I didn't add a build to the repo because the aspect ratio of a screen can totally destroy my design which I only noticed in the end. My app was designed for the iPhone, but even on mac everything is broken. So I just attached a video and the Unity project file. If you run the project please use a portrait mode aspect ratio.

[plichta_video2.mov](Videos%2Fplichta_video2.mov)

## Learnings

**Learned:**
* About the differences between Unity's various UI systems: IMGUI, uGUI, and UI Toolkit. The latter is based on web technologies and somewhat resembles CSS/JavaScript.
    * Unity can run these different frameworks in parallel, as each has its own set of advantages and disadvantages.
    * For instance, UI Toolkit is suitable for larger projects and helps maintain a consistent style.
    * IMGUI is more effective for in-world UIs that float in 3D space, though UI Toolkit can also be used in the world with certain workarounds and applied to textures.
* How to group elements and use flexible alignment patterns similar to divs in web development.
* About the differences between margin and padding.
* How to extract a style class from an already set up visual element.
* How to apply and modify classes for all its elements.
* How to use pseudo-classes for styles like hover and quickly preview them in Unity's UI Builder without playing the scene.
* How to create dynamic animations for transitions between button states.
* That certain parameters, such as checkbox sizes, cannot be directly edited in the UI Builder and must be modified in code.
* That dealing with various aspect ratios and UI layouts are challenging aspects of UI design.

![screenshot.jpg](Videos%2Fscreenshot.jpg)