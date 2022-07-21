const typography = require('@tailwindcss/typography');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#ff773b',
        },
      },
      width: {
        '1/8': '12.5%',
        '1/10': '10%',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    typography,
  ],
};
