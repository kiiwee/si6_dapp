// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      KEY_INF: process.env.INFURA_API_KEY_SECRET,
      SECRET_INF: process.env.INFURA_API_KEY
    },
  },
  routes: { '/': { prerender: true }, '/*': { cors: false } },
  modules: [
    "@nuxtjs/tailwindcss",
    '@pinia/nuxt',

  ],

  vite: {
    resolve: {
      alias: {
        process: 'process/browser',
      },
    },

  }
})