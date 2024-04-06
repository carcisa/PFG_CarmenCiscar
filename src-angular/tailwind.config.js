/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   preflight: false,
  // },
  // important: true,
  content: [
    "./src/**/*.{html,ts}",
    ".pages/**/*.{html,ts}",
    ".components/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primaryt: "#130F4E",
        secondaryt: "#FDC010",
        accentst: "#F7A500",
        fondot: "#F5F5F5"
      }
    },
  },
  plugins: [],
}

