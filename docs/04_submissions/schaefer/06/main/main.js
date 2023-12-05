import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

let video, vtexture;

const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(0,0,0)");
scene.fog = new THREE.FogExp2(scene.background, 0.02);


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;   

renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;

video = document.getElementById( 'video' );
video.play();
video.addEventListener( 'play', function () {

	this.currentTime = 3;

} );

vtexture = new THREE.VideoTexture( video );
vtexture.colorSpace = THREE.SRGBColorSpace;


document.body.appendChild( renderer.domElement );


const controls = new OrbitControls(camera, renderer.domElement)


const loader2 = new THREE.TextureLoader();
const texAo = loader2.load('img/TechIntro_ao.png'); 

const texCd = loader2.load('img/TechIntro_color.png'); 
const texDis = loader2.load('img/dismap.png');

const material = new THREE.MeshStandardMaterial({ map:texCd , aoMap:texAo ,roughness: 0.9 });
const material2 = new THREE.MeshStandardMaterial({ map:vtexture ,displacementMap:vtexture,roughnessMap: vtexture });
material2.displacementScale = 0.22;
material2.map.needsUpdate = true;
material2.roughnessMap.needsUpdate = true;

material2.displacementMap.needsUpdate = true;


const spherelight = new THREE.PointLight( 0xFFFFFF, 5, 10 );
spherelight.position.set( -5,0,-4);
scene.add( spherelight );

const spherelight2 = new THREE.PointLight( 0xFFFFFF,8.5, 8 );
spherelight2.position.set( 2,-2,2);
scene.add( spherelight2 );


const light = new THREE.DirectionalLight(0xffffff, 0.5)
light.position.set(0, 5, 10)
scene.add(light)

const geometry3 = new THREE.SphereGeometry( 2, 512, 512 ); 

const sphere = new THREE.Mesh( geometry3, material2 ); 
sphere.position.set(6,0,0);
scene.add( sphere );





const planeGeometry = new THREE.PlaneGeometry(5, 5, 512, 512)
const plane = new THREE.Mesh( planeGeometry, material2 );
plane.castShadow = true;
scene.add( plane );

const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'models/hands180k.obj',
	// called when resource is loaded
	function ( object ) {
        object.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = material;
				child.position.set(-6,-1,0);  
				child.castShadow = true;
            }
        } );
		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);




function animate() {

	requestAnimationFrame( animate );
	sphere.rotation.x += 0.001;
	sphere.rotation.y += 0.0025;

	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}