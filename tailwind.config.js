/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'great-vibes': ['Great Vibes', 'cursive'],
        'bayon': ['Bayon', 'cursive'],
        'pathway-gotic-one': ['Pathway Gothic One', 'sans-serif']
      }
    },
  },
  plugins: [],
}

