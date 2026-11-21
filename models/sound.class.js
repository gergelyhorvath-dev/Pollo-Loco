class SoundManager {
    muted = true;
    context = null;

    constructor() {
        try {
            this.muted = localStorage.getItem('pollo-muted') !== 'false';
        } catch (error) {
            this.muted = true;
        }
    }

    start() {
        if (this.muted) return;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!this.context) this.context = new AudioContextClass();
        if (this.context.state === 'suspended') this.context.resume();
    }

    setMuted(value) {
        this.muted = value;
        try {
            localStorage.setItem('pollo-muted', String(value));
        } catch (error) {
            return;
        }
        if (!value) this.start();
    }

    tone(freq, duration, volume = 0.045, type = 'sine') {
        if (this.muted || !this.context) return;
        const t = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gain = this.context.createGain();
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
        oscillator.connect(gain);
        gain.connect(this.context.destination);
        oscillator.start(t);
        oscillator.stop(t + duration);
    }

    play(name) {
        if (this.muted) return;
        const notes = {
            coin: [830, 0.12],
            pickup: [620, 0.2],
            jump: [360, 0.12],
            throw: [260, 0.13],
            stomp: [180, 0.18],
            hurt: [115, 0.34],
            boss: [95, 0.3],
            win: [1000, 0.48],
            lose: [120, 0.6]
        };
        const note = notes[name];
        if (note) this.tone(note[0], note[1], 0.045, name === 'hurt' ? 'sawtooth' : 'triangle');
    }
}
