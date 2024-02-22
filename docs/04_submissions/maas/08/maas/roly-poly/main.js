import * as THREE from 'three'
import * as CANNON from 'cannon'
import { Hands } from '@mediapipe/hands'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Camera } from '@mediapipe/camera_utils'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'



const textureLoader4 = new THREE.TextureLoader()
const texture4 = textureLoader4.load('/tex/Roly_Poly_diffuse_green.jpg')

const textureLoader5 = new THREE.TextureLoader()
const texture5 = textureLoader5.load('/tex/Roly_Poly_diffuse_green_happy.jpg')
// create material

const material4 = new THREE.MeshBasicMaterial({ map: texture4, roughness: 0.7 })
const material5 = new THREE.MeshBasicMaterial({ map: texture5, roughness: 0.7 })


// load fbx model of thr rolypoly
const loader = new FBXLoader()
let rolyPoly

loader.load(
  'Roly_Poly_painted.fbx',
  function (object) {
    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.material = material4
      }
    })
    object.scale.set(0.01, 0.01, 0.01)
    console.log(object)
    scene.add(object)
    rolyPoly = object
  },

  function (error) {
    console.log(error)
  }
)

// Scene, camera, renderer
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 10
camera.position.y = 3
camera.position.x = 0
var lookAtPosition = new THREE.Vector3(0, 4, 0);
camera.lookAt(lookAtPosition);


var renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)
renderer.gammaOutput = true;
renderer.gammaFactor = 7;

renderer.physicallyCorrectLights = true;
renderer.toneMappingExposure = 0.5;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;


//window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})


//Text plane 
const textPlane = new THREE.PlaneGeometry(8, 8, 1, 1)
const textTexture = new THREE.TextureLoader().load('/tex/tetx_opacity.jpg')
const textMaterial = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: textTexture })
const textMesh = new THREE.Mesh(textPlane, textMaterial)
textMesh.position.set(0, 2, -6)
scene.add(textMesh)






// Physik-Welt erstellen
var world = new CANNON.World()
world.gravity.set(0, -9.82, 0) // Erdanziehungskraft

// CANNON ground 
var groundMaterial = new CANNON.Material()
var groundBody = new CANNON.Body({
  mass: 0, // Masse 0 bedeutet, dass der Boden unbeweglich ist
  shape: new CANNON.Plane(),
  material: groundMaterial,
})
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
world.addBody(groundBody)

// CANNON sphere
var ballMaterial = new CANNON.Material()
var ballBody = new CANNON.Body({
  mass: 1,
  shape: new CANNON.Sphere(1),
  material: ballMaterial,
  linearDamping: 0.7,
  angularDamping: 0.7,
})
ballBody.position.set(0, 10, 0)
world.addBody(ballBody)

// ThreeJS geometry for ground/shadow plane
var groundGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
var groundMesh = new THREE.Mesh(
  groundGeometry,
  new THREE.ShadowMaterial({ color: 0xF36A8D })
)
groundMesh.rotation.x = -Math.PI / 2
groundMesh.receiveShadow = true
groundMesh.position.y = 0
scene.add(groundMesh)

//DirectionalLight hinzufügen
var light = new THREE.DirectionalLight(0xffffff, 0)
light.position.set(0, 20, 10)
light.castShadow = true
light.shadow.camera.top = 18
light.shadow.camera.bottom = -10

scene.add(light)


//HDRI 
new RGBELoader()

  .load('/tex/hayloft_2k.hdr', function (texture) {

    texture.mapping = THREE.EquirectangularReflectionMapping;
    const rotationMatrix = new THREE.Matrix4();
    // Set the rotation matrix to rotate around the Y axis by 90 degrees
    rotationMatrix.makeRotationY(THREE.MathUtils.degToRad(180));
    // Apply the rotation matrix to the texture
    texture.matrix = rotationMatrix;

    scene.environment = texture;
  });






//Background color
scene.background = new THREE.Color(0xFFA4BB)


// Anchor for spring position
var anchorBody = new CANNON.Body({ mass: 0 }) // mass 0, should not move
anchorBody.position.set(0, 0, 0)
world.addBody(anchorBody)

// spring settings
var spring = new CANNON.Spring(anchorBody, ballBody, {
  localAnchorA: new CANNON.Vec3(0, 0, 0),
  localAnchorB: new CANNON.Vec3(0, -0.5, 0),
  restLength: 0,
  stiffness: 150,
  damping: 1,
})

// OrbitControls 
var controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 2, 0)
controls.update()



// Array for hand spheres 
var handLandmarkSpheres = []
var handLandmarkBodies = []

const handSize = 0.5
const landmarkSphereGeometry = new THREE.SphereGeometry(handSize, 32, 32)
const landmarkSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xFFACC1 })

// 21 spheres for each hand landmark
for (let i = 0; i < 21; i++) {
  const sphere = new THREE.Mesh(landmarkSphereGeometry, landmarkSphereMaterial)
  sphere.visible = false
  handLandmarkSpheres.push(sphere)
  scene.add(sphere)

  // Cannon.js Rigid Body for each sphere
  const sphereBody = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Sphere(handSize),
  })

  handLandmarkBodies.push(sphereBody)
  world.addBody(sphereBody)
}

