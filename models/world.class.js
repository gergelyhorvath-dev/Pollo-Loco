class World {
    character = new Character();
    enemies = [
        new Chicken(520),
        new SmallChicken(790),
        new Chicken(1080),
        new SmallChicken(1370),
        new Chicken(1670),
        new SmallChicken(2020),
        new Chicken(2290)
    ];
    clouds = [new Cloud(250), new Cloud(1650)];
    coins = [
        new Coin(400, 315),
        new Coin(760, 170),
        new Coin(1110, 315),
        new Coin(1460, 185),
        new Coin(1870, 315),
        new Coin(2300, 170),
        new Coin(2520, 300)
    ];
    bottles = [
        new Bottle(600),
        new Bottle(1000),
        new Bottle(1450),
        new Bottle(1830),
        new Bottle(2180),
        new Bottle(2450)
    ];
    thrownBottles = [];
    backgroundObjects = [];
    boss = new Endboss();
    collectedCoins = 0;
    bottleCount = 3;
    score = 0;
    camera_x = 0;
    levelEndX = 2880;
    state = 'ready';
    running = true;
    lastFrame = 0;
    clock = 0;
    frameId = 0;

    constructor(canvas, keyboard, sound) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.sound = sound;
        this.character.world = this;
        this.createBackground();
        this.frameId = requestAnimationFrame((time) => this.loop(time));
    }

    createBackground() {
        const layers = [
            'img/layers/air.png',
            'img/layers/3_third_layer/1.png',
            'img/layers/2_second_layer/1.png',
            'img/layers/1_first_layer/1.png'
        ];
        layers.forEach((path) => {
            for (let x = 0; x < this.levelEndX; x += 720) {
                this.backgroundObjects.push(new BackgroundObject(path, x));
            }
        });
    }

    loop(time) {
        if (!this.running) return;
        const dt = this.lastFrame ? Math.min((time - this.lastFrame) / 16.667, 2) : 1;
        this.lastFrame = time;
        this.clock = time;
        if (this.state === 'playing') this.update(dt);
        this.draw();
        this.frameId = requestAnimationFrame((nextTime) => this.loop(nextTime));
    }

    start() {
        this.state = 'playing';
        this.sound.start();
    }

    stop() {
        this.running = false;
        cancelAnimationFrame(this.frameId);
    }

    update(dt) {
        this.character.update(dt);
        this.enemies.forEach((enemy) => enemy.update(dt));
        this.clouds.forEach((cloud) => cloud.update(dt));
        this.boss.update(dt, this);
        this.thrownBottles.forEach((bottle) => bottle.update(dt));
        this.checkCollisions();
        this.thrownBottles = this.thrownBottles.filter((bottle) => bottle.active);
    }

    throwBottle() {
        if (this.state !== 'playing' || this.bottleCount <= 0) return;
        const facingRight = !this.character.otherDirection;
        const x = this.character.x + (facingRight ? 75 : 12);
        const y = this.character.y + 114;
        this.thrownBottles.push(new ThrownBottle(x, y, facingRight));
        this.bottleCount--;
        this.sound.play('throw');
    }

    checkCollisions() {
        this.collectItems();
        this.checkEnemies();
        this.checkBottles();
        this.checkBoss();
        if (this.character.health <= 0) this.finish(false);
    }

    collectItems() {
        this.coins.forEach((coin) => {
            if (coin.collected || !this.character.isColliding(coin)) return;
            coin.collected = true;
            this.collectedCoins++;
            this.score += 25;
            this.sound.play('coin');
        });
        this.bottles.forEach((bottle) => {
            if (bottle.collected || !this.character.isColliding(bottle)) return;
            bottle.collected = true;
            this.bottleCount = Math.min(8, this.bottleCount + 1);
            this.score += 10;
            this.sound.play('pickup');
        });
    }

    checkEnemies() {
        this.enemies.forEach((enemy) => {
            if (!enemy.alive || !this.character.isColliding(enemy)) return;
            const hitbox = enemy.getHitbox();
            const landing = this.character.speedY > 0 &&
                this.character.previousBottom <= hitbox.y + 14;
            if (landing) {
                enemy.alive = false;
                this.score += enemy.points;
                this.character.bounce();
            } else {
                this.character.hurt(20);
            }
        });
    }

    checkBottles() {
        this.thrownBottles.forEach((bottle) => {
            if (!bottle.active) return;
            const enemy = this.enemies.find((target) => target.alive && bottle.isColliding(target));
            if (enemy) {
                enemy.alive = false;
                bottle.active = false;
                this.score += enemy.points;
                this.sound.play('stomp');
            }
            if (bottle.active && this.boss.active && !this.boss.defeated &&
                bottle.isColliding(this.boss)) {
                bottle.active = false;
                this.boss.hurt();
                this.score += 100;
                this.sound.play('boss');
            }
        });
    }

    checkBoss() {
        if (!this.boss.active) return;
        if (this.boss.defeated) {
            this.finish(true);
            return;
        }
        if (this.character.isColliding(this.boss)) this.character.hurt(25);
    }

    finish(won) {
        if (this.state !== 'playing') return;
        this.state = won ? 'won' : 'lost';
        this.sound.play(won ? 'win' : 'lose');
        showEndScreen(won, this.score, this.collectedCoins);
    }

    draw() {
        this.updateCamera();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#98cce0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.enemies.filter((enemy) => enemy.alive).forEach((enemy) => this.addToMap(enemy));
        this.coins.forEach((coin) => coin.draw(this.ctx, this.clock));
        this.bottles.forEach((bottle) => bottle.draw(this.ctx, this.clock));
        this.boss.draw(this.ctx);
        this.thrownBottles.forEach((bottle) => bottle.draw(this.ctx));
        if (this.character.invulnerable % 12 < 8) this.addToMap(this.character);
        this.ctx.restore();
        this.drawStatus();
    }

    updateCamera() {
        const target = Math.max(0, this.character.x - 165);
        this.camera_x = -Math.min(target, this.levelEndX - this.canvas.width);
    }

    drawStatus() {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = 'rgba(23, 29, 30, .84)';
        ctx.fillRect(14, 13, 690, 58);
        ctx.fillStyle = '#fff3df';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('LEBEN', 27, 36);
        ctx.fillStyle = '#5b3830';
        ctx.fillRect(91, 23, 130, 17);
        ctx.fillStyle = this.character.health > 30 ? '#e04d46' : '#ffbb38';
        ctx.fillRect(91, 23, 130 * this.character.health / 100, 17);
        ctx.strokeStyle = '#fff0d6';
        ctx.strokeRect(91, 23, 130, 17);
        ctx.fillStyle = '#ffcf42';
        ctx.fillText(`MÜNZEN  ${this.collectedCoins}/${this.coins.length}`, 246, 36);
        ctx.fillStyle = '#9ff0ad';
        ctx.fillText(`FLASCHEN  ${this.bottleCount}`, 416, 36);
        ctx.fillStyle = '#fff';
        ctx.fillText(`${this.score} PTS`, 586, 36);
        ctx.font = '12px Arial';
        ctx.fillStyle = '#c8ccbc';
        ctx.fillText('PFEILE BEWEGEN · LEERTASTE SPRINGEN · D WERFEN', 26, 57);
        ctx.restore();
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => this.addToMap(object));
    }

    addToMap(object) {
        if (!object.img || !object.img.complete || object.img.naturalWidth === 0) return;
        this.ctx.save();
        if (object.otherDirection) {
            this.ctx.translate(object.x + object.width, 0);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(object.img, 0, object.y, object.width, object.height);
        } else {
            this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        }
        this.ctx.restore();
    }
}
