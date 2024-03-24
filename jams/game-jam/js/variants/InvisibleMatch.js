class InvisibleMatch extends Game {
  constructor() {
    super({
      key: `invisible match`
    })
  }

  create() {
    super.create();

    this.player.setAlpha(0);
  }


}
