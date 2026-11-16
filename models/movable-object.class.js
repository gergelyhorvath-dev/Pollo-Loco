class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.img.onerror = () => console.error('Bild konnte nicht geladen werden:', path);
    }

    loadImages(paths) {
        paths.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        const availableImages = images.filter((path) => {
            const image = this.imageCache[path];
            return image && image.complete && image.naturalWidth > 0;
        });

        if (availableImages.length === 0) return false;

        const index = this.currentImage % availableImages.length;
        this.img = this.imageCache[availableImages[index]];
        this.currentImage++;
        return true;
    }
}
