// Sound effects using the Web Audio API (no audio files needed).
let ctx = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    ctx = new AudioContext();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq, startTime, duration, type = "sine", volume = 0.2) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + startTime);
  gain.gain.setValueAtTime(volume, c.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + startTime + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(c.currentTime + startTime);
  osc.stop(c.currentTime + startTime + duration);
}

// Pleasant rising "ding"
export function playCorrect() {
  tone(660, 0, 0.12);
  tone(880, 0.1, 0.2);
}

// Low buzz
export function playWrong() {
  tone(196, 0, 0.2, "sawtooth", 0.12);
  tone(147, 0.12, 0.25, "sawtooth", 0.12);
}

// Little victory fanfare
export function playRoundComplete() {
  tone(523, 0, 0.15);
  tone(659, 0.12, 0.15);
  tone(784, 0.24, 0.15);
  tone(1047, 0.36, 0.35);
}