function setup() {
    createCanvas(500, 500);
}

function draw() {
    let config = {
        x: 250,
        y: 250,
        width: 200,
        height: 200,
        fillColor: {
            r: 255,
            g: 255,
            b: 0
        },
        mode: CENTER
    };
    drawFancyRect(config);
}

// NEW: We write the individual property names inside curly brackets
// to DESTRUCTURE the object parameter into individual variables
function drawFancyRect({ x, y, width, height, fillColor, mode }) {
    // Then we can just use the resulting variables in the usual way
    push();
    fill(fillColor.r, fillColor.g, fillColor.b);
    rectMode(mode);
    rect(x, y, width, height);
    pop();
}