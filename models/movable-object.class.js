class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;

    // false: normale Blickrichtung; true: horizontal spiegeln.
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.img.onerror = () => console.error('Bild konnte nicht geladen werden:', path);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            img.onerror = () => console.error('Animationsbild fehlt:', path);
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}
