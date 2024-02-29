
import * as THREE from 'three';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


//_______________________________________________________SCENE SETTING_______________________________________________________________________

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xE6BAA3);


//_______________________________________________________CAMERA SETTING______________________________________________________________________

const fov = 70; 
const aspect = window.innerWidth / window.innerHeight; 
const near = 0.1; 
const far = 10; 
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5; 


//_______________________________________________________RENDERER SETTING______________________________________________________________________

const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({canvas, antialias: true}); 
renderer.setSize( window.innerWidth, window.innerHeight); 

//Navigation Controls
//const controls = new OrbitControls(camera, renderer.domElement);


//Resize
window.addEventListener('resize', () => 
{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

});


//_______________________________________________________LIGHTING SETTING______________________________________________________________________

//Point Light

const pointLight1 = new THREE.PointLight(0xffffff, 5); 
pointLight1.position.set(-3, 1, 0); 
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 5); 
pointLight2.position.set(0, 1, 0); 
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 5); 
pointLight3.position.set(3, 1, 0); 
scene.add(pointLight3);


//Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
scene.add(ambientLight);


//__________________________________START GAME BUTTON__________________________________________________

const startGameButton = document.createElement("button"); 
startGameButton.textContent = "START GAME";
document.body.appendChild(startGameButton); 

//Button style
startGameButton.style.position = 'absolute';
startGameButton.style.bottom = '50px';
startGameButton.style.left = '50%';
startGameButton.style.transform = 'translateX(-50%)';
startGameButton.style.backgroundColor = 'transparent';
startGameButton.style.color = 'black';
startGameButton.style.border = '3px solid black';
startGameButton.style.borderRadius = '20px';
startGameButton.style.padding = '13px 30px';
startGameButton.style.textAlign = 'center';
startGameButton.style.fontSize = '20px';
startGameButton.style.fontWeight = 'bold';


//Change Button Background Color when the mouse is over it
startGameButton.addEventListener("mouseenter", function() {
    startGameButton.style.backgroundColor = '#e7956a'; 
});

startGameButton.addEventListener("mouseleave", function() {
    startGameButton.style.backgroundColor = 'transparent'; 
});


//____________________________________CUPS BUTTONS________________________________________________________

//Icon 1
const icon1Button = document.createElement("button"); // Create a button element
icon1Button.textContent = "1";

document.body.appendChild(icon1Button); // Append the button to the document body

//Button Style
icon1Button.style.position = 'absolute';
icon1Button.style.bottom = '18%';
icon1Button.style.left = '29%';
icon1Button.style.transform = 'translateX(-50%)';
icon1Button.style.backgroundColor = 'transparent';
icon1Button.style.color = 'black';
icon1Button.style.border = '3px solid black';
icon1Button.style.borderRadius = '50px';
icon1Button.style.width = '65px'; 
icon1Button.style.height = '65px'; 
icon1Button.style.padding = '0';
icon1Button.style.textAlign = 'center';
icon1Button.style.fontSize = '30px';
icon1Button.style.fontWeight = 'bold';
icon1Button.style.lineHeight = '50px'; 


//Icon 2
const icon2Button = document.createElement("button"); // Create a button element
icon2Button.textContent = "2";

document.body.appendChild(icon2Button); // Append the button to the document body

//Button Style
icon2Button.style.position = 'absolute';
icon2Button.style.bottom = '18%';
icon2Button.style.left = '50%';
icon2Button.style.transform = 'translateX(-50%)';
icon2Button.style.backgroundColor = 'transparent';
icon2Button.style.color = 'black';
icon2Button.style.border = '3px solid black';
icon2Button.style.borderRadius = '50px';
icon2Button.style.width = '65px'; // Larghezza e altezza del pulsante
icon2Button.style.height = '65px'; // Larghezza e altezza del pulsante
icon2Button.style.padding = '0';
icon2Button.style.textAlign = 'center';
icon2Button.style.fontSize = '30px';
icon2Button.style.fontWeight = 'bold';
icon2Button.style.lineHeight = '50px'; // Posiziona il testo verticalmente al centro



