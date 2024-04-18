class TimerMatch extends Game {
  constructor() {
    super({
      key: `timer match`
    })
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
    this.currentTime--;
    this.timerText.setText('Time: ' + this.currentTime);

    if (this.currentTime <= 0) {
      this.checkEndCondition();
      this.createBoxes();
    }
  }

  createBoxes() {
    super.createBoxes();
    const width = this.scale.width;
    let xPer = 0.25;
    let y = 150;

    // Loop through each row
    for (let row = 0; row < level.length; ++row) {
      // Loop through each column
      for (let col = 0; col < level[row].length; ++col) {
        // Create box at this position
        const box = this.boxGroup.get(width * xPer, y, 'sokoban', 10);
        box.setSize(64, 32).setOffset(0, 32).setData('itemType', level[row][col]);
        xPer += 0.25;
      }
      // Reset horizontal position
      xPer = 0.25;
      // Move to the next vertical position
      y += 150;
    }
  }


  checkEndCondition() {
    super.checkEndCondition();
    // stop timer


    this.player.active = false;
    this.player.setVelocity(0, 0);


    this.time.removeAllEvents();

    //display win text
    const { width, height } = this.game.scale;
    this.add.text(width * 0.5, height * 0.5, `You Lost!`, {
      fontSize: 48
    })
      .setOrigin(0.5);
  }

}
