import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GENRES, COVER_PALETTES } from '../data/books';
import BookCover from './BookCover';

const GENRE_OPTIONS = GENRES.filter((g) => g !== 'All');

const EMPTY_FORM = {
  title: '',
  author: '',
  genre: '',
  year: '',
  pages: '',
  rating: '',
  description: '',
  available: true,
  paletteIndex: 0,
};

// Moved Field component outside to prevent recreation on each render
const Field = ({ label, name, children, required, error }) => (
  <div>
    <label className="block text-xs font-mono uppercase tracking-wider text-ink-400 mb-1.5">
      {label} {required && <span className="text-parchment-400">*</span>}
    </label>
    {children}
    {error && (
      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {error}
      </p>
    )}
  </div>
);

export default function AddBook({ onAddBook, existingCount }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Live preview book object
  const previewBook = {
    id: existingCount + 1,
    title: form.title || 'Book Title',
    author: form.author || 'Author Name',
    genre: form.genre || 'Fiction',
    year: Number(form.year) || new Date().getFullYear(),
    pages: Number(form.pages) || 0,
    rating: Number(form.rating) || 0,
    description: form.description || '',
    available: form.available,
    paletteIndex: form.paletteIndex,
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.author.trim()) e.author = 'Author is required';
    if (!form.genre) e.genre = 'Please select a genre';
    if (!form.year || isNaN(form.year) || form.year < 0 || form.year > new Date().getFullYear())
      e.year = `Enter a valid year (0 – ${new Date().getFullYear()})`;
    if (!form.pages || isNaN(form.pages) || form.pages < 1)
      e.pages = 'Enter a valid page count';
    if (!form.rating || isNaN(form.rating) || form.rating < 0 || form.rating > 5)
      e.rating = 'Rating must be between 0 and 5';
    if (!form.description.trim()) e.description = 'Description is required';
    else if (form.description.trim().length < 20) e.description = 'Description must be at least 20 characters';
    return e;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onAddBook({
      id: existingCount + 1,
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre,
      year: Number(form.year),
      pages: Number(form.pages),
      rating: Math.round(Number(form.rating) * 10) / 10,
      description: form.description.trim(),
      available: form.available,
      paletteIndex: form.paletteIndex,
    });
    setSubmitted(true);
    setTimeout(() => navigate('/'), 1800);
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-forest-700/40 border border-forest-500/50 flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-parchment-100 mb-2">Book Added!</h2>
        <p className="text-ink-400 text-sm mb-1">
          <span className="text-parchment-300 font-medium">"{form.title}"</span> has been added to the catalog.
        </p>
        <p className="text-ink-600 text-xs font-mono">Redirecting to catalog…</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-ink-500 hover:text-parchment-300 text-sm font-mono transition-colors mb-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Catalog
        </Link>
        <p className="text-ink-500 font-mono text-xs uppercase tracking-widest mb-1">New Entry</p>
        <h1 className="font-display text-4xl font-bold text-parchment-100">Add a Book</h1>
        <p className="text-ink-400 text-sm mt-2">Fill in the details below to add a new book to the Librarium catalog.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-5" noValidate>

          {/* Title */}
          <Field label="Title" name="title" required error={errors.title}>
            <input
              type="text"
              className={`input-dark ${errors.title ? 'border-red-500 focus:border-red-400 focus:ring-red-400' : ''}`}
              placeholder="e.g. The Great Gatsby"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              maxLength={120}
            />
          </Field>

          {/* Author */}
          <Field label="Author" name="author" required error={errors.author}>
            <input
              type="text"
              className={`input-dark ${errors.author ? 'border-red-500 focus:border-red-400 focus:ring-red-400' : ''}`}
              placeholder="e.g. F. Scott Fitzgerald"
              value={form.author}
              onChange={(e) => handleChange('author', e.target.value)}
              maxLength={100}
            />
          </Field>

          {/* Genre */}
          <Field label="Genre" name="genre" required error={errors.genre}>
            <select
              className={`input-dark ${errors.genre ? 'border-red-500 focus:border-red-400 focus:ring-red-400' : ''}`}
              value={form.genre}
              onChange={(e) => handleChange('genre', e.target.value)}
            >
              <option value="">Select a genre…</option>
              {GENRE_OPTIONS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </Field>

          {/* Year + Pages + Rating row */}
          <div className="grid grid-cols-3 gap-4">
            <Field label="Year" name="year" required error={errors.year}>
              <input
                type="number"
                className={`input-dark ${errors.year ? 'border-red-500 focus:border-red-400 focus:ring-red-400' : ''}`}
                placeholder={String(new Date().getFullYear())}
                value={form.year}
                onChange={(e) => handleChange('year', e.target.value)}
                min={0}
                max={new Date().getFullYear()}
              />
            </Field>
            <Field label="Pages" name="pages" required error={errors.pages}>
              <input
                type="number"
                className={`input-dark ${errors.pages ? 'border-red-500 focus:border-red-400 focus:ring-red-400' : ''}`}
                placeholder="e.g. 320"
                value={form.pages}
                onChange={(e) => handleChange('pages', e.target.value)}
                min={1}
              />
            </Field>
            <Field label="Rating (0–5)" name="rating" required error={errors.rating}>
              <input
                type="number"
                className={`input-dark ${errors.rating ? 'border-red-500 focus:border-red-400 focus:ring-red-400' : ''}`}
                placeholder="e.g. 4.2"
                value={form.rating}
                onChange={(e) => handleChange('rating', e.target.value)}
                min={0}
                max={5}
                step={0.1}
              />
            </Field>
          </div>

          {/* Description */}
          <Field label="Description" name="description" required error={errors.description}>
            <textarea
              className={`input-dark resize-none h-28 ${errors.description ? 'border-red-500 focus:border-red-400 focus:ring-red-400' : ''}`}
              placeholder="A short synopsis of the book…"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              maxLength={500}
            />
            <p className="text-ink-700 text-xs text-right mt-1 font-mono">{form.description.length}/500</p>
          </Field>

          {/* Availability toggle */}
          <div className="flex items-center justify-between bg-ink-900 border border-ink-800 rounded-xl px-4 py-3">
            <div>
              <p className="text-parchment-200 text-sm font-medium">Available for Borrowing</p>
              <p className="text-ink-500 text-xs mt-0.5">Mark whether the book is currently available</p>
            </div>
            <button
              type="button"
              onClick={() => handleChange('available', !form.available)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                form.available ? 'bg-parchment-400' : 'bg-ink-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  form.available ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Cover color picker */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-400 mb-2">
              Cover Color Theme
            </label>
            <div className="flex flex-wrap gap-2">
              {COVER_PALETTES.map((palette, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleChange('paletteIndex', i)}
                  className={`w-8 h-8 rounded-lg transition-all duration-150 ${
                    form.paletteIndex === i
                      ? 'ring-2 ring-parchment-400 ring-offset-2 ring-offset-ink-950 scale-110'
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                  style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}
                  title={`Color theme ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1 justify-center py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              Add to Catalog
            </button>
            <button type="button" onClick={handleReset} className="btn-ghost px-5">
              Reset
            </button>
          </div>
        </form>

        {/* Live Preview */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="sticky top-24">
            <p className="text-xs font-mono uppercase tracking-wider text-ink-500 mb-3">Live Preview</p>
            <div className="bg-ink-900 border border-ink-800 rounded-xl overflow-hidden">
              <BookCover book={previewBook} size="md" />
              <div className="p-4">
                <h3 className="font-display text-parchment-100 font-semibold text-base leading-tight line-clamp-2">
                  {previewBook.title}
                </h3>
                <p className="text-ink-400 text-sm mt-0.5">{previewBook.author}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                    previewBook.available
                      ? 'bg-forest-700/40 text-green-400 border border-forest-600/40'
                      : 'bg-ink-800 text-ink-500 border border-ink-700'
                  }`}>
                    {previewBook.available ? 'Available' : 'Checked Out'}
                  </span>
                  <span className="genre-pill">{previewBook.genre || 'Genre'}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-ink-800 grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: 'Year', value: previewBook.year },
                    { label: 'Pages', value: previewBook.pages || '—' },
                    { label: 'Rating', value: previewBook.rating ? `${previewBook.rating}/5` : '—' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-ink-600 text-xs font-mono">{label}</p>
                      <p className="text-parchment-300 text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-ink-700 text-xs font-mono text-center mt-3">Updates as you type</p>
          </div>
        </div>
      </div>
    </div>
  );
}