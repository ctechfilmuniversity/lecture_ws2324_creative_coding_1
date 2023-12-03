import * as THREE from "three";

// Colors
const MAIN_COLOR = new THREE.Color(0x42b6f5);
const LEG_COLOR = new THREE.Color(0xffcfea);
const BEAK_COLOR = new THREE.Color(0xb8ebff);
const FACE_COLOR = new THREE.Color(0x5ed2ff);
const EYE_COLOR = new THREE.Color(0xffcfea);

// Curves for the form of the legs
const curve1 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(0, 0, 0 ),
	new THREE.Vector3(-8, -2, 0),
	new THREE.Vector3(-1, -8, 0),
    new THREE.Vector3(-0.5, -10, 0)
);

const curve2 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(0, 0, 0 ),
	new THREE.Vector3(-1, -3, 0),
	new THREE.Vector3(-1, -8, 0),
    new THREE.Vector3(2, -10, 0)
);

const curve3 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(-5, 0, 0 ),
	new THREE.Vector3(-8, -6, 0),
	new THREE.Vector3(-1, -8, 0),
    new THREE.Vector3(1, -10, 0)
);

const curve4 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(-5, 0, 0 ),
	new THREE.Vector3(-6, -5, 0),
	new THREE.Vector3(1, -8, 0),
    new THREE.Vector3(3, -9, 0)
);

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
    reflectivity: 0.4,
});

const LEG_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: LEG_COLOR,
    transmission: 0.19,
    opacity: 1.0,
    metalness: 0.13,
    roughness: 0.84,
    ior: 2,
    thickness: 2.66,
    specularIntensity: 1,
    specularColor: new THREE.Color(0x9ab6db),
    reflectivity: 0.4,
});

const BEAK_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: BEAK_COLOR,
    transmission: 0.19,
    opacity: 1.0,
    metalness: 0.13,
    roughness: 0.84,
    ior: 2,
    thickness: 2.66,
    specularIntensity: 1,
    specularColor: new THREE.Color(0x9ab6db),
    reflectivity: 0.4,
});

const FACE_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: FACE_COLOR,
    transmission: 0.19,
    opacity: 0.,
    metalness: 0.1,
    roughness: 0.1,
    ior: 2,
    thickness: 1,
    specularIntensity: 1,
    reflectivity: 0.4,
    specularColor: new THREE.Color(0xffffff),
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
    reflectivity: 0.4,
});

// Geometries
const BODY_GEOMETRY = new THREE.BoxGeometry(9, 3, 2);
const NECK_GEOMETRY = new THREE.CylinderGeometry(0.8, 0.8, 8, 32);
const LEG_FL_GEOMETRY = new THREE.TubeGeometry(curve1, 20, 0.5, 8, false);
const LEG_FR_GEOMETRY = new THREE.TubeGeometry(curve2, 20, 0.5, 8, false);
const LEG_BL_GEOMETRY = new THREE.TubeGeometry(curve3, 20, 0.5, 8, false);
const LEG_BR_GEOMETRY = new THREE.TubeGeometry(curve4, 20, 0.5, 8, false);
const BEAK_GEOMETRY = new THREE.ConeGeometry(0.6, 5, 32);
const FACE_GEOMETRY = new THREE.CylinderGeometry(0.8, 0.8, 1.5, 32);
const EYE_GEOMETRY = new THREE.SphereGeometry(0.1, 32, 16);

// Meshes
const body = new THREE.Mesh(BODY_GEOMETRY, MAIN_MATERIAL);
const neck = new THREE.Mesh(NECK_GEOMETRY, MAIN_MATERIAL);
const legFL = new THREE.Mesh(LEG_FL_GEOMETRY, LEG_MATERIAL);
const legFR = new THREE.Mesh(LEG_FR_GEOMETRY, LEG_MATERIAL);
const legBL = new THREE.Mesh(LEG_BL_GEOMETRY, LEG_MATERIAL);
const legBR = new THREE.Mesh(LEG_BR_GEOMETRY, LEG_MATERIAL);
const beak = new THREE.Mesh(BEAK_GEOMETRY, BEAK_MATERIAL);
const face = new THREE.Mesh(FACE_GEOMETRY, FACE_MATERIAL);
const eyeLeft = new THREE.Mesh(EYE_GEOMETRY, EYE_MATERIAL);
const eyeRight = new THREE.Mesh(EYE_GEOMETRY, EYE_MATERIAL);

/**
 * Adjust position of single parts, so that it all fits together 
 * to create the bird.
 * 
 */
const bird = new THREE.Group();
neck.add(face);
neck.add(eyeLeft);
neck.add(eyeRight);
bird.add(beak);
bird.add(neck);
bird.add(body);
bird.add(legFL);
bird.add(legFR);
bird.add(legBL);
bird.add(legBR);

face.position.set(-0.1, 3, 0);

eyeLeft.position.set(-0.8, 3.5, 0.4);
eyeRight.position.set(-0.8, 3.5, -0.4);

beak.position.x = -6;
beak.rotateZ(Math.PI/2);

neck.position.x = -3;
neck.position.y = -3;

body.position.y = -7.3;
body.position.x = 0.5;

legFL.position.x = -2;
legFL.position.y = -8;
legFL.position.z = 0.5;

legFR.position.x = -3;
legFR.position.y = -8;
legFR.position.z = -0.5;

legBL.position.x = 9;
legBL.position.y = -8;
legBL.position.z = 0.5;

legBR.position.x = 9;
legBR.position.y = -8;
legBR.position.z = -0.5;

bird.position.y = 6;
bird.rotateY(0.6);
bird.rotateZ(-0.1);

body.receiveShadow = true;
neck.receiveShadow = true;

export { bird };
