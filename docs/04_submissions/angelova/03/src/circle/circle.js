const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const BACKGROUND_COLOR = canvas.style.backgroundColor = "white";
let HAS_HOVERED = false;
let PRESSED_B = false;

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw() {
    const radius = getRandomNumber(80, 100);
    const positionX = getRandomNumber(radius, canvas.width - radius);
    const positionY = getRandomNumber(radius, canvas.height - radius);

    const circle = new Path2D();
    circle.arc(positionX, positionY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fill(circle);

    // Showing the circle, when it is found.
    function showCircle(circle, event) {
        const isPointInPath = ctx.isPointInPath(circle, event.offsetX, event.offsetY);
        ctx.fillStyle = isPointInPath ? "orange" : BACKGROUND_COLOR;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fill(circle);
    }

    // Remove the circle if the bird has appeared.
    canvas.addEventListener("mousemove", (e) => {
        if (PRESSED_B) {
            e.preventDefault();
        }
        else {
            showCircle(circle, e);
            HAS_HOVERED = true;
        }
    });

    // The bird appears only if before that has been hovered.
    document.addEventListener("keydown", (event) => {
        if (event.code === "KeyB" && HAS_HOVERED) {
            PRESSED_B = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = BACKGROUND_COLOR;
            ctx.fill(circle);

            // Create the bird!
            const bird = document.getElementById("bird");
            bird.style.display = "block"
            bird.style.left = `${positionX}px`;
            bird.style.top = `${positionY}px`;
        }

        // Make the page reload and start searching for the circle again. :)
        if (event.code === "KeyR") {
            HAS_HOVERED = false;
            PRESSED_B = false;
            window.location.reload();
        }
    });
}

window.addEventListener("load", draw);
