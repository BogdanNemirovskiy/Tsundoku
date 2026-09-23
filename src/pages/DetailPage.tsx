// Props: none. Composition only — back link, then skeleton / error / detail.
import { Link } from 'react-router-dom'
import AnimeDetail from '../components/AnimeDetail'
import ErrorMessage from '../components/ErrorMessage'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { Anime } from '../types'

export default function DetailPage() {
  // TODO: read the route param.
  const { id } = useParams<{ id: string }>()

  // TODO: fetch https://api.jikan.moe/v4/anime/<id> in a useEffect keyed on
  // `id`, and read the `data` object off the response. Handle the 404 Jikan
  // returns for unknown ids separately from a network failure.
  const [anime, setAnime] = useState<Anime | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    console.log('[detail] fetch started for id:', id)
    setIsLoading(true)
    setError(null)

    fetch(`https://api.jikan.moe/v4/anime/${id}`, { signal: controller.signal })
      .then(r => {
        console.log('[detail] response received, status:', r.status)
        if (r.status === 404) {
          throw new Error('NOT_FOUND')
        }
        if (!r.ok) {
          throw new Error(`Request failed: ${r.status}`)
        }
        return r.json()
      })
      .then(d => {
        console.log('[detail] raw response body:', d)
        setAnime(d.data)
        setIsLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('[detail] fetch aborted (superseded by a newer id)')
          return
        }
        if (err.message === 'NOT_FOUND') {
          console.error('[detail] anime not found for id:', id)
          setError(`No anime found with id "${id}".`)
        } else {
          console.error('[detail] fetch failed:', err)
          setError(err.message ?? 'Something went wrong')
        }
        setIsLoading(false)
      })

    return () => {
      console.log('[detail] cleanup: aborting fetch for id:', id)
      controller.abort()
    }
  }, [id])



  // TODO: same shared watchlist as SearchPage.
  const isInWatchlist = false
  const onToggle = () => { }

  return (
    <div className="shell py-10 sm:py-14">
      <Link to="/" className="eyebrow transition-colors hover:text-ember">
        &larr; Back to search
      </Link>

      <div className="mt-10">
        {isLoading ? (
          // TODO: this is a placeholder shimmer — swap it for whatever detail
          // skeleton you want, or drop it and render nothing while loading.
          <div className="grid animate-pulse gap-10 lg:grid-cols-[var(--spacing-rail)_1fr] lg:gap-14">
            <div className="aspect-[2/3] w-48 rounded-xs bg-surface lg:w-full" />
            <div className="space-y-4">
              <div className="h-10 w-2/3 rounded-xs bg-surface" />
              <div className="h-4 w-1/3 rounded-xs bg-surface" />
              <div className="h-32 w-full rounded-xs bg-surface" />
            </div>
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => { }} />
        ) : !anime ? null : (
          <AnimeDetail anime={anime} isInWatchlist={isInWatchlist} onToggle={onToggle} />
        )}
      </div>
    </div>
  )
}
