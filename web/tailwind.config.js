/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
          extend: {
        colors: {
          'bg-primary': '#1e1e1e',
          'bg-secondary': '#2d2d2d',
          'bg-tertiary': '#3a3a3a',
          'bg-card': '#252525',
          'accent-primary': '#4a90e2',
          'accent-secondary': '#5cb85c',
          'accent-warning': '#f0ad4e',
          'accent-danger': '#d9534f',
          'text-primary': '#ffffff',
          'text-secondary': '#b0b0b0',
          'text-muted': '#888888',
          'border-primary': '#404040',
          'border-secondary': '#555555',
        },
        borderRadius: {
          'sm': '4px',
          'md': '6px',
          'lg': '8px',
          'xl': '10px',
        }
      },
  },
  plugins: [],
}