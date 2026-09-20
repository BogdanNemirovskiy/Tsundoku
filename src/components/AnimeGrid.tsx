// Props: items, isInWatchlist(anime), onToggle(anime). Renders the responsive
// poster grid — 2 columns on mobile, up to 5 on desktop.
// Your logic connects: pass the array you fetched (or your watchlist array),
// and a predicate that answers "is this one saved?" from your state.
import type { Anime } from '../types'
import AnimeCard from './AnimeCard'

type AnimeGridProps = {
  items: Anime[]
  isInWatchlist: (anime: Anime) => boolean
  onToggle: (anime: Anime) => void
}

export default function AnimeGrid({ items, isInWatchlist, onToggle }: AnimeGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((anime) => (
        <li key={anime.mal_id}>
          <AnimeCard anime={anime} isInWatchlist={isInWatchlist(anime)} onToggle={onToggle} />
        </li>
      ))}
    </ul>
  )
}
