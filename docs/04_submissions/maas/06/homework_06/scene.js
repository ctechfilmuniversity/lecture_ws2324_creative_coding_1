import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';





// SCENE
const scene = new THREE.Scene();




//const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper );

// CAMERA
const fov = 20;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 800;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 220;
camera.position.y = 20;
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







scene.fog = new THREE.FogExp2( 0xE7ECF6, 0.007 );



//Text Plane______________________________

const textLoader = new THREE.TextureLoader();
const text = textLoader.load('Sprites/text.png');
const PlaneGeometry = new THREE.PlaneGeometry( 15, 15 );
const textMaterial = new THREE.MeshBasicMaterial({color: '#5E6573' , alphaMap : text, transparent: true });
const textPlane = new THREE.Mesh(PlaneGeometry , textMaterial);
textPlane.position.set(-1, 15, -25);

scene.add( textPlane );
textPlane.visible = true;
setTimeout(() => {
    textPlane.visible = false;
}, 30000);
//End Text Plane______________________________



//Thank you Genka: https://www.youtube.com/watch?v=pGO1Hm-JB90
//Gif used for this sprite by Anni Bernet: https://giphy.com/stickers/fire-fuego-blaze-4bNjNb8Fy3PhSusvWn
//Fire Sprite______________________________

let currentTile= 0;
const tileHorizontal = 4;
const tileVertical = 3;


const loader10 = new THREE.TextureLoader().load('textures/fire.png');
loader10.repeat.set( 1 / tileHorizontal, 1 / tileVertical );
loader10.magFilter = THREE.NearestFilter;



const spriteMaterial = new THREE.SpriteMaterial( { map: loader10 , blending: THREE.AdditiveBlending} );
const sprite = new THREE.Sprite( spriteMaterial );
sprite.position.set( -3, 13, -30 );
//sprite.scale.set( 12, 12, 1 );
scene.add( sprite );

let clock = new THREE.Clock();

function animateSprite() {
    let elapsedTime = clock.getElapsedTime();

    // Calculate the index of the current tile
    let index = Math.floor(elapsedTime * 10) % (tileHorizontal * tileVertical);

    loader10.offset.x = (index % tileHorizontal) / tileHorizontal;
    loader10.offset.y = (tileVertical - Math.floor(index / tileHorizontal) - 1) / tileVertical;
}



//End Fire Sprite______________________________





//Ground Material______________________________


const loader = new THREE.TextureLoader();
const GroundTexture = loader.load('textures/uephfgudy_4K_Albedo.jpg'); 
GroundTexture.wrapS = THREE.RepeatWrapping;
GroundTexture.wrapT = THREE.RepeatWrapping;
GroundTexture.repeat.set( 2, 2 );

const loader4 = new THREE.TextureLoader();
const GroundBump = loader4.load('textures/uephfgudy_4K_Normal.jpg'); 
GroundBump.wrapS = THREE.RepeatWrapping;
GroundBump.wrapT = THREE.RepeatWrapping;
GroundBump.repeat.set( 2, 2 );

const loader5 = new THREE.TextureLoader();
const GroundDisp = loader5.load('textures/uephfgudy_4K_Displacement.jpg');
GroundDisp.wrapS = THREE.RepeatWrapping;
GroundDisp.wrapT = THREE.RepeatWrapping;
GroundDisp.repeat.set( 2, 2 );



const GroundMaterial = new THREE.MeshStandardMaterial({ 
	map: GroundTexture, 
	bumpMap: GroundBump, 
	bumpScale: 1,  
	roughness: 0.4 , 
	displacementMap: GroundDisp, 
	displacementScale: 10 
});


//End Ground Material______________________________

const groundLoader = new FBXLoader();
				groundLoader.load( 'models/ground.fbx', function ( object ) {

					
					object.traverse( function ( child ) {

						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;
                            child.material = GroundMaterial;

						}

					} );
	
                    object.scale.set(1, 1, 1)
                    object.position.set(0, 0, 0)
					scene.add( object );

                } );






