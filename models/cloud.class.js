class Cloud extends MovableObject {
    y = -12;
    width = 480;
    height = 220;
    speed = 0.18;

    constructor(x = 400) {
        super();
        this.x = x;
        this.loadImage('img/layers/4_clouds/1.png');
    }

    update(dt) {
        this.moveLeft(dt);
        if (this.x < -550) this.x = 3000;
    }
}
