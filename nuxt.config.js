// import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - coffee_order_web',
    title: 'coffee_order_web',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Quicksand&display=swap" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/persistedstate',
    '~/plugins/vee-validate',
    { src: '~/plugins/vue-client', ssr: false }
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components/global', global: true },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyBDMqg_uurmHryE0qAWbMVNk_cDv9zkwi0",
          authDomain: "coffeeorderfinal.firebaseapp.com",
          databaseURL: "https://coffeeorderfinal-default-rtdb.firebaseio.com",
          projectId: "coffeeorderfinal",
          storageBucket: "coffeeorderfinal.appspot.com",
          messagingSenderId: "679686712893",
          appId: "1:679686712893:web:7844a3fbd979d35dd20454",
          measurementId: "G-R03WKS56EJ"
        },
        services: {
          auth: true,
          firestore: true,
          functions: true,
          storage: true,
          database: true,
          messaging: true,
          performance: true,
          analytics: true,
          remoteConfig: true
        }
      },
    ],
    [
    'nuxt-i18n',
      {
        lazy: true,
        detectBrowserLanguage: false,
        langDir: 'locales/',
        defaultLocale: 'vi-vn',
        strategy: 'no_prefix',
        locales: [
          {
            code: 'vi-vn',
            file: 'vi-VN.js'
          },
          {
            code: 'en-gb',
            file: 'en-GB.js'
          },
        ],
      },
    ]
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        // dark: {
        //   primary: colors.blue.darken2,
        //   accent: colors.grey.darken3,
        //   secondary: colors.amber.darken3,
        //   info: colors.teal.lighten1,
        //   warning: colors.amber.base,
        //   error: colors.deepOrange.accent4,
        //   success: colors.green.accent3
        // }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
  },
  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  router: {
    middleware: "authenticated",
    prefetchLinks: false,
  },
}
