/**
 * Voice Jam
 * Hanif Hashim
 * 
 *
 */
"use strict";
// speech recognition object
const speechRecognizer = new p5.SpeechRec();
// speech synthesis object
const speechSynthesizer = new p5.Speech();

// initial text displayed
let displayText = "Make yourself the ambient sound";

// array to store displayed texts
let displayedTexts = [];

// variable to store background sound
let bgSound;

// array to store voice input
let voiceBox = [];

// variable to show if program is talking
let talking = false;

// speech synthesis pitch and rate variable
let pitch = 1;
let rate = 1;

// varibale to check if the program spoke at least once
let talkedAtleastOnce = false; //for initial change ;)

// load the bg sound into variable
function preload() {
    bgSound = loadSound(`assets/sounds/city-ambience-9272.mp3`);
}

// Creates the canvas
function setup() {
    createCanvas(500, 500);
    userStartAudio()

    // set the voice to Cellos
    speechSynthesizer.setVoice(`Cellos`);

    // set the pithc
    speechSynthesizer.setPitch(pitch);
    console.log(pitch);

    //set the rate
    speechSynthesizer.setRate(rate);

    //call saySomething function every 2 sec
    setInterval(saySomething, 2000);


    // callback function to trigger when speech is recognized
    speechRecognizer.onResult = handleSpeechInput;

    // enable continuous open mic
    speechRecognizer.continuous = true;

    // start speech recognizer
    speechRecognizer.start();

}



// Draw a sparkling grid
function draw() {
    // set background color
    background(0);

    // transition from intro text
    if (displayText !== "") {
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(displayText, width / 2, height / 2);
    } else {
        // call drawCity to render text
        drawCity(displayedTexts.join(' '));
    }
}

// variables to emulate sound motion
let waveAmplitude = 40;
let waveFrequency = 0.1;


// function to render text  
function drawCity(phrase) {

    // split input into words
    const words = phrase.split(' ');

    // set text size
    textSize(20);

    // x value and y value based on amplitude and frequency
    let x = 50;
    let y = height / 2 + sin(frameCount * waveFrequency) * waveAmplitude;

    // loop through each word in the array
    for (let i = 0; i < words.length; i++) {

        // calculate font size, set text color and size
        const fontSize = map(words[i].length, 0, 10, 10, 30);
        fill(255);
        textSize(fontSize);

        // rotate text vertical
        push();
        translate(x, y);
        rotate(HALF_PI);

        textAlign(CENTER, CENTER);

        // display current word
        text(words[i], 0, 0);
        pop();

        //updaye y-coordinates
        y -= textWidth(words[i]) + 10;

        // create new column based on y-coordinate
        if (y < 50) {
            y = height / 2 + sin(frameCount * waveFrequency) * waveAmplitude;
            x += fontSize + 20;
        }
    }
}

// Mouse Press function
function mousePressed() {
    // empty string if variable and text match
    if (displayText === "Make yourself the ambient sound") {
        displayText = "";
    }
    // loop bg sound
    bgSound.loop();
}

// Function to handle speech input
function handleSpeechInput() {

    //check for recongnized value
    if (!speechRecognizer.resultValue) {
        return;
    }
    // retrieve recognized text from result
    const spokenText = speechRecognizer.resultString;
    // push text into array
    voiceBox.push(spokenText);
    // push text intro array 
    displayedTexts.push(spokenText);
    // log recognized text into console
    console.log(spokenText);
}

//SET THESE OUTSIDE
// when speech synthesis ends
speechSynthesizer.onEnd = () => {
    // check if speech synth happened once and set talking to false if speech synth ended
    talkedAtleastOnce = true;
    talking = false;
    console.log("end");

};
// when speech synthesis starts
speechSynthesizer.onStart = () => {
    // set talking to true
    talking = true;
    console.log("start");

};

// function to generate speech
function saySomething() {
    // check if speaking
    if (talking) {
        // if speaking exit function
        return;
    }
    //talking is false so choose
    if (voiceBox.length > 0) {
        // generate random pitch and rate for each word
        pitch = random(0.01, 2);
        rate = random(0.01, 2);

        // set pitch and rate
        speechSynthesizer.setPitch(pitch);
        speechSynthesizer.setRate(rate);

        // chose random word from array and modify how it sounds using addLetter function
        const randomVoice = random(voiceBox);
        const modifiedVoice = addLetter(randomVoice);
        console.log(modifiedVoice);
        speechSynthesizer.speak(modifiedVoice);

        // display modified word and increase waveFrequency & waveAmplitude value
        displayedTexts.push(talkedAtleastOnce ? modifiedVoice : "");
        waveFrequency += 0.025;
        waveAmplitude += 1;

    }
}

// function to modify each word
function addLetter(phrase) {
    // split into array of words
    const words = phrase.split(' ');

    // map over each word and extract last letter
    const modifiedWords = words.map(word => {
        const lastLetter = word.charAt(word.length - 1);

        //concatenate the word with last letter
        return word + lastLetter.toLowerCase() + lastLetter.toUpperCase();
    });

    // join modified word intro string
    return modifiedWords.join(' ');
}