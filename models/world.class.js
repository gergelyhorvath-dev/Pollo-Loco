class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud()];

    // Die Landschaft besteht aus den echten Dateien unter img/layers.
    // Erst hinten zeichnen, danach die vorderen Schichten.
    backgroundObjects = [
        new BackgroundObject('img/layers/air.png', 0),
        new BackgroundObject('img/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/layers/1_first_layer/1.png', 0)
    ];

    ctx;
    canvas;
    keyboard;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
    }

    setWorld() {
        // this ist genau die aktuelle Spielwelt.
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => this.addToMap(object));
    }

    addToMap(mo) {
        
        if (!mo.img || !mo.img.complete || mo.img.naturalWidth === 0) return;

        if (mo.otherDirection) {
            // Einstellungen nur für dieses eine Objekt verändern.
            this.ctx.save();

            // Bild um die eigene Mitte spiegeln, ohne die X-Position zu verschieben.
            this.ctx.translate(mo.x + mo.width, 0);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);

            // Wichtig: Alle folgenden Bilder wieder ganz normal zeichnen.
            this.ctx.restore();
        } else {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    }
}
