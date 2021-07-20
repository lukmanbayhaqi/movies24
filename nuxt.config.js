export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,

  head: {
    title: "Movies24",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "keywords", name: "keywords", content: "Movies24 Lukman Bayhaqi" },
      {
        hid: "description",
        name: "description",
        content:
          "List movies using TMDB API that show to you now playing movies around the world created by Lukman Bayhaqi"
      },
      { "data-rh": true, property: "og:title", content: "Movies24" },
      { "data-rh": true, property: "og:site_name", content: "Movies24" },
      {
        "data-rh": true,
        property: "og:description",
        content:
          "List movies using TMDB API that show to you now playing movies around the world created by Lukman Bayhaqi"
      },
      { "data-rh": true, property: "og:url", content: "movies24-lukman" },
      {
        "data-rh": true,
        property: "og:image",
        content:
          "https://tvadvertising.uk/wp-content/uploads/2017/12/movies24.png"
      },
      {
        "data-rh": true,
        property: "og:image:secure_url",
        content:
          "https://tvadvertising.uk/wp-content/uploads/2017/12/movies24.png"
      },
      { "data-rh": true, property: "og:image:type", content: "image/png" },
      { "data-rh": true, property: "og:image:width", content: "1200" },
      { "data-rh": true, property: "og:image:height", content: "1200" },
      { "data-rh": true, property: "og:image:alt", content: "Movies24" },
      { "data-rh": true, property: "og:type", content: "website" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/icon.png" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/styles/index.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/axios"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa"
  ],

  bootstrapVue: {
    icons: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
