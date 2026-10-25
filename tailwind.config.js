/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#F9F3E5',
          200: '#F0E2C1',
          300: '#E4CC96',
          400: '#D5B368',
          500: '#C5A047',
          600: '#A98433',
          700: '#896726',
          800: '#6C4F20',
          900: '#4D3716',
        },
        burgundy: {
          50: '#FBF4F5',
          100: '#F5E4E6',
          200: '#EBC7CC',
          300: '#DA9DA5',
          400: '#B85E6C',
          500: '#8C2538',
          600: '#751B2C',
          700: '#5C1220',
          800: '#460C17',
          900: '#2F060D',
        },
        champagne: {
          light: '#FAF7F0',
          DEFAULT: '#F3EDE2',
          dark: '#E5DAC6',
        },
        ivory: {
          DEFAULT: '#FFFFF8',
          warm: '#FDFBF5',
          subtle: '#F7F5EE',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        cinzelDeco: ['"Cinzel Decorative"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        pinyon: ['"Pinyon Script"', 'cursive'],
        alex: ['"Alex Brush"', 'cursive'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #A88330 0%, #E6CA65 25%, #FFF8D6 50%, #E6CA65 75%, #A88330 100%)',
        'rose-gold': 'linear-gradient(135deg, #E0A99A 0%, #FBEBE8 50%, #C97D6E 100%)',
        'silver-pearl': 'linear-gradient(135deg, #E6E9F0 0%, #EEF1F5 100%)',
        'burgundy-velvet': 'radial-gradient(ellipse at center, #691724 0%, #350A10 100%)',
        'dark-royal': 'radial-gradient(ellipse at center, #242220 0%, #12100E 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'gold-lg': '0 10px 30px -5px rgba(184, 134, 11, 0.3), 0 0 15px rgba(255, 223, 0, 0.2)',
        'luxury-card': '0 20px 40px -15px rgba(30, 20, 10, 0.15), 0 0 1px 1px rgba(212, 175, 55, 0.3)',
        'wax-seal': '0 8px 18px rgba(0, 0, 0, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.25), inset 0 -3px 6px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-very-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
