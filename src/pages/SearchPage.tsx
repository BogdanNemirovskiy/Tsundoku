// Props: none. Composition only — search bar, result count, then one of
// skeleton / error / empty / grid. All four branches are laid out below so you
// can see each one; swap the flags for real state.
import AnimeGrid from '../components/AnimeGrid'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSkeleton from '../components/LoadingSkeleton'
import SearchBar from '../components/SearchBar'
import { mockAnime } from '../mockData'

export default function SearchPage() {
  // TODO: your query state lives here.
  //   const [query, setQuery] = useState('')
  const query = ''

  // TODO: debounce `query` (setTimeout in a useEffect, or a useDebounce hook
  // you write), then fetch https://api.jikan.moe/v4/anime?q=<debounced>&limit=20
  // in a useEffect keyed on the debounced value. Abort the previous request
  // with an AbortController so out-of-order responses can't overwrite newer
  // ones, and remember Jikan rate-limits to ~3 req/sec.
  //   const [results, setResults] = useState<Anime[]>([])
  //   const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'done'>('idle')
  //   const [error, setError] = useState<string | null>(null)
  const results = mockAnime
  const isLoading = false
  const error: string | null = null

  // TODO: your watchlist lives above this page (Context, or lifted into App)
  // so SearchPage and WatchlistPage share it. Replace these two.
  const isInWatchlist = () => false
  const onToggle = () => {}

  return (
    <div className="shell py-10 sm:py-14">
      <div className="max-w-2xl">
        <SearchBar
          value={query}
          onChange={() => {
            // TODO: setQuery(value)
          }}
          autoFocus
        />
      </div>

      <div className="mt-12">
        {/* TODO: replace this ladder with your real status checks. */}
        {isLoading ? (
          <LoadingSkeleton count={10} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => {}} />
        ) : results.length === 0 ? (
          <EmptyState
            title={query ? 'No matches' : 'Start typing'}
            message={
              query
                ? `Nothing came back for “${query}”. Try a shorter or romanised title.`
                : 'Search the Jikan catalogue by title and save anything worth watching later.'
            }
          />
        ) : (
          <>
            <p className="eyebrow mb-6">
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>
            <AnimeGrid items={results} isInWatchlist={isInWatchlist} onToggle={onToggle} />
          </>
        )}
      </div>
    </div>
  )
}
