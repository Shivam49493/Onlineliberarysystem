import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Catalog' },
  { to: '/reading-list', label: 'Reading List' },
  { to: '/add-book', label: 'Add Book' },
  { to: '/about', label: 'About' },
];

export default function Header({ darkMode, setDarkMode, readingListCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-parchment-100' : 'text-ink-400 hover:text-parchment-100'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-ink-950/90 backdrop-blur-md border-b border-ink-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-parchment-400 flex items-center justify-center group-hover:bg-parchment-300 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#120d0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <span className="font-display text-xl font-semibold text-parchment-100 tracking-tight">
              Librarium
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={linkClass}
              >
                {label === 'Reading List' && readingListCount > 0 ? (
                  <span className="flex items-center gap-1.5">
                    {label}
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-parchment-400 text-ink-950 text-xs font-mono font-bold leading-none">
                      {readingListCount}
                    </span>
                  </span>
                ) : label === 'Add Book' ? (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-800 border border-ink-700 hover:border-parchment-500 transition-colors text-parchment-300 hover:text-parchment-100">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    {label}
                  </span>
                ) : label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg text-ink-400 hover:text-parchment-100 hover:bg-ink-800 transition-colors"
              title="Toggle theme"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <button
              className="md:hidden p-2 rounded-lg text-ink-400 hover:text-parchment-100 hover:bg-ink-800 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-ink-800 animate-fade-in space-y-1">
            {NAV_ITEMS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-parchment-100 bg-ink-800'
                      : 'text-ink-400 hover:text-parchment-100 hover:bg-ink-900'
                  }`
                }
              >
                {label}
                {label === 'Reading List' && readingListCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-parchment-400 text-ink-950 text-xs font-bold">
                    {readingListCount}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
