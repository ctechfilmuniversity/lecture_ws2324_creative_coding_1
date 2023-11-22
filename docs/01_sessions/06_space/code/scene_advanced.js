import * as THREE from 'three';

// We want to use the "OrbitCamera" addon provided by three.JS
// We need to import it from the folder and give the imported object (the addon) a name: "OrbitControls"
// This information is given to us by the library
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// SCENE
const scene = new THREE.Scene();

// A fog is implemented to give distance to the scene and smoothly transition from the bottom plane to the background color
scene.background = new THREE.Color('#ffc2c2');
scene.fog = new THREE.FogExp2(scene.background, 0.02);

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 22;

// RENDERER
const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);


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

// POINT LIGHT
const pointLight = new THREE.PointLight(0xfff4c9, 50);
pointLight.position.set(0, 4, 2);

// Enabling shadows for the pointlight
// Max and Min Distances are needed for the renderer
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 1;
pointLight.shadow.camera.far = 600;

// The radius is the "smoothness" of the light's shadow
pointLight.shadow.radius = 10;
scene.add(pointLight);


// A pointLightHelper draws a bounding box around the light to show us its position in the scene
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);

// GEOMETRY
// PLANE
const planeGeometry = new THREE.PlaneGeometry(300, 300);
const planeMaterial = new THREE.MeshStandardMaterial({ color: '#b3005a' });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.position.y = -10;
// Enable shadows on the plane
planeMesh.receiveShadow = true;
scene.add(planeMesh);

// ICOSAHEDRON
const icosaGeo = new THREE.IcosahedronGeometry(2.4, 0); //radius, detail
const icosaMat = new THREE.MeshStandardMaterial({ color: 0xff0080});
const icosa = new THREE.Mesh(icosaGeo, icosaMat);
// Make the icosa cast shadows
icosa.castShadow = true;
scene.add(icosa);

// ICOSAHEDRON 2
const icosaWireGeo = new THREE.IcosahedronGeometry(3.0, 0); //radius, detail
const icosaWireMat = new THREE.MeshStandardMaterial({ color: 0xffab00, wireframe: true });
const icosaWire = new THREE.Mesh(icosaWireGeo, icosaWireMat);
scene.add(icosaWire);

// CUBECIRCLE
const nCubes = 6;
const radius = 10;
const cubeSize = 5;
let angle = 0;
const step = (2 * Math.PI) / nCubes;
for(let i = 0; i < nCubes; i++) {
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = -10;
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff8000, roughness:0.3, metalness: 0.5});
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    
    // Make the cube cast shadows
    cube.receiveShadow = true;
    // Enable shadows on the cube
    cube.castShadow = true;
    cube.position.set(x,y,z);
    cube.lookAt(0,0,0);
    scene.add(cube);
    angle += step;
}

// ANIMATE/RENDER like draw() in p5
function animate() {
    requestAnimationFrame(animate);

    // Offset the elements over time

    icosa.rotation.x += 0.004;
    icosa.rotation.y += 0.007;
    icosaWire.rotation.x += 0.008;
    icosaWire.rotation.z += 0.005;


    const t = Date.now() / 3000;
    // move light in circle around center
    // change light height with sine curve
    const r = 3.0;
    const lx = r * Math.cos(t);
    const lz = r * Math.sin(t);
    pointLight.position.set(lx, pointLight.position.y, lz);

    renderer.render(scene, camera);
}

animate();
