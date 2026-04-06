/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: "#121418",
        surface: "#1a1d24",
        "surface-highlight": "#2a2d36",
        primary: {
          DEFAULT: "#FCD535",
          hover: "#e5c02b",
          dark: "#b2941c"
        },
        text: {
          DEFAULT: "#FFFFFF",
          secondary: "#8E9BAE",
          muted: "#5B6471"
        }
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-pattern': '24px 24px',
      }
    },
  },
  plugins: [],
}
