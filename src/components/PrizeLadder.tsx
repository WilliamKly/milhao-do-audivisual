import { PRIZES } from "@/data/questions";

type Props = { currentIndex: number; variant: "desktop" | "mobile" };

export function PrizeLadder({ currentIndex, variant }: Props) {
  const rows = PRIZES.map((prize, i) => ({ prize, i })).reverse();

  if (variant === "mobile") {
    return (
      <div className="lg:hidden -mx-3 overflow-x-auto px-3 pb-1">
        <div className="flex min-w-max items-center gap-1.5">
          {PRIZES.map((prize, i) => {
            const state =
              i < currentIndex ? "done" : i === currentIndex ? "current" : "todo";
            return (
              <div key={prize} data-state={state} className="ladder-chip">
                {prize.replace("R$ ", "")}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col gap-1.5 rounded-2xl border border-gold/30 bg-panel/70 p-3 shadow-stage backdrop-blur">
      <p className="mb-1 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80">
        Escada de Prêmios
      </p>
      {rows.map(({ prize, i }) => {
        const state =
          i < currentIndex ? "done" : i === currentIndex ? "current" : "todo";
        return (
          <div key={prize} data-state={state} className="ladder-row">
            <span className="text-xs opacity-70">{i + 1}</span>
            <span className="font-semibold tabular-nums">{prize}</span>
          </div>
        );
      })}
    </aside>
  );
}
