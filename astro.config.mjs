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
  site: "https://elaborate-druid-5f07f6.netlify.app",
  integrations: [
    pagefind({
      indexerOptions: {
        // Tell Pagefind to be more verbose for debugging
        verbose: true,
        // Exclude problematic elements if needed
        excludeSelectors: ["nav", "footer", ".navigation", ".sidebar"],
        // Force Pagefind to treat your content as static HTML
        forceLanguage: "en",
      },
    }),
    sitemap(),
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
    },
  },
  image: {
    domains: ["igor.z0fil5dsgi-xlm41ok1r6dy.p.temp-site.link"],
  },
  adapter: netlify(),
});
