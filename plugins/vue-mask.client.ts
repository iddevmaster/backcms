import { defineNuxtPlugin } from '#app'
import VueMask from '@devindex/vue-mask'; // <-- ADD THIS LINE



export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueMask)
})