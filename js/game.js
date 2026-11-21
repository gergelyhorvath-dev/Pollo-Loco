let canvas;
let world;
let keyboard = new Keyboard();
let sound = new SoundManager();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, sound);
    bindInterface();
    updateSoundButton();
}

function bindInterface() {
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('restart-button').addEventListener('click', startGame);
    document.getElementById('home-button').addEventListener('click', showHome);
    document.getElementById('help-button').addEventListener('click', toggleHelp);
    document.getElementById('sound-button').addEventListener('click', toggleSound);
    document.querySelectorAll('[data-key]').forEach(bindTouchButton);
}

function startGame() {
    if (world.state !== 'ready') resetWorld();
    document.getElementById('overlay').classList.add('hidden');
    keyboard.reset();
    world.start();
}

function resetWorld() {
    world.stop();
    keyboard.reset();
    world = new World(canvas, keyboard, sound);
}

function showHome() {
    resetWorld();
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('menu-screen').classList.remove('hidden');
    document.getElementById('overlay').classList.remove('hidden');
}

function showEndScreen(won, score, coins) {
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('end-title').textContent = won ? 'DU HAST GEWONNEN!' : 'GAME OVER';
    document.getElementById('end-text').textContent = won ?
        'Du hast den Endboss besiegt. Pepe ist der Held des Tages!' :
        'Die Hühner waren diesmal stärker. Versuch es noch einmal!';
    document.getElementById('end-score').textContent = `${score} Punkte · ${coins} Münzen`;
    document.getElementById('overlay').classList.remove('hidden');
    keyboard.reset();
}

function toggleHelp() {
    document.getElementById('help-panel').classList.toggle('hidden');
}

function toggleSound() {
    sound.setMuted(!sound.muted);
    updateSoundButton();
}

function updateSoundButton() {
    document.getElementById('sound-button').textContent = sound.muted ? '🔇 Ton aus' : '🔊 Ton an';
}

function bindTouchButton(button) {
    const name = button.dataset.key;
    button.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        if (world.state !== 'playing') return;
        button.setPointerCapture(event.pointerId);
        keyboard[name] = true;
        button.classList.add('pressed');
    });
    const release = () => {
        keyboard[name] = false;
        button.classList.remove('pressed');
    };
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('lostpointercapture', release);
}

const keyNames = {
    ArrowLeft: 'LEFT',
    ArrowRight: 'RIGHT',
    ArrowUp: 'UP',
    ArrowDown: 'DOWN',
    Space: 'SPACE',
    KeyD: 'THROW'
};

window.addEventListener('keydown', (event) => {
    const key = keyNames[event.code];
    if (!key) return;
    event.preventDefault();
    if (world && world.state === 'playing') keyboard[key] = true;
});

window.addEventListener('keyup', (event) => {
    const key = keyNames[event.code];
    if (!key) return;
    event.preventDefault();
    keyboard[key] = false;
});

window.addEventListener('blur', () => keyboard.reset());