//Icon 3
const icon3Button = document.createElement("button"); // Create a button element
icon3Button.textContent = "3";

document.body.appendChild(icon3Button); // Append the button to the document body

//Button Style
icon3Button.style.position = 'absolute';
icon3Button.style.bottom = '18%';
icon3Button.style.left = '72%';
icon3Button.style.transform = 'translateX(-50%)';
icon3Button.style.backgroundColor = 'transparent';
icon3Button.style.color = 'black';
icon3Button.style.border = '3px solid black';
icon3Button.style.borderRadius = '50px';
icon3Button.style.width = '65px'; // Larghezza e altezza del pulsante
icon3Button.style.height = '65px'; // Larghezza e altezza del pulsante
icon3Button.style.padding = '0';
icon3Button.style.textAlign = 'center';
icon3Button.style.fontSize = '30px';
icon3Button.style.fontWeight = 'bold';
icon3Button.style.lineHeight = '50px'; // Posiziona il testo verticalmente al centro



//_______________________________________________________CUPS AND BALL______________________________________________________________________

//BALL
const geometryBall = new THREE.SphereGeometry(0.1, 50, 50);
const materialBall = new THREE.MeshBasicMaterial({ color: 0x3D3B40 });
const ball = new THREE.Mesh(geometryBall, materialBall);
ball.position.set(0, -1, 0);

scene.add(ball);


//CUPS

// Array to keep track of the cups
const cups = []; 

// Function to add cups to the scene
function addCupToScene(cup) { 
    cups.push(cup);
    scene.add(cup);
};

//3D Object Loading

//Cup 1
const loaderCup1 = new GLTFLoader();
loaderCup1.load('3dmodels/red_plastic_cup/scene.gltf',
			function ( gltf ) {

				const cup1 = gltf.scene;
				cup1.scale.set(10,10,10);
				cup1.position.set(-3,0,0);
				cup1.rotation.x = Math.PI;
				
				addCupToScene(cup1);       
			});

//Cup 3
const loaderCup3 = new GLTFLoader();
loaderCup3.load('3dmodels/red_plastic_cup/scene.gltf',
			function ( gltf ) {

				const cup3 = gltf.scene;
				cup3.scale.set(10,10,10);
				cup3.position.set(3,0,0);
				cup3.rotation.x = Math.PI;
										
				addCupToScene(cup3);	
			});


// Assign a global varibale to keep track of the cup with the ball
let cup2;

//Cup 2
const loaderCup2 = new GLTFLoader();
loaderCup2.load('3dmodels/red_plastic_cup/scene.gltf',
			function ( gltf ) {

				const cup2Object = gltf.scene;
                cup2Object.scale.set(10, 10, 10);
                cup2Object.position.set(0, 0.5, 0);
                cup2Object.rotation.x = Math.PI;

                // Assign the cup to the variable
                cup2 = cup2Object;
               
                //Add event listener to the button
				startGameButton.addEventListener("click", function() { 
    				
                    if (startGameButton.textContent === "START GAME"){  // Check button text

    				    cup2.position.set(0, 0, 0); // Set the position of cup2 to (0, 0, 0)
					    moveCupsRandomly(); // Call the function that moves the cups
                        startGameButton.disabled = true; // Disable "Start Game" Button

                    };

                    diseableColorStartButton(); // Disable color change when mouse over button
				});

                addCupToScene(cup2);
                               
			});		


//____________________________________MOVE CUPS LOGIC________________________________________________________

const finalPositions = [0, 3, -3]; // Create an array to set the x positions

