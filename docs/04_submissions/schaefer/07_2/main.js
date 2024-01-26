import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import * as math from 'math';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let video, vtexture;
let camera, scene, renderer, stats;
let PlaneGeometry;
let aspectRatio; 
const canvas = document.querySelector('canvas.webgl');



const material = new THREE.ShaderMaterial({
    uniforms: {
        mouse: { value: new THREE.Vector2() },
        uColor: { value: new THREE.Vector3(0.5,0.5,0.0) },
        uAspectRatio: {value:0.1},
        uTime: {value:0.0},
        uRadius: {value:0.01}
    },
    vertexShader: `
        varying vec2 vUv;
    

        void main() {

            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
  

        uniform float uTime; 
        uniform vec2 mouse;
        uniform vec3 uColor; 
        uniform float uAspectRatio;
        uniform float uRadius;
	
     


         void main() {
            // Use UV coordinates to determine color
            vec2 p = vUv - mouse;
            p.x *= uAspectRatio;
            vec3 color = vec3(vUv,0.2);

            vec3 splat = exp(-dot(p,p) / uRadius) * color;

            gl_FragColor = vec4(splat, 1.0);
        } 
    `,

    transparent: true
});




init();
animate();




function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("rgb(0,0,0)");
    scene.fog = new THREE.FogExp2(scene.background, 0.02);

    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize( window.innerWidth, window.innerHeight );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    PlaneGeometry = new THREE.PlaneGeometry( window.innerWidth*0.015,window.innerHeight*0.015 );

    aspectRatio = window.innerWidth / window.innerHeight;
    material.uniforms.uAspectRatio.value = aspectRatio;

    const mesh = new THREE.Mesh(PlaneGeometry , material);

    scene.add(camera)
    scene.add(mesh)


}


function render() {
    renderer.render(scene, camera)
}

function animate() {
    const time = Date.now() * 0.01;
    requestAnimationFrame( animate );
    material.uniforms.uTime.value = time;
    //material.uniforms.uAspectRatio.value = aspectRatio;
    render();
}



window.addEventListener('mousemove', (event) => {
    let mouseX = event.clientX / window.innerWidth ;
    let mouseY = 1-(event.clientY / window.innerHeight);
    
    mouseX = map_range(mouseX,0,1,0.125,0.875);
    mouseY = map_range(mouseY,0,1,0.1,0.9);

   
    material.uniforms.mouse.value = new THREE.Vector2(mouseX, mouseY);

    console.log(mouseX);
    console.log(mouseY); 

});


function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}