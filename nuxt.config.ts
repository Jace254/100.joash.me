// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@vueuse/nuxt', '@unocss/nuxt', '@nuxtjs/color-mode', '@nuxt/content', 'radix-vue/nuxt'],
  colorMode: {
    classSuffix: '',
  },
  app: {
    head: {
      titleTemplate: '100 days',
    },
  },
})
