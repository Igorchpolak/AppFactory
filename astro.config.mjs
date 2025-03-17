import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";

import netlify from "@astrojs/netlify";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    format: "file",
  },

  integrations: [pagefind(), sitemap()],

  env: {
    schema: {
      WORDPRESS_REST_API_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      POSTS_PER_PAGE: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  image: {
    domains: ["igor.z0fil5dsgi-xlm41ok1r6dy.p.temp-site.link"],
  },
  adapter: netlify(),
});