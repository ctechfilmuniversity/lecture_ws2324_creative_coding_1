import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';




// SCENE
const scene = new THREE.Scene();

// FOG
scene.background = new THREE.Color('#000000');
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



// POINT LIGHT
const pointLight = new THREE.PointLight(0xffffff, 500);
pointLight.position.set(0, 15, 0);

// Enable shadows for the point light
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 1;
pointLight.shadow.camera.far = 600;

// smoothness of the light's shadow
pointLight.shadow.radius = 2;
scene.add(pointLight);

// Second POINT LIGHT
const secondPointLight = new THREE.PointLight(0xffffff, 800);
scene.add(secondPointLight);



//GODRAY


const RAYtextureLoader = new THREE.TextureLoader();
const RAYtexture = RAYtextureLoader.load('/texture/godray.png');


const RAYmaterial = new THREE.MeshBasicMaterial({ 
    map: RAYtexture,
    transparent: true, 
    side: THREE.DoubleSide 
});

const RAYGeometry = new THREE.PlaneGeometry(40, 60); 
const GODRAY = new THREE.Mesh(RAYGeometry, RAYmaterial);
GODRAY.position.set(0, 10, 0);

scene.add(GODRAY);



//WATERLIGHT


const WATERtextureLoader = new THREE.TextureLoader();
const WATERtexture = WATERtextureLoader.load('/texture/waterlight.png');


const WATERmaterial = new THREE.MeshBasicMaterial({ 
    map: WATERtexture,
    transparent: true, 
    side: THREE.DoubleSide 
});


const WATERGeometry = new THREE.PlaneGeometry(60, 60); 
const WATER = new THREE.Mesh(WATERGeometry, WATERmaterial);
WATER.position.set(0, -13.9, 0);
WATER.rotation.x = Math.PI / 2;

scene.add(WATER);


//TEXT


const TEXTtextureLoader = new THREE.TextureLoader();
const TEXTtexture = TEXTtextureLoader.load('/texture/Text.png');


const TEXTmaterial = new THREE.MeshBasicMaterial({ 
    map: TEXTtexture,
    transparent: true, 
    side: THREE.DoubleSide 
});


const TEXTGeometry = new THREE.PlaneGeometry(5, 1.5); 
const TEXT = new THREE.Mesh(TEXTGeometry, TEXTmaterial);
TEXT.position.set(-3, 2, 0);


scene.add(TEXT);






// GEOMETRY
//Environment and Assets

// PLANE
const planeGeometry = new THREE.PlaneGeometry(150, 150);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: '#2A2D34',
    roughness: 0.1,
    metalness: 0.9,
    envMap: scene.background,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.position.y = -14;
planeMesh.position.z = 22;
// Enable shadows on the plane
planeMesh.receiveShadow = true;
scene.add(planeMesh);

// CAVE
const CAVELoader = new GLTFLoader();
let CAVE;  

CAVELoader.load('Cave.glb', (gltf) => {
    CAVE = gltf.scene;

    CAVE.scale.set(10, 10, 10);
    CAVE.position.set(0, 0, 0);
    scene.add(CAVE);
});





// ROCKS + SEAWEED
const ROCKSLoader = new GLTFLoader();
let ROCKS;  

ROCKSLoader.load('rocks_seaweed.glb', (gltf) => {
    ROCKS = gltf.scene;

    ROCKS.scale.set(10, 10, 10);
    ROCKS.position.set(0, 0, 0);
    scene.add(ROCKS);
});



// COLUMNs
const COLUMNLoader = new GLTFLoader();
let COLUMN;  

COLUMNLoader.load('column.glb', (gltf) => {
    COLUMN = gltf.scene;

    COLUMN.scale.set(10, 10, 10);
    COLUMN.position.set(0, 0, 0);
    scene.add(COLUMN);
});



// SHIPWRECK
const SHIPLoader = new GLTFLoader();
let SHIP;  

SHIPLoader.load('shipwreck.glb', (gltf) => {
    SHIP = gltf.scene;

    SHIP.scale.set(10, 10, 10);
    SHIP.position.set(0, 0, 0);
    scene.add(SHIP);
});


// BUBBLES
const BUBBLESLoader = new GLTFLoader();
let BUBBLES;  

BUBBLESLoader.load('bubbles.glb', (gltf) => {
    BUBBLES = gltf.scene;

    BUBBLES.scale.set(10, 10, 10);
    BUBBLES.position.set(1, 1.2, 3);
    scene.add(BUBBLES);
});


//CHARACTERs

// NEW DIVER ANIMATION

const NEWDIVERLoader = new FBXLoader();
let mixer;
const clock = new THREE.Clock();
NEWDIVERLoader.load('NEW_Diver.fbx', (NEWDIVER_fbx) => {
    const NEWDIVER = NEWDIVER_fbx;
    NEWDIVER.scale.set(.004, .004, .004);
    NEWDIVER.position.set(0, -9, 0)
    NEWDIVER_fbx.traverse(c => {
    });

    const anim = new FBXLoader();
    anim.load('swimming.fbx', (anim) => {
        mixer = new THREE.AnimationMixer(NEWDIVER_fbx);
        const idle = mixer.clipAction(anim.animations[0]);
        idle.play();
    });
    scene.add(NEWDIVER_fbx);
});




// DIVERHEAD
const DIVERLoader = new GLTFLoader();
let DIVER;  

DIVERLoader.load('diver_head.glb', (gltf) => {
    DIVER = gltf.scene;
    DIVER.rotation.y = Math.PI;
    DIVER.scale.set(11, 11, 11);
    DIVER.position.set(0, 0, 0);
    scene.add(DIVER);
});


