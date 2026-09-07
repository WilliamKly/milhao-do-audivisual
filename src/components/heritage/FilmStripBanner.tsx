import { cn } from "@/lib/utils";

const FILM_STRIP_SRC = "/images/film-strip-side.png";

type Props = {
  className?: string;
};

/** Static curved film strips on the left and right edges. */
export function FilmStripSides({ className }: Props) {
  return (
    <div className={cn("film-strip-sides pointer-events-none", className)} aria-hidden>
      <img
        src={FILM_STRIP_SRC}
        alt=""
        className="film-strip-sides__img film-strip-sides__left"
        draggable={false}
      />
      <img
        src={FILM_STRIP_SRC}
        alt=""
        className="film-strip-sides__img film-strip-sides__right"
        draggable={false}
      />
    </div>
  );
}
