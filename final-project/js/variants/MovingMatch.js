class MovingMatch extends Game {
  constructor() {
    super({
      key: `moving match`

    })


  }

  create() {
    super.create();

    //loop through each box in box group 
    for (let i = 0; i < this.boxGroup.children.entries.length; i++) {
      // move box upwards
      this.boxGroup.children.entries[i].setVelocity(0, -100);
    }
  }
  //set boxGroup as group
  createBoxGroup() {
    this.boxGroup = this.physics.add.group();
  }

  createBoxes() {
    super.createBoxes();

    const width = this.scale.width; // width of the game screen
    let xPer = 0.25; // percentage based x position
    let y = 150; // y position

    // loop through each row
    for (let row = 0; row < level.length; ++row) {
      //loop through each column
      for (let col = 0; col < level[row].length; ++col) {
        /**@type {Phaser.Physics.Arcade.Sprite} */
        //create box at this position
        const box = this.boxGroup.get(width * xPer, y, 'sokoban', 10)
        box.setSize(64, 32)
          .setOffset(0, 32)
          .setData('itemType', level[row][col])
          .setCollideWorldBounds(true) //make boxes bounce off wall
          .setBounce(1);

        //moves to the next horizontal position
        xPer += 0.25;
      }
      //reset horizontal position
      xPer = 0.25;
      //move to the next vertical position
      y += 150;

    }
  }
}