// Function to move the cups randomly in different positions
function moveCupsRandomly() {
    const numMoves = Math.floor(Math.random() * 9) + 7; // Generate a random number  for the moves
    const totalAnimationDuration = 7000; // Duration of the animation
    const delayBetweenMoves = totalAnimationDuration / numMoves; // Set a delay between the moves
    let completedMoves = 0; // Variable to keep track of the moves

    // Iteration over each moves
    for (let i = 0; i < numMoves; i++) {
        setTimeout(() => {
            const shuffledFinalPositions = shuffleArray(finalPositions.slice()); // Schuffle the positions
            cups.forEach((cup, index) => { 
                animateCupMovement(cup, shuffledFinalPositions[index], delayBetweenMoves, () => {
                    completedMoves++; //Keep track of the moves
                    if(completedMoves == numMoves * cups.length){ //When all the moves are completed
                        
                        scene.add(instructions); // Add the instructions
                        changeIconColor(); // Change icon color

                        // Add Event Listener to the icon buttons
                        icon1Button.addEventListener('click', handleClickIcon1); 
                        icon2Button.addEventListener('click', handleClickIcon2);
                        icon3Button.addEventListener('click', handleClickIcon3);
                        
                    }; 
                }); 
            });
        }, i * delayBetweenMoves);
    };
};

// Function to animate every cup
function animateCupMovement(cup, finalPosition, duration, callback) {

    const startPosition = cup.position.x;
    const deltaPosition = finalPosition - startPosition;
    let startTime = null;
    

    function animateStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1); // Progress of the animation (from 0 to 1)
        const newPosition = startPosition + deltaPosition * progress;
        cup.position.x = newPosition;
        // Update ball position connected to cup 2
        ball.position.x = cup2.position.x;

        if (progress < 1) {
            // Continue animation 
            requestAnimationFrame(animateStep);
        } else {
            callback();
            
        };
    };

    requestAnimationFrame(animateStep);
};


// Function to randomly shuffle the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    };
    return array;
};

//____________________________________INSTRUCTIONS TEXT________________________________________________________

const textureLoaderInstructions = new THREE.TextureLoader();

const textureInstructions = textureLoaderInstructions.load('Instructions.png');
const planeInstructions = new THREE.PlaneGeometry(16/2, 9/2);
const materialInstructions= new THREE.MeshBasicMaterial({ color: 0x000000 , alphaMap: textureInstructions, transparent: true });

const instructions = new THREE.Mesh(planeInstructions, materialInstructions);
instructions.position.set(0, 4.2, -2);



//_________________________________________________________CUP SELECTION LOGIC____________________________________________

// Function to handle click on Icon 1
function handleClickIcon1() {
        
    const leftCup = cups.find(cup => cup.position.x < 0); //Find the cup based on the x position
    if (leftCup) {

        leftCup.position.y = 0.5; // Lift cup

        if (ball.position.x < 0) { // Look if the ball is in the same position

            getRandomWinnerImage(); // Get a random winner meme

        } else {

            getRandomLoserImage(); // Get a random loser meme

        };
    };

    handleClickInputOnce(); // Avoid other guesses
    
};

// Function to handle click on Icon 2
function handleClickIcon2() {
    
    const centerCup = cups.find(cup => cup.position.x === 0); //Find the cup based on the x position

    if (centerCup) {

        centerCup.position.y = 0.5; // Lift cup

        if (ball.position.x === 0) { //Look if the ball is in the same position

            getRandomWinnerImage(); // Get a random winner meme

        } else {
            
           getRandomLoserImage(); // Get a random loser meme

        };
    };
    handleClickInputOnce(); // Avoid other guesses
    
};

// Function to handle click on Icon 3
function handleClickIcon3() {
    
    const rightCup = cups.find(cup => cup.position.x > 0); //Find the cup based on the x position

    if (rightCup) {

        rightCup.position.y = 0.5; // Lift cup

        if (ball.position.x > 0) { //Look if the ball is in the same position

           getRandomWinnerImage(); // Get a random loser meme

        } else {

            getRandomLoserImage(); // Get a random loser meme

        };
    };
    handleClickInputOnce(); // Avoid other guesses
    
};


