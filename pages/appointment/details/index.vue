


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { AppointStore } from '@/store/appoint'

import AppointList from '@/components/appointment/AppointList.vue'
import AppointListByGroup from '@/components/appointment/AppointListByGroup.vue'
import APPProfile from "@/components/appointment/Profile.vue";

import { useModalStore } from '@/store/modal';
import { useToast } from 'vue-toastification'
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2]
})
const toast = useToast()
const store = AppointStore();


const auth = useAuthStore();
const router = useRouter();
store.user_id = auth.user_id

const apnumber = localStorage.getItem('ap_number');
if(apnumber){
  store.searchapp.ap_number = apnumber;
 await store.fetchAppNumber();
 await store.fetchHistoryCourse();
 await store.fetchHistoryExam();
 await store.fetchDlt();
 await store.fetchExamScore();
 
}

store.group = []; 
const closeModal = () => {
  store.closeModal();
};


const SearchApp = async () => {
  localStorage.setItem('ap_number',store.searchapp.ap_number);

};



</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">{{ $t("menu_app_manage") }}</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_app_manage_all") }}</li>
          </ol>
        </nav>
      </div>

      <div class="middle-content container-xxl p-0">
        <div class="row layout-top-spacing">
      
          <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
            <APPProfile  ></APPProfile>
          </div>
        </div>


        
      </div>
    </div>
  </div>
  <div v-if="store.isShowModal" class="modal">
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
        <h5 class="modal-title" id="exampleModalLabel">{{ $t("delete_record") }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p class="">{{ $t("delete_record_t") }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal">Cancel</button>
        <button type="button" class="btn btn-danger" data-remove="task" @click="deletel()">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>