const swordLoader = new FBXLoader();
				swordLoader.load( 'models/sword.fbx', function ( object ) {

					
					object.traverse( function ( child ) {

						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;
                            child.material = swordMaterial;

						}

					} );
	
                    object.scale.set(0.2, 0.2, 0.2)
                    object.position.set(-10,12,-30)
					object.rotation.y = 60
					
					
					scene.add( object );

                } );

				const loader11 = new THREE.TextureLoader();
				const swordTexture = loader11.load('textures/uh1fdetfa_4K_Albedo.jpg');
                const swordMaterial = new THREE.MeshStandardMaterial({ map: swordTexture , metalness: 0.8 , roughness: 0.2});




//Fire FBX______________________________
const fireLoader = new FBXLoader();
				fireLoader.load( 'models/udthdasiw_LOD6.fbx', function ( object ) {

					
					object.traverse( function ( child ) {

						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;
                            child.material = fireMaterial;

						}

					} );

                    object.scale.set(0.7, 0.7, 0.7)
                    object.position.set(-3,10, -30)
					object.rotation.y = 0
					scene.add( object );

                } );

				const fireLoader2 = new FBXLoader();
				fireLoader2.load( 'models/udthdasiw_LOD6.fbx', function ( object ) {

					
					object.traverse( function ( child ) {

						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;
                            child.material = fireMaterial;

						}

					} );

                    object.scale.set(0.6, 0.6, 0.6)
                    object.position.set(-3,10, -30)
					object.rotation.y = 180
					scene.add( object );

                } );



				const loader9 = new THREE.TextureLoader();
				const fireTexture = loader9.load('textures/udthdasiw_4K_Albedo.jpg');
                const fireMaterial = new THREE.MeshStandardMaterial({ map: fireTexture });

//End Fire FBX______________________________








//Tree FBX______________________________
const treeLoader = new FBXLoader();

const loader7 = new THREE.TextureLoader();
const treeTexture = loader7.load('textures/vctgcj2fa_2K_Albedo.jpg');

const loader8 = new THREE.TextureLoader();
const treeBump = loader8.load('textures/vctgcj2fa_2K_Normal_LOD1.jpg');

//Tree Material
const treeMaterial = new THREE.MeshStandardMaterial({ 
	map: treeTexture, 
	bumpMap: treeBump,
	metalness: 0.5,
});


//Thank you chat GPT :,) !

function SeededRand(seed) {
    return function() {
        seed = Math.imul(48271, seed) | 0 % 2147483647;
        // Normalize the value to be between 0 and 1
        return (seed & 2147483647) / 2147483647;
    };
}

let rand = SeededRand(128563);

//grow 40 trees
for (let i = 0; i < 45; i++) {

				treeLoader.load( 'models/vctgcj2fa_LOD1.fbx', function ( object ) {

					
					object.traverse( function ( child ) {

						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;
                            child.material = treeMaterial;

						}

					} );

					
        const posX = rand() * 500 - 200; // Random X position between -100 and 100
        const posZ = rand() * 500 - 200; // Random Z position between -100 and 100
        object.position.set(posX, -2, posZ);

        //  random scale
        const scale = rand() * 0.2 + 0.4; // Random scale between 0.5 and 1
        object.scale.set(scale, scale, scale);

        // random rotation
        object.rotation.y = rand() * Math.PI * 2; // Random rotation between 0 and 2π

        scene.add(object);
					

                } );

			}

				

//End Tree FBX______________________________





//Thank you Flanniganable https://www.youtube.com/watch?v=OXpl8durSjA 
//Snow ************************************

let particles;
let positions = []; 
let velocities = [];

const numParticles = 20000;
const maxRange = 500; 
const minRange = maxRange/2;
const minHight = 50;

const snowGeometry = new THREE.BufferGeometry();
const snowTextureLoader = new THREE.TextureLoader();

addSnowflakes();


