<template>
 <NuxtLayout/>

  </template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth'



useSeoMeta({
  title: 'DoT Smart App',
  ogTitle: 'DoT Smart App',
  description: 'DoT Smart App.',
  ogDescription: 'DoT Smart App',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})


useHead({
  
  link: [
      { rel: 'icon', type: 'image/png', href: '/LogoPWT.png' },
      {
        rel: 'stylesheet',
        href: 'https://db.onlinewebfonts.com/c/938a9833b7244d806eca3349487c68ba?family=Phetsarath+OT',
      },
      // You can add other link tags here
    ]
})


</script>



