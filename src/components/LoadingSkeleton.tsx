// Props: count (default 10). Placeholder cards in the same grid as AnimeGrid,
// so nothing jumps when the real results land.
// Your logic connects: render this instead of <AnimeGrid> while your request
// is in flight.

type LoadingSkeletonProps = {
  count?: number
}

export default function LoadingSkeleton({ count = 10 }: LoadingSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading results"
      className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[2/3] rounded-xs bg-surface" />
          <div className="mt-3 h-3 w-4/5 rounded-xs bg-surface" />
          <div className="mt-2.5 h-2.5 w-2/5 rounded-xs bg-surface" />
        </div>
      ))}
    </div>
  )
}
