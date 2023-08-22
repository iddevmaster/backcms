<script lang="ts" setup>

import Head from '@/components/layout/Head.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import { defineComponent } from 'vue';
definePageMeta({
  middleware: 'auth' // this should match the name of the file inside the middleware directory 
})
import { useAuthStore } from '@/store/auth';


const store = useAuthStore();
</script>
<template>



    <Head></Head>
    <!--  END NAVBAR  -->

    <!--  BEGIN MAIN CONTAINER  -->
    <div class="main-container" :class="{ 'sbar-open': store.isActiveBar,'sidebar-closed':store.isActiveSide }"  id="container">
        <!--  BEGIN SIDEBAR  -->
        <Sidebar></Sidebar>
        <!--  END SIDEBAR  -->

        <!--  BEGIN CONTENT AREA  -->

           <NuxtPage />
       

    </div>

</template>



<style scoped></style>