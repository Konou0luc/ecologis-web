/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFA800',
          dark: '#E69500',
        },
        secondary: '#262626',
        accent: '#FFD700',
        success: '#4CAF50',
        warning: '#0D1B2A',
        error: '#F44336',
        info: '#2196F3',
        chart: {
          1: '#4CAF50',
          2: '#2196F3',
          3: '#FF9800',
          4: '#9C27B0',
          5: '#F44336',
        },
      },
    },
  },
  plugins: [],
}