// Function to handle click input only once
function handleClickInputOnce() {
    
    scene.remove(instructions); //remove instructions once guessed

    // Remove events listener after the first key press
    icon1Button.removeEventListener('click', handleClickInputOnce); 
    icon2Button.removeEventListener('click', handleClickInputOnce); 
    icon3Button.removeEventListener('click', handleClickInputOnce); 

    // Disable icon buttons
    icon1Button.disabled = true;
    icon2Button.disabled = true;
    icon3Button.disabled = true;

    // Disable change of background color of the icon buttons
    diseableColor();

    // Enable "Start Game" button
    startGameButton.disabled = false;

    //Enable background color change of the button
    eneableColorStartButton();

    // change text of the button
    startGameButton.textContent = "PLAY AGAIN"; 
};


//____________________________________________CHANGE COLOR FUNCTIONS___________________________________________________________________

// Function to change the color of the background of the icon buttons when the mouse is over
function changeIconColor(){
    
    icon1Button.addEventListener("mouseenter", function() {
    icon1Button.style.backgroundColor = '#e7956a';
    });

    icon1Button.addEventListener("mouseleave", function() {
    icon1Button.style.backgroundColor = 'transparent'; 
    });

    icon2Button.addEventListener("mouseenter", function() {
    icon2Button.style.backgroundColor = '#e7956a';
    });

    icon2Button.addEventListener("mouseleave", function() {
    icon2Button.style.backgroundColor = 'transparent';
    });

    icon3Button.addEventListener("mouseenter", function() {
    icon3Button.style.backgroundColor = '#e7956a'; 
    });

    icon3Button.addEventListener("mouseleave", function() {
    icon3Button.style.backgroundColor = 'transparent'; 
    });
};

// Function to disable background color change of the icon buttons
function diseableColor(){
    
    icon1Button.addEventListener("mouseenter", function() {
        icon1Button.style.backgroundColor = 'transparent'; 
        });

        icon1Button.addEventListener("mouseleave", function() {
        icon1Button.style.backgroundColor = 'transparent'; 
        });
    
        icon2Button.addEventListener("mouseenter", function() {
        icon2Button.style.backgroundColor = 'transparent'; 
        });

        icon2Button.addEventListener("mouseleave", function() {
        icon2Button.style.backgroundColor = 'transparent'; 
        });

    
        icon3Button.addEventListener("mouseenter", function() {
        icon3Button.style.backgroundColor = 'transparent'; 
        });

        icon3Button.addEventListener("mouseleave", function() {
        icon3Button.style.backgroundColor = 'transparent'; 
        });

};

// Function to disable background color change of the "Start Game" buttons
function diseableColorStartButton(){
   
        startGameButton.addEventListener("mouseenter", function() {
        startGameButton.style.backgroundColor = 'transparent'; 
        });

        startGameButton.addEventListener("mouseleave", function() {
        startGameButton.style.backgroundColor = 'transparent'; 
        });
};

// Function to eneable background color change of the "Start Game" buttons
function eneableColorStartButton(){
    startGameButton.addEventListener("mouseenter", function() {
        startGameButton.style.backgroundColor = '#e7956a'; 
    });
    
    
    startGameButton.addEventListener("mouseleave", function() {
        startGameButton.style.backgroundColor = 'transparent'; 
    });
};


//_________________________________________________________FINAL MEME______________________________________________________


// Create arrays to store the images

let winnerImages = [];
let loserImages = [];

// Load the image texture
const textureLoader = new THREE.TextureLoader();
const textureWinner1 = textureLoader.load('meme/winner/winner1.png');
const textureWinner2 = textureLoader.load('meme/winner/winner2.png');
const textureWinner3 = textureLoader.load('meme/winner/winner3.png');
const textureWinner4 = textureLoader.load('meme/winner/winner4.png');
const textureWinner5 = textureLoader.load('meme/winner/winner5.png');
const textureWinner6 = textureLoader.load('meme/winner/winner6.png');
const textureLoser1 = textureLoader.load('meme/loser/loser1.png');
const textureLoser2 = textureLoader.load('meme/loser/loser2.png');
const textureLoser3 = textureLoader.load('meme/loser/loser3.png');
const textureLoser4 = textureLoader.load('meme/loser/loser4.png');
const textureLoser5 = textureLoader.load('meme/loser/loser5.png');
const textureLoser6 = textureLoader.load('meme/loser/loser6.png');

