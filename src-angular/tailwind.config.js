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
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primaryt: "#130F4E",
        secondaryt: "#FDC010",
        accentst: "#F7A500",
        fondot: "#F5F5F5",
        textoLight: "#FFEEC7"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

