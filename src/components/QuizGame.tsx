import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Trophy, Sparkles, RotateCcw } from "lucide-react";
import { LETTERS, questions } from "@/data/questions";
import { PrizeLadder } from "@/components/PrizeLadder";
import { Confetti } from "@/components/Confetti";
import { CelebrationBurst } from "@/components/CelebrationBurst";
import { HeritageDecor, FilmReel, FilmCamera } from "@/components/heritage/HeritageIllustrations";
import { FilmStripSides } from "@/components/heritage/FilmStripBanner";
import * as sfx from "@/lib/game-audio";

type Phase =
  | "intro"
  | "playing"
  | "suspense"
  | "revealed"
  | "wrongRevealed"
  | "finished";

type QuestionResult = "correct" | "wrong" | null;

const SUSPENSE_MS = 2400;
const emptyResults = (): QuestionResult[] => Array(questions.length).fill(null);

export function QuizGame() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>(emptyResults);
  const [selected, setSelected] = useState<number | null>(null);
  const [muted, setMutedState] = useState(false);
  const [needsUnlock, setNeedsUnlock] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const current = questions[index]!;
  const correct = current.correctAnswer;
  const isGameBoard =
    phase === "playing" ||
    phase === "suspense" ||
    phase === "revealed" ||
    phase === "wrongRevealed";
  const ladderPhase = isGameBoard ? phase : "playing";

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  // Start intro as soon as we land on the menu. Do NOT stop in cleanup —
  // React Strict Mode remounts effects and was killing the audio on load.
  useEffect(() => {
    if (phase === "intro") {
      void sfx.playIntroLoop().then(() => {
        setNeedsUnlock(sfx.needsAudioUnlock());
      });
      return;
    }
    sfx.stopIntro();
  }, [phase]);

  useEffect(() => {
    return sfx.onAudioUnlockChange(() => {
      setNeedsUnlock(sfx.needsAudioUnlock());
    });
  }, []);

  useEffect(() => {
    if (phase !== "playing") {
      sfx.stopQuestion();
      return;
    }
    void sfx.playQuestionLoop();
  }, [phase, index]);

  useEffect(() => () => sfx.stopAll(), []);

  const toggleMute = () => {
    const next = !muted;
    setMutedState(next);
    sfx.setMuted(next);
    if (!next) {
      sfx.unlockAudio();
      if (phase === "intro") void sfx.playIntroLoop();
      if (phase === "playing") void sfx.playQuestionLoop();
    }
  };

  const start = () => {
    sfx.unlockAudio();
    sfx.setMuted(muted);
    sfx.stopIntro();
    setIndex(0);
    setScore(0);
    setResults(emptyResults());
    setSelected(null);
    setPhase("playing");
  };

  const answer = (i: number) => {
    if (phase !== "playing") return;
    setSelected(i);
    setPhase("suspense");
    sfx.stopQuestion();
    timers.current.push(
      setTimeout(() => {
        const isRight = i === correct;
        setResults((prev) => {
          const next = [...prev];
          next[index] = isRight ? "correct" : "wrong";
          return next;
        });
        if (isRight) {
          setScore((s) => s + 1);
          setPhase("revealed");
          sfx.playCorrect();
        } else {
          setPhase("wrongRevealed");
          sfx.playWrong();
        }
      }, SUSPENSE_MS),
    );
  };

  const next = () => {
    clearTimers();
    setSelected(null);
    if (index >= questions.length - 1) {
      setPhase("finished");
      if (score === questions.length) sfx.playVictory();
      return;
    }
    setIndex((i) => i + 1);
    setPhase("playing");
  };

  const restart = () => {
    clearTimers();
    sfx.stopAll();
    setIndex(0);
    setScore(0);
    setResults(emptyResults());
    setSelected(null);
    setPhase("intro");
    void sfx.playIntroLoop();
  };

  const answerState = (i: number) => {
    if (phase === "playing") return "idle";
    if (phase === "suspense") return i === selected ? "selected" : "dim";
    if (i === correct) return "correct";
    if (i === selected) return "wrong";
    return "dim";
  };

  const MuteButton = (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={muted ? "Ativar som" : "Desativar som"}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-panel/70 text-gold transition-colors hover:bg-panel"
    >
      {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
    </button>
  );

  return (
    <main className="stage-bg stage-rays relative flex min-h-[100dvh] w-full flex-col overflow-hidden">
      <FilmStripSides className="z-[2]" />
      {phase === "intro" && <HeritageDecor variant="intro" />}
      {isGameBoard && <HeritageDecor variant="game" />}
      {phase === "finished" && <HeritageDecor variant="finished" />}

      {phase === "intro" && (
        <section
          className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-5 py-10 text-center"
          onPointerDown={() => sfx.unlockAudio()}
        >
          <div className="absolute right-4 top-4 z-20">{MuteButton}</div>
          {needsUnlock && (
            <button
              type="button"
              onClick={() => sfx.unlockAudio()}
              className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-gold/40 bg-panel/90 px-5 py-2.5 text-sm font-semibold text-gold shadow-stage backdrop-blur sm:text-base"
            >
              Toque para ativar o som
            </button>
          )}
          <p className="animate-rise-in text-sm font-bold uppercase tracking-[0.35em] text-electric sm:text-base">
            Ao vivo · Estúdio da Memória · Patrimônio Audiovisual
          </p>
          <h1 className="animate-zoom-in-blur gold-text max-w-4xl font-display text-5xl leading-[1.05] uppercase sm:text-6xl lg:text-8xl">
            Desafio do Patrimônio Audiovisual
          </h1>
          <p className="animate-rise-in max-w-lg text-lg text-muted-foreground sm:text-2xl">
            Você está pronto para fazer 10 pontos?
          </p>
          <button
            type="button"
            onClick={start}
            className="animate-glow-breathe mt-2 min-h-16 rounded-full bg-gradient-to-b from-gold-soft to-gold px-14 py-5 font-display text-3xl uppercase tracking-wider text-stage transition-transform active:scale-95 sm:text-4xl"
          >
            Começar
          </button>
          <p className="text-sm text-muted-foreground/80 sm:text-base">
            10 perguntas · 1 pt cada · erre e continue
          </p>
        </section>
      )}

      {isGameBoard && (
        <div className="relative z-10 flex flex-1 flex-col gap-4 px-3 py-3 sm:px-5 sm:py-5 lg:flex-row lg:gap-6 lg:px-8">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0">
                <h1 className="gold-text truncate font-display text-xl uppercase tracking-wide sm:text-3xl">
                  Desafio do Patrimônio Audiovisual
                </h1>
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground sm:text-base">
                  Pergunta {index + 1} de {questions.length}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <div className="rounded-full border border-gold/40 bg-panel/70 px-4 py-2 text-right">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Placar
                  </p>
                  <p className="gold-text font-display text-xl leading-tight sm:text-2xl">
                    {score} pts
                  </p>
                </div>
                {MuteButton}
              </div>
            </header>

            <PrizeLadder
              currentIndex={index}
              results={results}
              phase={ladderPhase}
              variant="mobile"
            />

            <section
              key={`q-${index}`}
              className="panel-glow animate-zoom-in-blur relative flex min-h-[24vh] items-center justify-center rounded-3xl px-5 py-7 text-center sm:px-10 sm:py-10"
            >
              <FilmReel className="absolute -left-1 top-1/2 hidden h-14 w-14 -translate-y-1/2 text-gold/25 lg:block xl:h-16 xl:w-16" />
              <FilmCamera className="absolute -right-1 top-1/2 hidden h-16 w-16 -translate-y-1/2 text-gold/25 lg:block xl:h-20 xl:w-20" />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <h2 className="text-balance text-xl font-semibold leading-snug sm:text-2xl lg:text-3xl">
                {current.question}
              </h2>
            </section>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {current.answers.map((text, i) => (
                <button
                  key={`${index}-${i}`}
                  type="button"
                  disabled={phase !== "playing"}
                  data-state={answerState(i)}
                  onClick={() => answer(i)}
                  className="answer-btn animate-rise-in text-lg sm:text-xl"
                  style={{ animationDelay: `${0.1 + i * 0.09}s` }}
                >
                  <span className="letter">{LETTERS[i]}</span>
                  <span className="min-w-0 flex-1">{text}</span>
                </button>
              ))}
            </div>

            <div className="flex min-h-16 items-center justify-center pb-1">
              {phase === "suspense" && (
                <p className="animate-glow-breathe font-display text-2xl uppercase tracking-[0.3em] text-gold sm:text-3xl">
                  Suspense…
                </p>
              )}
              {phase === "revealed" && (
                <div className="animate-rise-in flex flex-col items-center gap-3 text-center">
                  <p className="font-display text-3xl uppercase tracking-widest text-success sm:text-4xl">
                    Resposta correta!
                  </p>
                  <p className="text-lg text-muted-foreground sm:text-xl">+1 ponto</p>
                  <button
                    type="button"
                    onClick={next}
                    className="min-h-14 rounded-full bg-gradient-to-b from-gold-soft to-gold px-10 py-4 font-display text-xl uppercase tracking-wider text-stage transition-transform active:scale-95 sm:text-2xl"
                  >
                    {index >= questions.length - 1 ? "Ver resultado" : "Próxima pergunta"}
                  </button>
                </div>
              )}
              {phase === "wrongRevealed" && (
                <div className="animate-rise-in flex flex-col items-center gap-3 text-center">
                  <p className="font-display text-3xl uppercase tracking-widest text-danger sm:text-4xl">
                    Resposta errada
                  </p>
                  <p className="text-lg text-muted-foreground sm:text-xl">
                    A correta era{" "}
                    <b className="text-success">{LETTERS[correct]}</b> · seguimos em frente
                  </p>
                  <button
                    type="button"
                    onClick={next}
                    className="min-h-14 rounded-full bg-gradient-to-b from-gold-soft to-gold px-10 py-4 font-display text-xl uppercase tracking-wider text-stage transition-transform active:scale-95 sm:text-2xl"
                  >
                    {index >= questions.length - 1 ? "Ver resultado" : "Próxima pergunta"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <PrizeLadder
            currentIndex={index}
            results={results}
            phase={ladderPhase}
            variant="desktop"
          />

          {phase === "revealed" && (
            <>
              <CelebrationBurst />
              <Confetti count={120} intense burst />
              <Confetti count={80} intense />
            </>
          )}
        </div>
      )}

      {phase === "finished" && (
        <section className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-5 py-10 text-center">
          {score === questions.length && (
            <>
              <Confetti count={140} intense />
              <CelebrationBurst />
            </>
          )}
          {score === questions.length ? (
            <Trophy className="animate-glow-breathe h-20 w-20 text-gold" />
          ) : (
            <Sparkles className="animate-glow-breathe h-16 w-16 text-electric" />
          )}
          <h1 className="animate-zoom-in-blur gold-text font-display text-5xl uppercase sm:text-7xl">
            {score === questions.length ? "Parabéns!" : "Fim do jogo!"}
          </h1>
          <p className="animate-rise-in font-display text-2xl uppercase tracking-[0.15em] text-electric sm:text-4xl">
            {score === questions.length
              ? "Pontuação máxima!"
              : "Você respondeu todas as perguntas"}
          </p>
          <div className="animate-glow-breathe panel-glow rounded-3xl px-10 py-6">
            <p className="text-sm uppercase tracking-widest text-muted-foreground sm:text-base">
              Sua pontuação
            </p>
            <p className="gold-text font-display text-5xl sm:text-6xl">
              {score} / {questions.length} pts
            </p>
          </div>
          <button
            type="button"
            onClick={restart}
            className="relative z-10 inline-flex min-h-16 items-center gap-2 rounded-full bg-gradient-to-b from-gold-soft to-gold px-12 py-5 font-display text-2xl uppercase tracking-wider text-stage transition-transform active:scale-95"
          >
            <RotateCcw className="h-6 w-6" /> Jogar novamente
          </button>
        </section>
      )}
    </main>
  );
}
