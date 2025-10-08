/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Улучшенная светлая тема с гармоничными оттенками
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d8fe',
          300: '#a5bcfc',
          400: '#8199f8',
          500: '#667eea', // Основной фиолетовый
          600: '#5568d3',
          700: '#4552b8',
          800: '#3a4495',
          900: '#323b78',
          950: '#1e2347',
        },
        secondary: {
          50: '#fef2f3',
          100: '#fde6e8',
          200: '#fbd0d6',
          300: '#f7a8b4',
          400: '#f27791',
          500: '#ea546e', // Розовый
          600: '#d6325d',
          700: '#b4244e',
          800: '#962248',
          900: '#7f2043',
          950: '#470e20',
        },
        // Нейтральные для светлой темы
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      backgroundColor: {
        // Для светлой темы
        'base-light': '#ffffff',
        'elevated-light': '#fafafa',
        'card-light': '#ffffff',
        'hover-light': '#f5f5f5',
      },
      textColor: {
        'primary-light': '#171717',
        'secondary-light': '#525252',
        'tertiary-light': '#737373',
      },
      borderColor: {
        'default-light': '#e5e5e5',
        'hover-light': '#d4d4d4',
      }
    },
  },
  plugins: [],
}
