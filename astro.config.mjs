import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import netlify from '@astrojs/netlify/functions';


export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: "file",
  },
  integrations: [pagefind()],
  // output: "server",
  // adapter: netlify(),

});
