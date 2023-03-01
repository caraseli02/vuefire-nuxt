// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: 'NuxtFire',
    },
  },

  //css: ['~/assets/styles.css'],

  modules: ['nuxt-headlessui', '@nuxtjs/i18n', 'nuxt-vuefire', '@nuxtjs/tailwindcss', 'nuxt-icon', '@formkit/nuxt',
    ['@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],

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
  i18n: {
    // add `vueI18n` option to `@nuxtjs/i18n` module options
    vueI18n: {
      legacy: false,
      locale: 'en',
      messages: {
        en: {
          enter: 'Log in',
          signUp: 'Sign up',
          email: 'Email',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          login: 'Login',
          register: 'Register',
          forgotPassword: 'Forgot Password',
        },
        es: {
          enter: 'Iniciar sesión',
          signUp: 'Regístrate',
          email: 'Correo electrónico',
          password: 'Contraseña',
          confirmPassword: 'Confirmar contraseña',
          login: 'Iniciar sesión',
          register: 'Registrarse',
        }
      }
    }
  },
  typescript: {
    shim: false,
  },
})
