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
let displayedTexts = [];

let bgSound;
let voiceBox = [];
let talking = false;

let pitch = 1;
let rate = 1;

let talkedAtleastOnce = false; //for initial change ;)





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

    //keep
    setInterval(saySomething, 2000);



    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.continuous = true;
    speechRecognizer.start();

}



// Draw a sparkling grid
function draw() {
    background(0);
    if (displayText !== "") {
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(displayText, width / 2, height / 2);
    } else {
        drawCity(displayedTexts.join(' '));

    }


}

function drawCity(phrase) {

    const words = phrase.split(' ');
    //console.log(words);


    let x = 50;
    let y = height - 75;


    // console.log(words.length);
    for (let i = 0; i < words.length; i++) {
        const fontSize = map(words[i].length, 0, 10, 10, 30);
        fill(255);
        textSize(fontSize);

        push();
        translate(x, y);
        rotate(HALF_PI);

        textAlign(CENTER, CENTER);

        text(words[i], 0, 0);
        //  console.log(x);
        // console.log(y);

        pop();

        y -= textWidth(words[i]) + 10;

        if (y < 50) {
            y = height - 50;
            x += fontSize + 20;
        }
    }
}

function mousePressed() {
    if (displayText === "Press mouse to start") {
        displayText = "";
    }
    bgSound.loop();
}


function handleSpeechInput() {

    if (!speechRecognizer.resultValue) {
        return;
    }
    const spokenText = speechRecognizer.resultString;
    voiceBox.push(spokenText);
    displayedTexts.push(spokenText);
    console.log(spokenText);
}

//SET THESE OUTSIDE
speechSynthesizer.onEnd = () => {
    talkedAtleastOnce = true;
    talking = false;
    console.log("end");

};
speechSynthesizer.onStart = () => {
    talking = true;
    console.log("start");

};

function saySomething() {
    // console.log("are we here?")
    console.log(`test1`);
    if (talking) {
        console.log(`test2`);
        return;
    }
    //talking is false so choose
    if (voiceBox.length > 0) {
        console.log(`test3`);

        pitch = random(0.01, 2);
        rate = random(0.01, 2);

        speechSynthesizer.setPitch(pitch);
        speechSynthesizer.setRate(rate);


        const randomVoice = random(voiceBox);
        const modifiedVoice = addLetter(randomVoice);
        console.log(modifiedVoice);
        speechSynthesizer.speak(modifiedVoice);

        //SET MODIFIED VOICE HERE
        displayedTexts.push(talkedAtleastOnce ? modifiedVoice : "");

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