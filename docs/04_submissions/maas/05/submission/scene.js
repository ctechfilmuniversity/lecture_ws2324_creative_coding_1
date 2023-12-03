import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';



// SCENE
const scene = new THREE.Scene();



//const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper );

// CAMERA
const fov = 20;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 200;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 90;
camera.position.y = 10;
camera.position.x = 10;
 
//const cameraHelper = new THREE.CameraHelper(camera);
//scene.add(cameraHelper);





// RENDERER
const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({canvas, antialias: true, });
renderer.setSize( window.innerWidth, window.innerHeight);

renderer.gammaOutput = true;
renderer.gammaFactor = 2.2; 

renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2.0;
renderer.outputEncoding = THREE.LinearEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;




// Textures

const loader = new THREE.TextureLoader();
const bumpTexture = loader.load('normal.png'); 

const loader2 = new THREE.TextureLoader();
const bumpTexture2 = loader.load('bump.png'); 

const loader3 = new THREE.TextureLoader();
const alphaTexture = loader.load('tdcnfcdr_2K_Opacity.jpg'); 

const loader4 = new THREE.TextureLoader();
const diffuse = loader.load('tdcnfcdr_2K_Albedo.jpg'); 


//Colors

let color1 = new THREE.Color(0xE5F47C);
let color2 = new THREE.Color(0x4157DF);
let color3 = new THREE.Color(0xADC939);
let color4 = new THREE.Color(0x78797F);
let color5 = new THREE.Color(0x3F4142);


//Materials 

const material = new THREE.MeshStandardMaterial({ color: color1  , roughness: 0.4, bumpMap: bumpTexture,bumpScale: 6 });
const material2 = new THREE.MeshStandardMaterial({ color: color4 , roughness: 0.6 });
const material7 = new THREE.MeshStandardMaterial({ color: color3 , roughness: 0.6 });
const material3 = new THREE.MeshStandardMaterial({ color: color4 , roughness: 0.4, bumpMap : bumpTexture,bumpScale: 6});
const material5 = new THREE.MeshStandardMaterial({ color: color5 , roughness: 0.4 , bumpMap : bumpTexture,bumpScale: 6});
const material4 = new THREE.MeshStandardMaterial({ color: color1 , roughness: 0.6 });
const material6 = new THREE.MeshStandardMaterial({ color: color2 , roughness: 0.4 , bumpMap : bumpTexture,bumpScale: 6});
const BigSphereMaterial = new THREE.MeshStandardMaterial({color: color3 , roughness: 0.4, bumpMap : bumpTexture,bumpScale: 6 });
//const material8 = new THREE.MeshStandardMaterial({ color: color4 , roughness: 0.4 , map : verlauf,bumpScale: 6});
const glowMaterial = new THREE.MeshStandardMaterial({color: color5, emissive: 0xf4b8b8, emissiveIntensity: 2});
const grassMaterial = new THREE.MeshStandardMaterial({map: diffuse, alphaMap: alphaTexture , transparent: true });


//FBX Loader 
//const fbxLoader = new FBXLoader();


//Load OBJ
//fbxLoader.load('Var1_LOD1.fbx', function (object) {
        
        
     




//Bottom Sphere
const geometry = new THREE.SphereGeometry( 2, 32, 32 ); 
const sphere = new THREE.Mesh( geometry, material5 ); scene.add( sphere );

sphere.castShadow = true;
sphere.position.set(0,0,0);
scene.add(sphere);

//Cylinder

const cylindergeometry = new THREE.CylinderGeometry( 1, 1, 18, 32 );

const cylinder = new THREE.Mesh (cylindergeometry, material7); 

cylinder.castShadow = true;
cylinder.position.set(0,3,0);
cylinder.rotation.set(0,0,Math.PI/2);

scene.add(cylinder);


//small Sphere


const geometrysmallsphere = new THREE.SphereGeometry( 1, 32, 32 ); 

