// Props: none. Site header with the wordmark and nav to Search + Watchlist.
// Your logic connects: nothing here yet. If you later want a watchlist count
// badge, add a `watchlistCount?: number` prop and pass it from the layout.
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Search' },
  { to: '/watchlist', label: 'Watchlist' },
]

export default function Header() {
  return (
    <header className="border-b border-line">
      <div className="shell flex h-16 items-center justify-between gap-8">
        <NavLink to="/" className="font-display text-heading tracking-tight text-paper">
          Tsundoku
        </NavLink>

        <nav className="flex items-center gap-7">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                [
                  'text-meta tracking-wide transition-colors',
                  isActive ? 'text-ember' : 'text-muted hover:text-paper',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
