class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
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

        this.scene.start(`play`);
    }
}