import * as THREE from "three";

// Colors
const MAIN_COLOR = new THREE.Color(0x77fded);
const HAT_COLOR = new THREE.Color(0xffb8e0);
const EYE_COLOR = new THREE.Color(0x9dff4d);

// Materials
const MAIN_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: MAIN_COLOR,
    transmission: 0.19,
    opacity: 1.0,
    metalness: 0.13,
    roughness: 0.84,
    ior: 2,
    thickness: 2.66,
    specularIntensity: 1,
    specularColor: new THREE.Color(0x9df038),
    reflectivity: 0.4,
});

const HAT_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: HAT_COLOR,
    transmission: 0.19,
    opacity: 0.5,
    metalness: 0.13,
    roughness: 0.2,
    ior: 2,
    thickness: 1.3,
    specularIntensity: 1,
    reflectivity: 0.4,
    specularColor: new THREE.Color(0xffe7b0),
});

const EYE_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: EYE_COLOR,
    transmission: 0.58,
    opacity: 1.0,
    metalness: 0.43,
    roughness: 0.15,
    ior: 1.18,
    thickness: 2.85,
    specularIntensity: 0.86,
    specularColor: new THREE.Color(0xf5c8b5),
});

// Geometries
const HEAD_GEOMETRY = new THREE.SphereGeometry(1, 32, 16);
const BODY_GEOMETRY = new THREE.SphereGeometry(1, 32, 16);
const HAT_GEOMETRY = new THREE.ConeGeometry(2.4, 1, 32);
const EYE_GEOMETRY = new THREE.SphereGeometry(0.1, 32, 16);

// Meshes
const head = new THREE.Mesh(HEAD_GEOMETRY, MAIN_MATERIAL);
const body = new THREE.Mesh(BODY_GEOMETRY, MAIN_MATERIAL);
const hat = new THREE.Mesh(HAT_GEOMETRY, HAT_MATERIAL);
const eyeLeft = new THREE.Mesh(EYE_GEOMETRY, EYE_MATERIAL);
const eyeRight = new THREE.Mesh(EYE_GEOMETRY, EYE_MATERIAL);

/**
 * Adjust position of single parts, so that it all fits together 
 * to create the spirit.
 * 
 */
const spirit = new THREE.Group();
head.add(eyeLeft);
head.add(eyeRight);
spirit.add(head);
spirit.add(body);
spirit.add(hat);

head.position.y = 2.5;

body.position.y = -1;

hat.position.y = 3.1;

eyeLeft.position.set(-0.95, -0.1, 0.3);
eyeRight.position.set(-0.95, -0.1, -0.3);

spirit.position.set(0.8, 4.6, -1);
spirit.rotateY(0.8);
spirit.rotateZ(-0.1);

body.receiveShadow = true;
hat.castShadow = true;

export { spirit };
