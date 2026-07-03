/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#072D59',
        'brand-navy-light': '#0a3a73',
        'brand-red': '#C93320',
        'brand-red-bright': '#F04D38',
        'brand-red-light': '#FEF0ED',
        'brand-gold': '#E8B339',
        'brand-gold-light': '#f0c85a',
        'brand-blue-light': '#C0C7DA',
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