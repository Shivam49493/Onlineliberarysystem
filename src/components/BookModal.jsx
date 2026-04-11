import { useEffect } from 'react';
import BookCover from './BookCover';
import StarRating from './StarRating';

export default function BookModal({ book, onClose, onToggleReadingList, isInReadingList }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-ink-900 border border-ink-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-ink-800 text-ink-400 hover:text-parchment-100 hover:bg-ink-700 transition-colors"
          onClick={onClose}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="flex flex-col sm:flex-row gap-0">
          {/* Cover panel */}
          <div className="sm:w-56 flex-shrink-0 p-6 flex items-start justify-center bg-ink-950/50 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none">
            <BookCover book={book} size="xl" />
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="mb-1">
              <span className="genre-pill text-xs">{book.genre}</span>
            </div>

            <h2 className="font-display text-2xl font-bold text-parchment-100 mt-2 mb-1 leading-tight">
              {book.title}
            </h2>
            <p className="text-ink-400 font-body mb-3">by {book.author}</p>

            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={book.rating} size="md" />
            </div>

            {/* Meta */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Year', value: book.year },
                { label: 'Pages', value: book.pages },
                { label: 'Status', value: book.available ? 'Available' : 'Out' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-ink-800 rounded-lg p-3 text-center">
                  <p className="text-ink-500 text-xs font-mono uppercase tracking-wider mb-1">{label}</p>
                  <p className={`text-sm font-semibold font-body ${
                    label === 'Status'
                      ? book.available ? 'text-green-400' : 'text-ink-400'
                      : 'text-parchment-200'
                  }`}>{value}</p>
                </div>
              ))}
            </div>

            <p className="text-ink-300 text-sm font-body leading-relaxed mb-6">
              {book.description}
            </p>

            <div className="flex gap-3">
              {book.available && (
                <button className="btn-primary flex-1 justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                  Borrow Book
                </button>
              )}
              <button
                className={`btn-ghost flex-1 justify-center ${isInReadingList ? 'text-parchment-400 border-parchment-600' : ''}`}
                onClick={() => onToggleReadingList(book.id)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={isInReadingList ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                {isInReadingList ? 'Saved' : 'Save to List'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
