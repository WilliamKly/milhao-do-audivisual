const TRACKS = {
  intro: "/audio/intro.mp3",
  question: "/audio/question.mp3",
  correct: "/audio/correct.mp3",
  wrong: "/audio/wrong.mp3",
} as const;

type LoopTrack = "intro" | "question";
type ShotTrack = "correct" | "wrong";

let muted = false;
/** User gesture received — audible playback is allowed. */
let unlocked = false;
/** Intro/question is playing muted because the browser blocked audible autoplay. */
let awaitingUnlock = false;
const loops = new Map<LoopTrack, HTMLAudioElement>();
let activeLoop: LoopTrack | null = null;
let unlockInstalled = false;
const unlockListeners = new Set<() => void>();

function ensureInDom(audio: HTMLAudioElement) {
  if (typeof document === "undefined") return;
  if (!audio.isConnected) {
    audio.setAttribute("aria-hidden", "true");
    audio.style.cssText = "position:fixed;width:0;height:0;opacity:0;pointer-events:none";
    document.body.appendChild(audio);
  }
}

function createAudio(src: string, loop = false): HTMLAudioElement {
  const audio = document.createElement("audio");
  audio.src = src;
  audio.loop = loop;
  audio.preload = "auto";
  audio.playsInline = true;
  audio.setAttribute("playsinline", "");
  audio.setAttribute("webkit-playsinline", "");
  ensureInDom(audio);
  return audio;
}

function syncVolume(audio: HTMLAudioElement) {
  audio.volume = muted ? 0 : 0.85;
  audio.muted = muted || (!unlocked && awaitingUnlock);
}

function getLoop(track: LoopTrack): HTMLAudioElement {
  let audio = loops.get(track);
  if (!audio) {
    audio = createAudio(TRACKS[track], true);
    loops.set(track, audio);
  } else {
    ensureInDom(audio);
  }
  return audio;
}

function stopLoop(track: LoopTrack) {
  const audio = loops.get(track);
  if (!audio) return;
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch {
    /* ignore */
  }
  if (activeLoop === track) activeLoop = null;
}

function stopAllLoops() {
  for (const track of loops.keys()) stopLoop(track);
}

function notifyUnlockListeners() {
  for (const listener of unlockListeners) listener();
}

async function playLoop(track: LoopTrack) {
  if (typeof window === "undefined") return;

  installUnlockListeners();

  const audio = getLoop(track);

  // Already playing this track — don't restart (avoids Strict Mode flicker).
  if (activeLoop === track && !audio.paused) {
    syncVolume(audio);
    return;
  }

  for (const other of loops.keys()) {
    if (other !== track) stopLoop(other);
  }

  activeLoop = track;
  audio.volume = muted ? 0 : 0.85;

  // Prefer muted start first — browsers allow muted autoplay without a gesture.
  // Then try to unmute; if the policy blocks it, keep muted until unlockAudio().
  audio.muted = true;
  try {
    await audio.play();
  } catch {
    awaitingUnlock = !muted;
    notifyUnlockListeners();
    return;
  }

  if (muted) {
    awaitingUnlock = false;
    notifyUnlockListeners();
    return;
  }

  audio.muted = false;
  // If the browser forces mute back / blocks audible output, stay in unlock mode.
  // Reading muted after a microtask catches policies that re-mute.
  await Promise.resolve();
  if (audio.muted) {
    awaitingUnlock = true;
  } else {
    unlocked = true;
    awaitingUnlock = false;
  }
  notifyUnlockListeners();
}

function installUnlockListeners() {
  if (typeof window === "undefined" || unlockInstalled) return;
  unlockInstalled = true;

  const onGesture = () => {
    unlockAudio();
  };

  window.addEventListener("pointerdown", onGesture, { capture: true });
  window.addEventListener("touchstart", onGesture, { capture: true });
  window.addEventListener("keydown", onGesture, { capture: true });
}

export function onAudioUnlockChange(listener: () => void) {
  unlockListeners.add(listener);
  return () => unlockListeners.delete(listener);
}

/** Call after any user gesture to enable audible playback. */
export function unlockAudio() {
  if (typeof window === "undefined") return;

  unlocked = true;
  awaitingUnlock = false;

  for (const audio of loops.values()) {
    syncVolume(audio);
    if (audio.paused && activeLoop && loops.get(activeLoop) === audio) {
      void audio.play().catch(() => {});
    }
  }

  notifyUnlockListeners();
}

export function initAudio() {
  unlockAudio();
}

export function setMuted(value: boolean) {
  muted = value;
  if (value) awaitingUnlock = false;
  for (const audio of loops.values()) syncVolume(audio);
  notifyUnlockListeners();
}

export function isMuted() {
  return muted;
}

export function isAudioUnlocked() {
  return unlocked;
}

export function needsAudioUnlock() {
  return awaitingUnlock && !muted && !unlocked;
}

export async function playIntroLoop() {
  await playLoop("intro");
}

export function stopIntro() {
  stopLoop("intro");
}

export async function playQuestionLoop() {
  await playLoop("question");
}

export function stopQuestion() {
  stopLoop("question");
}

export function stopAll() {
  stopAllLoops();
}

async function playOneShot(track: ShotTrack) {
  if (typeof window === "undefined") return;
  stopAllLoops();
  unlockAudio();

  const audio = createAudio(TRACKS[track], false);
  audio.volume = muted ? 0 : 0.85;
  audio.muted = muted;

  try {
    await audio.play();
  } catch {
    /* blocked */
  }

  audio.addEventListener(
    "ended",
    () => {
      audio.remove();
    },
    { once: true },
  );
}

export function playCorrect() {
  void playOneShot("correct");
}

export function playWrong() {
  void playOneShot("wrong");
}

export function playVictory() {
  playCorrect();
}
