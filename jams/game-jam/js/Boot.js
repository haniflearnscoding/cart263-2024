class Boot extends Phaser.Scene {
  constructor() {
    super(`preloader`);
  }
  preload() {

    //load spritesheet for user character
    this.load.spritesheet(`sokoban`, `assets/sokoban_tilesheet.png`, {
      frameWidth: 64
    });

    //load images
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
      frames: [{ key: 'sokoban', frame: 52 }]
    });
    this.anims.create({
      key: 'down-walk',
      frames: this.anims.generateFrameNumbers('sokoban', { start: 52, end: 54 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key: 'up-idle',
      frames: [{ key: 'sokoban', frame: 55 }]
    });
    this.anims.create({
      key: 'up-walk',
      frames: this.anims.generateFrameNumbers('sokoban', { start: 55, end: 57 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key: 'left-idle',
      frames: [{ key: 'sokoban', frame: 81 }]
    });
    this.anims.create({
      key: 'left-walk',
      frames: this.anims.generateFrameNumbers('sokoban', { start: 81, end: 83 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key: 'right-idle',
      frames: [{ key: 'sokoban', frame: 78 }]
    });
    this.anims.create({
      key: 'right-walk',
      frames: this.anims.generateFrameNumbers('sokoban', { start: 78, end: 80 }),
      frameRate: 10,
      repeat: -1

    });

    //start menu scene
    this.scene.start(`menu`);
  }

}
