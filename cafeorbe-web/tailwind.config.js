/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#FAF2F0',
          100: '#F2D7D0',
          200: '#E2B1A4',
          300: '#C98C7B',
          400: '#AB705E',
          500: '#8D5B4C',
          600: '#6F4E37',
          700: '#5A3828',
          800: '#44281D',
          900: '#2B1810',
          950: '#1F130B',
        },
        cream: {
          50: '#FAF7F2',
          100: '#F5EBE1',
          200: '#EBD9C8',
          300: '#DFC6AF',
          400: '#CEAC8E',
          500: '#BCA084',
        },
        forest: {
          50: '#EDFAF4',
          100: '#D1F0E2',
          200: '#A4E1C6',
          300: '#75C5A1',
          400: '#4EAA7F',
          500: '#388A64',
          600: '#2D6E50',
          700: '#23573F',
          800: '#1D4532',
          900: '#153324',
          950: '#0E2218',
        },
        earth: {
          100: '#F8EFE5',
          200: '#F0DBC4',
          300: '#E3BE98',
          400: '#D4A373',
          500: '#C49A6C',
          600: '#B8723C',
          700: '#9C5F32',
          800: '#7E4C27',
          900: '#5C381E',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(43, 24, 16, 0.06), 0 2px 6px -1px rgba(43, 24, 16, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(43, 24, 16, 0.08), 0 4px 12px -2px rgba(43, 24, 16, 0.05)',
        'glow-coffee': '0 0 25px -5px rgba(111, 78, 55, 0.25)',
        'glow-forest': '0 0 25px -5px rgba(35, 87, 63, 0.3)',
      }
    },
  },
  plugins: [],
}
