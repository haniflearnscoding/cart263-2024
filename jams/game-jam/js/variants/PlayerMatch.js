class PlayerMatch extends Game {
  constructor() {
    super({
      key: `player match`
    })
  }

  openBox(box) {
    super.openBox(box);

    const item = this.itemsGroup.get(box.x, box.y);
    if (item) {
      item.setTexture('player');
    }

    // this.tweens.add({
    //   targets: item,
    //   y: '-=50',
    //   alpha: 1,
    //   scale: 0.5,
    //   duration: 500,

    // });

  }
}
