/*
   New Perspectives on HTML and CSS, 8th Edition
   Tutorial 8 Case Problem 2
   Filename: mousebird.js
   
   JavaScript Game Engine logic to render and animate 
   the Fox, Bat, and Butterfly sprites inside the HTML5 Canvas.
*/

window.addEventListener("load", () => {
    const canvas = document.getElementById("gameCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const container = document.getElementById("gameBox");

    // Sizing system to fill the container area
    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Load Sprite Sheets
    const imgFox = new Image();
    imgFox.src = "paa_fox.png";

    const imgBat = new Image();
    imgBat.src = "paa_bat.png";

    const imgBfly = new Image();
    imgBfly.src = "paa_bfly.png";

    // Sprite State Configurations
    const sprites = {
        fox: { img: imgFox, frames: 28, currentFrame: 0, width: 280, height: 260, x: 0, y: 0, speed: 0.15 },
        bat: { img: imgBat, frames: 40, currentFrame: 0, width: 40, height: 50, x: -50, y: 100, speed: 0.5, flyX: 2 },
        bfly: { img: imgBfly, frames: 34, currentFrame: 0, width: 35, height: 35, x: -100, y: 60, speed: 0.6, flyX: 1.5 }
    };

    // Engine Core Animation Loop
    function gameLoop() {
        // Clear the previous frame screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Position Fox at the bottom right corner dynamically
        sprites.fox.x = canvas.width - sprites.fox.width - 10;
        sprites.fox.y = canvas.height - sprites.fox.height - 10;

        // Update Frame Animations (Sprite Sheet Cycling)
        for (let key in sprites) {
            let s = sprites[key];
            s.currentFrame += s.speed;
            if (s.currentFrame >= s.frames) {
                s.currentFrame = 0;
            }
        }

        // Move flying animals across the canvas screen
        ["bat", "bfly"].forEach(key => {
            let s = sprites[key];
            s.x += s.flyX;
            // Loop back to left side if they exit the right margin
            if (s.x > canvas.width) {
                s.x = -s.width;
                s.y = Math.random() * (canvas.height - 150) + 30; // Randomize height layout
            }
        });

        // Draw Bat
        if (imgBat.complete) {
            let frameX = Math.floor(sprites.bat.currentFrame) * sprites.bat.width;
            ctx.drawImage(imgBat, frameX, 0, sprites.bat.width, sprites.bat.height, sprites.bat.x, sprites.bat.y, sprites.bat.width, sprites.bat.height);
        }

        // Draw Butterfly
        if (imgBfly.complete) {
            let frameX = Math.floor(sprites.bfly.currentFrame) * sprites.bfly.width;
            ctx.drawImage(imgBfly, frameX, 0, sprites.bfly.width, sprites.bfly.height, sprites.bfly.x, sprites.bfly.y, sprites.bfly.width, sprites.bfly.height);
        }

        // Draw Fox
        if (imgFox.complete) {
            let frameX = Math.floor(sprites.fox.currentFrame) * sprites.fox.width;
            ctx.drawImage(imgFox, frameX, 0, sprites.fox.width, sprites.fox.height, sprites.fox.x, sprites.fox.y, sprites.fox.width, sprites.fox.height);
        }

        requestAnimationFrame(gameLoop);
    }

    // Start engine loops once images begin staging
    gameLoop();
});
