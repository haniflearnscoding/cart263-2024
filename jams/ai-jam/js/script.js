let facemesh;
let video;
let predictions = [];

const options = {
    flipHorizontal: false, // boolean value for if the video should be flipped, defaults to false
    maxContinuousChecks: 5, // How many frames to go without running the bounding box detector. Only relevant if maxFaces > 1. Defaults to 5.
    detectionConfidence: 0.9, // Threshold for discarding a prediction. Defaults to 0.9.
    maxFaces: 2, // The maximum number of faces detected in the input. Should be set to the minimum number for performance. Defaults to 10.
    scoreThreshold: 0.75, // A threshold for removing multiple (likely duplicate) detections based on a "non-maximum suppression" algorithm. Defaults to 0.75.
    iouThreshold: 0.3, // A float representing the threshold for deciding whether boxes overlap too much in non-maximum suppression. Must be between [0, 1]. Defaults to 0.3.
}


// Constants defining our grid
const TILE_SIZE = 100;
const COLUMNS = 10;
const ROWS = 10;

function setup() {
    createCanvas(640, 480);
    // createCanvas(TILE_SIZE * COLUMNS, TILE_SIZE * ROWS);
    video = createCapture(VIDEO);
    video.size(width, height);

    facemesh = ml5.facemesh(video, options, modelReady);

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
        const keypoints = predictions[0].scaledMesh;

        // Draw facial keypoints.
        for (let j = 0; j < keypoints.length; j += 10) {
            if (keypoints[j][2] > 0) {

                // console.log(keypoints);
                const [x, y] = keypoints[j];

                colorMode(HSB);
                noStroke();

                let hue = 0 + random(0, 20);
                let saturation = 50 + random(50);

                fill(hue, saturation, 100);
                rect(x, y, random(10, 50), (10, 40));
            }

            console.log(predictions);

            // if (facemesh) {
            //     j += 10;
            //     console.log(j);
            // }


        }
    }
}

//use hsb
//sound
//interative