// Simple Web Audio API sound layer — all sounds are synthesized, no external files.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;
let suspenseStop: (() => void) | null = null;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.5;
      master.connect(ctx.destination);
    } catch {
      ctx = null;
      master = null;
      return null;
    }
  }
  return ctx;
}

export function initAudio() {
  try {
    const c = ac();
    if (c && c.state === "suspended") void c.resume();
  } catch {
    /* audio unavailable */
  }
}

export function setMuted(value: boolean) {
  muted = value;
  if (master && ctx) {
    master.gain.setTargetAtTime(muted ? 0 : 0.5, ctx.currentTime, 0.02);
  }
}

export function isMuted() {
  return muted;
}

type ToneOpts = {
  freq: number;
  start?: number;
  dur?: number;
  type?: OscillatorType;
  gain?: number;
  sweepTo?: number;
};

function tone({
  freq,
  start = 0,
  dur = 0.2,
  type = "sine",
  gain = 0.3,
  sweepTo,
}: ToneOpts) {
  const c = ac();
  if (!c || !master) return;
  try {
  const t = c.currentTime + start;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g);
  g.connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.05);
  } catch {
    /* audio unavailable */
  }
}

export function playQuestionIn() {
  initAudio();
  tone({ freq: 220, dur: 0.5, type: "triangle", gain: 0.22, sweepTo: 660 });
  tone({ freq: 440, start: 0.12, dur: 0.4, type: "sine", gain: 0.15 });
}

export function playSelect() {
  initAudio();
  tone({ freq: 880, dur: 0.12, type: "square", gain: 0.12 });
  tone({ freq: 1320, start: 0.06, dur: 0.12, type: "square", gain: 0.08 });
}

export function playSuspense(duration = 2.4) {
  initAudio();
  const c = ac();
  if (!c || !master) return () => {};
  stopSuspense();
  const t0 = c.currentTime;

  const drone = c.createOscillator();
  const droneGain = c.createGain();
  drone.type = "sawtooth";
  drone.frequency.setValueAtTime(70, t0);
  drone.frequency.linearRampToValueAtTime(110, t0 + duration);
  droneGain.gain.setValueAtTime(0.0001, t0);
  droneGain.gain.exponentialRampToValueAtTime(0.16, t0 + 0.3);
  droneGain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  drone.connect(droneGain);
  droneGain.connect(master);
  drone.start(t0);
  drone.stop(t0 + duration + 0.1);

  // Ticking heartbeat, accelerating
  let time = 0;
  let i = 0;
  while (time < duration) {
    tone({
      freq: 160 + i * 8,
      start: time,
      dur: 0.09,
      type: "triangle",
      gain: 0.18,
    });
    time += Math.max(0.16, 0.42 - i * 0.03);
    i++;
  }

  suspenseStop = () => {
    try {
      droneGain.gain.cancelScheduledValues(c.currentTime);
      droneGain.gain.setTargetAtTime(0.0001, c.currentTime, 0.05);
      drone.stop(c.currentTime + 0.2);
    } catch {
      /* already stopped */
    }
  };
  return suspenseStop;
}

export function stopSuspense() {
  if (suspenseStop) {
    suspenseStop();
    suspenseStop = null;
  }
}

export function playCorrect() {
  stopSuspense();
  initAudio();
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((f, i) =>
    tone({ freq: f, start: i * 0.1, dur: 0.5, type: "triangle", gain: 0.28 }),
  );
}

export function playWrong() {
  stopSuspense();
  initAudio();
  tone({ freq: 320, dur: 0.8, type: "sawtooth", gain: 0.25, sweepTo: 80 });
  tone({ freq: 150, start: 0.05, dur: 0.7, type: "square", gain: 0.15 });
}

export function playNext() {
  initAudio();
  tone({ freq: 600, dur: 0.18, type: "sine", gain: 0.18, sweepTo: 1200 });
}

export function playVictory() {
  stopSuspense();
  initAudio();
  const melody = [
    [523.25, 0],
    [659.25, 0.14],
    [783.99, 0.28],
    [1046.5, 0.42],
    [783.99, 0.6],
    [1046.5, 0.74],
    [1318.5, 0.92],
  ] as const;
  melody.forEach(([f, t]) =>
    tone({ freq: f, start: t, dur: 0.6, type: "triangle", gain: 0.3 }),
  );
  melody.forEach(([f, t]) =>
    tone({ freq: f / 2, start: t, dur: 0.6, type: "sine", gain: 0.16 }),
  );
  tone({ freq: 130, start: 1.1, dur: 1.6, type: "sawtooth", gain: 0.2 });
}
