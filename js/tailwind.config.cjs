const typography = require("@tailwindcss/typography");
// The tailwind config is set up for JIT, meaning it interacts with the global tailwind object
// We will just pull from that
if (!global.tailwind) global.tailwind = {};
require("../assets/tailwind.config");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: global.tailwind.config.theme,
  },

  plugins: [typography],
};

module.exports = config;
