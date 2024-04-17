"user strict";

// configuration for phaser game 
const config = {
  type: Phaser.AUTO,
  // width of canvas
  width: 800,
  // height of canvas
  height: 600,
  // physics configuration
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      gravity: { y: 0 }
    }
  },



  // Scenes included in the game
  scene: [Boot, Menu, Game, InvisibleMatch, MovingMatch, TimerMatch]
}

let game = new Phaser.Game(config);
