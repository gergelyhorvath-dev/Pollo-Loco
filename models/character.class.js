class Character extends MovableObject {
    x = 100;
    y = 180;
    width = 110;
    height = 250;
    speed = 4.7;
    speedY = 0;
    gravity = 1.08;
    groundY = 180;
    health = 100;
    invulnerable = 0;
    previousBottom = 0;
    world;
    jumpWasPressed = false;
    throwWasPressed = false;
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
    }

    update(dt) {
        if (!this.world || this.health <= 0) return;
        const keys = this.world.keyboard;
        this.previousBottom = this.getHitbox().y + this.getHitbox().height;
        this.invulnerable = Math.max(0, this.invulnerable - dt);
        this.updateMovement(keys, dt);
        this.updateJump(keys, dt);
        this.updateThrow(keys);
        this.updateAnimation(keys, dt);
    }

    updateMovement(keys, dt) {
        if (keys.RIGHT && !keys.LEFT) {
            this.x = Math.min(this.world.levelEndX - this.width, this.x + this.speed * dt);
            this.otherDirection = false;
        }
        if (keys.LEFT && !keys.RIGHT) {
            this.x = Math.max(0, this.x - this.speed * dt);
            this.otherDirection = true;
        }
    }

    updateJump(keys, dt) {
        const pressed = keys.SPACE || keys.UP;
        if (pressed && !this.jumpWasPressed && this.isOnGround()) this.jump();
        this.jumpWasPressed = pressed;
        if (!this.isOnGround() || this.speedY < 0) {
            this.y += this.speedY * dt;
            this.speedY += this.gravity * dt;
            if (this.y > this.groundY) {
                this.y = this.groundY;
                this.speedY = 0;
            }
        }
    }

    updateThrow(keys) {
        if (keys.THROW && !this.throwWasPressed) this.world.throwBottle();
        this.throwWasPressed = keys.THROW;
    }

    updateAnimation(keys, dt) {
        const moving = keys.RIGHT !== keys.LEFT;
        if (moving && this.isOnGround()) {
            this.playAnimation(this.IMAGES_WALKING, dt, 6);
        } else {
            this.img = this.standingImage;
            this.currentImage = 0;
            this.animationClock = 0;
        }
    }

    isOnGround() {
        return this.y >= this.groundY && this.speedY >= 0;
    }

    jump() {
        this.speedY = -19.5;
        this.world.sound.play('jump');
    }

    bounce() {
        this.speedY = -13;
        this.y = Math.min(this.y, this.groundY - 4);
        this.world.sound.play('stomp');
    }

    hurt(amount) {
        if (this.invulnerable > 0 || this.health <= 0) return false;
        this.health = Math.max(0, this.health - amount);
        this.invulnerable = 75;
        this.speedY = -7;
        this.world.sound.play('hurt');
        return true;
    }

    getHitbox() {
        return { x: this.x + 28, y: this.y + 65, width: 54, height: 164 };
    }
}
