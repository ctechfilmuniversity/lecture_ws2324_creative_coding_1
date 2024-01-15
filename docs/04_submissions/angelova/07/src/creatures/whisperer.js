import * as THREE from "three";
import {
    constructVector3From,
    constructBezierCurve,
    closeArmGeometryStart,
    closeArmGeometryEnd,
} from "../utils.js";

// Colors
const MAIN_COLOR = new THREE.Color(0x2a2254);
const FACE_COLOR = new THREE.Color(0xffffff);
const FACE_DETAIL_COLOR_1 = new THREE.Color(0x913c65);
const FACE_DETAIL_COLOR_2 = new THREE.Color(0x30302e);
const EYE_COLOR = new THREE.Color(0x230757);
const MAGIC_HAT_COLOR = new THREE.Color(0x321b66);
const MAGIC_EYE_COLOR = new THREE.Color(0xffffff);

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
    specularColor: new THREE.Color(0x9ab6db),
    reflectivity: 2,
});

const MAGIC_HAT_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: MAGIC_HAT_COLOR,
    opacity: 1.0,
    metalness: 0.5,
    roughness: 0.6,
    ior: 2,
    thickness: 1.66,
    reflectivity: 0.1,
});

const MAGIC_EYE_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: MAGIC_EYE_COLOR,
    transmission: 0.1,
    opacity: 0.1,
    metalness: 0.3,
    roughness: 0.1,
    ior: 2,
    thickness: 1.66,
    specularIntensity: 1,
    specularColor: new THREE.Color(0x9ab6db),
    reflectivity: 0.1,
    emissive: new THREE.Color(0x4dff1c),
    emissiveIntensity: 3,
});

const MAGIC_WAND_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: MAIN_COLOR,
    transmission: 0.1,
    opacity: 0.0,
    metalness: 0.3,
    roughness: 0.1,
    ior: 2,
    thickness: 0.5,
    specularIntensity: 1,
    specularColor: new THREE.Color(0x9ab6db),
    reflectivity: 0,
    emissive: new THREE.Color(0x85ff9f), 
    emissiveIntensity: 2,
});

const FACE_MATERIAL = new THREE.MeshBasicMaterial({ color: FACE_COLOR});
const FACE_DETAIL_MATERIAL_1 = new THREE.MeshBasicMaterial({ color: FACE_DETAIL_COLOR_1 });
const FACE_DETAIL_MATERIAL_2 = new THREE.MeshBasicMaterial({ color: FACE_DETAIL_COLOR_2 });

const EYE_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: EYE_COLOR,
    transmission: 0.19,
    opacity: 0.2,
    metalness: 0.13,
    roughness: 0.84,
    ior: 2,
    thickness: 2.66,
    reflectivity: 2,
});

// Geometries
const BODY_GEOMETRY = new THREE.CylinderGeometry(0.5, 6, 8, 32, 1, false);

const headPoints = [];
for ( let i = 0; i < 10; i ++ ) {
	headPoints.push(new THREE.Vector2(Math.sin(i * 0.4) * 4 + 4, (i - 2) * 2));
}
const HEAD_GEOMETRY = new THREE.LatheGeometry(headPoints, 20);

const facePoints = [];
for ( let i = 0; i < 10; i ++ ) {
	facePoints.push(new THREE.Vector2(Math.sin(i * 0.4) * 3 + 4, (i - 2) * 2.5));
}
const FACE_GEOMETRY = new THREE.LatheGeometry(facePoints, 20);

// Eye geometry
const EYE_GEOMETRY = new THREE.SphereGeometry(0.5, 32, 16);

// Face details geometries
const FACE_DETAIL_1_GEOMETRY = new THREE.BoxGeometry(1, 3, 1);
const FACE_DETAIL_2_GEOMETRY = new THREE.BoxGeometry(1, 3, 1);
const FACE_DETAIL_3_GEOMETRY = new THREE.ConeGeometry(0.5, 2, 32); 

// Left arm geometries
const leftArmP0 = constructVector3From(-1, 4.5, 0);
const leftArmP1 = constructVector3From(-6, 5, 0);
const leftArmP2 = constructVector3From(-8, 2.5, 0);
const leftArmP3 = constructVector3From(-3, 3, -3);
export const leftArmCurve = constructBezierCurve(leftArmP0, leftArmP1, leftArmP2, leftArmP3);

const LEFT_ARM_GEOMETRY = new THREE.TubeGeometry(leftArmCurve, 20, 0.3, 20, false);
const leftArmCurveStartPoint = leftArmCurve.getPoint(0);
const leftArmCurveEndPoint = leftArmCurve.getPoint(1);

// Right arm geometries
const rightArmP0 = constructVector3From(1, 4.5, 0);
const rightArmP1 = constructVector3From(6, 5, 0);
const rightArmP2 = constructVector3From(8, 2.5, 0);
const rightArmP3 = constructVector3From(10, 3, 0);
const rightArmCurve = constructBezierCurve(rightArmP0, rightArmP1, rightArmP2, rightArmP3);

const RIGHT_ARM_GEOMETRY = new THREE.TubeGeometry(rightArmCurve, 20, 0.3, 20, false);
const rightArmCurveStartPoint = rightArmCurve.getPoint(0);
const rightArmCurveEndPoint = rightArmCurve.getPoint(1);

// Magic hat geometry
const MAGIC_HAT_GEOMETRY = new THREE.ConeGeometry(2, 3.5, 32);

// Magic eye geometry
const MAGIC_EYE_GEOMETRY = new THREE.CapsuleGeometry(0.2, 0.4, 4, 8);