// DIVERBODY
//const DIVERBODYLoader = new GLTFLoader();
//let DIVERBODY;  // Declare DIVER outside the loader callback to access it globally

//DIVERBODYLoader.load('diver_body.glb', (gltf) => {
   // DIVERBODY = gltf.scene;
   // DIVERBODY.rotation.y = Math.PI;
   // DIVERBODY.scale.set(10, 10, 10);
   // DIVERBODY.position.set(0, -1.6, -0.5);
   // scene.add(DIVERBODY);
//});






// ROBOT
const ROBOTLoader = new GLTFLoader();
let ROBOT;  

ROBOTLoader.load('small_robot.glb', (gltf) => {
    ROBOT = gltf.scene;

    ROBOT.scale.set(1, 1, 1);
    ROBOT.position.set(0, 0, 0);
    scene.add(ROBOT);
});


// FISH
const FISHLoader = new GLTFLoader();
let FISH;  

FISHLoader.load('Fish.glb', (gltf) => {
    FISH = gltf.scene;

    FISH.scale.set(5, 5, 5);
    FISH.position.set(-40, 0, 8);
    FISH.rotation.y = Math.PI / 2;
    scene.add(FISH);

    // Animation 
    const startPosition = new THREE.Vector3(-40, 0, 8);
    const targetPosition = new THREE.Vector3(60, 0, 8);
    const animationDuration = 60; // seconds
    let elapsedTime = 0;

    
    const clock = new THREE.Clock();

    const update = () => {
        const delta = clock.getDelta();
        elapsedTime += delta;

        if (elapsedTime <= animationDuration) {

            const t = elapsedTime / animationDuration;

            
            FISH.position.lerpVectors(startPosition, targetPosition, t);
        }

        
        requestAnimationFrame(update);
    };

    
    update();
});


// FISH2
const FISH2Loader = new GLTFLoader();
let FISH2;  

FISH2Loader.load('Fish_group.glb', (gltf) => {
    FISH2 = gltf.scene;

    FISH2.scale.set(5, 5, 5);
    FISH2.position.set(50, -7, -25);
    FISH2.rotation.y = -Math.PI / 2;
    scene.add(FISH2);

    // Animation 
    const startPosition = new THREE.Vector3(50, -7, -25);
    const targetPosition = new THREE.Vector3(-50, -7, -25);
    const animationDuration = 40; // seconds
    let elapsedTime = 0;

    
    const clock = new THREE.Clock();

    
    const update = () => {
        const delta = clock.getDelta();
        elapsedTime += delta;

        if (elapsedTime <= animationDuration) {
            
            const t = elapsedTime / animationDuration;

            
            FISH2.position.lerpVectors(startPosition, targetPosition, t);
        }

        
        requestAnimationFrame(update);
    };

    
    update();
});



// MONSTER

const MONSTERLoader = new GLTFLoader();
let MONSTER;  

MONSTERLoader.load('Octopus_NEW.glb', (gltf) => {
    MONSTER = gltf.scene;
    MONSTER.rotation.y = Math.PI; 
    MONSTER.scale.set(20, 20, 20);
    MONSTER.position.set(0, -5, -120);
    scene.add(MONSTER);

    
    const clock = new THREE.Clock();

    // Update animation
    const update = () => {
        const elapsedTime = clock.getElapsedTime();

        if (elapsedTime < 30) {
            
            MONSTER.position.z = -120;
        } else if (elapsedTime < 50) {
            
            const t = (elapsedTime - 30) / 20;
            MONSTER.position.z = THREE.MathUtils.lerp(-120, -50, t);
        }

        
        requestAnimationFrame(update);
    };

    
    update();
});






// EVENT LISTENER FOR MOUSE MOVE
document.addEventListener('mousemove', (event) => {
    // Update ROBOT, DIVER, and secondPointLight position based on mouse position
    updateRobotDiverAndLightPosition(event);
});

// Update ROBOT, DIVER, and secondPointLight position based on mouse position
function updateRobotDiverAndLightPosition(event) {
    if (ROBOT && DIVER) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        const mouseVector = new THREE.Vector3(mouseX, mouseY, 0.5);
        mouseVector.unproject(camera);

        const dir = mouseVector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;

        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        ROBOT.position.copy(pos);

        // Calculate rotation angles for ROBOT 
        const angleRobotX = Math.atan2(mouseY - ROBOT.position.y, camera.position.z - ROBOT.position.z);
        const angleRobotY = Math.atan2(mouseX - ROBOT.position.x, camera.position.z - ROBOT.position.z);
        const angleRobotZ = Math.atan2(mouseX - ROBOT.position.x, mouseY - ROBOT.position.y);

       
        ROBOT.rotation.x = angleRobotX;
        ROBOT.rotation.y = -angleRobotY;
        ROBOT.rotation.z = -angleRobotZ;

        // Maintain the original DIVER rotation
        const lookAtVector = ROBOT.position.clone().negate(); // Invert the vector
        DIVER.lookAt(lookAtVector);

        // Update position of secondPointLight
        const lightPosition = new THREE.Vector3(mouseX, mouseY, 0.5);
        lightPosition.unproject(camera);
        const lightDir = lightPosition.sub(camera.position).normalize();
        const lightDistance = -camera.position.z / lightDir.z;
        const lightPos = camera.position.clone().add(lightDir.multiplyScalar(lightDistance));
        secondPointLight.position.copy(lightPos);
    }
}

// ANIMATE/RENDER 
function animate() {
    requestAnimationFrame(animate);
    
// Animation Mixer
const delta = clock.getDelta();
if ( mixer ) mixer.update( delta );


    renderer.render(scene, camera);
}

animate();

