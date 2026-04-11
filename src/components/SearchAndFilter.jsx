import { GENRES } from '../data/books';

export default function SearchAndFilter({ search, setSearch, genre, setGenre, sortBy, setSortBy, totalResults }) {
  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search by title, author, or keyword..."
          className="input-dark pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300 transition-colors"
            onClick={() => setSearch('')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Genre pills */}
        <div className="flex flex-wrap gap-2 flex-1">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                genre === g
                  ? 'bg-parchment-400 text-ink-950 shadow-sm'
                  : 'bg-ink-900 text-ink-400 border border-ink-700 hover:border-ink-500 hover:text-ink-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          className="input-dark w-auto text-xs py-1.5 pr-8"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Sort: Title</option>
          <option value="author">Sort: Author</option>
          <option value="year">Sort: Year</option>
          <option value="rating">Sort: Rating</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-ink-500 text-xs font-mono">
        {totalResults} {totalResults === 1 ? 'book' : 'books'} found
        {genre !== 'All' && ` in ${genre}`}
        {search && ` matching "${search}"`}
      </p>
    </div>
  );
}
