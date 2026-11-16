class Character extends MovableObject {
    x = 120;
    y = 180;
    width = 110;
    height = 250;
    speed = 5;
    speedY = 0;
    acceleration = 1.1;
    groundY = 180;
    world;
    jumpingKeyWasDown = false;
    standingImage;

    IMAGES_WALKING = [
        'img/walk/W-21.png',
        'img/walk/W-22.png',
        'img/walk/W-23.png',
        'img/walk/W-24.png',
        'img/walk/W-25.png',
        'img/walk/W-26.png'
    ];

    constructor() {
        super();
        this.loadImage('img/I-1.png');
        this.standingImage = this.img;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => this.update(), 1000 / 60);

        setInterval(() => {
            if (!this.world) return;
            const moving = this.world.keyboard.LEFT !== this.world.keyboard.RIGHT;
            if (moving && this.y === this.groundY) {
                if (!this.playAnimation(this.IMAGES_WALKING)) {
                    this.img = this.standingImage;
                }
            } else {
                this.img = this.standingImage;
                this.currentImage = 0;
            }
        }, 90);
    }

    update() {
        if (!this.world) return;
        const keys = this.world.keyboard;

        if (keys.RIGHT && !keys.LEFT && this.x < this.world.levelEndX - this.width) {
            this.moveRight();
            this.otherDirection = false;
        }

        if (keys.LEFT && !keys.RIGHT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }

        const jumpPressed = keys.SPACE || keys.UP;
        if (jumpPressed && !this.jumpingKeyWasDown && this.y >= this.groundY) {
            this.jump();
        }
        this.jumpingKeyWasDown = jumpPressed;

        if (this.y < this.groundY || this.speedY < 0) {
            this.y += this.speedY;
            this.speedY += this.acceleration;
            if (this.y >= this.groundY) {
                this.y = this.groundY;
                this.speedY = 0;
            }
        }
    }

    jump() {
        this.speedY = -20;
    }
}
