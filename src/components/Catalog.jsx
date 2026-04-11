import { useState, useMemo } from 'react';
import BookCard from './BookCard';
import SearchAndFilter from './SearchAndFilter';

export default function Catalog({ books, readingList, onToggleReadingList, onSelectBook }) {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title');

  const filtered = useMemo(() => {
    let result = [...books];

    if (genre !== 'All') {
      result = result.filter((b) => b.genre === genre);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'author') return a.author.localeCompare(b.author);
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [books, genre, search, sortBy]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="mb-10">
        <p className="text-ink-500 font-mono text-xs uppercase tracking-widest mb-2">Welcome to</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-parchment-100 leading-tight mb-4">
          The Digital<br />
          <span className="italic text-parchment-400">Archive</span>
        </h1>
        <p className="text-ink-400 font-body text-lg max-w-lg leading-relaxed">
          Discover, borrow, and track thousands of books across every genre. Your next great read is waiting.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 mt-6">
          {[
            { label: 'Books', value: books.length },
            { label: 'Available', value: books.filter(b => b.available).length },
            { label: 'Genres', value: [...new Set(books.map(b => b.genre))].length },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-display text-2xl font-bold text-parchment-300">{value}</p>
              <p className="text-ink-500 text-xs font-mono uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        genre={genre}
        setGenre={setGenre}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={filtered.length}
      />

      {/* Grid */}
      <div className="mt-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-ink-700 mb-4">
              <svg className="mx-auto" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <p className="font-display text-xl text-ink-600 mb-2">No books found</p>
            <p className="text-ink-600 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={onSelectBook}
                onToggleReadingList={onToggleReadingList}
                isInReadingList={readingList.includes(book.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