const smallsphere = new THREE.Mesh( geometrysmallsphere, material3 ); scene.add( sphere );
const smallsphere2 = new THREE.Mesh( geometrysmallsphere, material6 ); scene.add( sphere );
const smallsphere3 = new THREE.Mesh( geometrysmallsphere, material5 ); scene.add( sphere );
const smallsphere4 = new THREE.Mesh( geometrysmallsphere, material6 ); scene.add( sphere );
const smallsphere5 = new THREE.Mesh( geometrysmallsphere, material3 ); scene.add( sphere );


const smallsphere6 = new THREE.Mesh( geometrysmallsphere, glowMaterial ); scene.add( sphere );




smallsphere.position.set (7,5,0);
smallsphere.castShadow = true;
smallsphere2.position.set (-7,5,0);
smallsphere2.castShadow = true;
smallsphere3.position.set (-7,17,0);
smallsphere3.castShadow = true;
smallsphere4.position.set (7,17,0);
smallsphere4.castShadow = true;
smallsphere5.position.set (-3,-1,3);
smallsphere5.castShadow = true;
smallsphere6.position.set (0,10,0);
smallsphere6.castShadow = true;

scene.add(smallsphere);
scene.add(smallsphere2);
scene.add(smallsphere3);
scene.add(smallsphere4);
scene.add(smallsphere5);
scene.add(smallsphere6);

//small Cylinder

const smallcylindergeometry = new THREE.CylinderGeometry( 1, 1, 8, 32 );
const smallcylinder = new THREE.Mesh (smallcylindergeometry, material2); 
const smallcylinder2 = new THREE.Mesh (smallcylindergeometry, material2);
const smallcylinder3 = new THREE.Mesh (smallcylindergeometry, material2);
const smallcylinder4 = new THREE.Mesh (smallcylindergeometry, material7);
const smallcylinder5 = new THREE.Mesh (smallcylindergeometry, material2);
const smallcylinder6 = new THREE.Mesh (smallcylindergeometry, material2);


smallcylinder.position.set(7,7,0);
smallcylinder.rotation.set(0,Math.PI/4,Math.PI/2);
smallcylinder.castShadow = true;

smallcylinder2.position.set(-7,7,0);
smallcylinder2.rotation.set(0,Math.PI/4,Math.PI/2);
smallcylinder2.castShadow = true;

smallcylinder3.position.set(-7,9,0);
smallcylinder3.rotation.set(0,-Math.PI/4,Math.PI/2);
smallcylinder3.castShadow = true;

smallcylinder4.position.set(7,9,0);
smallcylinder4.rotation.set(0,-Math.PI/4,Math.PI/2);
smallcylinder4.castShadow = true;

smallcylinder5.position.set(7,15,0);
smallcylinder5.rotation.set(0,Math.PI/4,Math.PI/2);
smallcylinder5.castShadow = true;

smallcylinder6.position.set(-7,-1,-3);
smallcylinder6.rotation.set(0,Math.PI/4,Math.PI/2);
smallcylinder6.castShadow = true;

scene.add(smallcylinder);
scene.add(smallcylinder2);
scene.add(smallcylinder3);
scene.add(smallcylinder4);
scene.add(smallcylinder5);
scene.add(smallcylinder6);



//Big Sphere
const BigSphereGeometry = new THREE.SphereGeometry( 3, 32, 32 ); 
const BigSphere = new THREE.Mesh( BigSphereGeometry, BigSphereMaterial ); scene.add( sphere );

BigSphere.castShadow = true;
BigSphere.position.set(-7,13,0);
scene.add(BigSphere);

//Very Big Sphere
const VeryBigSphereGeometry = new THREE.SphereGeometry( 4, 32, 32 ); 
const VeryBigSphere = new THREE.Mesh( VeryBigSphereGeometry, material6 ); scene.add( sphere );

