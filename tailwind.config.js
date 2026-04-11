/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f7f4ef',
          100: '#ede6d8',
          200: '#d8ccb6',
          300: '#bfab8e',
          400: '#a68a66',
          500: '#8c6f4e',
          600: '#705640',
          700: '#574133',
          800: '#3d2e26',
          900: '#251c18',
          950: '#120d0a',
        },
        parchment: {
          50: '#fdfaf4',
          100: '#faf3e0',
          200: '#f5e6c0',
          300: '#eed49a',
          400: '#e5bc6e',
          500: '#d9a24a',
        },
        forest: {
          400: '#4a8c6a',
          500: '#2d6b4a',
          600: '#1e5238',
          700: '#153d2a',
        },
        crimson: {
          400: '#c75a5a',
          500: '#b03333',
          600: '#8f2020',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: 0, transform: 'scale(0.96)' }, to: { opacity: 1, transform: 'scale(1)' } },
      }
    },
  },
  plugins: [],
}
