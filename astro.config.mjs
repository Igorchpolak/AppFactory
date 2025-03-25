import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import metaTags from "astro-meta-tags";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    format: "file",
  },
  site: "https://app-factory.netlify.app",
  integrations: [
    pagefind({
      indexerOptions: {
        verbose: true,
        excludeSelectors: ["nav", "footer", ".navigation", ".sidebar"],
        forceLanguage: "en",
      },
    }),
    sitemap(),
    partytown(),
    metaTags(),
  ],

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
      SITE: envField.string({
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