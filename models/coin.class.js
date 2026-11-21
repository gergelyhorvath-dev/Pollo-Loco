class Coin extends MovableObject {
    width = 34;
    height = 34;
    collected = false;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }

    draw(ctx, clock) {
        if (this.collected) return;
        const cx = this.x + 17;
        const cy = this.y + 17 + Math.sin(clock / 260 + this.x) * 4;
        ctx.save();
        ctx.shadowColor = '#ffcc4b';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#e9a509';
        ctx.strokeStyle = '#fff2a3';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 14, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffe98e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#fff5bc';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', cx, cy + 1);
        ctx.restore();
    }
}
