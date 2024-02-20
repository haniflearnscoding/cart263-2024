let facemesh;
let video;
let predictions = [];

// Constants defining our grid
const TILE_SIZE = 100;
const COLUMNS = 10;
const ROWS = 10;

function setup() {
    createCanvas(640, 480);
    // createCanvas(TILE_SIZE * COLUMNS, TILE_SIZE * ROWS);
    video = createCapture(VIDEO);
    video.size(width, height);

    facemesh = ml5.facemesh(video, modelReady);

    // This sets up an event that fills the global variable "predictions"
    // with an array every time new predictions are made
    facemesh.on("face", results => {
        predictions = results;
    });

    // Hide the video element, and just show the canvas
    video.hide();
}

function modelReady() {
    console.log("Model ready!");
}

function draw() {
    image(video, 0, 0, width, height);
    background(0);
    // Loop through each row
    for (let row = 0; row < ROWS; row++) {
        // Loop through each column
        for (let col = 0; col < COLUMNS; col++) {
            // Draw a tile at the current row and column
            drawTile(row, col);
        }
    }

    // We call function to draw all keypoints
    drawKeypoints();
}

// Draw a tile at the specified row and column
function drawTile(row, col) {
    colorMode(HSB);

    // Calculate the x and y of the tile on the canvas
    // by multiplying by the tile size
    let x = row * TILE_SIZE;
    let y = col * TILE_SIZE;
    // Draw a random shaded tile sized square at that location
    push();
    noStroke();
    // let grey = random(50, 200);
    // fill(grey);
    let hue = 220 + random(0, 20);
    let saturation = 100 + random(0, 20);

    fill(hue, saturation, 100);
    // fill(0, 0, random(150, 255));
    rect(x, y, TILE_SIZE, TILE_SIZE);
    pop();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
        const keypoints = predictions[i].scaledMesh;

        // Draw facial keypoints.
        for (let j = 0; j < keypoints.length; j += 1) {
            const [x, y] = keypoints[j];

            colorMode(HSB);
            noStroke();
            //use hsb
            //sound
            //interative

            let hue = 0 + random(0, 20);
            let saturation = 50 + random(50);

            fill(hue, saturation, 100);

            // fill(random(170, 255), random(0, 80), random(100, 200)); // purple

            rect(x, y, random(10, 50), (10, 40));

        }
    }
}