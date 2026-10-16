/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clinical: {
          950: '#06090e',
          900: '#0b111a',
          850: '#0f1724',
          800: '#142032',
          700: '#1e2f47',
          600: '#2c4363',
          border: 'rgba(56, 189, 248, 0.2)',
          cyan: '#38bdf8',
          teal: '#14b8a6',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          neon: '#00f0ff',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(56, 189, 248, 0.35)',
        'glow-rose': '0 0 15px rgba(244, 63, 94, 0.45)',
        'glow-emerald': '0 0 15px rgba(16, 185, 129, 0.35)',
        'panel': '0 8px 32px 0 rgba(0, 0, 0, 0.65)',
      }
    },
  },
  plugins: [],
}
