/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' if you want automatic dark mode detection
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#121822',
        foreground: '#E0E7FF',
        muted: '#8F9BB3',
        primary: {
          DEFAULT: '#00FFD1',
          foreground: '#0A101E',
        },
        accent: {
          DEFAULT: '#8C6FFC',
          foreground: '#121822',
        },
        border: '#2E3A59',
        input: '#1F2937',
        ring: '#00FFD1',
      },
      boxShadow: {
        custom: '0 0 8px 2px rgba(0, 255, 209, 0.5)',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'),require('@tailwindcss/typography'),],
};
