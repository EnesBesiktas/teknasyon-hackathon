/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#374151 #111827',
        },
        '.scrollbar-track-gray-900': {
          'scrollbar-color': '#374151 #111827',
        },
        '.scrollbar-thumb-gray-700': {
          'scrollbar-color': '#374151 #111827',
        },
        '.scrollbar-hide': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            'display': 'none'
          }
        },
        '.mobile-scroll': {
          '-webkit-overflow-scrolling': 'touch',
        }
      })
    }
  ],
}
