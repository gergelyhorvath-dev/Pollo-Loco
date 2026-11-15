class Cloud extends MovableObject {
    y = -20;
    width = 500;
    height = 250;
    speed = 0.15;

    constructor() {
        super();
        // Ordnername aus deinen Screenshots: 4_clouds (nicht 4.nubes).
        this.loadImage('img/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}
