class InvisibleMatch extends Game {
  constructor() {
    super({
      key: `invisible_match`
    })
  }

  create() {
    super.create();

    this.player.setAlpha(0);
  }


}
