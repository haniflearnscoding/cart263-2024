class InvisibleMatch extends Game {
  constructor() {
    super({
      key: `invisible match`
    })
  }

  create() {
    super.create();
    //make the player invisible
    this.player.setAlpha(0);
  }


}
