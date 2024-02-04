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
let voiceBox = [];
let talking = false;

let pitch = 1;
let rate = 1;

function preload() {
    bgSound = loadSound(`assets/sounds/city-ambience-9272.mp3`);
}

// Creates the canvas
function setup() {
    createCanvas(500, 500);
    userStartAudio()

    speechSynthesizer.setVoice(`Cellos`);
    // console.log(speechSynthesizer.voices);

    speechSynthesizer.setPitch(pitch);
    console.log(pitch);
    speechSynthesizer.setRate(rate);
    speechSynthesizer.onEnd = () => {
        talking = false;
    };

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.continuous = true;
    speechRecognizer.start();

    setInterval(saySomething, 2000);

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
        //double letter?
        //split individual words, each word different rate/pitch
        //random voice
        //how to make speech more sonic effect
        //mute the voices down, up bg noise
        //different accents

        // typography with whats being said, that evokes city idea
        // fly like birds

        speechSynthesizer.speak(random(voiceBox));
        pitch = random(0.01, 2);
        rate = random(0.01, 2);

        speechSynthesizer.setPitch(pitch)
        speechSynthesizer.setRate(rate)

        talking = true;


    }
}
