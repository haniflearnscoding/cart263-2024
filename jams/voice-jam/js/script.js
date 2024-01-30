/**
 * Voice Jam
 * Hanif Hashim
 * 
 *
 */
"use strict";
const speechRecognizer = new p5.SpeechRec();
const speechSynthesizer = new p5.Speech();



let bgSound;
let voiceBox = [`books`, `hellooo`, `lion`, `shadows`];
let talking = false;

function preload() {
    bgSound = loadSound(`assets/sounds/city-ambience-9272.mp3`);
}

// Creates the canvas
function setup() {
    createCanvas(500, 500);

    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.onEnd = () => {
        talking = false;
    };
    // bgSound.loop();

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.continuous = true;
    speechRecognizer.start();

    setInterval(saySomething, 2000);

    // speechSynthesizer.onStart = speechStarted;
    // speechSynthesizer.onEnd = speechEnded;

}

// Draw a sparkling grid
function draw() {
    background(0);

}

function mousePressed() {
    bgSound.loop();
}


function handleSpeechInput() {
    if (!speechRecognizer.resultValue) {
        return;
    }
    voiceBox.push(speechRecognizer.resultString);
    console.log(speechRecognizer.resultString);

}

function saySomething() {
    if (talking) {
        return;
    }
    if (voiceBox.length > 0) {
        console.log(`test`);
        speechSynthesizer.speak(random(voiceBox));
        talking = true;
    }
}