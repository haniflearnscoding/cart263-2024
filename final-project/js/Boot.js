class Boot extends Phaser.Scene {
  constructor() {
    super(`preloader`);
  }
  preload() {
    //load spritesheet for user character & boxes
    this.load.spritesheet(`sokoban`, `assets/sokoban_tilesheet.png`, {
      frameWidth: 64
    });
    this.load.spritesheet(`user`, `assets/player_spritesheet.png`, {
      frameWidth: 64
    });

    //load images
    this.load.image(`player`, `assets/sokoban_tilesheet2.png`);
    this.load.image(`bear`, `assets/bear.png`);
    this.load.image(`chick`, `assets/chick.png`);
    this.load.image(`duck`, `assets/duck.png`);
    this.load.image(`parrot`, `assets/parrot.png`);
    this.load.image(`penguin`, `assets/penguin.png`);
  }
  create() {

    //animation for main character in different states and direction
    this.anims.create({
      key: 'down-idle',
      frames: [{ key: 'user', frame: 0 }]
    });
    this.anims.create({
      key: 'down-walk',
      frames: this.anims.generateFrameNumbers('user', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key: 'up-idle',
      frames: [{ key: 'user', frame: 3 }]
    });
    this.anims.create({
      key: 'up-walk',
      frames: this.anims.generateFrameNumbers('user', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key: 'left-idle',
      frames: [{ key: 'user', frame: 9 }]
    });
    this.anims.create({
      key: 'left-walk',
      frames: this.anims.generateFrameNumbers('user', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key: 'right-idle',
      frames: [{ key: 'user', frame: 6 }]
    });
    this.anims.create({
      key: 'right-walk',
      frames: this.anims.generateFrameNumbers('user', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1

    });

    //start menu scene
    this.scene.start(`menu`);
  }

}
