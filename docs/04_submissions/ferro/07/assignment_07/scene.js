
import * as THREE from 'three';



import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';


let mouseX = 0;
let mouseY = 0;

let isMouseMoving = false;

const scene = new THREE.Scene();

//scene.background = new THREE.Color('#FFF4E4');
scene.fog = new THREE.FogExp2(scene.background, 0.02);

// CAMERA
const fov = 70; 
const aspect = window.innerWidth / window.innerHeight; 
const near = 0.1; 
const far = 10; 
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3.5; 
camera.position.y = 2;
camera.position.x = 1;

// RENDERER
const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({canvas, antialias: true}); 
renderer.setSize( window.innerWidth, window.innerHeight); 

//LIGHTING

// Enable shadows in the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
// Set background color
renderer.setClearColor(0x87CEEB); // Set to the sky color

 // POINT LIGHT

 const pointLight = new THREE.PointLight(0xffffff, 3); //( color, intensity)
 pointLight.position.set(1, 1, 1); // (x,y,z position)
 scene.add(pointLight);



const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Adjust intensity as needed
scene.add(ambientLight);

//Add a directional light to simulate the sun. This light casts shadows and provides directional illumination.

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5); // Adjust the position based on your scene
directionalLight.castShadow = true; // Enable shadows for objects
// Configure shadow properties
directionalLight.shadow.mapSize.width = 4048;
directionalLight.shadow.mapSize.height = 4048;
directionalLight.shadow.bias = -0.0001;
//directionalLight.shadow.camera.near = 0.5;
//directionalLight.shadow.camera.far = 50;
directionalLight.shadow.radius = 2;
directionalLight.shadow.blurSamples = 4;


const d = 60;
directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 0.1, 80);
scene.add(directionalLight);

//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
//scene.add( directionalLightHelper );


