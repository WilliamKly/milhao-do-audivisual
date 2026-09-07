import { useMemo } from "react";

type Props = { count?: number; intense?: boolean };

export function Confetti({ count = 40, intense = false }: Props) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * (intense ? 2.5 : 1.2),
        duration: 2.2 + Math.random() * 2.2,
        size: 6 + Math.random() * 8,
        rotate: Math.random() * 360,
        tone: i % 3,
      })),
    [count, intense],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          data-tone={p.tone}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.6,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
