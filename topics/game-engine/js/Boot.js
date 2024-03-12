class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        });
    }
    preload() {
        this.load.image({
            key: 'wall',
            url: 'assets/images/wall.png'
        });
        this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 2

        });
        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {
        let style = {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#00ff00'
        }
        let loadingString = "Loading..."
        //  Pass in a basic style object with the constructor
        this.add.text(100, 100, loadingString, style);


    }
}