import { firebaseApp } from './helpers/firebase';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: 'Emoji Panel - %s',
      link: [
        {
          href: 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
          rel: 'stylesheet',
        },
      ],
    },
  },

  //css: ['~/assets/styles.css'],

  modules: ['nuxt-vuefire', '@nuxtjs/tailwindcss', 'nuxt-icon', ['@pinia/nuxt',
    {
      autoImports: [
        // automatically imports `defineStore`
        'defineStore', // import { defineStore } from 'pinia'
        // automatically imports `defineStore` as `definePiniaStore`
        ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
      ],
    },
  ],],

  vuefire: {
    auth: true,
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
  },

  // TODO: maybe not needed for the demo
  typescript: {
    shim: false,
  },
})