// Create a plane geometry
const planeGeometry = new THREE.PlaneGeometry(3, 3); // Adjust the size as needed

// Create material using the image texture
const materialWinner1 = new THREE.MeshBasicMaterial({ map: textureWinner1, opacity: 1, alphaTest: 1 });
const materialWinner2 = new THREE.MeshBasicMaterial({ map: textureWinner2, opacity: 1, alphaTest: 1 });
const materialWinner3 = new THREE.MeshBasicMaterial({ map: textureWinner3, opacity: 1, alphaTest: 1 });
const materialWinner4 = new THREE.MeshBasicMaterial({ map: textureWinner4, opacity: 1, alphaTest: 1 });
const materialWinner5 = new THREE.MeshBasicMaterial({ map: textureWinner5, opacity: 1, alphaTest: 1 });
const materialWinner6 = new THREE.MeshBasicMaterial({ map: textureWinner6, opacity: 1, alphaTest: 1 });
const materialLoser1 = new THREE.MeshBasicMaterial({ map: textureLoser1, opacity: 1, alphaTest: 1 });
const materialLoser2 = new THREE.MeshBasicMaterial({ map: textureLoser2, opacity: 1, alphaTest: 1 });
const materialLoser3 = new THREE.MeshBasicMaterial({ map: textureLoser3, opacity: 1, alphaTest: 1 });
const materialLoser4 = new THREE.MeshBasicMaterial({ map: textureLoser4, opacity: 1, alphaTest: 1 });
const materialLoser5 = new THREE.MeshBasicMaterial({ map: textureLoser5, opacity: 1, alphaTest: 1 });
const materialLoser6 = new THREE.MeshBasicMaterial({ map: textureLoser6, opacity: 1, alphaTest: 1});


// Create mesh with the plane geometry and material
const winner1 = new THREE.Mesh(planeGeometry, materialWinner1);
const winner2 = new THREE.Mesh(planeGeometry, materialWinner2);
const winner3 = new THREE.Mesh(planeGeometry, materialWinner3);
const winner4 = new THREE.Mesh(planeGeometry, materialWinner4);
const winner5 = new THREE.Mesh(planeGeometry, materialWinner5);
const winner6 = new THREE.Mesh(planeGeometry, materialWinner6);
const loser1 = new THREE.Mesh(planeGeometry, materialLoser1);
const loser2 = new THREE.Mesh(planeGeometry, materialLoser2);
const loser3 = new THREE.Mesh(planeGeometry, materialLoser3);
const loser4 = new THREE.Mesh(planeGeometry, materialLoser4);
const loser5 = new THREE.Mesh(planeGeometry, materialLoser5);
const loser6 = new THREE.Mesh(planeGeometry, materialLoser6);

// Add images to the arrays
winnerImages.push(winner1, winner2, winner3, winner4, winner5, winner6);
loserImages.push(loser1, loser2, loser3, loser4, loser5, loser6);

// Functions to get a random image
function getRandomWinnerImage(){
    let randomImageWinner = winnerImages[Math.floor(Math.random() * winnerImages.length)];
    scene.add(randomImageWinner);
    randomImageWinner.position.set(0,1.8,0);
    randomImageWinner.scale.set(0.8,0.8,0.8);
};

function getRandomLoserImage(){
    let randomImageLoser = loserImages[Math.floor(Math.random() * loserImages.length)];
    scene.add(randomImageLoser);
    randomImageLoser.position.set(0,1.8,0);
    randomImageLoser.scale.set(0.8,0.8,0.8);
};


//__________________________________________PLAY AGAIN_________________________________________________________________________

// Add event listener to "Start Game" Button
	startGameButton.addEventListener("click", function() { // Add event listener to the button
    				
                    if (startGameButton.textContent === "PLAY AGAIN"){ // Check button text
                        location.reload();	// reload the website
                    };
                    
				});
	

//_________________________________________________________ANIMATION_______________________________________________________

function animate() {

    //controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();