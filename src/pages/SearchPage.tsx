// Props: none. Composition only — search bar, result count, then one of
// skeleton / error / empty / grid. All four branches are laid out below so you
// can see each one; swap the flags for real state.
import { useEffect, useState } from 'react'
import AnimeGrid from '../components/AnimeGrid'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSkeleton from '../components/LoadingSkeleton'
import SearchBar from '../components/SearchBar'
import { mockAnime } from '../mockData'
import type { Anime } from '../types'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [retryToken, setRetryToken] = useState(0)
  const [results, setResults] = useState<Anime[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'done'>('idle')
  const [error, setError] = useState<string | null>(null)
  const isLoading = status === 'loading'

  // TODO: your watchlist lives above this page (Context, or lifted into App)
  // so SearchPage and WatchlistPage share it. Replace these two.
  const [watchlist, setWatchlist] = useState<Anime[]>(() => {
    const stored = localStorage.getItem('watchlist')
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed : []
  })

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const isInWatchlist = (anime: Anime) => watchlist.some((a) => a.mal_id === anime.mal_id)
  const onToggle = (anime: Anime) => {
    setWatchlist((prev) =>
      prev.some((a) => a.mal_id === anime.mal_id)
        ? prev.filter((a) => a.mal_id !== anime.mal_id)
        : [...prev, anime]
    )
  }

  useEffect(() => {
    console.log('[search] query changed:', query)
    const timeout = setTimeout(() => {
      console.log('[search] debounce elapsed, searching for:', query)
      setDebouncedQuery(query)
    }, 400)
    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    const controller = new AbortController()
    console.log('[search] fetch started for:', debouncedQuery || '(trending)')
    setStatus('loading')
    setError(null)

    fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        query: `query ($search: String, $sort: [MediaSort]) {
  Page(page: 1, perPage: 20) {
    media(search: $search, type: ANIME, sort: $sort) {
          id idMal
          title { romaji english }
          coverImage { large extraLarge }
          seasonYear format episodes status duration
          averageScore popularity
          description
          genres
          studios { nodes { id name } }
        }
      }
    }`,
        variables: {
          search: debouncedQuery || undefined,
          sort: debouncedQuery ? undefined : ['TRENDING_DESC'],
        }
      })
    })
      .then(r => {
        console.log('[search] response received, status:', r.status)
        return r.json()
      })
      .then(d => {
        console.log('[search] raw response body:', d)

        const mapped = d.data.Page.media.map((m: any) => ({
          mal_id: m.idMal,
          title: m.title.romaji,
          title_english: m.title.english,
          images: { jpg: { image_url: m.coverImage.large, large_image_url: m.coverImage.extraLarge } },
          year: m.seasonYear,
          type: m.format,
          score: m.averageScore,
          scored_by: m.popularity,
          rank: null,
          episodes: m.episodes,
          status: m.status,
          duration: m.duration ? `${m.duration} min` : null,
          synopsis: m.description,
          genres: m.genres.map((g: string) => ({ mal_id: 0, name: g })),
          studios: m.studios.nodes.map((s: any) => ({ mal_id: s.id, name: s.name })),
        }))
        console.log('[search] mapped to Anime[]:', mapped)

        setResults(mapped)
        setStatus('done')
        console.log('[search] done, result count:', mapped.length)
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('[search] fetch aborted (superseded by a newer search)')
          return
        }
        console.error('[search] fetch failed:', err)
        setError(err.message ?? 'Something went wrong')
        setStatus('error')
      })

    return () => {
      console.log('[search] cleanup: aborting fetch for:', debouncedQuery)
      controller.abort()
    }
  }, [debouncedQuery, retryToken])

  return (
    <div className="shell py-10 sm:py-14">
      <div className="max-w-2xl">
        <SearchBar
          value={query}
          onChange={(value) => setQuery(value)}
          autoFocus
        />
      </div>

      <div className="mt-12">
        {/* TODO: replace this ladder with your real status checks. */}
        {isLoading ? (
          <LoadingSkeleton count={10} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => setRetryToken((n) => n + 1)} />
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
