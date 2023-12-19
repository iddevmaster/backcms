<template>
 <NuxtLayout/>

  </template>

<script setup lang="ts">


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
      { rel: 'icon', type: 'image/png', href: '/LogoPWT.png' }
      // You can add other link tags here
    ]
})


</script>