function addSnowflakes() {

	for (let i = 0; i < numParticles; i++) {

		positions.push ( 
	    Math.floor(Math.random() * maxRange - minRange),
		Math.floor(Math.random() * minRange + minHight),
		Math.floor(Math.random() * maxRange - minRange)
		);
		
		velocities.push( 
		Math.floor(Math.random() * 6 - 3) * 0.1,
		Math.floor(Math.random() * 3 + 0.12) * 0.18,
		Math.floor(Math.random() * 6 - 3) * 0.1);
	}
	snowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
	snowGeometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));

}

const flakeMaterial = new THREE.PointsMaterial({

	size: 4,
	map: snowTextureLoader.load('Sprites/snowflake.png'),
	blending: THREE.AdditiveBlending,
	depthTest: false,
	transparent: true,
	opacity: 0.5,
});

particles = new THREE.Points(snowGeometry, flakeMaterial);
scene.add(particles);


function updateSnow() {	

	for (let i = 0; i < numParticles*3; i+=3) {
		particles.geometry.attributes.position.array[i] -= particles.geometry.attributes.velocity.array[i];
		particles.geometry.attributes.position.array[i+1] -= particles.geometry.attributes.velocity.array[i+1];
		particles.geometry.attributes.position.array[i+2] -= particles.geometry.attributes.velocity.array[i+2];

		if (particles.geometry.attributes.position.array[i+1] < 0) {
			particles.geometry.attributes.position.array[i] = Math.floor(Math.random() * maxRange - minRange);
			particles.geometry.attributes.position.array[i+1] = Math.floor(Math.random() * minRange + minHight);
			particles.geometry.attributes.position.array[i+2] = Math.floor(Math.random() * maxRange - minRange);
		}
particles.geometry.attributes.position.needsUpdate = true;

	}
}
//End Snow ************************************










//HDRI______________________________

scene.background = new THREE.Color(0xE7ECF6);

new RGBELoader()
					
					.load( 'HDRI/kloppenheim_02_puresky_1k.hdr', function ( texture ) {

						texture.mapping = THREE.EquirectangularReflectionMapping;
						const rotationMatrix = new THREE.Matrix4();
						// Set the rotation matrix to rotate around the Y axis by 90 degrees
						rotationMatrix.makeRotationY(THREE.MathUtils.degToRad(180));
						// Apply the rotation matrix to the texture
						texture.matrix = rotationMatrix;
				
						scene.environment = texture;
                    } );


//End HDRI______________________________



//Lights______________________________



const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0);
scene.add(hemisphereLight);




const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.position.set(0, 30, 60);
directionalLight.rotation.x = -Math.PI / 2;
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 4048;
directionalLight.shadow.mapSize.height = 4048;
directionalLight.shadow.bias = -0.0001;
directionalLight.shadow.radius = 2;
directionalLight.shadow.blurSamples = 2


const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
//scene.add( directionalLightHelper );

const d = 60;
directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 0.1, 80);

scene.add(directionalLight);

const fireLight = new THREE.PointLight(0xF68D05);
fireLight.position.set(-3, 15, -30);
fireLight.scale.set(2,2,2);
scene.add(fireLight);


//End Lights______________________________





// CONTROLS FOR NAVIGATION______________________________________________________
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.target.set(0, 10, 0);
controls.update();
//END CONTROLS FOR NAVIGATION______________________________________________________


//Window Resize__________________________________

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//END Window Resize__________________________________



//Audio__________________________________

const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( '_wind.wav', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.03 );
	sound.play();
});


const music = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader4 = new THREE.AudioLoader();
audioLoader.load( 'Music.wav', function( buffer ) {
	music.setBuffer( buffer );
	music.setLoop( false );
	music.setVolume( 0.3 );

	setTimeout(function() {
        music.play();
    }, 30000);

});



let startButton = document.createElement('button');
startButton.innerHTML = 'start';

