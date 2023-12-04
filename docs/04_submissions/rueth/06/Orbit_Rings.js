import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



// SCENE
const scene = new THREE.Scene();

// FOG
scene.background = new THREE.Color('#E0AFA0');
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
const pointLight = new THREE.PointLight(0xffffff, 500);
pointLight.position.set(0, 4, 0);

// Enable shadows for the point light
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 1;
pointLight.shadow.camera.far = 600;

// smoothness of the light's shadow
pointLight.shadow.radius = 2;
scene.add(pointLight);

// pointLightHelper 
//const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
//scene.add(pointLightHelper);

// GEOMETRY

// PLANE
const planeGeometry = new THREE.PlaneGeometry(500, 500);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: '#2A2D34',
    roughness: 0.1,
    metalness: 0.9,
    envMap: scene.background,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.position.y = -10;
// Enable shadows on the plane
planeMesh.receiveShadow = true;
scene.add(planeMesh);



// RING
const RingGeometry = new THREE.RingGeometry(8.9, 9.0, 70);
const RingMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1.2, side: THREE.DoubleSide });
const RingMesh = new THREE.Mesh(RingGeometry, RingMaterial);

RingMesh.position.set(0, 0, 0);
RingMesh.rotation.set(70, 0, 0);

// Ring Shadow
RingMesh.castShadow = true;
RingMesh.receiveShadow = true;
scene.add(RingMesh);


// RING 2
const Ring2Geometry = new THREE.RingGeometry(6.9, 7.0, 70);
const Ring2Material = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff,emissiveIntensity: 1.2, side: THREE.DoubleSide,});
const Ring2Mesh = new THREE.Mesh(Ring2Geometry, Ring2Material);

Ring2Mesh.position.set(0, 0, 0);
Ring2Mesh.rotation.set(50, 0, 0);

// Ring Shadow 2
Ring2Mesh.castShadow = true;
Ring2Mesh.receiveShadow = true;
scene.add(Ring2Mesh);



// RING 3
const Ring3Geometry = new THREE.RingGeometry(7.9, 8.0, 70);
const Ring3Material = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1.2, side: THREE.DoubleSide });
const Ring3Mesh = new THREE.Mesh(Ring3Geometry, Ring3Material);

Ring3Mesh.position.set(0, 0, 0);
Ring3Mesh.rotation.set(70, 50, 0);

// Ring Shadow

Ring3Mesh.castShadow = true;
Ring3Mesh.receiveShadow = true;
scene.add(Ring3Mesh);





// CENTER ICOSAHEDRON

const centericoGeo = new THREE.IcosahedronGeometry(3.0, 10);
const centericoaMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 15.2 });
const centericoaMesh = new THREE.Mesh(centericoGeo, centericoaMat);

centericoaMesh.position.set(0, 0, 0);
centericoaMesh.rotation.set(0, 0, 0);

// CENTER ICO Shadow
centericoaMesh.receiveShadow = true;
scene.add(centericoaMesh);


// CENTER ICOSAHEDRON2
const center2icoGeo = new THREE.IcosahedronGeometry(40.0, 10);
const center2icoaMat = new THREE.MeshStandardMaterial({ color: 0x2A2D34,side: THREE.DoubleSide });
const center2icoaMesh = new THREE.Mesh(center2icoGeo, center2icoaMat);

centericoaMesh.position.set(0, 0, 0);
centericoaMesh.rotation.set(0, 0, 0);

// Make CENTER ICO Shadow (not necessary)
center2icoaMesh.receiveShadow = true;
scene.add(center2icoaMesh);



// CENTER ICOSAHEDRON MINI (rotating)
const centericoMiniGeo = new THREE.IcosahedronGeometry(0.5, 10);
const centericoaMiniMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 15.2 });
const centericoaMiniMesh = new THREE.Mesh(centericoMiniGeo, centericoaMiniMat);

centericoaMiniMesh.position.set(0, 4.5, 0);
centericoaMiniMesh.rotation.set(0, 0, 0);


// CENTER ICO MINI Shadow (not necessary)
centericoaMiniMesh.receiveShadow = true;
scene.add(centericoaMiniMesh);




// CENTER ICOSAHEDRON MINI 2 (Above the Main Ico)
const centericoMini2Geo = new THREE.IcosahedronGeometry(1.0, 10);
const centericoaMini2Mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 15.2 });
const centericoaMini2Mesh = new THREE.Mesh(centericoMini2Geo, centericoaMini2Mat);

