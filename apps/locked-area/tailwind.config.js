/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'boost-navy': '#072D59',
        'boost-navy-light': '#0F2B42',
        'boost-gold': '#D4AF37',
        'boost-gold-light': '#e0bd4a',
        'boost-gold-dark': '#c9a227',
        'boost-cream': '#F5F0E6',
        'boost-red': '#C93320',
        'boost-red-bright': '#F04D38',
        'boost-red-light': '#FEF0ED',
        'boost-blue-light': '#C0C7DA',
        'surface': '#FAF8F5',
        'surface-dark': '#072D59',
        'text': '#333333',
        'text-muted': '#555B66',
        'success': '#4CAF50',
        'error': '#B91C1C',
        'border': '#E5E7EB',
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        'container': '1280px',
      },
      borderRadius: {
        'card': '0.75rem',
        'input': '0.75rem',
        'pill': '1.5rem',
        'cta': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}