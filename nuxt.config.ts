// https://nuxt.com/docs/api/configuration/nuxt-config
// import { route } from "./services/seo.router";

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  css: [
  '~/assets/src/bootstrap/css/bootstrap.min.css',
  '~/assets/layouts/modern-light-menu/css/light/plugins.css',
  '~/assets/src/plugins/src/apex/apexcharts.css',
  '~/assets/src/assets/css/light/dashboard/dash_1.css',
  '~/assets/layouts/modern-light-menu/css/light/loader.css',
  '~/assets/layouts/modern-light-menu/css/light/plugins.css',
  '~/assets/src/assets/css/light/authentication/auth-boxed.css',
  '~/assets/src/plugins/src/table/datatable/datatables.css',
  '~/assets/src/plugins/css/light/table/datatable/dt-global_style.css',
  '~/assets/src/assets/css/light/elements/alert.css',
  '~/assets/src/assets/css/light/elements/custom-pagination.css',
  '~/assets/src/plugins/css/light/filepond/custom-filepond.css',
  '~/assets/src/plugins/css/light/flatpickr/custom-flatpickr.css',
  '~/assets/src/assets/css/light/apps/invoice-add.css',
  '~/assets/src/assets/css/light/apps/invoice-preview.css',
  '~/assets/src/assets/css/light/scrollspyNav.css',
  '~/assets/src/assets/css/light/components/tabs.css',
],


// hooks: {
//   'pages:extend': (pages) => {
//     pages.map((page) => {
//       route.forEach(seoRoute => {
//         if (seoRoute.name === page.name) {
//           Object.assign(page, {path: seoRoute.path,allowedRoles:seoRoute.allowedRoles});
//         }
//       })
//     })
//   }
// },

// css: ['~/assets/styles/main.scss'],

sourcemap: { server: true, client: false },
modules: [
  '@pinia/nuxt',
],
imports: {
    dirs: ['./store'],
  },
app:{

  head: {
    script: [
    
      // { src: '/src/bootstrap/js/bootstrap.bundle.min.js', defer: true },
      // { src: '/assets/layouts/modern-light-menu/app.js',  },
      // { src: '/src/plugins/src/perfect-scrollbar/perfect-scrollbar.min.js', defer: true },
      // { src: '/src/plugins/src/mousetrap/mousetrap.min.js', defer: true },
      // { src: '/src/plugins/src/waves/waves.min.js', defer: true },
      // { src: '/src/plugins/src/apex/apexcharts.min.js', defer: true },
      // { src: '/src/assets/js/apps/invoice-list.js', defer: true },
      // { src: '/src/plugins/src/table/datatable/datatables.js', defer: true },
      // { src: '/src/plugins/src/table/datatable/button-ext/dataTables.buttons.min.js', defer: true },
      // { src: '/src/plugins/src/global/vendors.min.js', defer: true },

    ]

  },
},






vite: {
  define: {
    "process.env.DEBUG": false,
  },
  
},
})
