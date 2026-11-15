class Chicken extends MovableObject {
    y = 360;
    height = 55;
    width = 70;

    // Das ist die echte Huhn-Datei aus deinem img-Ordner.
    // Weitere Gehbilder sind in den Screenshots nicht vorhanden.
    IMAGES_WALKING = ['img/1_w.png'];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            const i = this.currentImage % this.IMAGES_WALKING.length;
            const path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }
}
