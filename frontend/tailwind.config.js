/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hostel-green': '#1DB489',
        'dark-background': '#0A2640',
        'button-primary': '#F4D03F',
        'main-background': '#00403C',
        'button-secondary': '#D2FF00',
      },
      textColor: {
        'hostel-green': '#1DB489',
        'button-secondary': '#D2FF00',
      },
      borderColor: {
        'button-secondary': '#D2FF00',
        'transparent': 'transparent',
      },
    },
  },
  plugins: [],
}