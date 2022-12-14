/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '18px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      '2xl': ['32px', '40px'],
      '3xl': ['48px', '56px'],
    },
    extend: {
      backgroundImage: {
        'card-bg': "url('/assets/imgs/card_bg.svg')",
      },
      colors: {
        white: '#F4F6FF',
        black: '#0B0E16',

        red: {
          700: '#300219',
          500: '#AF053F',
          300: '#BB2E57',
        },

        gray: {
          700: '#696C74',
          500: '#91949D',
          300: '#B1B4BD',
        },
      },
    },
  },
  plugins: [],
}
