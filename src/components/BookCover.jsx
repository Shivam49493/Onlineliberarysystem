import { COVER_PALETTES } from '../data/books';

export default function BookCover({ book, size = 'md' }) {
  const palette = COVER_PALETTES[book.paletteIndex % COVER_PALETTES.length];
  const sizes = {
    sm: 'w-14 h-20',
    md: 'w-full h-48',
    lg: 'w-36 h-52',
    xl: 'w-48 h-72',
  };

  return (
    <div
      className={`${sizes[size]} rounded-lg flex flex-col items-center justify-center relative overflow-hidden`}
      style={{
        background: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
      }}
    >
      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 left-2 right-2 bottom-2 border border-white rounded" />
        <div className="absolute top-4 left-4 right-4 border-t border-white" />
        <div className="absolute bottom-4 left-4 right-4 border-b border-white" />
      </div>

      {/* Spine accent */}
      <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: 'rgba(0,0,0,0.25)' }} />

      {/* Title on cover */}
      {size !== 'sm' && (
        <div className="relative z-10 p-4 text-center">
          <p className="font-display text-white/90 font-semibold text-sm leading-tight line-clamp-3">
            {book.title}
          </p>
          <p className="text-white/60 text-xs mt-2 font-body">{book.author}</p>
        </div>
      )}

      {/* Genre badge on cover */}
      {size === 'md' && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <span className="text-white/50 text-xs font-mono uppercase tracking-widest">{book.genre}</span>
        </div>
      )}
    </div>
  );
}
