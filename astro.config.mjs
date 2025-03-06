import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: "file",
  },
  integrations: [pagefind()],
});
