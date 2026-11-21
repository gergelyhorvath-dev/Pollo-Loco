class Bottle extends MovableObject {
    width = 26;
    height = 46;
    collected = false;

    constructor(x, y = 365) {
        super();
        this.x = x;
        this.y = y;
    }

    draw(ctx, clock) {
        if (this.collected) return;
        this.paint(ctx, this.x + 13, this.y + 23 + Math.sin(clock / 320 + this.x) * 3, 0);
    }

    paint(ctx, x, y, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.shadowColor = '#78ec89';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#178548';
        ctx.strokeStyle = '#d7ffc5';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-5, -21);
        ctx.lineTo(5, -21);
        ctx.lineTo(5, -12);
        ctx.quadraticCurveTo(12, -9, 11, -3);
        ctx.lineTo(11, 18);
        ctx.quadraticCurveTo(11, 22, 6, 22);
        ctx.lineTo(-6, 22);
        ctx.quadraticCurveTo(-11, 22, -11, 18);
        ctx.lineTo(-11, -3);
        ctx.quadraticCurveTo(-12, -9, -5, -12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f4e8a1';
        ctx.fillRect(-10, 2, 20, 10);
        ctx.fillStyle = '#a2ffce';
        ctx.fillRect(-3, -18, 3, 15);
        ctx.restore();
    }
}

class ThrownBottle extends Bottle {
    width = 24;
    height = 34;
    velocityX = 12;
    velocityY = -3.2;
    rotation = 0;
    active = true;

    constructor(x, y, facingRight) {
        super(x, y);
        this.velocityX = facingRight ? 12 : -12;
    }

    update(dt) {
        if (!this.active) return;
        this.x += this.velocityX * dt;
        this.y += this.velocityY * dt;
        this.velocityY += 0.19 * dt;
        this.rotation += 0.15 * dt;
        if (this.y > 440 || this.y < -120) this.active = false;
    }

    draw(ctx) {
        if (this.active) this.paint(ctx, this.x + 12, this.y + 17, this.rotation);
    }
}
