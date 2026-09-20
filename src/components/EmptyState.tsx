// Props: title, optional message and children (for an action, e.g. a Link).
// Your logic connects: render it when a search returns zero results, when the
// query is still empty, or when the watchlist has nothing in it.
import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  message?: string
  children?: ReactNode
}

export default function EmptyState({ title, message, children }: EmptyStateProps) {
  return (
    <div className="py-section text-center">
      <h2 className="font-display text-title text-paper">{title}</h2>
      {message && <p className="mx-auto mt-3 max-w-md text-body text-muted">{message}</p>}
      {children && <div className="mt-7">{children}</div>}
    </div>
  )
}
