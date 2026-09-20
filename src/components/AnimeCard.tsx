// Props: anime, isInWatchlist, onToggle. Poster, title, year/type meta, score,
// and a watchlist toggle. No state — the parent decides what `isInWatchlist`
// means and what `onToggle` does.
// Your logic connects: pass `isInWatchlist` from your watchlist state and
// `onToggle` from the handler that adds/removes the anime.
import { Link } from 'react-router-dom'
import type { Anime } from '../types'

type AnimeCardProps = {
  anime: Anime
  isInWatchlist: boolean
  onToggle: (anime: Anime) => void
}

export default function AnimeCard({ anime, isInWatchlist, onToggle }: AnimeCardProps) {
  return (
    <article className="group relative">
      <Link to={`/anime/${anime.mal_id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xs bg-surface">
          <img
            src={anime.images.jpg.image_url}
            alt=""
            loading="lazy"
            className="size-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-110"
          />
          {/* BS: bottom scrim only — keeps the score legible on pale posters. */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void/85 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {anime.score != null && (
            <span className="absolute bottom-2 left-2 font-display text-meta text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {anime.score.toFixed(2)}
            </span>
          )}
        </div>

        <h3 className="mt-3 line-clamp-2 text-body font-medium text-paper transition-colors group-hover:text-ember">
          {anime.title}
        </h3>

        <p className="eyebrow mt-1.5">
          {anime.year ?? '—'}
          <span className="mx-1.5 text-line-bright">/</span>
          {anime.type ?? 'Unknown'}
        </p>
      </Link>

      {/* Sibling of the Link, not a child — avoids a button inside an anchor. */}
      <button
        type="button"
        onClick={() => onToggle(anime)}
        aria-pressed={isInWatchlist}
        aria-label={isInWatchlist ? `Remove ${anime.title} from watchlist` : `Add ${anime.title} to watchlist`}
        title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        className={[
          'absolute top-2 right-2 grid size-8 place-items-center rounded-xs border backdrop-blur-[2px] transition',
          isInWatchlist
            ? 'border-ember/60 bg-void/70 text-ember'
            : 'border-line-bright/70 bg-void/60 text-paper opacity-0 group-hover:opacity-100 hover:border-paper/40 focus-visible:opacity-100',
        ].join(' ')}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
          <path
            d="M6 3.5h12v17l-6-4.2-6 4.2z"
            fill={isInWatchlist ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </article>
  )
}
