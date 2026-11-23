/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F5EEDB',
          300: '#EFE5C8',
          400: '#E4D4A9',
        },
        burgundy: {
          50: '#F9ECEF',
          100: '#F0C9D3',
          200: '#E199AB',
          300: '#CD5B78',
          400: '#A42A4B',
          500: '#7B1834',
          600: '#621027',
          700: '#4D0A1C',
          800: '#390614',
          900: '#26030C',
          950: '#180106',
        },
        rosegold: {
          100: '#F9ECEB',
          200: '#EFC9C7',
          300: '#DFA3A1',
          400: '#C97D7D',
          500: '#B76E79',
          600: '#9B5560',
          700: '#7E4049',
        },
        espresso: {
          800: '#2A131A',
          900: '#1C0A10',
          950: '#120509',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'wax': '0 8px 24px -4px rgba(183, 110, 121, 0.4), 0 4px 12px rgba(123, 24, 52, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
        'envelope': '0 25px 50px -12px rgba(24, 1, 6, 0.7), 0 0 0 1px rgba(183, 110, 121, 0.15)',
        'luxury': '0 20px 40px -15px rgba(123, 24, 52, 0.12), 0 0 0 1px rgba(223, 163, 161, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'metallic-gold': 'linear-gradient(135deg, #ECC880 0%, #D4AF37 35%, #FFF0C2 50%, #B8860B 75%, #E5B299 100%)',
        'metallic-rosegold': 'linear-gradient(135deg, #FAD0C4 0%, #B76E79 50%, #E8A598 100%)',
      }
    },
  },
  plugins: [],
}
