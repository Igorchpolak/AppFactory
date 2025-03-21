import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";

import netlify from "@astrojs/netlify";

import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    format: "file",
  },
  site: "https://app-factory.netlify.app/",
  integrations: [pagefind({
    indexerOptions: {
      // Tell Pagefind to be more verbose for debugging
      verbose: true,
      // Exclude problematic elements if needed
      excludeSelectors: ["nav", "footer", ".navigation", ".sidebar"],
      // Force Pagefind to treat your content as static HTML
      forceLanguage: "en",
    },
  }), sitemap(), partytown()],

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
    domains: ["https://igor.rstest.online"],
  },
  adapter: netlify(),
});