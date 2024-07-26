


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { LessonStore } from '@/store/lesson'
import { GroupStore } from '@/store/group'
import { useAuthStore } from '@/store/auth'
import LessonFormCreate from '@/components/lesson/LessonFormCreate.vue'

import { useToast } from 'vue-toastification';
import { ref } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { onMounted } from 'vue'


definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1]
})

const auth = useAuthStore()
const store = LessonStore()
const storegroup = GroupStore()

store.isLoading = true;
const toast = useToast();
// store.formcreatelesson.user_id = auth.user_id
store.user_id = auth.user_id
const group = await store.fetchGrouplist();


onMounted(async()  => {
store.isLoading = false;
    })



  
</script>

<template>

<LessonFormCreate></LessonFormCreate>
</template>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  width: 50%;
}

button {
  margin-top: 10px;
}

</style>