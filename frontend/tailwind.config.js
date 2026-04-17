import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        atelier: {
          primary: "#2d4c45",
          "primary-content": "#f6f1e8",
          secondary: "#b8864b",
          "secondary-content": "#1e1810",
          accent: "#74846c",
          "accent-content": "#111612",
          neutral: "#202826",
          "neutral-content": "#f3ede3",
          "base-100": "#f8f4ed",
          "base-200": "#efe6d8",
          "base-300": "#e3d7c7",
          "base-content": "#1f2520",
          info: "#4f7b95",
          "info-content": "#f6fbff",
          success: "#3f6d59",
          "success-content": "#f2faf5",
          warning: "#b07a3c",
          "warning-content": "#fff7ee",
          error: "#9a4a42",
          "error-content": "#fff5f4",
          "--rounded-box": "1.5rem",
          "--rounded-btn": "9999px",
          "--rounded-badge": "9999px",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.875rem",
        },
      },
    ],
  },
}
