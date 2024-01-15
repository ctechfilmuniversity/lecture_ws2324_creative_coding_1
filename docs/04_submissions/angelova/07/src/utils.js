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
        let ns = 1 + 0.6 * noise.noise(p.x + 2 * t, p.y + t, p.z + t);
        v3.copy(p).multiplyScalar(radius).addScaledVector(p, ns);
        pos.setXYZ(idx, v3.x, v3.y, v3.z);
    })
    geometry.computeVertexNormals();
    pos.needsUpdate = true;
}

export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const hemisphereLight = new THREE.HemisphereLight(0x84f5c0, 0xe7b3ff, 2);

export const directionalLight1 = new THREE.DirectionalLight(0xfcd2ed, 2);
directionalLight1.position.set(0, 2, 2);
directionalLight1.castShadow = true;
directionalLight1.shadow.radius = 10;

export const directionalLight2 = new THREE.DirectionalLight(0xb3fff1, 4);
directionalLight2.position.set(2, 4, 3);
directionalLight2.castShadow = true;
directionalLight2.shadow.radius = 1;

export const directionalLight3 = new THREE.DirectionalLight(0xe491ff, 2);
directionalLight3.position.set(-2, 2, 3);
directionalLight3.castShadow = true;
directionalLight3.shadow.radius = 1;

export function constructVector3From(x, y, z) {
    return new THREE.Vector3(x, y, z);
}

export function constructBezierCurve(p0, p1, p2, p3) {
    return new THREE.CubicBezierCurve3(
        p0,
        p1,
        p2,
        p3,
    );
}

export function closeArmGeometryStart(armGeometry, p, c) {
    const pos = armGeometry.attributes.position;

    const points = [];
    points.push(p);

    for(let i = 0; i <= armGeometry.parameters.radialSegments; i++){
        points.push(new THREE.Vector3().fromBufferAttribute(pos, i));
    }

    const pointsGeom = new THREE.BufferGeometry().setFromPoints(points);
    const psgPos = pointsGeom.attributes.position;
    const indexStart = [];
    for (let i = 1; i < psgPos.count - 1; i++){
        indexStart.push(0, i, i+1);
    }
    pointsGeom.setIndex(indexStart);

    const shape = new THREE.Mesh(pointsGeom, new THREE.MeshBasicMaterial({color: c}));

    return shape;
}

export function closeArmGeometryEnd(armGeometry, p, c) {
    const pos = armGeometry.attributes.position;

    const endPoints = [];
    endPoints.push(p);

    for (let i = (armGeometry.parameters.radialSegments + 1) * armGeometry.parameters.tubularSegments; i < pos.count; i++){
        endPoints.push(new THREE.Vector3().fromBufferAttribute(pos, i));
    }

    const pointsEndGeom = new THREE.BufferGeometry().setFromPoints(endPoints);
    const pegPos = pointsEndGeom.attributes.position;
    const indexEnd = [];
    for (let i = 1; i < pegPos.count - 1; i++){
        indexEnd.push(0, i+1, i);
    }
    pointsEndGeom.setIndex(indexEnd);

    const shapeEnd = new THREE.Mesh(pointsEndGeom, new THREE.MeshBasicMaterial({color: c}));

    return shapeEnd;
}
