/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./projects/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '112.5rem',
      },
      colors: {
        canvas: '#0a0a0a',
        panel: '#111111',
        footer: '#1C1C1C',
      },
    },
  },
  plugins: [],
}
