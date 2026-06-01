/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#060610',
        surface: '#0d0d1f',
        ink: '#f0f0ff',
        accent: {
          cyan: '#00f5d4',
          violet: '#a259ff',
          orange: '#ff8c42',
          pink: '#ff6eb4',
        },
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(6, 6, 16, 0.6)',
        'glow-cyan': '0 0 20px rgba(0, 245, 212, 0.25), 0 0 60px rgba(0, 245, 212, 0.1)',
        'glow-violet': '0 0 20px rgba(162, 89, 255, 0.25), 0 0 60px rgba(162, 89, 255, 0.1)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
}
