// Props: none. Composition only — heading, count, then grid or empty state.
import { Link } from 'react-router-dom'
import AnimeGrid from '../components/AnimeGrid'
import EmptyState from '../components/EmptyState'
import { mockAnime } from '../mockData'

export default function WatchlistPage() {
  // TODO: read the shared watchlist here — whatever SearchPage and DetailPage
  // write to (Context, a store, or state lifted into App). Persistence to
  // localStorage belongs in that shared layer, not in this page.
  //   const { watchlist, toggle } = useWatchlist()
  const watchlist = mockAnime.slice(0, 4)
  const onToggle = () => {}

  return (
    <div className="shell py-10 sm:py-14">
      <header className="flex items-baseline justify-between gap-6 border-b border-line pb-6">
        <h1 className="font-display text-title text-paper">Watchlist</h1>
        <p className="eyebrow">
          {watchlist.length} {watchlist.length === 1 ? 'title' : 'titles'}
        </p>
      </header>

      <div className="mt-12">
        {watchlist.length === 0 ? (
          <EmptyState
            title="Nothing saved yet"
            message="Anything you save from search shows up here, poster and all."
          >
            <Link
              to="/"
              className="inline-block border border-line-bright px-5 py-2.5 text-meta text-paper transition-colors hover:border-ember hover:text-ember"
            >
              Go to search
            </Link>
          </EmptyState>
        ) : (
          // TODO: everything here is in the watchlist by definition, so the
          // predicate is always true and the toggle always removes.
          <AnimeGrid items={watchlist} isInWatchlist={() => true} onToggle={onToggle} />
        )}
      </div>
    </div>
  )
}
