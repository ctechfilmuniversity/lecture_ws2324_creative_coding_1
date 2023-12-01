import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// SCENE 
const scene = new THREE.Scene();
const startTime = Date.now() * 0.001;

// A fog is implemented to give distance to the scene and smoothly transition from the bottom plane to the background color
scene.background = new THREE.Color('#003e78');
scene.fog = new THREE.FogExp2(scene.background, 0.02); //OR PLAY AROUND WITH THIS VALUE 

// CAMERA
const fov = 70; 
const aspect = window.innerWidth / window.innerHeight; 
const near = 0.1; 
const far = 100; 
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.y = 90;

// RENDERER 
const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

// CONTROLS FOR NAVIGATION
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.2;

// GEOMETRY 

function fractalSpheres(size, position) {
    const sphereGeometry = new THREE.SphereGeometry(size);
    const sphereMaterial = new THREE.MeshPhongMaterial();
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(position.x, position.y, position.z);
    sphere.userData.initialY = position.y;
    scene.add(sphere);
  
    // recursive calls for creating smaller spheres
    if (size > 1) {
      fractalSpheres(size / 2, {
        x: position.x + 1.5 * size,
        y: position.y,
        z: position.z
      });
  
      fractalSpheres(size / 2, {
        x: position.x - 1.5 * size,
        y: position.y,
        z: position.z
      });
  
      fractalSpheres(size / 2, {
        x: position.x,
        y: position.y + 1.5 * size,
        z: position.z
      });
  
      fractalSpheres(size / 2, {
        x: position.x,
        y: position.y - 1.5 * size,
        z: position.z
      });
  
      fractalSpheres(size / 2, {
        x: position.x,
        y: position.y,
        z: position.z + 1.5 * size
      });
  
      fractalSpheres(size / 2, {
        x: position.x,
        y: position.y,
        z: position.z - 1.5 * size
      });
    }
}

var xSpacing = 43;
var zSpacing = 30;
// generating spheres 
fractalSpheres(15, { x: 0, y: 0, z: 0 });
fractalSpheres(8, { x: xSpacing, y: 0, z: zSpacing });
fractalSpheres(8, { x: -xSpacing, y: 0, z: -zSpacing });
fractalSpheres(8, { x: xSpacing, y: 0, z: -zSpacing });
fractalSpheres(8, { x: -xSpacing, y: 0, z: zSpacing });
fractalSpheres(8, { x: -xSpacing, y: 0, z: -zSpacing });
  

// RENDER LOOP
function animate() {
  controls.update();
  const time = Date.now() * 0.001;
  
  // iterate through each sphere in the scene and update its position 
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      // adjust the sphere's y position based on a sine wave
      object.position.y = object.userData.initialY + (Math.sin(time + object.position.x));
      //OR: object.position.y = (Math.sin(time + object.position.x) * 5); -> also increase fog a little for this variation 
    }
  });
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
