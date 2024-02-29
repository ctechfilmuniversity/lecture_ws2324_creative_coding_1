import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import Stats from 'three/examples/jsm/libs/stats.module'

//Tweakables
let camSpeed = 0.002;
let ballSpeed = 0;
let rockSize = 1;
let stonePickSpeed = 0.4;
let approachSpeedBoost = 8;
let innerCircleSize = 1000;
let innerCircleFlee = 7;

// Scene Variables
let scene, camera, renderer, stats, cameraFocus;
let sphereCamera, background; 
let stones = [];
let matOne, matTwo, matThree, matGlass, ball;
let baseColor, lightColor, directionalLight, ambientLight, pointLight;
let camUpdateX = 0;
let camUpdateY = 0;
let camUpdateZ = 0;
let clock = new THREE.Clock();
let elapsedTime = 0;
let angle = 0;

// Audio Variables
let sampleRate = 44100;
let FFTSize = 512;
let audio, frequencyData, audioAnalyser;
let prevAmpBass = 0;
let prevAmpDrums = 0;
let prevAmpViolins = 0;


// Stat Button
let startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', init );

function loadAssets() {
    return new Promise((resolve, reject) => {

        // Cam & Scene Set-Up
        let audioLoader = new THREE.AudioLoader();
        let listener = new THREE.AudioListener();
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 300000);
        cameraFocus = new THREE.Vector3();
        camera.position.z = 5000;
        camera.add(listener);
        let cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
        sphereCamera =  new THREE.CubeCamera( 1, 100000, cubeRenderTarget );
        sphereCamera.position.set(0,5000,0);

        // Create Lights
        baseColor = new THREE.Color(0.78, 0.96, 1);
        lightColor = new THREE.Color(0.94, 0.92, 0.65);
        directionalLight = new THREE.DirectionalLight(baseColor, 0.215);
        ambientLight = new THREE.AmbientLight(baseColor, 0.015);
        pointLight = new THREE.PointLight(lightColor, 1000000, 1000000);
        pointLight.position.set(0, 0, 0);

        // Load Textures
        let textureLoader = new THREE.TextureLoader();
        let texStoneOneD = textureLoader.load('/T_Sand_D.jpg'); 
        let texStoneOneN = textureLoader.load('/T_Sand_N.jpg'); 
        let texStoneOneR = textureLoader.load('/T_Sand_R.jpg'); 
        let texStoneTwoD = textureLoader.load('/T_Rock_D.jpg');
        let texStoneTwoN = textureLoader.load('/T_Rock_N.jpg');
        let texStoneTwoR = textureLoader.load('/T_Rock_R.jpg');
        let texStoneThreeD = textureLoader.load('/T_Stone_D.jpg');
        let texStoneThreeN = textureLoader.load('/T_Stone_N.jpg');
        let texStoneThreeR = textureLoader.load('/T_Stone_R.jpg');
        let envTextures = [`./px.jpg`,`./nx.jpg`,`./py.jpg`,`./ny.jpg`,`./pz.jpg`,`./nz.jpg`];
        let cubeLoader = new THREE.CubeTextureLoader();
        cubeLoader.load(envTextures, (texture) => {
            background = texture;
        });

        // Create Materials
        matOne = new THREE.MeshStandardMaterial({
            map: texStoneOneD, normalMap: texStoneOneN, roughnessMap: texStoneOneR, metalness: 0});
        matTwo = new THREE.MeshStandardMaterial({
            map: texStoneTwoD, normalMap: texStoneTwoN, roughnessMap: texStoneTwoR, metalness: 0});
        matThree = new THREE.MeshStandardMaterial({
            map: texStoneThreeD, normalMap: texStoneThreeN, roughnessMap: texStoneThreeR, metalness: 0});
        matGlass = new THREE.MeshBasicMaterial({ 
            color: 0xffffff, envMap: cubeRenderTarget.texture});

        // Glass Ball
        let sphere = new THREE.SphereGeometry( 300, 40, 20 );
        ball = new THREE.Mesh( sphere, matGlass );
        ball.position.set(0, 0, 0);

        // Load Audio
        audioLoader.load('/audio_streicher_threejs.mp3', function (buffer) {
            audio = new THREE.PositionalAudio(listener);
            audio.setBuffer(buffer);
            camera.add(audio);
            audioAnalyser = new THREE.AudioAnalyser(audio, FFTSize);
            frequencyData = audioAnalyser.getFrequencyData();

            resolve();
        });
    });
 }


function init() {

    startButton.style.display = 'none';
    let loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block';

    loadAssets().then(() => {

        // Remove Button and Start Scene
        let overlay = document.getElementById( 'overlay' );
        overlay.remove();
        let container = document.getElementById( 'container' );

        // Scene
        scene = new THREE.Scene();
        scene.background = background;
        scene.add(pointLight, directionalLight, ambientLight);
        scene.add(ball, sphereCamera);
        audio.play();
        directionalLight.position.set(1, 1, 1);

        // Load and Instanciate Stones
        instanciate('/SM_Sand_noMat.fbx', matOne, 1 * rockSize);
        instanciate('/SM_Rock_noMat.fbx', matTwo, 8 * rockSize)
        instanciate('/SM_Stone_noMat.fbx', matThree, 4 * rockSize)

        function instanciate(objPath, material, size) { 
            let objectLoader = new FBXLoader();
            objectLoader.load(objPath, function (object) {

                    object.traverse(function (child) {
                    if (child.isMesh) {
                        child.material = material;

                        // Place Random and Store Original Transform in userData
                        for ( let i = 0; i < 1000; i ++ ) {
                            let mesh = child.clone();
                            mesh.position.x = Math.random() * 8000 - 4000;
                            mesh.position.y = Math.random() * 8000 - 4000;
                            mesh.position.z = Math.random() * 8000 - 4000;
                            mesh.rotation.x = mesh.rotation.y = mesh.rotation.x = Math.random();
                            mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * size;
                            mesh.userData.originalScale = mesh.scale.x;
                            mesh.userData.originalPosition = mesh.position.clone();
                            scene.add( mesh );
                            stones.push(mesh);
                        }
                    }
                });
            });
        }

        // Renderer
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild( renderer.domElement );
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.5;
        document.body.appendChild(renderer.domElement);
        stats = new Stats();
        document.body.appendChild( stats.dom );
        window.addEventListener( 'resize', onWindowResize );

        // End Loading
        loadingElement.style.display = 'none';
        stats.domElement.style.display = 'none';
        animate();
    });
}

