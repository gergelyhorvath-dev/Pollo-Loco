class Cloud extends MovableObject {
    y = -20;
    width = 500;
    height = 250;
    speed = 0.25;

    constructor() {
        super();
        this.loadImage('img/layers/4_clouds/1.png');
        this.x = Math.random() * 720;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x < -this.width) {
                this.x = 2800;
            }
        }, 1000 / 60);
    }
}
