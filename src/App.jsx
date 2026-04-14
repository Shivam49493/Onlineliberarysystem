import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Catalog from './components/Catalog';
import ReadingList from './components/ReadingList';
import About from './components/About';
import AddBook from './components/AddBook';
import BookModal from './components/BookModal';
import { books as initialBooks } from './data/books';

export default function App() {
  const [books, setBooks] = useState(initialBooks);
  const [selectedBook, setSelectedBook] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const toggleReadingList = (id) => {
    setReadingList((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addBook = (newBook) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  return (
    <BrowserRouter>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-ink-950 text-parchment-100">
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            readingListCount={readingList.length}
          />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Routes>
              <Route
                path="/"
                element={
                  <Catalog
                    books={books}
                    readingList={readingList}
                    onToggleReadingList={toggleReadingList}
                    onSelectBook={setSelectedBook}
                  />
                }
              />
              <Route
                path="/reading-list"
                element={
                  <ReadingList
                    books={books}
                    readingList={readingList}
                    onToggleReadingList={toggleReadingList}
                    onSelectBook={setSelectedBook}
                  />
                }
              />
              <Route
                path="/add-book"
                element={<AddBook onAddBook={addBook} existingCount={books.length} />}
              />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
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
    </BrowserRouter>
  );
}
