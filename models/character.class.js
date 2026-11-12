class Character extends MovableObject {
    height = 250;
    y = 180;
    speed = 10; // 10 Pixel pro Bewegungsschritt (60x/Sekunde).
    world;

    
    // Für eine richtige Geh-Animation fehlen noch zusätzliche Einzelbilder.
    IMAGES_WALKING = [
        'img/I-1.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        // Die Bewegung läuft unabhängig vom Wechsel der Animationsbilder.
        setInterval(() => {
            if (!this.world) return;

            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false; // Rechts: Bild normal anzeigen.
            }
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;  // Links: Bild spiegeln.
            }
        }, 1000 / 60);

        // Nur beim Laufen Bilder wechseln (50 Millisekunden = 20x/Sekunde).
        setInterval(() => {
            if (!this.world) return;
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                const i = this.currentImage % this.IMAGES_WALKING.length;
                const path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }

    jump() {
        // Springen wird in einem späteren Video ergänzt.
    }
}
