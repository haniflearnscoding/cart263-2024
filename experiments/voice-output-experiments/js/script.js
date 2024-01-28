/**
 * Voice Output Experiement
 * Hanif Hashim
 * 
 * Speech Synthesis
 */

"use strict";

const speechSynthesizer = new p5.Speech();

let showSubtitle = false;
let toSay = `Would. you. like. a. cup. of. tea.`;

/**
 * Description of setup
*/
function setup() {
    createCanvas(500, 500);
    speechSynthesizer.setPitch(0.5);
    speechSynthesizer.setRate(0.2);
    speechSynthesizer.setVoice(`Google UK English Male`);

    speechSynthesizer.onStart = speechStarted;
    speechSynthesizer.onEnd = speechEnded;

    console.log(speechSynthesizer.listVoices());
}


/**
 * Description of draw()
*/
function draw() {
    background(255);

    if (showSubtitle) {
        textSize(18);
        text(toSay, 100, 100);
    }
}

function mousePressed() {
    speechSynthesizer.speak(toSay);
}

function speechStarted() {
    showSubtitle = true;
}

function speechEnded() {
    showSubtitle = false;
}