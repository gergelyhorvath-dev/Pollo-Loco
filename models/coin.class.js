class Coin extends MovableObject {
    width = 34;
    height = 34;
    collected = false;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        if (this.collected) return;

        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        ctx.save();
        ctx.shadowColor = 'rgba(255, 184, 0, 0.55)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#e9a509';
        ctx.strokeStyle = '#fff2a3';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffd95d';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#fff5bc';
        ctx.font = 'bold 17px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', centerX, centerY + 1);
        ctx.restore();
    }
}