centericoaMini2Mesh.position.set(0, 4.5, 0);
centericoaMini2Mesh.rotation.set(0, 0, 0);

// CENTER ICO MINI Shadow (not necessary)
centericoaMini2Mesh.receiveShadow = true;
scene.add(centericoaMini2Mesh);



// CENTER ICOSAHEDRON MINI 3 (rotating)
const centericoMini3Geo = new THREE.IcosahedronGeometry(0.5, 10);
const centericoaMini3Mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 15.2 });
const centericoaMini3Mesh = new THREE.Mesh(centericoMini3Geo, centericoaMini3Mat);

centericoaMini3Mesh.position.set(0, -4.5, 0);
centericoaMini3Mesh.rotation.set(0, 0, 0);


// CENTER ICO MINI Shadow (not necessary)
centericoaMini3Mesh.receiveShadow = true;
scene.add(centericoaMini3Mesh);





// CYLINDER BASE
const cylinderGeo = new THREE.CylinderGeometry(6.9, 8.3, 1.3, 30);
const cylinderMat = new THREE.MeshStandardMaterial({ color: 0x2A2D34, roughness: 0.3, metalness: 0.9 });
const cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);

cylinderMesh.position.set(0, -9.5, 0);
cylinderMesh.rotation.set(0, 0, 0);

// CYLINDER shadow
cylinderMesh.castShadow = true;
cylinderMesh.receiveShadow = true;
scene.add(cylinderMesh);




// LARGE DONUT

const donutGeo = new THREE.TorusGeometry( 40, 0.5, 20, 50 );
const donutMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 15.2 });
const donutMesh = new THREE.Mesh(donutGeo, donutMat);

donutMesh.position.set(0, 0, 0);
donutMesh.rotation.set(0, 0, 0);

// CENTER ICO Shadow
donutMesh.receiveShadow = true;
scene.add(donutMesh);


// LARGE DONUT 2

const donut2Geo = new THREE.TorusGeometry( 40, 0.5, 20, 50 );
const donut2Mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 15.2 });
const donut2Mesh = new THREE.Mesh(donut2Geo, donut2Mat);

donut2Mesh.position.set(0, 0, 0);
donut2Mesh.rotation.set(90, 0, 0);

// CENTER ICO Shadow
donut2Mesh.receiveShadow = true;
scene.add(donut2Mesh);




// ANIMATE/RENDER like draw() in p5
function animate() {
    requestAnimationFrame(animate);

    // Offset the elements over time
    RingMesh.rotation.x += 0.004;
    RingMesh.rotation.y += 0.007;

    Ring2Mesh.rotation.x += 0.008;
    Ring2Mesh.rotation.z += 0.005;

    Ring3Mesh.rotation.x += 0.004;
    Ring3Mesh.rotation.y += 0.007;

    donutMesh.rotation.x += 0.004;
    donutMesh.rotation.y += 0.007;

    donut2Mesh.rotation.x += 0.004;
    donut2Mesh.rotation.y += 0.007;

    // Orbit the centericoaMiniMesh
    const orbitRadius = 8; // Radius
    const orbitSpeed = 0.8; // Speed

    const time = performance.now() * 0.001; 

    const orbitX = Math.cos(time * orbitSpeed) * orbitRadius;
    const orbitY = Math.sin(time * orbitSpeed) * orbitRadius; 
    const orbitZ = Math.sin(time * orbitSpeed) * orbitRadius;

    centericoaMiniMesh.position.x = orbitX;
    centericoaMiniMesh.position.y = orbitY;
    centericoaMiniMesh.position.z = orbitZ;


    // Orbit the centericoaMiniMesh 3
    const orbit3Radius = 7; // Radius
    const orbit3Speed = 1.2; // Speed

    const time3 = performance.now() * 0.001; 

    const orbit3X = Math.cos(time * orbit3Speed) * orbit3Radius;
    const orbit3Y = Math.sin(time * orbit3Speed) * orbit3Radius; 
    const orbit3Z = Math.sin(time * orbit3Speed) * orbit3Radius;

    centericoaMini3Mesh.position.x = orbit3X;
    centericoaMini3Mesh.position.y = orbit3Y;
    centericoaMini3Mesh.position.z = orbit3Z;

    renderer.render(scene, camera);
}

animate();