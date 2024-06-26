


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { LessonStore } from '@/store/lesson'
import { GroupStore } from '@/store/group'
import { useAuthStore } from '@/store/auth'
import LessonListAll from '@/components/lesson/LessonListAll.vue'
import LessonCreate from '@/components/lesson/LessonCreate.vue'
import LessonEdit from '@/components/lesson/LessonEdit.vue'

import { useToast } from 'vue-toastification';
import { ref } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { onMounted } from 'vue'

definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2]
})

const auth = useAuthStore()
const store = LessonStore()

store.isLoading = true;
const toast = useToast();
store.formcreatelesson.user_id = auth.user_id
store.user_id = auth.user_id
store.myselect_group = null
const group = await store.fetchGrouplist();

store.formsearchlesson.per_page = 10
store.formsearchlesson.page = 1
store.formsearchlesson.search = "";


store.cg_id = 0;

onMounted(async()  => {
      // Fetch items when the component is mounted
      const lessonlist = await store.fetchLessonlist();

//await store.paginatedItems() 
store.isLoading = false;
     
    })



  const modalStore = useModalStore();
  const { GetopenModal } = storeToRefs(store); //Get Getter
  const { GetopenModal_ID } = storeToRefs(store); //Get Getter

  const { Pending } = storeToRefs(store); //Get Getter

  const closeModal = () => {
    //store.closeModal();
  };


const delete_userid = async (id) => {

  const delc = await store.selectlessId(id);
  if(delc){

      }else{
   toast.error('ລຶບຂໍ້ມູນລົ້ມເຫລວ')
      }

  };
  
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
            <LessonListAll></LessonListAll>
            </div>
          </div>

   <LessonCreate></LessonCreate>
    <LessonEdit></LessonEdit>
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