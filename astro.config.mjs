import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import metaTags from "astro-meta-tags";
import { readFile } from "node:fs/promises";
import opengraphImage from "astro-opengraph-image";

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
    opengraphImage({
      // what color do you want your background to be?
      // background: "#ffffff",
      // what size do you want your images to be?
      // 1200x630 is a good default across platforms,
      // and 3x scale is a convenient choice.
      width: 1200,
      height: 630,
      scale: 3,

      // the fonts you picked before. you will have to include the particular
      // weights and variants you want to use.
      fonts: [
        {
          name: "Bungee",
          data: await readFile(
            "node_modules/@fontsource/bungee/files/bungee-latin-400-normal.woff"
          ),
          style: "normal",
          weight: 400,
        },
        // {
        //   name: "Roboto",
        //   data: await readFile(
        //     "node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff"
        //   ),
        //   style: "normal",
        //   weight: 400,
        // },
        {
          name: "Gugi",
          data: await readFile(
            "node_modules/@fontsource/gugi/files/gugi-3-400-normal.woff"
          ),
          style: "normal",
          weight: 400,
        }
      ],
    }),
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
