class TimerMatch extends Game {
  constructor() {
    super({
      key: `timer match`
    })
  }
  create() {
    super.create();
    this.timerDuration = 5;
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
      this.checkEndCondition(box);
    }
  }

  checkEndCondition(box) {
    super.checkEndCondition();
    this.player.active = false;
    this.player.setVelocity(0, 0);

  }

}
