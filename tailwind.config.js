/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './data/**/*.json'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f4f6fa',
          100: '#e5eaf3',
          500: '#1e3a8a',
          800: '#152842',
          900: '#0f172a',
          950: '#060c18',
          dark: '#0B192C'
        },
        champagne: {
          100: '#F5E6CA',
          500: '#D4AF37',
          600: '#C5A059',
          700: '#AA7C11'
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif']
      }
    }
  }
};
