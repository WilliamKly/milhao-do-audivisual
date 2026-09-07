import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

const sketch = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function VhsTape({ title = "Fita VHS", className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden={!title} {...props}>
      {title ? <title>{title}</title> : null}
      <rect x="8" y="14" width="104" height="52" rx="6" {...sketch} />
      <rect x="18" y="24" width="84" height="32" rx="4" {...sketch} />
      <circle cx="38" cy="40" r="10" {...sketch} />
      <circle cx="82" cy="40" r="10" {...sketch} />
      <circle cx="38" cy="40" r="3" fill="currentColor" stroke="none" opacity="0.7" />
      <circle cx="82" cy="40" r="3" fill="currentColor" stroke="none" opacity="0.7" />
      <path d="M14 20h8M98 20h8M14 60h8M98 60h8" {...sketch} opacity="0.6" />
      <path d="M48 18v-4h24v4" {...sketch} />
    </svg>
  );
}

export function FilmStrip({ title = "Fita de filme", className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 140 72" className={className} aria-hidden={!title} {...props}>
      {title ? <title>{title}</title> : null}
      <rect x="6" y="10" width="128" height="52" rx="3" {...sketch} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={14 + i * 15} y="4" width="8" height="8" rx="1" {...sketch} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={`b-${i}`} x={14 + i * 15} y="60" width="8" height="8" rx="1" {...sketch} />
      ))}
      <rect x="24" y="18" width="28" height="36" rx="2" {...sketch} opacity="0.85" />
      <rect x="56" y="18" width="28" height="36" rx="2" {...sketch} opacity="0.85" />
      <rect x="88" y="18" width="28" height="36" rx="2" {...sketch} opacity="0.85" />
      <path d="M30 28h16M30 34h12M62 26h14M62 32h10M94 30h12" {...sketch} opacity="0.45" />
    </svg>
  );
}

export function FilmCamera({ title = "Câmera de filme", className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden={!title} {...props}>
      {title ? <title>{title}</title> : null}
      <rect x="28" y="30" width="58" height="38" rx="6" {...sketch} />
      <path d="M86 38l18-10v40l-18-10" {...sketch} />
      <circle cx="57" cy="49" r="14" {...sketch} />
      <circle cx="57" cy="49" r="8" {...sketch} opacity="0.7" />
      <circle cx="57" cy="49" r="3" fill="currentColor" stroke="none" opacity="0.8" />
      <rect x="34" y="36" width="10" height="6" rx="1" {...sketch} opacity="0.6" />
      <path d="M38 22h20l4 8H34z" {...sketch} />
      <circle cx="22" cy="24" r="12" {...sketch} />
      <circle cx="22" cy="24" r="4" {...sketch} />
      <path d="M22 12v4M22 32v4M10 24h4M30 24h4" {...sketch} opacity="0.5" />
      <path d="M14 68h52" {...sketch} opacity="0.4" />
    </svg>
  );
}

export function FilmReel({ title = "Rolo de filme", className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 88 88" className={className} aria-hidden={!title} {...props}>
      {title ? <title>{title}</title> : null}
      <circle cx="44" cy="44" r="32" {...sketch} />
      <circle cx="44" cy="44" r="22" {...sketch} opacity="0.75" />
      <circle cx="44" cy="44" r="8" {...sketch} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 44 + Math.cos(a) * 10;
        const y1 = 44 + Math.sin(a) * 10;
        const x2 = 44 + Math.cos(a) * 30;
        const y2 = 44 + Math.sin(a) * 30;
        return <path key={i} d={`M${x1} ${y1}L${x2} ${y2}`} {...sketch} opacity="0.55" />;
      })}
      <path d="M44 12v8M44 68v8M12 44h8M68 44h8" {...sketch} opacity="0.45" />
    </svg>
  );
}

export function RetroTv({ title = "Televisão retrô", className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 110 90" className={className} aria-hidden={!title} {...props}>
      {title ? <title>{title}</title> : null}
      <rect x="14" y="18" width="72" height="52" rx="8" {...sketch} />
      <rect x="22" y="26" width="56" height="36" rx="4" {...sketch} opacity="0.75" />
      <path d="M38 44h34M38 50h22" {...sketch} opacity="0.45" />
      <circle cx="92" cy="36" r="3" fill="currentColor" stroke="none" opacity="0.6" />
      <path d="M30 70h44M44 70v10M60 70v10" {...sketch} />
      <path d="M18 14c8-6 18-8 28-6" {...sketch} opacity="0.35" />
    </svg>
  );
}

export function CassetteTape({ title = "Fita cassete", className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 120 76" className={className} aria-hidden={!title} {...props}>
      {title ? <title>{title}</title> : null}
      <rect x="8" y="12" width="104" height="52" rx="5" {...sketch} />
      <rect x="20" y="22" width="80" height="32" rx="3" {...sketch} />
      <circle cx="42" cy="38" r="9" {...sketch} />
      <circle cx="78" cy="38" r="9" {...sketch} />
      <rect x="52" y="30" width="16" height="16" rx="2" {...sketch} opacity="0.7" />
      <path d="M12 18h6M102 18h6" {...sketch} opacity="0.5" />
    </svg>
  );
}

type DecorVariant = "intro" | "game" | "finished";

type DecorItem = {
  Illustration: typeof VhsTape;
  className: string;
  delay?: string;
};

const DECOR: Record<DecorVariant, DecorItem[]> = {
  intro: [
    { Illustration: VhsTape, className: "heritage-item heritage-pos-tl", delay: "0s" },
    { Illustration: FilmCamera, className: "heritage-item heritage-pos-tr", delay: "0.8s" },
    { Illustration: FilmStrip, className: "heritage-item heritage-pos-bl", delay: "1.4s" },
    { Illustration: FilmReel, className: "heritage-item heritage-pos-br", delay: "0.4s" },
    { Illustration: RetroTv, className: "heritage-item heritage-pos-left hidden md:block", delay: "1s" },
    { Illustration: CassetteTape, className: "heritage-item heritage-pos-right hidden md:block", delay: "1.6s" },
  ],
  game: [
    { Illustration: FilmStrip, className: "heritage-item heritage-pos-tl-sm", delay: "0s" },
    { Illustration: VhsTape, className: "heritage-item heritage-pos-tr-sm", delay: "0.6s" },
    { Illustration: FilmReel, className: "heritage-item heritage-pos-bl-sm hidden sm:block", delay: "1.2s" },
    { Illustration: FilmCamera, className: "heritage-item heritage-pos-br-sm hidden lg:block", delay: "0.3s" },
  ],
  finished: [
    { Illustration: FilmCamera, className: "heritage-item heritage-pos-tl", delay: "0s" },
    { Illustration: FilmReel, className: "heritage-item heritage-pos-tr", delay: "0.5s" },
    { Illustration: VhsTape, className: "heritage-item heritage-pos-bl", delay: "1s" },
    { Illustration: RetroTv, className: "heritage-item heritage-pos-br", delay: "1.5s" },
  ],
};

export function HeritageDecor({ variant }: { variant: DecorVariant }) {
  return (
    <div className="heritage-decor pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {DECOR[variant].map(({ Illustration, className, delay }, i) => (
        <div
          key={`${variant}-${i}`}
          className={className}
          style={{ animationDelay: delay }}
        >
          <Illustration className="heritage-sketch h-full w-full" />
        </div>
      ))}
    </div>
  );
}
