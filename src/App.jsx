import { useState } from 'react';
import Header from './components/Header';
import Catalog from './components/Catalog';
import ReadingList from './components/ReadingList';
import About from './components/About';
import BookModal from './components/BookModal';
import { books } from './data/books';

export default function App() {
  const [view, setView] = useState('catalog');
  const [selectedBook, setSelectedBook] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const toggleReadingList = (id) => {
    setReadingList((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-ink-950 text-parchment-100">
        <Header
          view={view}
          setView={setView}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          readingListCount={readingList.length}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {view === 'catalog' && (
            <Catalog
              books={books}
              readingList={readingList}
              onToggleReadingList={toggleReadingList}
              onSelectBook={setSelectedBook}
            />
          )}
          {view === 'reading-list' && (
            <ReadingList
              books={books}
              readingList={readingList}
              onToggleReadingList={toggleReadingList}
              onSelectBook={setSelectedBook}
            />
          )}
          {view === 'about' && <About />}
        </main>

        {selectedBook && (
          <BookModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onToggleReadingList={toggleReadingList}
            isInReadingList={readingList.includes(selectedBook.id)}
          />
        )}
      </div>
    </div>
  );
}
