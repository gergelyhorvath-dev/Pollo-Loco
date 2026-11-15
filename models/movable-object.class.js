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

    // NEU: Werte fuer das Springen und die Schwerkraft.
    speedY = 0;          // Vertikale Geschwindigkeit (positiv bedeutet aufwaerts).
    acceleration = 0.7; // Pro Bild wird die Aufwaertsgeschwindigkeit kleiner.
    groundY = 180;      // Ausgangsposition von Pepe, wenn er auf dem Boden steht.

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

    // NEU: Solange das Objekt in der Luft ist, wirkt die Schwerkraft.
    // Wir rufen diese Funktion vorerst nur bei Pepe auf.
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;             // Position nach oben/unten bewegen.
                this.speedY -= this.acceleration; // Schwerkraft zieht nach unten.

                // Nicht durch den Boden fallen: Pepe landet genau auf seiner Startposition.
                if (this.y >= this.groundY) {
                    this.y = this.groundY;
                    this.speedY = 0;
                }
            }
        }, 1000 / 60);
    }

    // NEU: true bedeutet, dass Pepe noch oberhalb seiner Bodenposition ist.
    isAboveGround() {
        return this.y < this.groundY;
    }
}
