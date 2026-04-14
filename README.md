# 📚 Librarium — Online Library App

A modern, elegant online library application built with **React 18**, **Vite 5**, and **Tailwind CSS 3**.

![Librarium Preview](./public/preview.png)

---

## ✨ Features

- 🔍 **Smart Search** — Search books by title, author, or description in real-time
- 🏷️ **Genre Filtering** — Filter across Fiction, Sci-Fi, Mystery, Romance, History, and more
- ↕️ **Sorting** — Sort by title, author, year, or rating
- ⭐ **Ratings** — Star ratings displayed for every book
- 📖 **Book Details Modal** — Full detail view with borrow option
- 🔖 **Reading List** — Save and manage books you want to read
- 🌑 **Dark Theme** — Rich dark editorial design

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/online-library.git

# Navigate into the project
cd online-library

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open your browser at **http://localhost:5173**

---

## 📦 Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🗂️ Project Structure

```
online-library/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Navigation header
│   │   ├── Catalog.jsx       # Main book catalog view
│   │   ├── BookCard.jsx      # Individual book card
│   │   ├── BookCover.jsx     # Generated book cover art
│   │   ├── BookModal.jsx     # Book detail modal
│   │   ├── ReadingList.jsx   # Saved reading list view
│   │   ├── SearchAndFilter.jsx # Search + genre + sort controls
│   │   ├── StarRating.jsx    # Star rating display
│   │   └── About.jsx         # About page
│   ├── data/
│   │   └── books.js          # Book data and constants
│   ├── App.jsx               # Root component with state
│   ├── main.jsx              # Entry point
│   └── index.css             # Tailwind + custom styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2 | UI library |
| Vite | 5.1 | Build tool & dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| DM Sans | — | Body font |
| Playfair Display | — | Display / heading font |

---

## 📋 React Concepts Used

- **Functional Components** — All components are functional
- **useState Hook** — Managing view, reading list, selected book, dark mode
- **useMemo Hook** — Efficient filtering and sorting of book list
- **Props** — Data and callbacks passed between components
- **Event Handling** — Click, change, keydown events throughout
- **Conditional Rendering** — Views, modal, availability status
- **List Rendering** — `.map()` with unique `key` props on all lists

---

## 💡 Suggested Commits

For a meaningful commit history, commit in this order:

1. `init: scaffold vite + react + tailwind project`
2. `feat: add book data and constants`  
3. `feat: build BookCard, BookCover, StarRating components`
4. `feat: add Catalog view with search and genre filtering`
5. `feat: add BookModal detail view`
6. `feat: add ReadingList and About pages`
7. `style: polish dark theme and animations`

---


