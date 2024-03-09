class Play extends Phaser.Scene {

    constructor() {
        super({
            key: `play`
        });
    }

    create() {
        let style = {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#00ff00'
        }
        let gameDescription = "Click to start"
        //  Pass in a basic style object with the constructor
        this.add.text(100, 100, gameDescription, style);
    }

    update() {
        console.log(`Play scene updated`);
    }
}