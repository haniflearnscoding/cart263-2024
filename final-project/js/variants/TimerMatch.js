class TimerMatch extends Game {
  constructor() {
    super({
      key: `timer match`
    })



    this.indexX = 0; //for adding more boxes with timer (x);
    this.indexY = 2;//for adding more boxes with timer (y);
    this.numToAdd = 1; //how many to add at one time

  }
  create() {
    super.create();
    this.timerDuration = 3;
    this.createTimer();
  }

  createTimer() {
    this.timerText = this.add.text(10, 10, 'Time: ' + this.timerDuration, { fontSize: '24px', fill: '#fff' });
    this.currentTime = this.timerDuration;
    this.time.addEvent({ delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });
  }

  updateTimer() {
    // console.log("time")
    this.currentTime--;
    this.timerText.setText('Time: ' + this.currentTime);

    if (this.currentTime == 0) {
      // this.checkEndCondition();
      this.addBox();
      this.currentTime = 4;
    }
  }



  addBox() {
    //ADD BOX

    const height = this.scale.height;
    const width = this.scale.width;
    let xPer = 0;
    //let y;

    //check if we need to add one at a new row .. (3 per row so if we are to add a 10th one then we are to increase Y)
    if ((this.boxGroup.children.entries.length) % 3 == 0) {
      this.indexY++; //increaseY
      xPer = 0.25;
      this.indexX = 0.25;
    }
    else {

      this.indexX += .25;
      xPer = this.indexX;
      //console.log(xPer)
    }

    // Calculate the new height of the canvas
    const newHeight = height + 10

    // Set the new height to the game canvas
    this.scale.resize(this.scale.width, newHeight);

    let y = 150 * this.indexY;
    const box = this.boxGroup.get(width * xPer, y, 'sokoban', 10);
    box.setSize(64, 32).setOffset(0, 32).setData('itemType', level[0][0]);
  }

  createBoxes() {
    super.createBoxes();

    // for(let row = this.indexY; row <level.length; ++row){
    //     for (let col = 0; col < 1; ++col) {
    //     // Create box at this position
    //     const box = this.boxGroup.get(width * xPer, y, 'sokoban', 10);
    //     box.setSize(64, 32).setOffset(0, 32).setData('itemType', level[row][col]);
    //     console.log(add);
    //     add++;
    //     xPer += 0.25;
    //   }
    //   // Reset horizontal position
    //   xPer = 0.25;
    //   // Move to the next vertical position
    //   y += 150;

    // }
    // // Loop through each row
    // for (let row = 0; row < level.length; ++row) {
    //   // Loop through each column
    //   for (let col = 0; col < level[row].length; ++col) {
    //     // Create box at this position
    //     const box = this.boxGroup.get(width * xPer, y, 'sokoban', 10);
    //     box.setSize(64, 32).setOffset(0, 32).setData('itemType', level[row][col]);
    //     console.log(add);
    //     add++;
    //     xPer += 0.25;
    //   }
    //   // Reset horizontal position
    //   xPer = 0.25;
    //   // Move to the next vertical position
    //   y += 150;
    // }
  }


  checkEndCondition() {
    // super.checkEndCondition();
    // stop timer

    // this.player.active = false;
    // this.player.setVelocity(0, 0);


    // this.time.removeAllEvents();

    // //display win text
    // const { width, height } = this.game.scale;
    // this.add.text(width * 0.5, height * 0.5, `You Lost!`, {
    //   fontSize: 48
    // })
    //   .setOrigin(0.5);
  }

}
