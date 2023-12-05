
import * as THREE from 'three';



import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



const scene = new THREE.Scene();

scene.background = new THREE.Color('#FFF4E4');
scene.fog = new THREE.FogExp2(scene.background, 0.02);

// CAMERA
const fov = 70; 
const aspect = window.innerWidth / window.innerHeight; 
const near = 0.1; 
const far = 10; 
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3; 


// RENDERER
const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({canvas, antialias: true}); 
renderer.setSize( window.innerWidth, window.innerHeight); 

// GEOMETRY

// I Shape

const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
const materialI = new THREE.MeshBasicMaterial( {color: 0x60993E} );

const I1 = new THREE.Mesh( geometry, materialI );
I1.position.set( 0, 0, 0 );

const edgesI1 = new THREE.EdgesGeometry( geometry ); 
const lineI1 = new THREE.LineSegments(edgesI1, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 


const I2 = new THREE.Mesh( geometry, materialI );
I2.position.set( 0, 0.1, 0 );


const edgesI2 = new THREE.EdgesGeometry( geometry ); 
const lineI2 = new THREE.LineSegments(edgesI2, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineI2.position.y = 0.1;


const I3 = new THREE.Mesh( geometry, materialI );
I3.position.set( 0, 0.2, 0 );

const edgesI3 = new THREE.EdgesGeometry( geometry ); 
const lineI3 = new THREE.LineSegments(edgesI3, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineI3.position.y = 0.2;


const I4 = new THREE.Mesh( geometry, materialI );
I4.position.set( 0, 0.3, 0 );

const edgesI4 = new THREE.EdgesGeometry( geometry ); 
const lineI4 = new THREE.LineSegments(edgesI4, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineI4.position.y = 0.3;



const shapeI = new THREE.Group();

shapeI.add( I1 );
shapeI.add( I2 );
shapeI.add( I3 );
shapeI.add( I4 );
shapeI.add(lineI1);
shapeI.add(lineI2);
shapeI.add(lineI3);
shapeI.add(lineI4);

shapeI.position.set(0,-0.8,1);
shapeI.rotation.x = Math.PI/2;
shapeI.rotation.z = Math.PI/2;


// L shape
const materialL = new THREE.MeshBasicMaterial( {color: 0xD36135} );

const L1 = new THREE.Mesh( geometry, materialL );
L1.position.set( 0.5, 0.1, 0 );

const edgesL1 = new THREE.EdgesGeometry( geometry ); 
const lineL1 = new THREE.LineSegments(edgesL1, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineL1.position.set( 0.5, 0.1, 0 );

const L2 = new THREE.Mesh( geometry, materialL );
L2.position.set( 0.5, 0, 0 );

const edgesL2 = new THREE.EdgesGeometry( geometry ); 
const lineL2 = new THREE.LineSegments(edgesL2, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineL2.position.set( 0.5, 0, 0 );

const L3 = new THREE.Mesh( geometry, materialL );
L3.position.set( 0.6, 0, 0 );

const edgesL3 = new THREE.EdgesGeometry( geometry ); 
const lineL3 = new THREE.LineSegments(edgesL3, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineL3.position.set( 0.6, 0, 0 );

const L4 = new THREE.Mesh( geometry, materialL );
L4.position.set( 0.7, 0, 0 );

const edgesL4 = new THREE.EdgesGeometry( geometry ); 
const lineL4 = new THREE.LineSegments(edgesL4, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineL4.position.set( 0.7, 0, 0 );


const shapeL = new THREE.Group();
shapeL.add(L1);
shapeL.add(lineL1);
shapeL.add(L2);
shapeL.add(lineL2);
shapeL.add(L3);
shapeL.add(lineL3);
shapeL.add(L4);
shapeL.add(lineL4);

shapeL.position.set(-0.1,-1.2,1);
shapeL.rotation.z = Math.PI/2;

// T Shape

const materialT = new THREE.MeshBasicMaterial( {color: 0xECE4B7} );

const T1 = new THREE.Mesh( geometry, materialT );
T1.position.set( 0.5, 0.1, 0.5 );

const edgesT1 = new THREE.EdgesGeometry( geometry ); 
const lineT1 = new THREE.LineSegments(edgesT1, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineT1.position.set( 0.5, 0.1, 0.5 );

const T2 = new THREE.Mesh( geometry, materialT );
T2.position.set( 0.5, 0, 0.5 );

const edgesT2 = new THREE.EdgesGeometry( geometry ); 
const lineT2 = new THREE.LineSegments(edgesT2, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineT2.position.set( 0.5, 0, 0.5 );

const T3 = new THREE.Mesh( geometry, materialT );
T3.position.set( 0.6, 0, 0.5 );

const edgesT3 = new THREE.EdgesGeometry( geometry ); 
const lineT3 = new THREE.LineSegments(edgesT3, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineT3.position.set( 0.6, 0, 0.5 );

const T4 = new THREE.Mesh( geometry, materialT );
T4.position.set( 0.5, -0.1, 0.5 );

const edgesT4 = new THREE.EdgesGeometry( geometry ); 
const lineT4 = new THREE.LineSegments(edgesT4, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineT4.position.set( 0.5, -0.1, 0.5 );


const shapeT = new THREE.Group();
shapeT.add(T1);
shapeT.add(lineT1);
shapeT.add(T2);
shapeT.add(lineT2);
shapeT.add(T3);
shapeT.add(lineT3);
shapeT.add(T4);
shapeT.add(lineT4);

shapeT.position.set(-0.4,-0.2,1.5);
shapeT.rotation.z = Math.PI/2;
shapeT.rotation.x = Math.PI;

// S shape

const materialS = new THREE.MeshBasicMaterial( {color: 0xE6AA68} );

const S1 = new THREE.Mesh( geometry, materialS );
S1.position.set( 0, 0.1, 0.5 );

const edgesS1 = new THREE.EdgesGeometry( geometry ); 
const lineS1 = new THREE.LineSegments(edgesS1, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineS1.position.set( 0, 0.1, 0.5 );

const S2 = new THREE.Mesh( geometry, materialS );
S2.position.set( 0, 0, 0.5 );

const edgesS2 = new THREE.EdgesGeometry( geometry ); 
const lineS2 = new THREE.LineSegments(edgesS2, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineS2.position.set( 0, 0, 0.5 );

const S3 = new THREE.Mesh( geometry, materialS );
S3.position.set( 0.1, 0.1, 0.5 );

const edgesS3 = new THREE.EdgesGeometry( geometry ); 
const lineS3 = new THREE.LineSegments(edgesS3, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineS3.position.set( 0.1, 0.1, 0.5 );

const S4 = new THREE.Mesh( geometry, materialS );
S4.position.set( -0.1, 0, 0.5 );

const edgesS4 = new THREE.EdgesGeometry( geometry ); 
const lineS4 = new THREE.LineSegments(edgesS4, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineS4.position.set( -0.1, 0, 0.5 );


const shapeS = new THREE.Group();
shapeS.add(S1);
shapeS.add(lineS1);
shapeS.add(S2);
shapeS.add(lineS2);
shapeS.add(S3);
shapeS.add(lineS3);
shapeS.add(S4);
shapeS.add(lineS4);

shapeS.rotation.z = Math.PI/2;
shapeS.position.set(0.1,-0.7,0.5);

// shape O

const materialO = new THREE.MeshBasicMaterial( {color: 0x0091AD} );

const O1 = new THREE.Mesh( geometry, materialO );
O1.position.set( 0, 0.5, 0.5 );

const edgesO1 = new THREE.EdgesGeometry( geometry ); 
const lineO1 = new THREE.LineSegments(edgesO1, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineO1.position.set( 0, 0.5, 0.5 );

const O2 = new THREE.Mesh( geometry, materialO );
O2.position.set( 0.1, 0.5, 0.5 );

const edgesO2 = new THREE.EdgesGeometry( geometry ); 
const lineO2 = new THREE.LineSegments(edgesO2, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineO2.position.set( 0.1, 0.5, 0.5 );

const O3 = new THREE.Mesh( geometry, materialO );
O3.position.set( 0, 0.4, 0.5 );

const edgesO3 = new THREE.EdgesGeometry( geometry ); 
const lineO3 = new THREE.LineSegments(edgesO3, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineO3.position.set( 0, 0.4, 0.5 );

const O4 = new THREE.Mesh( geometry, materialO );
O4.position.set( 0.1, 0.4, 0.5 );

const edgesO4 = new THREE.EdgesGeometry( geometry ); 
const lineO4 = new THREE.LineSegments(edgesO4, new THREE.LineBasicMaterial( { color: 0x02020B } ) ); 
lineO4.position.set( 0.1, 0.4, 0.5 );

const shapeO = new THREE.Group();
shapeO.add(O1);
shapeO.add(lineO1);
shapeO.add(O2);
shapeO.add(lineO2);
shapeO.add(O3);
shapeO.add(lineO3);
shapeO.add(O4);
shapeO.add(lineO4);

shapeO.position.set(-0.3,-1,0.5);

//clones

const shapeI2 = shapeI.clone();
shapeI2.position.set(0.1,0,0.7);
shapeI2.rotation.y = Math.PI/2;

const shapeT2 = shapeT.clone();
shapeT2.position.set(0.8,0.8,1);
shapeT2.rotation.z = Math.PI;

const shapeS2 = shapeS.clone();
shapeS2.position.set(-1,0.6,0.5);
shapeS2.rotation.y = Math.PI/2;

const shapeL2 = shapeL.clone();
shapeL2.position.set(-1,-0.5,0);
shapeL2.rotation.y = Math.PI/2;

const shapeO2 = shapeO.clone();
shapeO2.position.set(0.2,0,0.3);

// big tetris group
const tetris = new THREE.Group();
tetris.add(shapeI, shapeT, shapeL, shapeS, shapeO, shapeI2,shapeT2, shapeS2, shapeL2, shapeO2);


tetris.position.set(0.6,0,0);
tetris.rotation.y = - Math.PI/4;




//TEXT 


const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('text.png');

const planeGeometry = new THREE.PlaneGeometry(5, 5); // You can adjust the size of the plane
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 , alphaMap: texture, transparent: true} );


const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.position.set(0,0.55,0.3);

const texture2 = textureLoader.load('text.png');

const planeGeometry2 = new THREE.PlaneGeometry(5, 5); // You can adjust the size of the plane
const planeMaterial2 = new THREE.MeshBasicMaterial({ color: 0x000000 , alphaMap: texture2, transparent: true} );


const planeMesh2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
planeMesh2.position.set(0,0.55,0.3);
planeMesh2.rotation.y = Math.PI;



scene.add(tetris, planeMesh, planeMesh2);


// LIGHTING

//AMBIENT
const lightColor = 0xffffff;
const lightIntensity = 0.5;
const ambientLight = new THREE.AmbientLight(lightColor, lightIntensity);
scene.add(ambientLight);

// POINT LIGHT

const pointLight = new THREE.PointLight(0xffffff, 3); //( color, intensity)
pointLight.position.set(3, 2, 1); // (x,y,z position)
scene.add(pointLight);



// CONTROLS FOR NAVIGATION
const controls = new OrbitControls(camera, renderer.domElement);


//RENDER LOOP
function animate() {
    
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
