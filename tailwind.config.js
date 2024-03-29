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
      },
      backgroundImage: {
        'main-bg': 'url("public/bg.webp")',
        'aside-gradient': 'linear-gradient(180deg, rgba(209,213,219,1) 16%, rgba(152,159,166,0.8) 64%, rgba(197,205,213,1) 86%, rgba(193,202,210,1) 98%)'
      }
    },
  },
  plugins: [],
}

