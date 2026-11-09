const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    // Read parent container CSS dimensions
    const container = document.getElementById("gameBox");
    
    // Assign coordinate resolution based on layouts
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

// Execute dimensions adjustment immediately upon state initialization
window.addEventListener("load", () => {
    resizeCanvas();
    // Your initialization loops (e.g., gameLoop(), updateSprites()) start here
});

// Maintains layout fidelity if the browser or view viewport size shifts
window.addEventListener("resize", resizeCanvas);
