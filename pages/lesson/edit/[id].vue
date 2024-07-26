


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { LessonStore } from '@/store/lesson'
import { GroupStore } from '@/store/group'
import { useAuthStore } from '@/store/auth'
import LessonFormEdit from '@/components/lesson/LessonFormEdit.vue'

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
const router = useRouter();

store.isLoading = true;
const toast = useToast();
// store.formcreatelesson.user_id = auth.user_id
store.user_id = auth.user_id
const group = await store.fetchGrouplist();

await store.fetchLessonId(router.currentRoute.value.params.id);




onMounted(async()  => {
store.isLoading = false;
})



  
</script>

<template>

<div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#"> {{ $t("lesson_head") }} </a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ $t("lesson_head_edit") }}
            </li>
          </ol>
        </nav>
        <LessonFormEdit :cs_id="store.cs_id"></LessonFormEdit>
      </div>
    </div>
  </div>
  


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