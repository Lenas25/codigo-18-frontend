/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // This is the path where Tailwind will look for files to scan for classes ** means all directories and * means all files
    "./src/**/*.{js,jsx}",
    "./index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

