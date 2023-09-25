<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { AppointStore } from '@/store/appoint'
import { useAuthStore } from '@/store/auth';
import AppointView from '@/components/appointment/AppointView.vue';
import ReserveCreate from '@/components/appointment/ReserveCreate.vue';
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
store.formedit.user_id = auth.user_id
store.ap_id = route.params.id;
store.FetchAP();



let fetchapp = await store.fetchAppointmentId();
if(fetchapp == false){
    toast.error('Information cannot be displayed')
}

const closeModal = async () => {
await store.closeModal()
 };

 const deletel = async () => {
await store.deleteRerve()
store.isDelAP = false;
await store.FetchAP();
await store.fetchAppointment();
await store.fetchUsers();
 };
</script>

<template>
    <div id="content" class="main-content" v-if="fetchapp">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                     <li class="breadcrumb-item"><a href="#">{{ $t("menu_app_view") }}</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_app_view_list") }}</li>
                    </ol>
                </nav>
            </div>
            <div class="middle-content container-xxl p-0">
                <div class="row layout-top-spacing">
                      <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ReserveCreate></ReserveCreate>
                        </div>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <AppointView></AppointView>
                       
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div v-if="store.isDelAP" class="modal">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-trash-2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </div>
        <h5 class="modal-title" id="exampleModalLabel">ต้องการลบรายการนี้?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p class="">หากคุณลบรายกานนี้ รายการนั้นจะหายไปตลอดกาล คุณแน่ใจหรือไม่ว่าต้องการดำเนินการต่อ?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal">Cancel</button>
        <button type="button" class="btn btn-danger" data-remove="task" @click="deletel()">Delete</button>
      </div>
    </div>
  </div>
</template>

<style></style>