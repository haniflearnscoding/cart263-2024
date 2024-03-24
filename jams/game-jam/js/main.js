"user strict";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  },
  // scene: [Boot, Menu, Game]
  scene: [Boot, Menu, Game, InvisibleMatch, MovingMatch]
}

let game = new Phaser.Game(config);
