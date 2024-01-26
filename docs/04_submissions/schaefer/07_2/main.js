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


const canvas = document.querySelector('canvas.webgl');



const material = new THREE.ShaderMaterial({
    uniforms: {
        mouse: { value: new THREE.Vector2() },
        test: {value:0.5},
        uTime: {value:0.0}
        // Add other uniforms as needed
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
        uniform float test; 
        uniform float uTime; 
        void main() {
            // Use UV coordinates to determine color
            vec3 color = vec3(vUv, 0.5+test);
            gl_FragColor = vec4(color, 1.0);
        }
    `,
    // You might need to adjust the following line based on your needs
    // (like blending or depth testing)
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

    PlaneGeometry = new THREE.PlaneGeometry( 5, 5 );

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
    material.uniforms.test.value = math.sin(time)*0.5+0.5;
    material.uniforms.uTime.value = time;

    render();

}



window.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) - 0.5;
    const mouseY = 0.5 - (event.clientY / window.innerHeight);
    material.uniforms.mouse.value = new THREE.Vector2(mouseX, mouseY);
});


