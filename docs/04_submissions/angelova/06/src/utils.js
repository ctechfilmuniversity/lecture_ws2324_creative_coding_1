import * as THREE from "three";
import { ImprovedNoise } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/math/ImprovedNoise.js';

let noise = new ImprovedNoise()
let clock = new THREE.Clock();

export function geometryNoise(radius = 1, speed, geometry) {
    let t = clock.getElapsedTime() * speed;

    let nPos = [];
    let v3 = new THREE.Vector3();
    let pos = geometry.attributes.position;

    for (let i = 0; i < pos.count; i++){
        v3.fromBufferAttribute(pos, i).normalize();
        nPos.push(v3.clone());
    }
    geometry.userData.nPos = nPos;

    geometry.userData.nPos.forEach((p, idx) => {
        let ns = 1 + 0.4 * noise.noise(p.x + t, p.y + t, p.z + t);
        v3.copy(p).multiplyScalar(radius).addScaledVector(p, ns);
        pos.setXYZ(idx, v3.x, v3.y, v3.z);
    })
    geometry.computeVertexNormals();
    pos.needsUpdate = true;
}

export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Lights
export const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 4);

export const directionalLight = new THREE.DirectionalLight(0xfcd2ed, 1);
directionalLight.position.set(0, 0, 2);
directionalLight.castShadow = true;
directionalLight.shadow.radius = 10;

export const pointLight = new THREE.PointLight(0xfce6a2, 10);
pointLight.position.set(1.5, 9, 1);
pointLight.castShadow = true;
pointLight.shadow.radius = 20;
