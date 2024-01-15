import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { whisperer } from "./creatures/whisperer.js";
import { MonsterPlant } from "./creatures/monster-plant.js";
import {
    geometryNoise,
    hemisphereLight, 
    directionalLight1,
    directionalLight2,
    directionalLight3,
    randomInteger,
} from "./utils.js";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x403854);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-8, 1, -24);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: false,
    logarithmicDepthBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Add all light sources to the scene
scene.add(hemisphereLight);
scene.add(directionalLight1);
scene.add(directionalLight2);
scene.add(directionalLight3);

// Add the whisperer
scene.add(whisperer);

// And add his plant monsters
const monsterPlants = [];
for (let i = 0; i < 50; i++) {
    let mp = MonsterPlant.createMonsterPlant();
    mp.position.set(
        randomInteger(-15, 15),
        -6,
        randomInteger(4, 10),
    );
    let zScale = Math.random() > 0.5 ? 2 : 1;
    mp.scale.set(
        0.5,
        zScale,
        1,
    );
    monsterPlants.push(mp);
    scene.add(mp);
}

// Keep the threshold 1, so that only selective meshes glow
const bloomPass = new UnrealBloomPass(undefined, 0.6, 1, 1);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(bloomPass);

function closeEye() {
    let currentMonsterPlant = monsterPlants.at(randomInteger(0, 1));
    currentMonsterPlant.children[1].material.color.set(0xe0eddf);

    setTimeout(() => {
        openEye(currentMonsterPlant)
    }, 1000);
}

function openEye(currentMonsterPlant) {
    currentMonsterPlant.children[1].material.color.set(0x000000);
}

window.setInterval(closeEye, 2000);

function animate() {
	requestAnimationFrame(animate);
    
    geometryNoise(5, 0.6, whisperer.children[0].geometry);
    
    composer.render(scene, camera);
}

animate();
