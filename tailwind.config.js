/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kawaii: {
          peach: '#FFE5D0',
          'peach-dark': '#FFCBA4',
          mint: '#D4F4DD',
          'mint-dark': '#B8E6C1',
          lavender: '#E5D4F1',
          'lavender-dark': '#D1B9E8',
          sky: '#D0E7FF',
          'sky-dark': '#A4C7FF',
          kraft: '#F5E6D3',
          'kraft-dark': '#E8D1B8',
          cream: '#FFF8F0',
          'soft-gray': '#F7F5F3',
          'warm-white': '#FEFCFA'
        }
      },
      fontFamily: {
        kawaii: ['Comic Neue', 'Zen Maru Gothic', 'cursive'],
        handwritten: ['Kalam', 'cursive']
      },
      boxShadow: {
        'kawaii': '0 4px 15px rgba(0, 0, 0, 0.05)',
        'kawaii-lg': '0 8px 25px rgba(0, 0, 0, 0.08)',
        'paper': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'sticker': '0 3px 12px rgba(0, 0, 0, 0.15)'
      },
      borderRadius: {
        'kawaii': '12px',
        'blob': '30% 70% 70% 30% / 30% 30% 70% 70%'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'wobble': 'wobble 0.5s ease-in-out',
        'bounce-soft': 'bounce-soft 2s infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        wobble: {
          '0%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(-5deg)' },
          '30%': { transform: 'rotate(5deg)' },
          '45%': { transform: 'rotate(-3deg)' },
          '60%': { transform: 'rotate(3deg)' },
          '75%': { transform: 'rotate(-1deg)' },
          '100%': { transform: 'rotate(0deg)' }
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(-5%)' }
        }
      }
    },
  },
  plugins: [],
} 