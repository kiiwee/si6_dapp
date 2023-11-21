// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // ssr: true,

  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      KEY_INF: process.env.INFURA_API_KEY_SECRET,
      SECRET_INF: process.env.INFURA_API_KEY
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    '@pinia/nuxt',

  ],
  // routeRules: { '/web/v1/**': { proxy: { to: "http://localhost:3000/web/v1/**", }, } },
  vite: {
    resolve: {
      alias: {
        process: 'process/browser',
      },
    },

  }
})