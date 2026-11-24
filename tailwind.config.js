/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: '#FBF8F1',
          100: '#F7F0E0',
          200: '#EEDDBA',
          300: '#E4C992',
          400: '#DAB66E',
          500: '#D4AF37', // signature champagne gold
          600: '#B89225',
          700: '#8E6E19',
          800: '#644D12',
          900: '#3D2F0B',
        },
        rosegold: {
          50: '#FAF2F1',
          100: '#F5E3E0',
          200: '#EBC4BD',
          300: '#DFA398',
          400: '#CE867B',
          500: '#B76E79', // signature rose gold
          600: '#9B545E',
          700: '#793D45',
          800: '#582B31',
          900: '#3A1B1F',
        },
        ivory: {
          50: '#FFFEFA',
          100: '#FDFBF7',
          200: '#FAF6ED',
          300: '#F5EFE0',
          400: '#EFE6D1',
          500: '#E8DCC0',
        },
        pearl: {
          100: '#F8F8FA',
          200: '#EFEFF3',
          300: '#E3E3E9',
          400: '#D5D5DF',
        },
        obsidian: {
          900: '#08080A',
          800: '#0E0E11',
          700: '#16161A',
          600: '#1F1F24',
          500: '#2C2C34',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'pearl-gradient': 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.15) 0%, rgba(212,175,55,0.05) 50%, rgba(13,13,14,0.95) 100%)',
        'gold-glow': 'radial-gradient(circle, rgba(223,190,121,0.2) 0%, rgba(0,0,0,0) 70%)',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
