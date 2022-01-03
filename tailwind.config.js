module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        ti: "300px",
        xs: "400px",
      },
      gridTemplateRows: {
        // Complex site-specific row configuration
        "13": 'repeat(13, minmax(0, 1fr))',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};