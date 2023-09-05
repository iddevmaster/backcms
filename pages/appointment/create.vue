<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { AppointStore } from '@/store/appoint'
import { useAuthStore } from '@/store/auth';
import AppointCreate from '@/components/appointment/AppointCreate.vue'

import { AlertStore } from '@/store/alert'; // import the auth store we just created
definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory 
})



const store = AppointStore()
const auth = useAuthStore()
store.user_id = auth.user_id
store.forminsert.user_id = auth.user_id

</script>

<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                     <li class="breadcrumb-item"><a href="#">Appointment</a></li>
            <li class="breadcrumb-item active" aria-current="page">Appointment Create</li>
                    </ol>
                </nav>
            </div>
            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <AppointCreate></AppointCreate>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style></style>