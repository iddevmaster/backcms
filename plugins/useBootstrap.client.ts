import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('bootstrap', bootstrap)
})