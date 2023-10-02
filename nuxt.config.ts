// https://nuxt.com/docs/api/configuration/nuxt-config
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    '@vueuse/nuxt',
    '@use-wagmi/nuxt',
    '@pinia/nuxt'
  ],
  vite: {
    resolve: {
      alias: {
        process: 'process/browser',
        util: 'util',
      },
    },

  }
})