// Window Resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

// Mark Random Stones for Approaching
function pickRandomStone() {
    let stoneIndex = Math.floor(Math.random() * stones.length);
    let stone = stones[stoneIndex];
    if (stone && stone.userData) {
        stone.userData.moveToLight = true;
    }
}

// Turn Frequency Bounds into a Smoothed Amplitude Float
function freqSlice2smoothFloat(freqIn, freqOut, previousAmplitude, smoothingFactor, movementFactor) {
    let indexIn = Math.round(freqIn * FFTSize / sampleRate);
    let indexOut = Math.round(freqOut * FFTSize / sampleRate);
    let frequencies = frequencyData.slice(indexIn, indexOut);
    let averageAmp = frequencies.reduce((a, b) => a + b, 0) / frequencies.length;
    let smoothedAmp = THREE.MathUtils.lerp(previousAmplitude / movementFactor, averageAmp, smoothingFactor) * movementFactor;
    return smoothedAmp;
}

function animate() {
    requestAnimationFrame( animate );

    // Timing management
    angle += camSpeed;
    let delta = clock.getDelta();
    elapsedTime += delta;
    if (elapsedTime >= stonePickSpeed) { 
        pickRandomStone();
        elapsedTime = 0;
    }

    // Update Audio driven Variables
    frequencyData = audioAnalyser.getFrequencyData();
    let smoothedBassAmp = freqSlice2smoothFloat(30, 45, prevAmpBass, 1, 0.000175);
    prevAmpBass = smoothedBassAmp;
    let smoothedDrumsAmp = freqSlice2smoothFloat(100, 150, prevAmpDrums, 1, 5);
    prevAmpDrums = smoothedDrumsAmp;
    let smoothedViolinsAmp = freqSlice2smoothFloat(400, 700, prevAmpViolins, 1, 0.005);
    prevAmpViolins = smoothedViolinsAmp;
    
    // Animate Glass Ball
    ballSpeed += smoothedBassAmp + 0.001;
    ball.position.x = Math.sin( ballSpeed * 0.7) * 1500;
    ball.position.y = Math.cos( ballSpeed * 0.5) * 1500;
    ball.position.z = Math.cos( ballSpeed * 0.3) * 1500;
    sphereCamera.position.copy(ball.position);
    pointLight.position.copy(ball.position);

    // Animate Camera
    camera.position.x = THREE.MathUtils.lerp(camUpdateX, ball.position.x + Math.cos(angle) * 5000, 0.4);
    camera.position.y = THREE.MathUtils.lerp(camUpdateY, ball.position.y + Math.sin(angle) * 5000, 0.4);
    camera.position.z = THREE.MathUtils.lerp(camUpdateZ, ball.position.z + Math.sin(angle) * 5000, 0.4);
    camUpdateX = camera.position.x;
    camUpdateY = camera.position.y;
    camUpdateZ = camera.position.z;
    cameraFocus.lerp(ball.position, 0.001);
    camera.lookAt(cameraFocus);

    // Animate Stones
    innerCircleSize = 400 + smoothedDrumsAmp;
    innerCircleFlee = 0.3 + smoothedBassAmp * 500;
    let pickSpeedThemp = Math.abs(1.23 - smoothedViolinsAmp);
    pickSpeedThemp = pickSpeedThemp > 1 ? 8 : pickSpeedThemp;
    stonePickSpeed = pickSpeedThemp;
    console.log(stonePickSpeed);

    stones.forEach((stone) => {
        // Rotation
        stone.lookAt(ball.position);
        let distance = stone.position.distanceTo(ball.position);

        // Field Rules
        let direction = new THREE.Vector3().subVectors(stone.position, ball.position).normalize();
        // - some random ones closer
        if (stone.userData.moveToLight && distance > 3000) {
            let targetPosition = new THREE.Vector3().subVectors(stone.position, direction);
            stone.position.lerp(targetPosition, (Math.random() * 0.9 + 0.1) + approachSpeedBoost);
            if (distance < 80) {
                stone.userData.moveToLight = false;
            }
        // - others away if too close
        } else if (distance < innerCircleSize) {
            let targetPosition = new THREE.Vector3().addVectors(stone.position, direction);
            stone.position.lerp(targetPosition, innerCircleFlee);
        // - the rest back to their origin
        } else if (stone.userData.originalPosition) {
            let originalPosition = stone.userData.originalPosition;
            stone.position.lerp(originalPosition, 0.001);
        }

        // Scale
        let scale = stone.userData.originalScale + (8 - distance / 400);
        stone.scale.set(scale, scale, scale);
    });


    stats.update();
    
    ball.visible = false;
    sphereCamera.update( renderer, scene );
    ball.visible = true;
    
    renderer.render( scene, camera );
}