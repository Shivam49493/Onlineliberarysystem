export default function StarRating({ rating, size = 'sm' }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  const starSize = size === 'sm' ? 12 : 16;

  const StarIcon = ({ type }) => (
    <svg width={starSize} height={starSize} viewBox="0 0 24 24" fill={type === 'empty' ? 'none' : '#e5bc6e'} stroke="#e5bc6e" strokeWidth="1.5">
      {type === 'half' ? (
        <>
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#e5bc6e"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <polygon fill="url(#half)" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </>
      ) : (
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      )}
    </svg>
  );

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => <StarIcon key={`f${i}`} type="full" />)}
      {hasHalf && <StarIcon type="half" />}
      {Array.from({ length: empty }).map((_, i) => <StarIcon key={`e${i}`} type="empty" />)}
      <span className="text-ink-400 text-xs ml-1 font-mono">{rating.toFixed(1)}</span>
    </div>
  );
}
