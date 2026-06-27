/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'boost-navy': '#0A1929',
        'boost-navy-light': '#0F2B42',
        'boost-gold': '#D4AF37',
        'boost-gold-light': '#e0bd4a',
        'boost-gold-dark': '#c9a227',
        'boost-cream': '#F5F0E6',
      },
    },
  },
  plugins: [],
}