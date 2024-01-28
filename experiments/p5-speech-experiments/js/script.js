/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

// let voice = new p5.Speech();
let recognizer = new p5.SpeechRec();


/**
 * Description of setup
*/
function setup() {
    recognizer.onResult = handleResult;
    recognizer.start();
}


/**
 * Description of draw()
*/
function draw() {

}

function handleResult() {
    console.log(recognizer.resultString);

}

// function mousePressed() {
//     voice.speak(`She sells seashells by the seashore.`);
// }