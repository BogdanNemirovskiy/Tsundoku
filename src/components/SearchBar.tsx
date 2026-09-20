// Props: value, onChange, plus optional placeholder / autoFocus.
// Fully controlled — it holds no state of its own.
// Your logic connects: SearchPage owns the query state and passes it down;
// debouncing and fetching live there too, never in here.

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search anime…',
  autoFocus = false,
}: SearchBarProps) {
  return (
    <div className="group relative">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 size-[18px] -translate-y-1/2 text-faint transition-colors group-focus-within:text-ember"
      >
        <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search anime"
        className="w-full border-b border-line bg-transparent py-4 pr-4 pl-8 font-display text-title text-paper transition-colors outline-none placeholder:text-faint focus:border-ember"
      />
    </div>
  )
}
