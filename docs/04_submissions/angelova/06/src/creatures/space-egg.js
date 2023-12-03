import * as THREE from "three";

// Colors
const BODY_COLOR = new THREE.Color(0xfff6c7);
const EYE_COLOR = new THREE.Color(0xfafeff);
const PUPIL_COLOR = new THREE.Color(0x40c2f5);

// Materials
const BODY_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: BODY_COLOR,
    transmission: 0.5,
    opacity: 1.0,
    metalness: 0.0,
    roughness: 0.0,
    ior: 1.5,
    thickness: 0.01,
    specularIntensity: 1,
    specularColor: new THREE.Color(0xf5c8b5),
});

const EYE_MATERIAL = new THREE.MeshBasicMaterial({
    color: EYE_COLOR,
});

const PUPIL_MATERIAL = new THREE.MeshBasicMaterial({
    color: PUPIL_COLOR,
});

// Geometries
const EYE_GEOMETRY = new THREE.SphereGeometry(0.8, 32, 16);
const PUPIL_GEOMETRY = new THREE.SphereGeometry(0.5, 32, 16);

export class SpaceEgg {
    geometry;

    constructor(geometry) {
        this.geometry = geometry;
    }

    static createSpaceEgg(geometry) {
        const eye = this.createSpaceEggEye();
        const pupil = this.createSpaceEggEyePupil();
        const spaceEgg = new THREE.Mesh(geometry, BODY_MATERIAL);

        spaceEgg.add(eye);
        spaceEgg.add(pupil);

        return spaceEgg;
    }

    static createSpaceEggEye() {
        const spaceEggEye = new THREE.Mesh(EYE_GEOMETRY, EYE_MATERIAL);

        spaceEggEye.position.x = -0.8;
        
        return spaceEggEye;
    }

    static createSpaceEggEyePupil() {
        const spaceEggEyePupil = new THREE.Mesh(PUPIL_GEOMETRY, PUPIL_MATERIAL);

        spaceEggEyePupil.position.x = -1.2;

        return spaceEggEyePupil;
    }
}
