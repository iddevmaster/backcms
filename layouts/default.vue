<script lang="ts" setup>

import Head from '@/components/layout/Head.vue';
import Sidebar from '@/components/layout/Sidebar.vue';


</script>
<template>

   





    <Head></Head>
    <!--  END NAVBAR  -->

    <!--  BEGIN MAIN CONTAINER  -->
    <div class="main-container" id="container">

        <div class="overlay"></div>
        <div class="search-overlay"></div>

        <!--  BEGIN SIDEBAR  -->
        <Sidebar></Sidebar>
        <!--  END SIDEBAR  -->

        <!--  BEGIN CONTENT AREA  -->

           <NuxtPage />
       

    </div>

</template>

<style scoped></style>