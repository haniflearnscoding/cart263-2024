/**
 * Voice Input Experiments
 * Hanif Hashim
 * 
 */

"use strict";

const speechRecognizer = new p5.SpeechRec("");
let currentSpeech = `?`;
let lightsAreOn = false;

/**
 * Description of setup
*/
function setup() {
    createCanvas(500, 500);

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.start();
}


/**
 * Description of draw()
*/
function draw() {
    background(0);

    if (lightsAreOn) {
        background(255);
    }

    // textAlign(CENTER, CENTER);
    // textSize(24);
    // text(`Say that you love me`, width / 2, height / 3);
    // text(currentSpeech, width / 2, height / 2);
}

function handleSpeechInput() {
    // if (speechRecognizer.resultString === `I love you`) {
    //     currentSpeech = `I love you too`;
    // } else {
    //     currentSpeech = `:----(`
    // }
    console.log(speechRecognizer.resultString);
    if (speechRecognizer.resultString.toLowerCase() === `turn the lights on`) {
        lightsAreOn = true;
    }
    else if (speechRecognizer.resultString.toLowerCase() === `turn the lights off`) {
        lightsAreOn = false;
    }
}