// MediaPipe Hands 
const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
})
hands.setOptions({
  modelComplexity: 1,
})


hands.onResults((results) => {
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    const landmarks = results.multiHandLandmarks[0]
    const multiplier = 16
    landmarks.forEach((landmark, index) => {
      const sphere = handLandmarkSpheres[index]
      const body = handLandmarkBodies[index]
      sphere.visible = true

      // Transformieren Sie die Landmark-Koordinaten
      const x = (landmark.x - 0.5) * -multiplier
      const y = (landmark.y - 0.5) * -multiplier
      const z = (landmark.z - 0.5) * -multiplier - 8
      sphere.position.set(x, y, z)
      body.position.set(x, y, z)
    })
  } else {
    handLandmarkSpheres.forEach((sphere) => (sphere.visible = false))
  }
})
// MediaPipe webcam
const videoElement = document.getElementById('input_video')
const webcam = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement })
  },
  width: 1280,
  height: 720,
})
webcam.start()




const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load('/sound.wav', function (buffer) {
  sound.setBuffer(buffer);
  sound.setVolume(0.03);
  console.log("Sound 1 loaded");


});








function createTextCanvas(text, color, font, size) {
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');

  // Set canvas size
  canvas.width = 512;
  canvas.height = 256;

  // Set font size and style
  context.font = `${size}px 'Reenie Beanie'`;
  context.fillStyle = '0x63BEFF';

  // Calculate text width and position text in center
  let textWidth = context.measureText(text).width;
  context.fillText(text, (canvas.width - textWidth) / 2, canvas.height / 2);

  return canvas;
}

function createCanvasTexture(canvas) {
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createTexturedPlane(texture) {
  let geometry = new THREE.PlaneGeometry(4, 2);
  let material = new THREE.MeshBasicMaterial({
    map: texture, transparent: true
  });
  let plane = new THREE.Mesh(geometry, material);
  plane.position.set(1, 2.5, 0);
  return plane;
}

// Create text canvas and texture
let textCanvas = createTextCanvas('ouch!', 0x63BEFF, 'Arial', 48);
let textTexture2 = createCanvasTexture(textCanvas);

// Create and add the textured plane to the scene
let textPlane2 = createTexturedPlane(textTexture2);
scene.add(textPlane2);
textPlane2.visible = false;

//Array of words to say
const words = ["- OUCH", "- HEY!", "- UFF", "- HELP.", "- !@#$"];
//choosing a random word from the array
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}


function updateTextOnPlane(plane, newText) {
  let newCanvas = createTextCanvas(newText, 0x63BEFF, 'Arial', 48);
  plane.material.map.dispose(); // Dispose the old texture
  plane.material.map = createCanvasTexture(newCanvas);
  plane.material.map.needsUpdate = true;
  plane.material.needsUpdate = true;
}



//wait for the words to update
let lastUpdateTime = 0;
const cooldownPeriod = 2000;


//Animate 
function animate() {
  requestAnimationFrame(animate)
  const currentTime = Date.now();
  // draw Physik-Engine
  world.step(1 / 60)


  spring.applyForce()

  if (rolyPoly && textPlane) {
    textPlane2.position.copy(rolyPoly.position);
    textPlane2.position.y += 1.3;
    textPlane2.position.z -= -1;
    textPlane2.position.x -= -1;



  }



  if (rolyPoly) {
    //console.log(rolyPoly.position.distanceTo(ballBody.position))
    if (rolyPoly.position.distanceTo(ballBody.position) > 0.01) {
      //console.log("distance")
      // random pitch 
      sound.detune = Math.floor(Math.random() * 600);
      sound.play();


      //play random sound

    }
    else {
      sound.stop();
    }


    if (rolyPoly.position.distanceTo(ballBody.position) > 0.002) {
      if (currentTime - lastUpdateTime > cooldownPeriod) {
        let randomWord = getRandomWord(); // Get random word
        updateTextOnPlane(textPlane2, randomWord);
        console.log(randomWord);
        textPlane2.visible = true;

        lastUpdateTime = currentTime; // Update the last update time

        // Switch to material2
        rolyPoly.traverse(function (child) {
          if (child.isMesh) {
            child.material = material5;
          }
        });

      }
    }

    else {
      textPlane2.visible = false;

      // Switch back to material1
      if (currentTime - lastUpdateTime > cooldownPeriod) {
        rolyPoly.traverse(function (child) {
          if (child.isMesh) {
            child.material = material4;
          }
        });

        lastUpdateTime = currentTime; // Update the last update time

      }
    }

    //make the rolypoly fbx follow the CANNON sphere 
    rolyPoly.position.copy(ballBody.position)
    rolyPoly.quaternion.copy(ballBody.quaternion)
  }


  renderer.render(scene, camera)
  controls.update()

}

animate()

