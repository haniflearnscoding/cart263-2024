//define a 2D array
const level = [
  [1, 2, 3],
  [2, 3, 1]
]

//function to shuffle birds that appear out of boxes
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//shuffle each row
for (let i = 0; i < level.length; i++) {
  level[i] = shuffleArray(level[i]);
}


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



  //constructor for the game class
  constructor(data) {
    if (data && data.key) {
      super(data.key);
      this.gameType = data.key;

    }
    else {
      super(`game`);
      this.gameType = `game`;
    }

  }
  //crate keyboard input
  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {



    //instructions 
    setTimeout(() => {
      this.text = this.add.text(400, 500, 'KEY ARROWS & SPACEBAR', { fontFamily: 'Arial', fontSize: 32, color: '#ffff00' });
      this.text.setOrigin(0.5);

    }, 1000);

    // function instruction() {
    //   t = setInterval(this.text = this.add.text(400, 500, 'KEY ARROWS & SPACEBAR', { fontFamily: 'Arial', fontSize: 32, color: '#ffff00' }), 1000);
    // }



    // width and height of game window
    const { width, height } = this.scale;

    //player sprite and animation
    this.player = this.physics.add.sprite(width * 0.5, height * 0.6, `user`)
      .setSize(40, 16)
      .setOffset(12, 38)
      .play('down-idle')




    //create boxes based on levels
    this.createBoxGroup();
    this.createBoxes();

    //create group for items
    this.itemsGroup = this.add.group();

    //collition detection between player and boxes
    this.physics.add.collider(this.player, this.boxGroup, this.handlePlayerBoxCollide, undefined, this);
  }

  createBoxGroup() {
    this.boxGroup = this.physics.add.staticGroup();
  }


  createBoxes() {

    const width = this.scale.width;
    let xPer = 0.25;
    let y = 150;

    // loop through each row
    for (let row = 0; row < level.length; ++row) {
      //loop through each column
      for (let col = 0; col < level[row].length; ++col) {
        /**@type {Phaser.Physics.Arcade.Sprite} */
        //create box at this position
        const box = this.boxGroup.get(width * xPer, y, 'sokoban', 10)
        box.setSize(64, 32)
          .setOffset(0, 32)
          .setData('itemType', level[row][col])
        //moves to the next horizontal position
        xPer += 0.25;
      }
      //reset horizontal position
      xPer = 0.25;
      //move to the next vertical position
      y += 150;

    }
  }



  /**
   * 
   * @param {Phaser.Physics.Arcade.Sprite} player 
   * @param {Phaser.Physics.Arcade.Sprite} box 
   */
  //player box collision
  handlePlayerBoxCollide(player, box) {
    //check if box opened
    if (box.getData('opened')) {
      return;
    }

    if (this.activeBox) {
      return;
    }

    //set active for for interaciont
    this.activeBox = box;
    //change the color of active box
    this.activeBox.setFrame(9)
  }
  /**
   * 
   * @param {Phaser.Physics.Arcade.Sprite} box 
   */
  // reaveal item behind box
  openBox(box) {
    if (!box) {
      return;
    }
    const itemType = box.getData('itemType');

    /** @type {Phaser.GameObjects.Sprite} */
    let item;

    //configure item sprites
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

    //mark the box as opened
    box.setData('opened', true);
    //mark the items as sorted
    item.setData('sorted', true);
    //set depth for it to appear above other sprites
    item.setDepth(2000);

    item.scale = 0
    item.alpha = 0

    //add the selected box into an array for matching
    this.selectedBoxes.push({ box, item });

    //tween animation to reveal item
    this.tweens.add({
      targets: item,
      y: '-=50',
      alpha: 1,
      scale: 0.5,
      duration: 500,
      onComplete: () => {
        //check if two boxes have been selected
        if (this.selectedBoxes.length < 2) {
          return;
        }
        // call matching function
        this.checkForMatch();

      }
    });

    //change color of boxes whrn matched
    this.activeBox.setFrame(10);
    this.activeBox = undefined;

  }

  //check for matches between birds
  checkForMatch() {
    // clearTimeout(t);
    //first and second items from boxes
    const second = this.selectedBoxes.pop();
    const first = this.selectedBoxes.pop();
    //check if the two items match
    if (first.item.texture !== second.item.texture) {
      // if match, tween items and reset boxes
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
    //increment matchCount if there is a match
    if (isNaN(this.matchesCount)) {
      this.matchesCount = 0;
    }
    ++this.matchesCount

    //after delay, set the same color for matched boxes
    this.time.delayedCall(1000, () => {
      first.box.setFrame(8);
      second.box.setFrame(8);

      // const totalBoxes = this.level.length * this.level[0].length;
      // this.matchesCount >= totalBoxes / 2)
      //win condition
      if (this.matchesCount >= 3) {

        // disable player input and movement
        this.player.active = false;
        this.player.setVelocity(0, 0);

        //display win text
        const { width, height } = this.game.scale;
        this.add.text(width * 0.5, height * 0.5, `You Win!`, {
          fontSize: 48
        })
          .setOrigin(0.5);
      }
    })

  }

  //update player movement based on keyboard input
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

    //check if spacebar is pressed with active box
    const spaceJustPressed = Phaser.Input.Keyboard.JustUp(this.cursors.space);
    if (spaceJustPressed && this.activeBox) {
      this.openBox(this.activeBox);
    }

  }


  //update active box based on how close the player is 
  updateActiveBox() {
    if (!this.activeBox) {
      return;
    }

    //calculate distance between player and active box
    const distance = Phaser.Math.Distance.Between(
      this.player.x, this.player.y,
      this.activeBox.x, this.activeBox.y
    );

    if (distance < 64) {
      return;
    }
    //change frame
    this.activeBox.setFrame(10);
    this.activeBox = undefined;
  }

  update() {

    //call methods to update player movement and active box
    this.updatePlayer();
    this.updateActiveBox();

    this.children.each(c => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const child = c;

      if (child.getData('sorted')) {
        return;
      }
      //set depth based on y-coordinate
      child.setDepth(child.y);
    });

  }

}
