


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'
import { DltStore } from '@/store/dlt'

import { useModalStore } from '@/store/modal';
import DLTALL from '@/components/licensense/DLTALL.vue'


import { useToast } from 'vue-toastification'
import ApiService  from "../../../services/api.service";
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2]
})
const toast = useToast()
const store = usersStore()
const storedlt = DltStore()
const auth = useAuthStore()
const router = useRouter();
store.user_id = auth.user_id
storedlt.user_id = auth.user_id
storedlt.mydlt = []


</script>


<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">ຄົ້ນຫາຜູ້ໃຊ້</a></li>
            <li class="breadcrumb-item active" aria-current="page"> (ປະຊາຊົນ ສະເພາະແຂວງຕົນເອງ)</li>
          </ol>
        </nav>
      </div>
      
      <div class="middle-content container-xxl p-0">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
            <div class="widget-content widget-content-area br-8 p-3">
              <DLTALL></DLTALL>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  


</template>

<style scoped>



</style>
