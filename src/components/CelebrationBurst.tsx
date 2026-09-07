import { useMemo, type CSSProperties } from "react";

type Props = { active?: boolean };

export function CelebrationBurst({ active = true }: Props) {
  const sparks = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        angle: (360 / 24) * i + Math.random() * 12,
        distance: 120 + Math.random() * 180,
        delay: Math.random() * 0.15,
        size: 8 + Math.random() * 14,
        tone: i % 4,
      })),
    [],
  );

  if (!active) return null;

  return (
    <div className="celebration-burst pointer-events-none absolute inset-0 overflow-hidden">
      <div className="celebration-flash" />
      {sparks.map((s) => (
        <span
          key={s.id}
          className="celebration-spark"
          data-tone={s.tone}
          style={
            {
              "--burst-angle": `${s.angle}deg`,
              "--burst-distance": `${s.distance}px`,
              "--burst-delay": `${s.delay}s`,
              width: s.size,
              height: s.size,
            } as CSSProperties
          }
        />
      ))}
      <p className="celebration-banner animate-zoom-in-blur">Acertou!</p>
    </div>
  );
}
