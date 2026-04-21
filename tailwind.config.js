/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      // {
      //   "resist": {
      //     "primary": "#1F3769", // Resist Blue 1
      //     "primary-focus": "#FF0000",
      //     "primary-content": "#FFFFFF",
      //     "secondary": "#19519D", // Resist Blue 2
      //     "secondary-focus": "#FF0000",
      //     "secondary-content": "#FFFFFF",
      //     "accent": "#ECB347", // Resist Yellow,
      //     "accent-focus": "#FF0000",
      //     "accent-content": "#FFFFFF",
      //     "neutral": "#F4EFE6", // Resist Ivory Light
      //     "neutral-focus": "#FF0000",
      //     "neutral-content": "#1A2141", // Resist Blue Dark - text
      //     "base-100": "#E0CBA4", // Resist Ivory
      //     "base-200": "#844736", // Resist Light brown
      //     "base-300": "#471C13", // Resist Dark brown
      //     "base-content": "#e0cba4",
      //     "info": "#FF0000",
      //     "success": "#FF0000",
      //     "warning": "#ECB347", // Resist Yellow
      //     "error": "#FF0000",

      //     "--fallback-bc": "#F4EFE6",
      //     "--fallback-b1": "#1F3769",
      //     "--fallback-b2": "#19519D",
      //   }
      // }, "cupcake", "light", "dark",
      {
        cupcake: {
          primary: "#1F3769", // Override the primary color with Resist Blue 1
          "primary-focus": "#FF0000", // Override the focus color
          "primary-content": "#FFFFFF", // Text color on primary buttons
          secondary: "#19519D", // Override the secondary color with Resist Blue 2
          "secondary-focus": "#FF0000", // Override the secondary focus color
          "secondary-content": "#FFFFFF", // Text color on secondary buttons
          accent: "#ECB347", // Override the accent color with Resist Yellow
          "accent-focus": "#FF0000",
          "accent-content": "#FFFFFF",
          neutral: "#F4EFE6", // Override neutral colors
          "neutral-focus": "#FF0000",
          "neutral-content": "#1A2141", // Text on neutral background
          base: "#E0CBA4", // Override base-100 to Resist Ivory
          "base-200": "#844736", // Override base-200 to Resist Light brown
          "base-300": "#471C13", // Override base-300 to Resist Dark brown
          "base-content": "#1A2141", // Text on base colors
          info: "#E0CBA4", // Light Ivory
          success: "#844736", // cupcake default
          warning: "#ECB347", // Override warning to Resist Yellow
          error: "#F87272", // cupcake default
          // "--fallback-bc": "#F4EFE6",
          "--fallback-b1": "#1F3769",
          "--fallback-b2": "#F4EFE6",
          "--fallback-b3": "#E0CBA4",

        },
      },
      "light", "dark", // Other DaisyUI themes
    ]
  },
  plugins: [daisyui],
}

