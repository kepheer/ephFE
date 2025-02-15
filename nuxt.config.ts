import Aura from "@primevue/themes/Aura";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "@primevue/nuxt-module"],

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
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
      ],
      meta: [{ name: "apple-mobile-web-app-title", content: "ЭФИР" }],
    },
  },

  postcss: { plugins: { "@tailwindcss/postcss": {} } },
  css: ["~/assets/css/main.css"],

  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
        colors: {
          primary: "#00A890",
          primary50: "#C7F4ED",
          primary100: "#A8E1DB",
          primary200: "#8ADBCA",
          primary300: "#6DC6B6",
          primary400: "#4EB4A1",
          primary500: "#00A890",
          primary600: "#008E78",
          primary700: "#007460",
          primary800: "#005B4D",
          primary900: "#00423A",

          surface: "#FEFDFC",
          background: "#FEFDFC",
          textPrimary: "#010203",
          textSecondary: "#545454",
          border: "#B0B0B0",
          divider: "#B0B0B0",

          success: "#00CCCC",
          warning: "#FFCC00",
          danger: "#A83100",
        },
      },
    },
  },

  compatibilityDate: "2025-02-04",
});
