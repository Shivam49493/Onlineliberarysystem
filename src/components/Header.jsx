import { useState } from 'react';

export default function Header({ view, setView, darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink-950/90 backdrop-blur-md border-b border-ink-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-parchment-400 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#120d0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <span className="font-display text-xl font-semibold text-parchment-100 tracking-tight">
              Librarium
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {['catalog', 'reading-list', 'about'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`nav-link capitalize ${view === v ? 'active text-parchment-100' : 'text-ink-400'}`}
              >
                {v === 'reading-list' ? 'Reading List' : v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg text-ink-400 hover:text-parchment-100 hover:bg-ink-800 transition-colors"
              title="Toggle theme"
              onClick={() => setDarkMode(!darkMode)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </button>
            {/* Mobile menu */}
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
          <div className="md:hidden py-3 border-t border-ink-800 animate-fade-in">
            {['catalog', 'reading-list', 'about'].map((v) => (
              <button
                key={v}
                onClick={() => { setView(v); setMenuOpen(false); }}
                className={`block w-full text-left px-2 py-2.5 text-sm font-medium capitalize rounded-lg transition-colors ${view === v ? 'text-parchment-100 bg-ink-800' : 'text-ink-400 hover:text-parchment-100'}`}
              >
                {v === 'reading-list' ? 'Reading List' : v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