startButton.style.position = 'absolute';
startButton.style.zIndex = '1';
startButton.style.left = '10%';
startButton.style.top = '10%';
startButton.style.transform = 'translate(-50%, -50%)';
startButton.style.padding = '1em';
startButton.style.fontSize = '1.5em';
startButton.style.border = 'none';
startButton.style.color = 'white';
startButton.style.backgroundColor = '#919CB0';
startButton.style.borderRadius = '5px';
startButton.style.cursor = 'pointer';
startButton.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)';
startButton.style.transition = 'all 0.3s ease 0s';
startButton.style.textAlign = 'center';

startButton.onmouseover = function() {
    this.style.backgroundColor = '#919CB0';
    this.style.boxShadow = '0px 15px 20px rgba(255, 255, 255, 0.4)';
};

startButton.onmouseout = function() {
    this.style.backgroundColor = '#919CB0';
    this.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)';
};

document.body.appendChild(startButton);



startButton.addEventListener('click', function() {

const listener2 = new THREE.AudioListener();
camera.add( listener );
const fireSound = new THREE.PositionalAudio(listener);
const fireSoundBlow = new THREE.PositionalAudio(listener);

const audioLoader2 = new THREE.AudioLoader();
audioLoader2.load( 'fire.wav', function( buffer ) {
	fireSound.setBuffer( buffer );
	fireSound.setLoop( true );
	fireSound.setVolume( 20 );
	fireSound.position.set(-3, 15, -30);
	fireSound.play();
});




startButton.remove();
});

//Thank you Franks laboratory: https://www.youtube.com/watch?v=qNEb9of714U

class Microphone {
	constructor (){
		this.initialized = false;
		//aks for mic permission, returns promise
		navigator.mediaDevices.getUserMedia({audio: true})
		.then(function(stream) {
			this.audioContext = new AudioContext();
			//get mic stream
			this.microphone = this.audioContext.createMediaStreamSource(stream);
			//create analyser
			this.analyser = this.audioContext.createAnalyser();
			//convert audio to 512 bins
			this.analyser.fftSize = 512;
			const bufferLength = this.analyser.frequencyBinCount;
			//create array to store mic data
			this.dataArray = new Uint8Array(bufferLength);
			//feed mic data into analyser
			this.microphone.connect(this.analyser);
			this.initialized = true;
		} .bind(this)) .catch(function(err) {
			alert('Microphone permission denied');
			});
		}


			getSamples(){
				if (!this.initialized || !this.dataArray) return [];
				this.analyser.getByteFrequencyData(this.dataArray);
				//array between 0 and 255 gets divided by 128 (giving values between 0 and 2) and subtracted by 1
				//new range between -1 and 1
				let normalizeSamples = [...this.dataArray].map(e => e / 128-1);
				return normalizeSamples;
				
			}

            getVolume(){
				if (!this.initialized || !this.dataArray) return [];
				let normalizeSamples = [...this.dataArray].map(e => e / 128-1);
				
				let sum = 0;
				for (let i = 0; i < normalizeSamples.length; i++) {
					sum += normalizeSamples[i] * normalizeSamples[i];
				}
				let volume = Math.sqrt(sum / normalizeSamples.length);
				return volume;
			}

	}


const microphone = new Microphone();
console.log(microphone);

//END Audio__________________________________








// RENDER LOOP______________________________________________________

let frameCount = 0;
let frameCount2 = 0;

function animate() {

    

    renderer.render(scene, camera);
    //Animations 
    if ( camera.position.y < 20) {
        // Move the camera back above the ground
        camera.position.y = 20;
    }

	//Make the snow seem more animated
	if (frameCount2 % 3 === 0) { 
        updateSnow();
    }

    frameCount2++;


    requestAnimationFrame(animate);
    controls.update();
	animateSprite();
	  
	// Make the light flicker less often
	  if (frameCount % 10 === 0) { 
        fireLight.intensity = Math.random() * 100 + 100;
    }

    frameCount++;


//get mic data
const samples = microphone.getSamples();
//console.log(samples);

let volume = microphone.getVolume();
//console.log(volume);
//console.log(typeof volume);

let scale = (1.2 - volume) *40;
console.log(scale);
sprite.scale.set(scale, scale, 1);



}

animate();

//END RENDER LOOP______________________________________________________

