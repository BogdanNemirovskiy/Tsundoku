// Props: message, optional title and onRetry.
// Your logic connects: render it when your fetch rejects or the API returns a
// non-OK status; wire `onRetry` to whatever re-runs that request.

type ErrorMessageProps = {
  message: string
  title?: string
  onRetry?: () => void
}

export default function ErrorMessage({
  message,
  title = 'Something went wrong',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div role="alert" className="border-l-2 border-ember py-6 pl-6">
      <p className="eyebrow text-ember">Error</p>
      <h2 className="mt-2 font-display text-heading text-paper">{title}</h2>
      <p className="mt-2 max-w-prose text-body text-muted">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 border border-line-bright px-4 py-2 text-meta text-paper transition-colors hover:border-ember hover:text-ember"
        >
          Try again
        </button>
      )}
    </div>
  )
}
