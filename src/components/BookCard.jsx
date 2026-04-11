import BookCover from './BookCover';
import StarRating from './StarRating';

export default function BookCard({ book, onSelect, onToggleReadingList, isInReadingList }) {
  return (
    <div className="book-card group animate-scale-in" onClick={() => onSelect(book)}>
      {/* Cover */}
      <div className="relative">
        <BookCover book={book} size="md" />
        {/* Availability badge */}
        <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-mono font-medium ${
          book.available
            ? 'bg-forest-700 text-green-300 border border-forest-500'
            : 'bg-ink-800 text-ink-400 border border-ink-700'
        }`}>
          {book.available ? 'Available' : 'Checked Out'}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-display text-parchment-100 font-semibold text-base leading-tight line-clamp-1 group-hover:text-parchment-300 transition-colors">
            {book.title}
          </h3>
          <p className="text-ink-400 text-sm mt-0.5 font-body">{book.author}</p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <StarRating rating={book.rating} />
          <span className="genre-pill">{book.genre}</span>
        </div>

        <p className="text-ink-400 text-xs font-body leading-relaxed line-clamp-2 mb-4">
          {book.description}
        </p>

        <div className="flex items-center gap-2">
          <button
            className="btn-primary flex-1 justify-center text-xs py-2"
            onClick={(e) => { e.stopPropagation(); onSelect(book); }}
          >
            View Details
          </button>
          <button
            className={`p-2 rounded-lg border transition-all duration-200 ${
              isInReadingList
                ? 'bg-parchment-500/20 border-parchment-500/50 text-parchment-400'
                : 'border-ink-700 text-ink-500 hover:border-ink-500 hover:text-ink-300'
            }`}
            onClick={(e) => { e.stopPropagation(); onToggleReadingList(book.id); }}
            title={isInReadingList ? 'Remove from reading list' : 'Add to reading list'}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={isInReadingList ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
