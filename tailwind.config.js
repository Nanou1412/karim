module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a',
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#0ea5a4'
        },
        accent: '#b48ead',
        gold: '#D4AF37'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'Georgia', 'serif']
      },
      boxShadow: {
        'premium': '0 10px 30px rgba(2,6,23,0.4)'
      },
      borderRadius: {
        'xl': '1rem'
      }
    },
  },
  plugins: [],
}
