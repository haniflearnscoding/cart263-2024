class Play extends Phaser.Scene {

    constructor() {
        super({
            key: `play`
        });
    }

    create() {

        this.wall = this.physics.add.image(100, 100, `wall`);
        this.wall.setTint(0xdd3333);

        this.avatar = this.physics.add.sprite(200, 200, `avatar`);

        this.createAnimations();


        this.avatar.play(`avatar-idle`);
        this.avatar.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        console.log(`Play scene updated`);
        this.avatar.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(300);
        }

        if (this.cursors.up.isDown) {
            this.avatar.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown) {
            this.avatar.setVelocityY(300);
        }

        if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) {
            this.avatar.play(`avatar-moving`, true);
        }
        else {
            this.avatar.play(`avatar-idle`, true);
        }
    }

    createAnimations() {
        this.anims.create({
            key: `avatar-moving`,
            frames: this.anims.generateFrameNumbers(`avatar`, {
                start: 0,
                end: 2
            }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: `avatar-idle`,
            frames: this.anims.generateFrameNumbers(`avatar`, {
                start: 0,
                end: 0
            }),
            frameRate: 6,
            repeat: 0
        });
    }
}