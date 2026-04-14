export default function About() {
  const features = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      ),
      title: 'Smart Search',
      desc: 'Search across titles, authors, and descriptions in real-time.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      ),
      title: 'Curated Catalog',
      desc: 'Browse hundreds of titles across fiction, science, history, and more.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      title: 'Personal Reading List',
      desc: 'Save and track books you want to read next.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      title: 'Community Ratings',
      desc: 'See how readers rate every book in our collection.',
    },
  ];

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="mb-10">
        <p className="text-ink-500 font-mono text-xs uppercase tracking-widest mb-2">About</p>
        <h1 className="font-display text-4xl font-bold text-parchment-100 mb-4">
          Librarium
        </h1>
        <p className="text-ink-300 text-lg font-body leading-relaxed">
          A modern digital library built with React, Vite, and Tailwind CSS. Browse, discover, and keep track of books you love.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className="bg-ink-900 border border-ink-800 rounded-xl p-5 hover:border-ink-600 transition-colors duration-200">
            <div className="text-parchment-400 mb-3">{icon}</div>
            <h3 className="font-display text-parchment-100 font-semibold mb-1">{title}</h3>
            <p className="text-ink-400 text-sm font-body leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="border-t border-ink-800 pt-8">
        <h2 className="font-display text-xl font-semibold text-parchment-200 mb-4">Built With</h2>
        <div className="flex flex-wrap gap-2">
          {['React 18', 'Vite 5', 'Tailwind CSS 3', 'JavaScript ES6+', 'Google Fonts'].map((tech) => (
            <span key={tech} className="px-3 py-1 bg-ink-900 border border-ink-700 rounded-full text-xs font-mono text-ink-300">
              {tech}
            </span>
          ))}
        </div>
      </div>

      
      
    </div>
  );
}
