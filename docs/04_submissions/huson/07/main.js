//scene.js

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {GUI} from 'lil-gui';

// We want to use the "OrbitCamera" addon provided by three.JS
// We need to import it from the folder and give the imported object (the addon) a name: "OrbitControls"
// This information is given to us by the library
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// SCENE
const scene = new THREE.Scene();

//GUI 
const gui = new GUI({title: "Inspector"});

// A fog is implemented to give distance to the scene and smoothly transition from the bottom plane to the background color
scene.background = new THREE.Color('#B6D0E2');
scene.fog = new THREE.FogExp2(scene.background, 0.01);

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = -5;
camera.position.y = 2;


// RENDERER
const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const gridHelper = new THREE.GridHelper(300, 300);
scene.add(gridHelper);

const loader = new GLTFLoader();
var model;

loader.load( '/moss.glb', function ( gltf ) {
    model = gltf;
	scene.add( gltf.scene );
    //model.scene.position.set(1, 1, 1);
    
    const controllerXPos = gui.add(model.scene.position, "x", -20, 20);
    const controllerYPos = gui.add(model.scene.position, "y", -20, 20);
    const controllerZPos = gui.add(model.scene.position, "z", -20, 20);
    controllerXPos.name("Position X");
    controllerYPos.name("Position Y");
    controllerZPos.name("Position Z");

    /*const controllerXRot = gui.add(model.scene.rotation, "x", 0, 360);
    const controllerYRot = gui.add(model.scene.rotation, "y", 0, 360);
    const controllerZRot = gui.add(model.scene.rotation, "z", 0, 360);
    controllerXRot.name("Rotation X");
    controllerYRot.name("Rotation Y");
    controllerZRot.name("Rotation Z");*/
    console.log(model.scene.scale.x);

    const controllerXScale = gui.add(model.scene.scale, "x", 0, 20);
    const controllerYScale = gui.add(model.scene.scale, "y", 0, 20);
    const controllerZScale = gui.add(model.scene.scale, "z", 0, 20);
    controllerXScale.name("Scale X");
    controllerYScale.name("Scale Y");
    controllerZScale.name("Scale Z");

}, undefined, function (error){
    console.error(error);
} );

// We want light to cast a shadow, so we have to enable a shadowMap with certain properties in the render pipeline
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);


// CONTROLS FOR NAVIGATION
// Here the camera is given to OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// LIGHTING
// AMBIENT
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// GEOMETRY
// PLANE
const planeGeometry = new THREE.PlaneGeometry(300, 300);
const planeMaterial = new THREE.MeshStandardMaterial({ color: '#0478a1' });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.position.y = -10;
// Enable shadows on the plane
planeMesh.receiveShadow = true;
scene.add(planeMesh);


var boolean = false;
// ANIMATE/RENDER like draw() in p5
function animate() {
    requestAnimationFrame(animate);
    if (model != undefined && !boolean){
        console.log(model);
        boolean = true;
    }
    renderer.render(scene, camera);
}

animate();