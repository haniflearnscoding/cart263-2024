class TimerMatch extends Game {
  constructor() {
    super({
      key: `timer match`
    })

    //properties for adding more boxes
    this.indexX = 0; //for adding more boxes with timer (x);
    this.indexY = 2;//for adding more boxes with timer (y);
    this.numToAdd = 1; //how many to add at one time

  }
  create() {
    super.create();
    // set timer duration & create timer
    this.timerDuration = 3;
    this.createTimer();
  }

  createTimer() {
    //create timer text
    this.timerText = this.add.text(10, 10, 'Time: ' + this.timerDuration, { fontSize: '24px', fill: '#fff' });
    //start timer event
    this.currentTime = this.timerDuration;
    this.time.addEvent({ delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });
  }

  updateTimer() {
    // update timer text
    this.currentTime--;
    this.timerText.setText('Time: ' + this.currentTime);
    //check for timer end
    if (this.currentTime == 0) {
      //call function to add box when timer ends
      this.addBox();
      this.currentTime = 4;
    }
  }

  addBox() {
    // get dimensions of the game screen
    const height = this.scale.height;
    const width = this.scale.width;
    // percentage based x position
    let xPer = 0;

    //check if we need to add one at a new row 
    if ((this.boxGroup.children.entries.length) % 3 == 0) {
      this.indexY++;
      xPer = 0.25;
      this.indexX = 0.25;
    }
    else {
      //increment x index
      this.indexX += .25;
      xPer = this.indexX;
    }

    // calculate the new height of the canvas
    const newHeight = height + 10

    // set the new height to the game canvas
    this.scale.resize(this.scale.width, newHeight);

    // calculate y position of new box
    let y = 150 * this.indexY;

    //create new box sprite
    const box = this.boxGroup.get(width * xPer, y, 'sokoban', 10);


    // set the size and offset 
    box.setSize(64, 32).setOffset(0, 32);

    // set the data for the box sprite 
    box.setData('itemType', level[0][0]);
  }

  //override checkEndCondition method
  checkEndCondition() {

  }

}
