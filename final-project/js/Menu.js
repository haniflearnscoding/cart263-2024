class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: `menu`
    });
  }

  create() {

    //set bg color to black
    this.cameras.main.setBackgroundColor(0x000000);

    //define array with characters for menu options
    let menuKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    //define array with scene names
    let scenes = [
      `game`, `invisible match`, `moving match`, `timer match`
    ];

    // define empty array for menu options
    let menu = [];

    //generate menu option based on scene names
    for (let i = 0; i < scenes.length; i++) {
      menu.push({
        text: `(${menuKeys[i]}) ${scenes[i]}`,
        key: menuKeys[i],
        scene: scenes[i]
      });
    }

    // event listerner to navigate menu
    this.input.keyboard.on('keydown', (e) => {
      let key = e.key.toUpperCase();
      let game = menu.filter((o, i) => o.key === key);
      if (game.length > 0) {
        this.scene.start(game[0].scene);
      }
    });

    //title text 
    let title = this.add.text(this.game.canvas.width / 2, 80, "Match");
    title.setOrigin(0.5, 0);

    let x = 80;
    let y = 170;
    let verticalSpacing = 14;

    //position each menu item
    for (let i = 0; i < menu.length; i++) {
      if (i === 18) {
        x = this.game.canvas.width / 2 + 35;
        y = 170;
      }
      let item = menu[i];
      let itemText = this.add.text(x, y, item.text, { font: 'bold 16px Arial', fill: '#ffffff' });
      y += verticalSpacing;
    }
  }
}
