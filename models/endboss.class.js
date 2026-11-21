class Endboss extends MovableObject {
    x = 2600;
    y = 238;
    width = 210;
    height = 190;
    health = 5;
    maxHealth = 5;
    active = false;
    defeated = false;
    hurtFlash = 0;
    IMAGES_WALKING = [
        'img/ch-walk/1_w.png',
        'img/ch-walk/2_w.png',
        'img/ch-walk/3_w.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
    }

    update(dt, world) {
        if (this.defeated) return;
        this.active = world.character.x > 2130;
        if (!this.active) return;
        this.playAnimation(this.IMAGES_WALKING, dt, 12);
        this.hurtFlash = Math.max(0, this.hurtFlash - dt);
        const distance = this.x - world.character.x;
        if (distance > 180) this.x -= 0.6 * dt;
        if (distance < 125) this.x += 0.35 * dt;
        this.x = Math.max(2420, Math.min(2650, this.x));
    }

    hurt() {
        if (this.defeated) return;
        this.health--;
        this.hurtFlash = 12;
        if (this.health <= 0) this.defeated = true;
    }

    getHitbox() {
        return { x: this.x + 33, y: this.y + 36, width: this.width - 65, height: this.height - 37 };
    }

    draw(ctx) {
        if (this.defeated) return;
        ctx.save();
        ctx.shadowColor = this.hurtFlash > 0 ? '#fff' : '#f49d35';
        ctx.shadowBlur = 22;
        if (this.img?.complete && this.img.naturalWidth > 0) {
            ctx.filter = this.hurtFlash > 0 ? 'brightness(2)' : 'sepia(.5) saturate(2.2)';
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        ctx.filter = 'none';
        ctx.shadowBlur = 0;
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#641b0d';
        ctx.fillRect(this.x + 35, this.y - 28, 144, 20);
        ctx.fillStyle = '#ffcc58';
        ctx.fillRect(this.x + 38, this.y - 25, 138 * this.health / this.maxHealth, 14);
        ctx.fillStyle = '#fff8d7';
        ctx.fillText('END BOSS', this.x + 107, this.y - 36);
        ctx.restore();
    }
}
