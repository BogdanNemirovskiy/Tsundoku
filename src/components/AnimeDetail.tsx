// Props: anime, isInWatchlist, onToggle. Full layout for one anime — poster
// rail, title block, stats, synopsis, genres. Everything arrives via props.
// Your logic connects: DetailPage fetches by id and passes the result here,
// along with the same watchlist predicate/handler the cards use.
import type { Anime } from '../types'

type AnimeDetailProps = {
  anime: Anime
  isInWatchlist: boolean
  onToggle: (anime: Anime) => void
}

type StatProps = {
  label: string
  value: string
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="border-t border-line pt-3">
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-1.5 font-display text-lead text-paper">{value}</dd>
    </div>
  )
}

export default function AnimeDetail({ anime, isInWatchlist, onToggle }: AnimeDetailProps) {
  const heading = anime.title_english ?? anime.title
  const showOriginal = anime.title_english != null && anime.title_english !== anime.title

  return (
    <article className="grid gap-10 lg:grid-cols-[var(--spacing-rail)_1fr] lg:gap-14">
      <div className="mx-auto w-48 lg:sticky lg:top-10 lg:mx-0 lg:w-full lg:self-start">
        <img
          src={anime.images.jpg.large_image_url}
          alt={`Poster for ${heading}`}
          className="w-full rounded-xs bg-surface object-cover"
        />

        <button
          type="button"
          onClick={() => onToggle(anime)}
          aria-pressed={isInWatchlist}
          className={[
            'mt-4 flex w-full items-center justify-center gap-2 rounded-xs border px-4 py-3 text-meta transition-colors',
            isInWatchlist
              ? 'border-ember bg-ember text-void hover:bg-ember-dim hover:border-ember-dim'
              : 'border-line-bright text-paper hover:border-ember hover:text-ember',
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
          {isInWatchlist ? 'In watchlist' : 'Add to watchlist'}
        </button>
      </div>

      <div className="min-w-0">
        <p className="eyebrow">
          {anime.type ?? 'Unknown'}
          <span className="mx-2 text-line-bright">/</span>
          {anime.year ?? '—'}
          {anime.rank != null && (
            <>
              <span className="mx-2 text-line-bright">/</span>Ranked #{anime.rank}
            </>
          )}
        </p>

        <h1 className="mt-3 font-display text-title text-paper sm:text-display">{heading}</h1>
        {showOriginal && <p className="mt-2 text-lead text-muted italic">{anime.title}</p>}

        {anime.score != null && (
          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-display text-display text-ember">{anime.score.toFixed(2)}</span>
            {anime.scored_by != null && (
              <span className="text-meta text-faint">
                {anime.scored_by.toLocaleString()} ratings
              </span>
            )}
          </div>
        )}

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
          <Stat label="Episodes" value={anime.episodes != null ? String(anime.episodes) : '—'} />
          <Stat label="Status" value={anime.status ?? '—'} />
          <Stat label="Duration" value={anime.duration ?? '—'} />
        </dl>

        {anime.synopsis && (
          <section className="mt-12">
            <h2 className="eyebrow">Synopsis</h2>
            <p className="mt-4 max-w-prose text-lead text-muted">{anime.synopsis}</p>
          </section>
        )}

        {anime.genres.length > 0 && (
          <section className="mt-12">
            <h2 className="eyebrow">Genres</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <li
                  key={genre.mal_id}
                  className="rounded-xs border border-line px-3 py-1.5 text-meta text-muted"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {anime.studios.length > 0 && (
          <section className="mt-12">
            <h2 className="eyebrow">Studio</h2>
            <p className="mt-3 text-body text-paper">
              {anime.studios.map((studio) => studio.name).join(', ')}
            </p>
          </section>
        )}
      </div>
    </article>
  )
}