VeryBigSphere.castShadow = true;
VeryBigSphere.position.set(10,2,-10);
scene.add(VeryBigSphere);

//Background Sphere
const BackgroundSphereGeometry = new THREE.SphereGeometry( 6, 32, 32 ); 
const BackgroundSphere = new THREE.Mesh( BackgroundSphereGeometry, material5 ); scene.add( sphere );

BackgroundSphere.castShadow = true;
BackgroundSphere.position.set(-10,4,-15);
scene.add(BackgroundSphere);


//Middle Sphere
const middleSphereGeometry = new THREE.SphereGeometry( 2, 32, 32 ); 
const middleSphere = new THREE.Mesh( middleSphereGeometry, material5 ); scene.add( sphere );

middleSphere.position.set(7,12,0);
middleSphere.castShadow = true;
scene.add(middleSphere);





//BACKGROUND COLOR
const colorB = new THREE.Color( 0xD4D4D4 );

new RGBELoader()
					
					.load( 'veranda_2k.hdr', function ( texture ) {

						texture.mapping = THREE.EquirectangularReflectionMapping;

						scene.background = colorB;
						scene.environment = texture;
                    } );




//Lights

const spherelight = new THREE.PointLight( 0xFFFFFF, 500, 10 );
spherelight.position.set( 0,8,0);
scene.add( spherelight );

//const pointLightHelper = new THREE.PointLightHelper(spherelight, 5);
//scene.add( pointLightHelper );

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
scene.add(hemisphereLight);



const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(20, 20, 20);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 4048;
directionalLight.shadow.mapSize.height = 4048;
directionalLight.shadow.bias = -0.0001;
directionalLight.shadow.radius = 2;
directionalLight.shadow.blurSamples = 2

//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
//scene.add( directionalLightHelper );

const d = 60;
directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 0.1, 80);

scene.add(directionalLight);

const planeGeometry = new THREE.PlaneGeometry();
const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.4, color: 0x604020, transparent: true });
const plane = new THREE.Mesh(planeGeometry, shadowMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
plane.scale.set(60, 60, 60);
plane.receiveShadow = true;

scene.add(plane);


/* //Text Plane

const textPlaneGeometry = new THREE.PlaneGeometry(30,30,30);
const textPlane = new THREE.Mesh(textPlaneGeometry, materialText);
textPlane.position.set(0,15,-8)
scene.add (textPlane);  */

// CONTROLS FOR NAVIGATION
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.target.set(0, 10, 0);
controls.update();

// Clock
let clock = new THREE.Clock();
let amplitude = 0.01; // Height of the hover effect
let frequency = 1; // Speed of the hover effect

// RENDER LOOP
function animate() {
    
    renderer.render(scene, camera);
    //Animations
    //smallcylinder.rotation.y += 0.002;
    smallcylinder2.rotation.y += 0.002;
   // smallcylinder3.rotation.y -= 0.002;
    smallcylinder4.rotation.y -= 0.002;
    smallcylinder5.rotation.y += 0.002;
    smallsphere2.rotation.x -= 0.002;
    smallsphere3.rotation.x += 0.002;
    smallsphere4.rotation.x -= 0.002;
    smallsphere5.rotation.x += 0.002;
    BigSphere.rotation.y += 0.002;
    middleSphere.rotation.y -= 0.002;
    
    
    let time = clock.getElapsedTime();
    smallsphere6.position.y += Math.sin(time * frequency) * amplitude;
    spherelight.position.y += Math.sin(time * frequency) * amplitude;

    // Ensure that the sphere doesn't go below its initial position
    if (smallsphere6.position.y < smallsphere6.position.y) {
        smallsphere6.position.y = smallsphere6.position.y;
    }

    if (spherelight.position.y < smallsphere6.position.y) {
        spherelight.position.y = smallsphere6.position.y;
    }




    requestAnimationFrame(animate);
    controls.update();
}

animate();