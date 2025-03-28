/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      "min-[1900px]": "1900px",
    },
    extend: {
      fontFamily: {
        mono: ['"Rammetto One"', "SFMono-Regular", "monospace"],
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
