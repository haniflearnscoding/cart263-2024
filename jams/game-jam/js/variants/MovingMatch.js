class MovingMatch extends Game {
  constructor() {
    super({
      key: `moving match`
    })


  }

  create() {
    super.create();

    this.boxGroup = this.physics.add.group()
      .setVelocity(0, -100);

  }
}
