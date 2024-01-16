import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';



// SCENE
const scene = new THREE.Scene();

// FOG
scene.background = new THREE.Color('#D5DFFF');
scene.fog = new THREE.FogExp2(scene.background, 0.02);

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 22;

// RENDERER
const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// shadowMap
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

// CONTROLS FOR NAVIGATION
const controls = new OrbitControls(camera, renderer.domElement);

// AMBIENT LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// POINT LIGHT
const pointLight = new THREE.PointLight(0xffffff, 200);
pointLight.position.set(0, 1, 0);

// Enable shadows for the point light
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 1;
pointLight.shadow.camera.far = 600;

// smoothness of the light's shadow
pointLight.shadow.radius = 2;
scene.add(pointLight);

//pointLightHelper 
//const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
//scene.add(pointLightHelper);


// GEOMETRY

// Character Mesh+Animation

//const femLoader = new FBXLoader();
//femLoader.load('T-Pose.fbx', (fem_fbx) => {
    //const fem = fem_fbx;
    //fem.scale.set(1,1,1);
    //fem.position.set(1,1,1)
    //fem_fbx.traverse(c => {
//});

//const anim = new FBXLoader();
//anim.load('Praying_noskin.fbx', (anim) => {
    //this.mixer = new THREE.AnimationMixer(fem_fbx);
    //const idle = this._mixer.clipAction(anim.animations[0]);
    //idle.play();
//});
//this._scene.add(fem_fbx);

//});



// Still Character

// TRAVELER

const MAINLoader = new GLTFLoader();
MAINLoader.load('MAIN.glb', (gltf) => {
    const MAIN = gltf.scene;
    MAIN.rotation.y = Math.PI;
    MAIN.scale.set(0.015,0.015,0.015);
    MAIN.position.set(0,-3.8, 13);
    scene.add(MAIN);
});



//PRAYER 1

const loader = new FBXLoader();

loader.load('FEMPraying.fbx', (pray_fbx) => {
    const prayer = pray_fbx;

    // Rotate 90 degrees around Y-axis
    prayer.rotation.y = 3 * Math.PI / 4;

   
    prayer.scale.set(0.01, 0.01, 0.01);
    prayer.position.set(-2.5, -5, 2.5);

    scene.add(prayer);
});


// PRAYER 2
const loader2 = new FBXLoader();

loader2.load('FEMPraying.fbx', (pray_fbx) => {
    const prayer = pray_fbx;

    // Rotate 90 degrees around Y-axis
    prayer.rotation.y = 3 * Math.PI / 4;

    
    prayer.scale.set(0.01, 0.01, 0.01);
    prayer.position.set(-2.5, -4.9, 4.1);

    scene.add(prayer);
});


// PRAYER 3
const loader3 = new FBXLoader();

loader2.load('FEMPraying.fbx', (pray_fbx) => {
    const prayer = pray_fbx;

    // Rotate 90 degrees around Y-axis
    prayer.rotation.y = 3 * Math.PI / 4;

    
    prayer.scale.set(0.01, 0.01, 0.01);
    prayer.position.set(-1.5, -4.8, 5.5);

    scene.add(prayer);
});


//PRAYER 4
const loader4 = new FBXLoader();

loader.load('FEMPraying.fbx', (pray_fbx) => {
    const prayer = pray_fbx;

    // Rotate 90 degrees around Y-axis
    prayer.rotation.y = -3 * Math.PI / 4;


    prayer.scale.set(0.01, 0.01, 0.01);
    prayer.position.set(2.5, -5, 2.5);

    scene.add(prayer);
});


// PRAYER 5
const loader5 = new FBXLoader();

loader2.load('FEMPraying.fbx', (pray_fbx) => {
    const prayer = pray_fbx;

    // Rotate 90 degrees around Y-axis
    prayer.rotation.y = -3 * Math.PI / 4;

    
    prayer.scale.set(0.01, 0.01, 0.01);
    prayer.position.set(2.5, -4.9, 4.1);

    scene.add(prayer);
});


// PRAYER 6
const loader6 = new FBXLoader();

loader2.load('FEMPraying.fbx', (pray_fbx) => {
    const prayer = pray_fbx;

    // Rotate 90 degrees around Y-axis
    prayer.rotation.y = -3 * Math.PI / 4;

    
    prayer.scale.set(0.01, 0.01, 0.01);
    prayer.position.set(1.5, -4.8, 5.5);

    scene.add(prayer);
});

// Hands
const handLoader = new GLTFLoader();
handLoader.load('hands.glb', (gltf) => {
    const hand = gltf.scene;
    hand.scale.set(3,3,3);
    hand.position.y = -5;
    scene.add(hand);
});


//Mountain Landscape

const mountainLoader = new GLTFLoader();
mountainLoader.load('snowy_mountain.glb', (gltf) => {
    const mountain = gltf.scene;
    mountain.scale.set(1,1,1);
    mountain.position.y = -4.5;
    scene.add(mountain);
});


// CENTER BLENDER CUBE

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 15.2  });
const cube = new THREE.Mesh(geometry, material);

// Rotation 
cube.rotation.x = Math.PI / 4;
cube.rotation.z = Math.PI / 4;

scene.add(cube);

// PLANE
const planeGeometry = new THREE.PlaneGeometry(500, 500);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: '#09586F',
    roughness: 0.1,
    metalness: 0.9,
    envMap: scene.background,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.position.y = -5.5;
// Enable shadows on the plane
planeMesh.receiveShadow = true;
scene.add(planeMesh);



// HOLY DONUTs (rotating)

// DONUTS ARRAY
const numDonuts = 10;
const donuts = [];

for (let i = 0; i < numDonuts; i++) {
    const donutGeo = new THREE.TorusGeometry(0.3, 0.15, 16, 100);
    const donutMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 15.2 });
    const donutMesh = new THREE.Mesh(donutGeo, donutMat);

    
    donutMesh.position.set(0, 1, 0);
    donutMesh.rotation.set(0, 0, 0);

    
    donuts.push(donutMesh);

    
    scene.add(donutMesh);
}




// "MOON"

const centericoMiniGeo = new THREE.IcosahedronGeometry(2, 10);
const centericoaMiniMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 15.2 });
const centericoaMiniMesh = new THREE.Mesh(centericoMiniGeo, centericoaMiniMat);

centericoaMiniMesh.position.set(-30, 20, -50);
centericoaMiniMesh.rotation.set(0, 0, 0);


// MOON Shadow (not necessary)
centericoaMiniMesh.receiveShadow = true;
scene.add(centericoaMiniMesh);




// ANIMATE/RENDER 
function animate() {
    requestAnimationFrame(animate);


    // Cube Rotation

    cube.rotation.y += 0.01;


    // Orbit the Donut

    const orbitRadius = 3; // Radius
    const orbitSpeed = 0.8; // Speed
    const donutRotationSpeed = 0.02; 
    const time = performance.now() * 0.001;

    for (let i = 0; i < numDonuts; i++) {
        const donut = donuts[i];
        const angle = (Math.PI * 2 * i) / numDonuts; 

        const orbitX = Math.cos(time * orbitSpeed + angle) * orbitRadius;
        const orbitY = Math.sin(time * orbitSpeed + angle) * orbitRadius;
        const orbitZ = Math.sin(time * orbitSpeed + angle) * orbitRadius;

        donut.position.x = orbitX;
        donut.position.y = orbitY;
        donut.position.z = orbitZ;

        
        donut.rotation.y += donutRotationSpeed;
    }

   

    renderer.render(scene, camera);
}

animate();