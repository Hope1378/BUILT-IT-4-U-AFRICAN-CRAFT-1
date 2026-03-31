/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50:  '#fdf3ef',
          100: '#fbe4d8',
          200: '#f6c5ad',
          300: '#f09f7a',
          400: '#e87047',
          500: '#c0522a',
          600: '#a8441f',
          700: '#8a361a',
          800: '#6e2b17',
          900: '#4f1e10',
        },
        gold: {
          50:  '#fdfaec',
          100: '#faf2c8',
          200: '#f5e58e',
          300: '#efd051',
          400: '#e8ba22',
          500: '#d4a017',
          600: '#b07c12',
          700: '#8a5e11',
          800: '#6e4a14',
          900: '#4f3510',
        },
        earth: {
          50:  '#f7f3ee',
          100: '#ede4d4',
          200: '#d9c7a9',
          300: '#c2a476',
          400: '#a8804d',
          500: '#8b6435',
          600: '#724f28',
          700: '#5b3d1f',
          800: '#462f18',
          900: '#2f1f0f',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
