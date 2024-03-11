/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'ping-once': 'ping 0.5s 1',
        'ping-modal': 'ping 0.3s 1',
      },
      keyframes: {
        ping: {
          '0%': { transform: 'scale(0)', opacity: '0'},
          '75%, 100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

