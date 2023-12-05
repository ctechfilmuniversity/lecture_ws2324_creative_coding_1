import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer, sphereCamera, sphere, spotLight;

init();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color('#e5d5bb'); //#D4F5F5

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 30 );
	camera.position.z = 12;
    scene.add( camera );

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
    sphereCamera =  new THREE.CubeCamera( 1, 100000, cubeRenderTarget );
    sphereCamera.position.set(0,1.3,0);
    scene.add(sphereCamera);

// renderer

    renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    renderer.setAnimationLoop( render );
    function loadModel() {render();}
    const manager = new THREE.LoadingManager(loadModel);


// lighting

    const ambientLight = new THREE.AmbientLight(0xfff4c9, 0.6)
    scene.add(ambientLight);

    spotLight = new THREE.PointLight(0xfff4c9, 100);
    spotLight.position.set( -1, 4, -3 );
    spotLight.angle = Math.PI / 90;
    spotLight.penumbra = 1;
    spotLight.decay = 2;
    spotLight.distance = 0;
   // spotLight.map = textures[ 'disturb.jpg' ];

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.focus = 1;
    scene.add( spotLight );



// geometry

    // standard materials
    const redMat = new THREE.MeshStandardMaterial({ color: '#7b0a0a' });
    const dGreenMat = new THREE.MeshStandardMaterial({ color: '#213c18' });
    const bGreenMat = new THREE.MeshStandardMaterial({ color: '#668c6f' });
    const brownMat = new THREE.MeshStandardMaterial({ color: '#baa58c' });
    const beigeMat = new THREE.MeshStandardMaterial({ color: '#e5d5bb' });

    // ground
    const planeGeo = new THREE.PlaneGeometry(13, 13);
    const planeMesh = new THREE.Mesh(planeGeo, redMat);
    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.position.y = -3;
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);

    // boxes
    const boxGeo = new THREE.BoxGeometry(1,1,1);

    /*
    new function createBox(boxName, mat, size, pos) {
        const [boxName] = new THREE.Mesh(boxGeo, mat);
        boxName.position.set(pos[0], pos[1], pos[2]);
        scene.add(boxName);
        boxName.scale.x = size[0]; 
        boxName.scale.y = size[1]; 
        boxName.scale.z = size[2];
        boxName.castShadow = true;
        boxName.receiveShadow = true;
    }
    createBox(pillar1, brownMat, [1, 2, 1], [0, -2, 0]);
*/
    
    const pillar1 = new THREE.Mesh(boxGeo, brownMat);
    pillar1.position.set(0,-1,0);
    scene.add(pillar1);
    pillar1.scale.x = 1; pillar1.scale.y = 2; pillar1.scale.z = 1;
    pillar1.castShadow = true; pillar1.receiveShadow = true;

    const pillar2 = new THREE.Mesh(boxGeo, bGreenMat);
    pillar2.position.set(0,-2,0);
    scene.add(pillar2);
    pillar2.scale.x = 2; pillar2.scale.y = 1; pillar2.scale.z = 2;
    pillar2.castShadow = true; pillar2.receiveShadow = true;
    
    const pillar3 = new THREE.Mesh(boxGeo, dGreenMat);
    pillar3.position.set(0,-3,0);
    scene.add(pillar3);
    pillar3.scale.x = 3; pillar3.scale.y = 1; pillar3.scale.z = 3;
    pillar3.castShadow = true; pillar3.receiveShadow = true;

    // sphere
    const sphereGeo = new THREE.SphereGeometry( 1.1, 32, 16); 
    const sphereMat = new THREE.MeshBasicMaterial( { 
        color: 0xffffff, 
        envMap: cubeRenderTarget.texture
    } );
    sphere = new THREE.Mesh( sphereGeo, sphereMat );
    sphere.position.set(0,1.3,0);
    scene.add(sphere);


    
// texture loading 

	const assignSRGB = ( texture ) => {
		texture.colorSpace = THREE.SRGBColorSpace;
	};

    const textureLoader = new THREE.TextureLoader( manager );

	const snowflake = textureLoader.load(`../assets/T_Snow_D.png`, assignSRGB);


// particle setup

    const bufferGeo = new THREE.BufferGeometry();
    const vertices = [];

    for ( let i = 0; i < 1000; i ++ ) {

        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;
        vertices.push( x, y, z );
    }
    
        bufferGeo.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        const snowMat = new THREE.PointsMaterial( { size: 20, map: snowflake, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
        snowMat.color.setHSL( 1.0, 0.2, 0.5, THREE.SRGBColorSpace );

        const particles = new THREE.Points( bufferGeo, snowMat );

        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;

        scene.add( particles );
    

// orbit controls

    const controls = new  OrbitControls( camera, renderer.domElement );
    controls.minDistance = 5;
    controls.maxDistance = 18;
    controls.addEventListener( 'change', render );
    controls.target.copy( sphere.position );

}


    

function render() {
  
    const time1 = performance.now() / 3000;
    const time2 = Date.now() * 0.00005;

    spotLight.position.x = Math.cos( time1 ) * 2.5;
	spotLight.position.z = Math.sin( time1 ) * 2.5;
  
    sphere.visible = false;
    sphereCamera.update( renderer, scene );
    sphere.visible = true;

    for ( let i = 0; i < scene.children.length; i ++ ) {
        const object = scene.children[ i ];
        if ( object instanceof THREE.Points ) {
            object.rotation.y = time2 * ( i < 4 ? i + 1 : - ( i + 1 ) );
        }
    }
    renderer.render( scene, camera );
}

window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}