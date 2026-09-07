import { useMemo } from "react";

type Props = { count?: number; intense?: boolean; burst?: boolean };

export function Confetti({ count = 40, intense = false, burst = false }: Props) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: burst ? 35 + Math.random() * 30 : Math.random() * 100,
        delay: Math.random() * (intense ? 2.8 : burst ? 0.6 : 1.2),
        duration: burst ? 1.8 + Math.random() * 1.4 : 2.2 + Math.random() * 2.2,
        size: burst ? 10 + Math.random() * 14 : 6 + Math.random() * 8,
        rotate: Math.random() * 360,
        tone: i % 4,
        drift: (Math.random() - 0.5) * (burst ? 280 : 120),
      })),
    [count, intense, burst],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          data-tone={p.tone}
          data-burst={burst ? "true" : undefined}
          style={{
            left: burst ? "50%" : `${p.left}%`,
            top: burst ? "42%" : undefined,
            width: p.size,
            height: p.size * (burst ? 1.2 : 1.6),
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
