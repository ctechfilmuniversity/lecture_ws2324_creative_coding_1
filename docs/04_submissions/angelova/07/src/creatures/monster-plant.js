import * as THREE from "three";

// COLORS
const BASE_COLOR = new THREE.Color(0x3abd9c);
const EYE_COLOR = new THREE.Color(0xe0eddf);
const PUPIL_COLOR = new THREE.Color(0x000000);

// MATERIALS
const BASE_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: BASE_COLOR,
    transmission: 0.1,
    opacity: 0.9,
    metalness: 0.1,
    roughness: 0.4,
    ior: 2,
    thickness: 1,
    specularIntensity: 1,
    specularColor: new THREE.Color(0x69fc3a),
    reflectivity: 0.4,
});

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

const PUPIL_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: PUPIL_COLOR,
    transmission: 0.19,
    opacity: 0.2,
    metalness: 0.13,
    roughness: 0.84,
    ior: 2,
    thickness: 2.66,
    specularIntensity: 1,
    reflectivity: 2,
});

// GEOMETRIES
const monsterPlantShape = new THREE.Shape();

const extrudeSettings = { 
	depth: 0.5, 
	bevelEnabled: true, 
	bevelSegments: 6, 
	steps: 1, 
	bevelSize: 1, 
	bevelThickness: 0.2,
};

// Base shape
monsterPlantShape.moveTo(2, 2);
monsterPlantShape.bezierCurveTo(3, 4, 3, 5, 2, 6);
monsterPlantShape.moveTo(2, 6);
monsterPlantShape.bezierCurveTo(1, 5, 1, 4, 1, 2);

// Eye shape
const monsterPlantEyeShape = new THREE.Shape();
monsterPlantEyeShape.moveTo(0, 4);
monsterPlantEyeShape.bezierCurveTo(-1, 5, -2, 5, -3, 4);
monsterPlantEyeShape.bezierCurveTo(-2, 3, -1, 3, 0, 4);

const MONSTER_PLANT_BASE_GEOMETRY = new THREE.ExtrudeGeometry(monsterPlantShape, extrudeSettings);

const MONSTER_PLANT_EYE_GEOMETRY = new THREE.ExtrudeGeometry(monsterPlantEyeShape, extrudeSettings);

const MONSTER_PLANT_PUPIL_GEOMETRY = new THREE.SphereGeometry(0.2, 20, 10);

export class MonsterPlant {
    static createMonsterPlant() {
        const eye = this.createMonsterPlantEye();
        const pupil = this.createMonsterPlantPupil();
        const monsterPlant = new THREE.Mesh(MONSTER_PLANT_BASE_GEOMETRY, BASE_MATERIAL);
    
        monsterPlant.add(eye);
        monsterPlant.add(pupil);
    
        return monsterPlant;
    }

    static createMonsterPlantEye() {
        const monsterPlantEye = new THREE.Mesh(MONSTER_PLANT_EYE_GEOMETRY, EYE_MATERIAL);

        monsterPlantEye.position.set(2.6, 5, -0.2);
        monsterPlantEye.scale.set(0.4, 0.1, 0.5);

        return monsterPlantEye;
    }

    static createMonsterPlantPupil() {
        const monsterPlantPupil = new THREE.Mesh(MONSTER_PLANT_PUPIL_GEOMETRY, PUPIL_MATERIAL);

        monsterPlantPupil.position.set(2, 5.4, -0.2);
        monsterPlantPupil.scale.set(2, 0.6, 1);

        return monsterPlantPupil;
    }
}
