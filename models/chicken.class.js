class Chicken extends MovableObject {
    y = 360;
    height = 55;
    width = 70;
    speed = 0.62;
    alive = true;
    points = 50;
    IMAGES_WALKING = [
        'img/ch-walk/1_w.png',
        'img/ch-walk/2_w.png',
        'img/ch-walk/3_w.png'
    ];

    constructor(x = 550) {
        super();
        this.x = x;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
    }

    update(dt) {
        if (!this.alive) return;
        this.moveLeft(dt);
        this.playAnimation(this.IMAGES_WALKING, dt, 10);
    }

    getHitbox() {
        return { x: this.x + 10, y: this.y + 6, width: this.width - 20, height: this.height - 9 };
    }
}

class SmallChicken extends Chicken {
    y = 380;
    width = 53;
    height = 36;
    speed = 1.28;
    points = 75;

    constructor(x) {
        super(x);
    }

    getHitbox() {
        return { x: this.x + 7, y: this.y + 3, width: this.width - 14, height: this.height - 5 };
    }
}
