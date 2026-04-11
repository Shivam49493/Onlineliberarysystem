import BookCover from './BookCover';
import StarRating from './StarRating';

export default function ReadingList({ books, readingList, onToggleReadingList, onSelectBook }) {
  const savedBooks = books.filter((b) => readingList.includes(b.id));

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="text-ink-500 font-mono text-xs uppercase tracking-widest mb-2">Your</p>
        <h1 className="font-display text-4xl font-bold text-parchment-100 mb-2">
          Reading List
        </h1>
        <p className="text-ink-400 text-sm font-body">
          {savedBooks.length === 0
            ? 'No books saved yet.'
            : `${savedBooks.length} ${savedBooks.length === 1 ? 'book' : 'books'} saved`}
        </p>
      </div>

      {savedBooks.length === 0 ? (
        <div className="text-center py-20 border border-ink-800 rounded-2xl">
          <div className="text-ink-700 mb-4">
            <svg className="mx-auto" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <p className="font-display text-xl text-ink-600 mb-2">Your reading list is empty</p>
          <p className="text-ink-600 text-sm">Browse the catalog and save books you want to read</p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedBooks.map((book, i) => (
            <div
              key={book.id}
              className="flex gap-4 bg-ink-900 border border-ink-800 rounded-xl p-4 cursor-pointer
                hover:border-ink-600 transition-all duration-200 group animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => onSelectBook(book)}
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-8 flex items-center justify-center">
                <span className="font-mono text-ink-600 text-sm font-medium">{String(i + 1).padStart(2, '0')}</span>
              </div>

              {/* Cover */}
              <div className="flex-shrink-0">
                <BookCover book={book} size="sm" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-display text-parchment-100 font-semibold text-base leading-tight truncate group-hover:text-parchment-300 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-ink-400 text-sm mt-0.5">{book.author}</p>
                  </div>
                  <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-mono ${
                    book.available
                      ? 'bg-forest-700/40 text-green-400 border border-forest-600/40'
                      : 'bg-ink-800 text-ink-500 border border-ink-700'
                  }`}>
                    {book.available ? 'Available' : 'Out'}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <StarRating rating={book.rating} />
                  <span className="genre-pill">{book.genre}</span>
                  <span className="text-ink-600 text-xs font-mono">{book.pages}p</span>
                </div>

                <p className="text-ink-500 text-xs mt-2 line-clamp-1">{book.description}</p>
              </div>

              {/* Remove button */}
              <button
                className="flex-shrink-0 self-center p-2 rounded-lg text-ink-600 hover:text-crimson-400 hover:bg-ink-800 transition-colors"
                onClick={(e) => { e.stopPropagation(); onToggleReadingList(book.id); }}
                title="Remove from list"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
