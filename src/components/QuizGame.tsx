import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Trophy, Sparkles, RotateCcw } from "lucide-react";
import { LETTERS, PRIZES, questions } from "@/data/questions";
import { PrizeLadder } from "@/components/PrizeLadder";
import { Confetti } from "@/components/Confetti";
import * as sfx from "@/lib/game-audio";

type Phase = "intro" | "playing" | "suspense" | "revealed" | "won" | "lost";

const SUSPENSE_MS = 2400;

export function QuizGame() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [muted, setMutedState] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const current = questions[index]!;
  const correct = current.correctAnswer;
  const wonPrize = index > 0 ? PRIZES[index - 1] : null;

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const toggleMute = () => {
    const next = !muted;
    setMutedState(next);
    sfx.setMuted(next);
    if (!next) sfx.initAudio();
  };

  const start = () => {
    sfx.initAudio();
    sfx.setMuted(muted);
    setIndex(0);
    setSelected(null);
    setPhase("playing");
    sfx.playQuestionIn();
  };

  const answer = (i: number) => {
    if (phase !== "playing") return;
    setSelected(i);
    setPhase("suspense");
    sfx.playSelect();
    timers.current.push(
      setTimeout(() => sfx.playSuspense(SUSPENSE_MS / 1000 - 0.2), 220),
    );
    timers.current.push(
      setTimeout(() => {
        sfx.stopSuspense();
        const isRight = i === correct;
        if (isRight) {
          if (index === questions.length - 1) {
            setPhase("won");
            sfx.playVictory();
          } else {
            setPhase("revealed");
            sfx.playCorrect();
          }
        } else {
          setPhase("lost");
          sfx.playWrong();
        }
      }, SUSPENSE_MS),
    );
  };

  const next = () => {
    clearTimers();
    setSelected(null);
    setIndex((i) => i + 1);
    setPhase("playing");
    sfx.playNext();
    timers.current.push(setTimeout(() => sfx.playQuestionIn(), 180));
  };

  const restart = () => {
    clearTimers();
    sfx.stopSuspense();
    setIndex(0);
    setSelected(null);
    setPhase("playing");
    sfx.playQuestionIn();
  };

  const answerState = (i: number) => {
    if (phase === "playing") return "idle";
    if (phase === "suspense") return i === selected ? "selected" : "dim";
    // revealed / won / lost
    if (i === correct) return "correct";
    if (i === selected) return "wrong";
    return "dim";
  };

  const MuteButton = (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={muted ? "Ativar som" : "Desativar som"}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 bg-panel/70 text-gold transition-colors hover:bg-panel"
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </button>
  );

  return (
    <main className="stage-bg stage-rays relative flex min-h-[100dvh] w-full flex-col overflow-hidden">
      {phase === "intro" && (
        <section className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-5 py-10 text-center">
          <div className="absolute right-4 top-4">{MuteButton}</div>
          <p className="animate-rise-in text-xs font-bold uppercase tracking-[0.4em] text-electric">
            Ao vivo · Estúdio da Memória
          </p>
          <h1 className="animate-zoom-in-blur gold-text max-w-4xl font-display text-4xl leading-[1.05] uppercase sm:text-6xl lg:text-7xl">
            Desafio do Patrimônio Audiovisual
          </h1>
          <p className="animate-rise-in max-w-md text-base text-muted-foreground sm:text-xl">
            Você está pronto para chegar ao milhão?
          </p>
          <button
            type="button"
            onClick={start}
            className="animate-glow-breathe mt-2 min-h-14 rounded-full bg-gradient-to-b from-gold-soft to-gold px-12 py-4 font-display text-2xl uppercase tracking-wider text-stage transition-transform active:scale-95 sm:text-3xl"
          >
            Começar
          </button>
          <p className="text-xs text-muted-foreground/80">
            10 perguntas · 10 prêmios · um erro encerra o jogo
          </p>
        </section>
      )}

      {(phase === "playing" ||
        phase === "suspense" ||
        phase === "revealed" ||
        phase === "lost") && (
        <div className="relative z-10 flex flex-1 flex-col gap-3 px-3 py-3 sm:px-5 sm:py-4 lg:flex-row lg:gap-5 lg:px-8">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0">
                <h1 className="gold-text truncate font-display text-base uppercase tracking-wide sm:text-2xl">
                  Desafio do Patrimônio Audiovisual
                </h1>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                  Pergunta {index + 1} de {questions.length}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <div className="rounded-full border border-gold/40 bg-panel/70 px-3 py-1.5 text-right">
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground">
                    Valendo
                  </p>
                  <p className="gold-text font-display text-sm leading-tight sm:text-xl">
                    {current.prize}
                  </p>
                </div>
                {MuteButton}
              </div>
            </header>

            <PrizeLadder currentIndex={index} variant="mobile" />

            <section
              key={`q-${index}`}
              className="panel-glow animate-zoom-in-blur relative flex min-h-[22vh] items-center justify-center rounded-3xl px-4 py-6 text-center sm:px-8 sm:py-8"
            >
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <h2 className="text-balance text-base font-semibold leading-snug sm:text-xl lg:text-2xl">
                {current.question}
              </h2>
            </section>

            <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
              {current.answers.map((text, i) => (
                <button
                  key={`${index}-${i}`}
                  type="button"
                  disabled={phase !== "playing"}
                  data-state={answerState(i)}
                  onClick={() => answer(i)}
                  className="answer-btn animate-rise-in text-sm sm:text-base"
                  style={{ animationDelay: `${0.1 + i * 0.09}s` }}
                >
                  <span className="letter">{LETTERS[i]}</span>
                  <span className="min-w-0 flex-1">{text}</span>
                </button>
              ))}
            </div>

            <div className="flex min-h-14 items-center justify-center pb-1">
              {phase === "suspense" && (
                <p className="animate-glow-breathe font-display text-lg uppercase tracking-[0.3em] text-gold">
                  Suspense…
                </p>
              )}
              {phase === "revealed" && (
                <button
                  type="button"
                  onClick={next}
                  className="animate-rise-in min-h-12 rounded-full bg-gradient-to-b from-gold-soft to-gold px-8 py-3 font-display text-lg uppercase tracking-wider text-stage transition-transform active:scale-95"
                >
                  Próxima pergunta
                </button>
              )}
              {phase === "lost" && (
                <div className="animate-rise-in flex flex-col items-center gap-2 text-center">
                  <p className="font-display text-xl uppercase tracking-widest text-danger">
                    Resposta errada
                  </p>
                  <p className="text-sm text-muted-foreground">
                    A correta era <b className="text-success">{LETTERS[correct]}</b> ·{" "}
                    {wonPrize
                      ? `Você chegou até ${wonPrize}.`
                      : "Você não chegou a marcar prêmio."}
                  </p>
                  <button
                    type="button"
                    onClick={restart}
                    className="mt-1 inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-b from-gold-soft to-gold px-8 py-3 font-display text-lg uppercase tracking-wider text-stage transition-transform active:scale-95"
                  >
                    <RotateCcw className="h-5 w-5" /> Jogar novamente
                  </button>
                </div>
              )}
            </div>
          </div>

          <PrizeLadder currentIndex={index} variant="desktop" />

          {phase === "revealed" && <Confetti count={26} />}
        </div>
      )}

      {phase === "won" && (
        <section className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 px-5 py-10 text-center">
          <Confetti count={90} intense />
          <Trophy className="animate-glow-breathe h-14 w-14 text-gold" />
          <h1 className="animate-zoom-in-blur gold-text font-display text-5xl uppercase sm:text-7xl">
            Parabéns!
          </h1>
          <p className="animate-rise-in font-display text-xl uppercase tracking-[0.2em] text-electric sm:text-3xl">
            Você chegou ao milhão!
          </p>
          <div className="animate-glow-breathe panel-glow rounded-3xl px-8 py-5">
            <p className="gold-text font-display text-3xl sm:text-5xl">
              R$ 1.000.000
            </p>
          </div>
          <button
            type="button"
            onClick={restart}
            className="relative z-10 inline-flex min-h-14 items-center gap-2 rounded-full bg-gradient-to-b from-gold-soft to-gold px-10 py-4 font-display text-xl uppercase tracking-wider text-stage transition-transform active:scale-95"
          >
            <Sparkles className="h-5 w-5" /> Jogar novamente
          </button>
        </section>
      )}
    </main>
  );
}
