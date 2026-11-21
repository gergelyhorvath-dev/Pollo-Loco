class MovableObject {
    x = 0;
    y = 0;
    width = 100;
    height = 100;
    speed = 0;
    img;
    imageCache = {};
    currentImage = 0;
    animationClock = 0;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(paths) {
        paths.forEach((path) => {
            const image = new Image();
            image.src = path;
            this.imageCache[path] = image;
        });
    }

    playAnimation(images, elapsed = 1, interval = 7) {
        this.animationClock += elapsed;
        if (this.animationClock < interval) return;
        this.animationClock = 0;
        const path = images[this.currentImage % images.length];
        const next = this.imageCache[path];
        if (next && next.complete && next.naturalWidth > 0) this.img = next;
        this.currentImage++;
    }

    moveRight(amount = 1) {
        this.x += this.speed * amount;
    }

    moveLeft(amount = 1) {
        this.x -= this.speed * amount;
    }

    getHitbox() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    isColliding(other) {
        const a = this.getHitbox();
        const b = other.getHitbox();
        return a.x < b.x + b.width && a.x + a.width > b.x &&
            a.y < b.y + b.height && a.y + a.height > b.y;
    }
}