// Magic wand geometry
const magicWandPoints = [];
for (let i = -10; i < 10; i ++) {
    if (i < 0) {
        magicWandPoints.push(new THREE.Vector2(Math.sin(i + 10) - 0.5, i * 0.2));
    }
    else {
        magicWandPoints.push(new THREE.Vector2(Math.log(i + 2) - 1.5, i * 1.5));
    }
}
const MAGIC_WAND_GEOMETRY = new THREE.LatheGeometry(magicWandPoints, 15);

// MESHES
const body = new THREE.Mesh(BODY_GEOMETRY, MAIN_MATERIAL);
body.material.side = THREE.DoubleSide;

const head = new THREE.Mesh(HEAD_GEOMETRY, MAIN_MATERIAL);
head.position.y = 6;
head.scale.set(0.15, 0.15, 0.15);

// Face mesh
const face = new THREE.Mesh(FACE_GEOMETRY, FACE_MATERIAL);
face.position.y = 2;
face.position.z = -5.3;
face.rotation.x = 0.2;
face.scale.set(0.8, 0.5, 0.5);

// Eyes meshes
const eyeLeft = new THREE.Mesh(EYE_GEOMETRY, EYE_MATERIAL);
eyeLeft.position.set(1, 6.5, -8);

const eyeRight = new THREE.Mesh(EYE_GEOMETRY, EYE_MATERIAL);
eyeRight.position.set(-1, 6.5, -8);

// Face details meshes
const faceDetail1 = new THREE.Mesh(FACE_DETAIL_1_GEOMETRY, FACE_DETAIL_MATERIAL_1);
faceDetail1.position.set(4, 4.5, -6.8);
faceDetail1.rotation.x = 0.2;

const faceDetail2 = new THREE.Mesh(FACE_DETAIL_2_GEOMETRY, FACE_DETAIL_MATERIAL_1);
faceDetail2.position.set(-4, 4.5, -6.8);
faceDetail2.rotation.x = 0.2;

const faceDetail3 = new THREE.Mesh(FACE_DETAIL_3_GEOMETRY, FACE_DETAIL_MATERIAL_2);
faceDetail3.position.set(0, 1.5, -8);
faceDetail3.rotation.x = -0.1;

// Left arm mesh
const leftArm = new THREE.Mesh(LEFT_ARM_GEOMETRY, MAIN_MATERIAL);
const leftArmShapeStart = closeArmGeometryStart(LEFT_ARM_GEOMETRY, leftArmCurveStartPoint, MAIN_COLOR);
const leftArmShapeEnd = closeArmGeometryEnd(LEFT_ARM_GEOMETRY, leftArmCurveEndPoint, MAIN_COLOR);
leftArm.add(leftArmShapeStart);
leftArm.add(leftArmShapeEnd);

// Right arm mesh
const rightArm = new THREE.Mesh(RIGHT_ARM_GEOMETRY, MAIN_MATERIAL);
const rightArmShapeStart = closeArmGeometryStart(RIGHT_ARM_GEOMETRY, rightArmCurveStartPoint, MAIN_COLOR);
const rightArmShapeEnd = closeArmGeometryEnd(RIGHT_ARM_GEOMETRY, rightArmCurveEndPoint, MAIN_COLOR);
rightArm.add(rightArmShapeStart);
rightArm.add(rightArmShapeEnd);

// Magic hat mesh
const magicHat = new THREE.Mesh(MAGIC_HAT_GEOMETRY, MAGIC_HAT_MATERIAL);
magicHat.position.set(0, 8.5, 0.5);
magicHat.rotation.x = 0.3;

// Magic hat eyes meshes
const magicEyeLeft1 = new THREE.Mesh(MAGIC_EYE_GEOMETRY, MAGIC_EYE_MATERIAL);
magicEyeLeft1.position.set(0.3, 0, -0.9);
magicEyeLeft1.rotation.z = Math.PI/2;
magicEyeLeft1.scale.set(0.5, 0.4, 0.5);

const magicEyeLeft2 = new THREE.Mesh(MAGIC_EYE_GEOMETRY, MAGIC_EYE_MATERIAL);
magicEyeLeft2.position.set(0.3, -0.4, -1.15);
magicEyeLeft2.rotation.z = Math.PI/2;
magicEyeLeft2.scale.set(0.5, 0.4, 0.5);

const magicEyeRight1 = new THREE.Mesh(MAGIC_EYE_GEOMETRY, MAGIC_EYE_MATERIAL);
magicEyeRight1.position.set(-0.3, 0, -0.9);
magicEyeRight1.rotation.z = Math.PI/2;
magicEyeRight1.scale.set(0.5, 0.4, 0.5);

const magicEyeRight2 = new THREE.Mesh(MAGIC_EYE_GEOMETRY, MAGIC_EYE_MATERIAL);
magicEyeRight2.position.set(-0.3, -0.4, -1.15);
magicEyeRight2.rotation.z = Math.PI/2;
magicEyeRight2.scale.set(0.5, 0.4, 0.5);

// Magic wand mesh
const magicWand = new THREE.Mesh(MAGIC_WAND_GEOMETRY, MAGIC_WAND_MATERIAL);
magicWand.position.set(-4, 7, -1.5);
magicWand.scale.set(0.5, 0.6, 0.5);
magicWand.rotation.x = Math.PI;

// Group all mesh parts together
const whisperer = new THREE.Group();
whisperer.add(body);
whisperer.add(head);
head.add(face);
head.add(eyeLeft);
head.add(eyeRight);
head.add(faceDetail1);
head.add(faceDetail2);
whisperer.add(leftArm);
whisperer.add(rightArm);
whisperer.add(magicHat);
magicHat.add(magicEyeLeft1);
magicHat.add(magicEyeLeft2);
magicHat.add(magicEyeRight1);
magicHat.add(magicEyeRight2);
whisperer.add(magicWand);

export { whisperer };
