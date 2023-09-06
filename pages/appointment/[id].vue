<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { AppointStore } from '@/store/appoint'
import { useAuthStore } from '@/store/auth';
import AppointEdit from '@/components/appointment/AppointEdit.vue';
import { useToast } from 'vue-toastification';

import { AlertStore } from '@/store/alert'; // import the auth store we just created
definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory 
})

const route = useRoute();

const store = AppointStore()
const auth = useAuthStore()
const toast = useToast()
store.user_id = auth.user_id
store.forminsert.user_id = auth.user_id
store.ap_id = route.params.id;
let fetchapp = await store.fetchAppointmentId();
if(fetchapp == false){
    toast.error('Information cannot be displayed')
}
</script>

<template>
    <div id="content" class="main-content" v-if="fetchapp">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                     <li class="breadcrumb-item"><a href="#">Appointment</a></li>
            <li class="breadcrumb-item active" aria-current="page">Appointment Edit</li>
                    </ol>
                </nav>
            </div>
            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <AppointEdit></AppointEdit>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style></style>