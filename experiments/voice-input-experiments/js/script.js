/**
 * Voice Input Experiments
 * Hanif Hashim
 * 
 */

"use strict";

const speechRecognizer = new p5.SpeechRec();
let currentSpeech = `?`;

/**
 * Description of setup
*/
function setup() {
    createCanvas(500, 500);

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.start();
}


/**
 * Description of draw()
*/
function draw() {
    background(255);

    textAlign(CENTER, CENTER);
    textSize(24);
    text(currentSpeech, width / 2, height / 2);
}

function handleSpeechInput() {
    currentSpeech = speechRecognizer.resultString;
}