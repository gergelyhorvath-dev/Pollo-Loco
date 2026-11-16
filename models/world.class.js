class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud()];
    backgroundObjects = [];
    coins = [
        new Coin(430, 305),
        new Coin(770, 145),
        new Coin(1090, 305),
        new Coin(1470, 180),
        new Coin(1880, 305),
        new Coin(2350, 165)
    ];
    collectedCoins = 0;
    camera_x = 0;
    levelEndX = 2880;
    ctx;
    canvas;
    keyboard;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.createBackground();
        this.setWorld();
        this.checkCollisions();
        this.draw();
    }

    createBackground() {
        const layers = [
            'img/layers/air.png',
            'img/layers/3_third_layer/1.png',
            'img/layers/2_second_layer/1.png',
            'img/layers/1_first_layer/1.png'
        ];

        for (let x = 0; x < this.levelEndX; x += 720) {
            layers.forEach((path) => {
                this.backgroundObjects.push(new BackgroundObject(path, x));
            });
        }
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        const cameraTarget = Math.max(0, this.character.x - 150);
        this.camera_x = -Math.min(cameraTarget, this.levelEndX - this.canvas.width);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.coins.forEach((coin) => coin.draw(this.ctx));
        this.addToMap(this.character);
        this.ctx.restore();
        this.drawStatus();

        requestAnimationFrame(() => this.draw());
    }

    checkCollisions() {
        setInterval(() => {
            const character = this.character;
            const left = character.x + 25;
            const right = character.x + character.width - 25;
            const top = character.y + 70;
            const bottom = character.y + character.height - 20;

            this.coins.forEach((coin) => {
                if (coin.collected) return;

                const overlaps = right > coin.x &&
                    left < coin.x + coin.width &&
                    bottom > coin.y &&
                    top < coin.y + coin.height;

                if (overlaps) {
                    coin.collected = true;
                    this.collectedCoins++;
                }
            });
        }, 1000 / 60);
    }

    drawStatus() {
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(19, 18, 17, 0.78)';
        this.ctx.fillRect(16, 14, 156, 38);
        this.ctx.fillStyle = '#ffcf33';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Münzen: ${this.collectedCoins} / ${this.coins.length}`, 28, 40);
        this.ctx.restore();
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => this.addToMap(object));
    }

    addToMap(object) {
        if (!object.img || !object.img.complete || object.img.naturalWidth === 0) return;

        if (object.otherDirection) {
            this.ctx.save();
            this.ctx.translate(object.x + object.width, 0);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(object.img, 0, object.y, object.width, object.height);
            this.ctx.restore();
        } else {
            this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        }
    }
}
