/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bamboo: {
          50:  '#f5f9f0',
          100: '#e6f2d9',
          200: '#c8e4b0',
          300: '#a0cf7e',
          400: '#76b54e',
          500: '#559930',
          600: '#3f7a22',
          700: '#325f1d',
          800: '#2a4d1b',
          900: '#243f19',
        },
        gold: {
          400: '#f5c842',
          500: '#e6b800',
          600: '#c9a000',
          700: '#a07800',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [],
};
