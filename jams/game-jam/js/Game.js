const level = [
  [1, 0, 3],
  [2, 4, 1],
  [3, 4, 2]
]

class Game extends Phaser.Scene {

  /** @type {Phaser.Types.Input,Keyboard.CursorKeys}*/
  cursors

  /** @type {Phaser.Physics.Arcade.GameObjects.Sprite} */
  player

  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  boxGroup

  /** @type {Phaser.Physics.Arcade.Sprite} */
  activeBox

  /** @type {Phaser.GameObjects.Group} */
  itemsGroup

  /** @type {{box: Phaser.Physics.Arcade.Sprite, item: Phaser.GameObjects.Sprite}} */
  selectedBoxes = []

  constructor() {
    super(`game`);
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const { width, height } = this.scale;

    this.player = this.physics.add.sprite(width * 0.5, height * 0.6, `sokoban`)
      .setSize(40, 16)
      .setOffset(12, 38)
      .play('down-idle')

    this.boxGroup = this.physics.add.staticGroup();

    // this.boxGroup.get(width * 0.25, 150, `sokoban`, 10);
    this.createBoxes();

    this.itemsGroup = this.add.group();

    this.physics.add.collider(this.player, this.boxGroup, this.handlePlayerBoxCollide, undefined, this);
  }

  createBoxes() {

    const width = this.scale.width;
    let xPer = 0.25;
    let y = 150;

    for (let row = 0; row < level.length; ++row) {

      for (let col = 0; col < level[row].length; ++col) {
        /**@type {Phaser.Physics.Arcade.Sprite} */
        const box = this.boxGroup.get(width * xPer, y, 'sokoban', 10)
        box.setSize(64, 32)
          .setOffset(0, 32)
          .setData('itemType', level[row][col])
        xPer += 0.25;
      }

      xPer = 0.25;
      y += 150;

    }
  }

  /**
   * 
   * @param {Phaser.Physics.Arcade.Sprite} player 
   * @param {Phaser.Physics.Arcade.Sprite} box 
   */
  handlePlayerBoxCollide(player, box) {

    if (box.getData('opened')) {
      return;
    }

    if (this.activeBox) {
      return;
    }

    this.activeBox = box;

    this.activeBox.setFrame(9)
  }
  /**
   * 
   * @param {Phaser.Physics.Arcade.Sprite} box 
   */
  openBox(box) {
    if (!box) {
      return;
    }
    const itemType = box.getData('itemType');

    /** @type {Phaser.GameObjects.Sprite} */
    let item;

    switch (itemType) {
      case 0:
        item = this.itemsGroup.get(box.x, box.y);
        item.setTexture('bear');
        break;
      case 1:
        item = this.itemsGroup.get(box.x, box.y);
        item.setTexture('chick');
        break;
      case 2:
        item = this.itemsGroup.get(box.x, box.y);
        item.setTexture('duck');
        break;
      case 3:
        item = this.itemsGroup.get(box.x, box.y);
        item.setTexture('parrot');
        break;
      case 4:
        item = this.itemsGroup.get(box.x, box.y);
        item.setTexture('penguin');
        break;
    }

    if (!item) {
      return;
    }

    box.setData('opened', true);

    item.setData('sorted', true);
    item.setDepth(2000);

    item.scale = 0
    item.alpha = 0

    this.selectedBoxes.push({ box, item });

    this.tweens.add({
      targets: item,
      y: '-=50',
      alpha: 1,
      scale: 0.5,
      duration: 500,
      onComplete: () => {
        if (this.selectedBoxes.length < 2) {
          return;
        }

        this.checkForMatch();

      }
    });

    this.activeBox.setFrame(10);
    this.activeBox = undefined;

  }

  checkForMatch() {
    const second = this.selectedBoxes.pop();
    const first = this.selectedBoxes.pop();

    if (first.item.texture !== second.item.texture) {
      this.tweens.add({
        targets: [first.item, second.item],
        y: '+=50',
        alpha: 0,
        scale: 0,
        duration: 300,
        delay: 1000,
        onComplete: () => {
          first.box.setData('opened', false);
          second.box.setData('opened', false);
        }
      });
      return;
    }
    this.time.delayedCall(1000, () => {
      first.box.setFrame(8);
      second.box.setFrame(8);
    })

  }

  updatePlayer() {
    const speed = 200;

    if (this.cursors.left.isDown) {
      this.player.setVelocity(-speed, 0);
      this.player.play('left-walk', true);

    } else if (this.cursors.right.isDown) {
      this.player.setVelocity(speed, 0);
      this.player.play('right-walk', true);

    } else if (this.cursors.up.isDown) {
      this.player.setVelocity(0, -speed);
      this.player.play('up-walk', true);

    } else if (this.cursors.down.isDown) {
      this.player.setVelocity(0, speed);
      this.player.play('down-walk', true);

    } else {
      this.player.setVelocity(0, 0);
      const key = this.player.anims.currentAnim.key;
      const parts = key.split('-');
      const direction = parts[0];
      this.player.play(`${direction}-idle`);
    }

    const spaceJustPressed = Phaser.Input.Keyboard.JustUp(this.cursors.space);
    if (spaceJustPressed && this.activeBox) {
      this.openBox(this.activeBox);
    }

  }



  updateActiveBox() {
    if (!this.activeBox) {
      return;
    }

    const distance = Phaser.Math.Distance.Between(
      this.player.x, this.player.y,
      this.activeBox.x, this.activeBox.y
    );

    if (distance < 64) {
      return;
    }

    this.activeBox.setFrame(10);
    this.activeBox = undefined;
  }

  update() {

    this.updatePlayer();
    this.updateActiveBox();

    this.children.each(c => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const child = c;

      if (child.getData('sorted')) {
        return;
      }

      child.setDepth(child.y);
    });

  }

}
