export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@pinia/nuxt"],

  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-96x96.png",
          sizes: "96x96",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
      meta: [{ name: "apple-mobile-web-app-title", content: "ЭФИР" }],
      linkManifest: "/site.webmanifest",
    },
  },

  postcss: { plugins: { "@tailwindcss/postcss": {} } },
  css: ["~/assets/css/main.css"],

  nitro: {
    compatibility: {
      date: "2025-02-04",
    },
  },

  compatibilityDate: "2025-02-04",
});