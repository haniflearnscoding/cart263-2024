/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let tarotData = undefined;
let fortune = `No fortune found yet...`

/**
 * Description of preload
*/
function preload() {
    tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
}


/**
 * Description of setup
*/
function setup() {
    createCanvas(500, 500);

    let card = random(tarotData.tarot_interpretations);
    fortune = random(card.fortune_telling);
}


/**
 * Description of draw()
*/
function draw() {
    background(255);

    // let firstShadowMeaning = tarotData.tarot_interpretations[0].meanings.shadow[0];

    push();
    textSize(16);
    textAlign(CENTER);
    fill(0);
    text(fortune, width / 2, height / 2);
    pop();
}

// function mousePressed() {
//     loadJSON(`assets/data/tarot_interpretations.json`, tarotLoaded);
// }

// function tarotLoaded(data) {
//     tarotData = data;

//     let card = random(tarotData.tarot_interpretations);
//     fortune = random(card.fortune_telling);
// }