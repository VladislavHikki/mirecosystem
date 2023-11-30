// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'МИР - социальная экосистема',
      script: [
        { src: '/createjs-2015.11.26.min.js'},
        { src: '/sistema-mir.js'},
        { src: '/mir2.js'},
        { src: '/ekosistema-mir.js'},
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/default.svg' },
      ]
    },
  },
  modules: ['@pinia/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss";',
        },
      },
    },
  },
  css: [
    '~/assets/scss/index.scss',
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'cropperjs/dist/cropper.css',
  ],
  build: {
    transpile: ['primevue'],
  },
  devtools: {
    enabled: true,
  },
});
