import { PRIZES } from "@/data/questions";

type QuestionResult = "correct" | "wrong" | null;

type Props = {
  currentIndex: number;
  results: QuestionResult[];
  phase: "playing" | "suspense" | "revealed" | "wrongRevealed";
  variant: "desktop" | "mobile";
};

function rowState(
  i: number,
  currentIndex: number,
  results: QuestionResult[],
  phase: Props["phase"],
): "todo" | "current" | "correct" | "wrong" {
  if (results[i] === "correct") return "correct";
  if (results[i] === "wrong") return "wrong";
  if (i === currentIndex && (phase === "playing" || phase === "suspense")) return "current";
  return "todo";
}

export function PrizeLadder({ currentIndex, results, phase, variant }: Props) {
  const rows = PRIZES.map((prize, i) => ({ prize, i })).reverse();

  if (variant === "mobile") {
    return (
      <div className="lg:hidden -mx-3 overflow-x-auto px-3 pb-1">
        <div className="flex min-w-max items-center gap-2">
          {PRIZES.map((prize, i) => {
            const state = rowState(i, currentIndex, results, phase);
            return (
              <div key={prize} data-state={state} className="ladder-chip">
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col gap-2 rounded-2xl border border-gold/30 bg-panel/70 p-4 shadow-stage backdrop-blur">
      <p className="mb-1 text-center text-sm font-bold uppercase tracking-[0.2em] text-gold/80">
        Escada de Pontos
      </p>
      {rows.map(({ prize, i }) => {
        const state = rowState(i, currentIndex, results, phase);
        return (
          <div key={prize} data-state={state} className="ladder-row">
            <span className="text-sm opacity-70">{i + 1}</span>
            <span className="font-semibold tabular-nums">{prize}</span>
          </div>
        );
      })}
    </aside>
  );
}