const planeGeometry = new THREE.PlaneGeometry();
const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.4, color: 0x604020, transparent: true });
//const testMaterial = new THREE.MeshStandardMaterial({ color: 0x604020});
const plane = new THREE.Mesh(planeGeometry, shadowMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.5;
plane.scale.set(60, 60, 60);
plane.receiveShadow = true;

scene.add(plane);


// GEOMETRY

// load pot 3d model

const potLoader = new FBXLoader();
potLoader.load('3d_street_ujcgdg1fa/ujcgdg1fa_LOD1.fbx', (pot_fbx) => {
    const pot = pot_fbx;
    pot.scale.set(0.01,0.01,0.01);
    pot.position.set(0.5,-0.5,0);
    
   
    const potTextureLoader = new THREE.TextureLoader();
    
    // Load albedo (diffuse) texture
    const potAlbedoTexture = potTextureLoader.load('3d_street_ujcgdg1fa/ujcgdg1fa_4K_Albedo.jpg');
        
        // Load normal map texture
        const potNormalMapTexture = potTextureLoader.load('3d_street_ujcgdg1fas/ujcgdg1fa_4K_Normal_LOD1.jpg');
    
    
        // Create a material with texture maps
        const potMaterial = new THREE.MeshStandardMaterial({
             map: potAlbedoTexture,
             normalMap: potNormalMapTexture,
             transparent: true,
       });
    
       pot.traverse((child) => {
    
        if (child.isMesh) {
            child.material = potMaterial;
            child.castShadow = true;
       }
    
    });

    scene.add(pot);
});




// Load the flower models

//sunflower1

const loader = new FBXLoader();
loader.load('plants_3d_sjrjK/Var1/Var1_LOD1.fbx', (var1_fbx) => {
    const sunflower1 = var1_fbx;
    sunflower1.scale.set(0.001,0.001,0.001);
    sunflower1.position.y = -10

//sunflower2

    const loader = new FBXLoader();
    loader.load('plants_3d_sjrjK/Var2/Var2_LOD1.fbx', (var2_fbx) => {
        const sunflower2 = var2_fbx;
        sunflower2.scale.set(0.01,0.01,0.01);
        sunflower2.position.set(0.1,0,0);

// sunflower3

const loader = new FBXLoader();
loader.load('plants_3d_sjrjK/Var3/Var3_LOD1.fbx', (var3_fbx) => {
    const sunflower3 = var3_fbx;
    sunflower3.scale.set(0.01,0.01,0.01);
    sunflower3.position.set(0.2,0,0);

// sunflower4

const loader = new FBXLoader();
loader.load('plants_3d_sjrjK/Var4/Var4_LOD1.fbx', (var4_fbx) => {
    const sunflower4 = var4_fbx;
    sunflower4.scale.set(0.01,0.01,0.01);
    sunflower4.position.set(0.3,0,0);

// sunflower5

const loader = new FBXLoader();
loader.load('plants_3d_sjrjK/Var5/Var5_LOD1.fbx', (var5_fbx) => {
    const sunflower5 = var5_fbx;
    sunflower5.scale.set(0.01,0.01,0.01);
    sunflower5.position.set(0.4,0,0);

// sunflower6

const loader = new FBXLoader();
loader.load('plants_3d_sjrjK/Var6/Var6_LOD1.fbx', (var6_fbx) => {
    const sunflower6 = var6_fbx;
    sunflower6.scale.set(0.01,0.01,0.01);
    sunflower6.position.set(0.5,0,0);

// sunflower7

const loader = new FBXLoader();
loader.load('plants_3d_sjrjK/Var7/Var7_LOD1.fbx', (var7_fbx) => {
    const sunflower7 = var7_fbx;
    sunflower7.scale.set(0.01,0.01,0.01);
    sunflower7.position.set(0.6,0,0);

// sunflower8

const loader = new FBXLoader();
loader.load('plants_3d_sjrjK/Var8/Var8_LOD1.fbx', (var8_fbx) => {
    const sunflower8 = var8_fbx;
    sunflower8.scale.set(0.01,0.01,0.01);
    sunflower8.position.set(0.7,0,0);

    //TEXTURE

    // Set up texture loaders
    const textureLoader = new THREE.TextureLoader();
    
    // Load albedo (diffuse) texture
    const albedoTexture = textureLoader.load('plants_3d_sjrjK/Textures/Atlas/sjliddp_4K_Albedo.jpg');
    
    // Load normal map texture
    const normalMapTexture = textureLoader.load('plants_3d_sjrjK/Textures/Atlas/sjliddp_4K_Normal.jpg');

    // Load opacity (alpha) texture
    const opacityTexture = textureLoader.load('plants_3d_sjrjK/Textures/Atlas/sjliddp_4K_Opacity.jpg');

    // Create a material with texture maps
    const material = new THREE.MeshStandardMaterial({
         map: albedoTexture,
         normalMap: normalMapTexture,
         alphaMap: opacityTexture,
         transparent: true,
   });

// create a group for the bush

const bush = new THREE.Group();

bush.add( sunflower1, sunflower2, sunflower3, sunflower4, sunflower5, sunflower6, sunflower7, sunflower8);
bush.scale.set(1.3,1.3,1.3);

// Apply material to the group

bush.traverse((child) => {

     if (child.isMesh) {
         child.material = material;
         child.castShadow = true;
    }

});


scene.add(bush);


    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
        isMouseMoving = true;
    
    });
    
    document.addEventListener('mouseout', () => {
        isMouseMoving = false;
    });

    // Mouse event listener
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;

        // Adjust lights based on mouse position
        const intensity = THREE.MathUtils.clamp(mouseX, 0.3, 1); // Ensure intensity is between 0 and 1
        ambientLight.intensity = intensity;
        directionalLight.intensity = intensity;

        // Define a range for the lighting direction
        const minLightX = -50;
        const maxLightX = 50;
    
        // Map mouseX to the lighting direction range
        const lightY = THREE.MathUtils.clamp(mouseX, minLightX, maxLightX);
    
        // Adjust directional light position based on mouse position
        directionalLight.position.set(lightY, 1, 1);
    
        // Adjust shadow camera based on mouse position
        const d = 50;
        directionalLight.shadow.camera.left = lightY - d;
        directionalLight.shadow.camera.right = lightY + d;
        directionalLight.shadow.camera.top = lightY + d;
        directionalLight.shadow.camera.bottom = lightY - d;
        directionalLight.shadow.camera.updateProjectionMatrix();
    
        // Adjust sky color based on mouse position
        const skyColor = new THREE.Color(0x87CEEB);
        skyColor.lerp(new THREE.Color(0x191970), 1 - Math.abs(mouseX));
        sky.material.color.copy(skyColor);

  });


    function animate() {

        if (isMouseMoving) {
            // Get the mouse position relative to the center of the scene
            const relativeMouseX = mouseX * window.innerWidth / 2;
            
            // Calculate the target rotation based on the mouse position
            const targetRotation = (relativeMouseX / window.innerWidth) * Math.PI / 2;

            // Smoothly rotate sunflowers towards the target rotation
            const rotationSpeed = 0.05;
            sunflower1.rotation.y += (targetRotation - sunflower1.rotation.y) * rotationSpeed;
            sunflower2.rotation.y += (targetRotation - sunflower2.rotation.y) * rotationSpeed;
            sunflower3.rotation.y += (targetRotation - sunflower3.rotation.y) * rotationSpeed;
            sunflower4.rotation.y += (targetRotation - sunflower4.rotation.y) * rotationSpeed;
            sunflower5.rotation.y += (targetRotation - sunflower5.rotation.y) * rotationSpeed;
            sunflower6.rotation.y += (targetRotation - sunflower6.rotation.y) * rotationSpeed;
            sunflower7.rotation.y += (targetRotation - sunflower7.rotation.y) * rotationSpeed;
            sunflower8.rotation.y += (targetRotation - sunflower8.rotation.y) * rotationSpeed;
         
        }
    
    
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

animate();




});
});
});
});
});
});
});
});









// CONTROLS FOR NAVIGATION
const controls = new OrbitControls(camera, renderer.domElement);

