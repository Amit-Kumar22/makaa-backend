/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef4ff",
          100: "#dbe8ff",
          200: "#b7d1ff",
          300: "#8ab2ff",
          400: "#5c90ff",
          500: "#0B1F3A",
          600: "#09182d",
          700: "#071221",
          800: "#050d17",
          900: "#03080d",
        },

        accent: {
          50: "#fff8e6",
          100: "#fff0c2",
          200: "#ffe08a",
          300: "#ffd24d",
          400: "#f4c430",
          500: "#D4A017",
          600: "#b8860b",
          700: "#9a7209",
          800: "#7d5d08",
          900: "#624906",
        },

        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#16A34A",
          600: "#15803d",
          700: "#166534",
          800: "#14532d",
          900: "#052e16",
        },

        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      boxShadow: {
        glow: "0 0 30px rgba(22,163,74,0.3)",
        "glow-lg": "0 0 60px rgba(22,163,74,0.4)",
      },

      animation: {
        "fade-in": "fadeIn 0.6s ease-in",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },

        slideUp: {
          from: {
            transform: "translateY(30px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },

        slideDown: {
          from: {
            transform: "translateY(-30px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },

        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
    },
  },

  plugins: [],
};