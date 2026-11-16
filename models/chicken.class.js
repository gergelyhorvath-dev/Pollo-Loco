class Chicken extends MovableObject {
    y = 360;
    height = 55;
    width = 70;
    IMAGES_WALKING = [
        'img/ch-walk/1_w.png',
        'img/ch-walk/2_w.png',
        'img/ch-walk/3_w.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 900;
        this.speed = 0.25 + Math.random() * 0.35;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x < -this.width) {
                this.x = 2300 + Math.random() * 400;
            }
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}
