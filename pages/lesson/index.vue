


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { LessonStore } from '@/store/lesson'
import { GroupStore } from '@/store/group'
import { useAuthStore } from '@/store/auth'
import LessonListAll from '@/components/lesson/LessonListAll.vue'


import { useToast } from 'vue-toastification';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { onMounted } from 'vue'


definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2]
});



const auth = useAuthStore()

const user_type = useCookie('user_type');

const store = LessonStore()
const storegroup = GroupStore()

store.isLoading = true;
const toast = useToast();

store.user_id = auth.user_id
store.myselect_group = null
const group = await store.fetchGrouplist();
const lessonlist = await store.fetchLessonlist();
await store.fetchGroupName();




onMounted(async()  => {
store.isLoading = false;
    })



  const modalStore = useModalStore();
  const { GetopenModal } = storeToRefs(store); //Get Getter
  const { GetopenModal_ID } = storeToRefs(store); //Get Getter

  const { Pending } = storeToRefs(store); //Get Getter



  
</script>

<template>
   <loading v-model:active="store.isLoading" :can-cancel="true"
                />
  <div id="content" class="main-content">
            <div class="layout-px-spacing">
              <div class="page-meta">
                        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"> {{ $t("title_lesson") }} </a></li>
                                <li class="breadcrumb-item active" aria-current="page"> {{ $t("title_lesson_t") }}</li>
                            </ol>
                        </nav>
                    </div>
                <Loading v-if="Pending"></Loading>
            <LessonListAll :user_type="user_type"></LessonListAll>
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