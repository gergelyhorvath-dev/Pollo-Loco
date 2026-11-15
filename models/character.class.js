class Character extends MovableObject {
    height = 250;
    y = 180;
    speed = 10; // 10 Pixel pro Bewegungsschritt (60x/Sekunde).
    world;

    // NEU: Merkt sich, ob die Sprungtaste schon gedrueckt war.
    // Dadurch springt Pepe nur einmal pro Tastendruck.
    jumpKeyWasPressed = false;

    // Dein img-Ordner enthaelt aktuell dieses echte Pepe-Bild.
    // Fuer eine richtige Geh-Animation fehlen noch weitere Einzelbilder.
    IMAGES_WALKING = [
        'img/I-1.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity(); // NEU: Die Schwerkraft fuer Pepe einschalten.
        this.animate();
    }

    animate() {
        // Bewegung und Tastaturabfrage laufen 60-mal pro Sekunde.
        setInterval(() => {
            if (!this.world) return;

            const keyboard = this.world.keyboard;
            const maxX = this.world.canvas.width - this.width;

            if (keyboard.RIGHT && !keyboard.LEFT) {
                // NEU: Pepe kann nicht mehr rechts aus dem Canvas hinauslaufen.
                this.x = Math.min(this.x + this.speed, maxX);
                this.otherDirection = false;
            }
            if (keyboard.LEFT && !keyboard.RIGHT) {
                // NEU: Pepe kann nicht mehr links aus dem Canvas hinauslaufen.
                this.x = Math.max(this.x - this.speed, 0);
                this.otherDirection = true;
            }

            // NEU: Leertaste oder Pfeil nach oben lassen Pepe springen.
            const jumpKeyPressed = keyboard.SPACE || keyboard.UP;
            if (jumpKeyPressed && !this.jumpKeyWasPressed && !this.isAboveGround()) {
                this.jump();
            }
            this.jumpKeyWasPressed = jumpKeyPressed;
        }, 1000 / 60);

        // Bilderwechsel nur beim Laufen. Noch gibt es nur ein echtes Bild.
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

    // NEU: Der Sprung startet mit einer positiven Geschwindigkeit nach oben.
    // Danach verringert applyGravity() diese Geschwindigkeit automatisch.
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 12;
        }
    }
}
