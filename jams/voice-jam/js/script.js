/**
 * Voice Jam
 * Hanif Hashim
 * 
 *
 */
"use strict";
const speechRecognizer = new p5.SpeechRec();
const speechSynthesizer = new p5.Speech();

let displayText = "Press mouse to start";

let bgSound;
let voiceBox = [`hello`, `cat`, `spider`];
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

    speechSynthesizer.onStart = () => {
        talking = true;
    };
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

    drawCity(displayText);
}

function drawCity(phrase) {
    const words = phrase.split(' ');


    let x = 50;
    let y = height - 75;


    for (let i = 0; i < words.length; i++) {
        const fontSize = map(words[i].length, 0, 10, 10, 30);
        fill(255);
        textSize(fontSize);

        push();
        translate(x, y);
        rotate(HALF_PI);

        textAlign(CENTER, CENTER);

        text(words[i], 0, 0);
        console.log(x);
        console.log(y);

        pop();

        y -= textWidth(words[i]) + 10;

        if (y < 50) {
            y = height - 50;
            x += fontSize + 20;
        }
    }
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
    console.log(`test1`);
    if (talking) {
        console.log(`test2`);
        return;
    }
    if (voiceBox.length > 0) {
        console.log(`test3`);

        pitch = random(0.01, 2);
        rate = random(0.01, 2);

        speechSynthesizer.setPitch(pitch);
        speechSynthesizer.setRate(rate);


        const randomVoice = random(voiceBox);
        const modifiedVoice = addLetter(randomVoice);


        speechSynthesizer.onEnd = () => {
            talking = false;
            setTimeout(saySomething, 2000);
        };

        speechSynthesizer.speak(modifiedVoice);
        talking = true;

        displayText = talking ? modifiedVoice : "Press mouse to start";
    }
}


function addLetter(phrase) {

    const words = phrase.split(' ');

    const modifiedWords = words.map(word => {
        const lastLetter = word.charAt(word.length - 1);
        return word + lastLetter.toLowerCase() + lastLetter.toUpperCase();
    });

    return modifiedWords.join(' ');
}