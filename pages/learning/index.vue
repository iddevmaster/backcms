


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { CourseStore } from '@/store/course'
import { useAuthStore } from '@/store/auth'
import CourseList from '@/components/course/CourseList.vue'
import { useModalStore } from '@/store/modal';

import Alert from '@/components/layout/Alert.vue';
import { useToast } from 'vue-toastification';
import { ref } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2]
})

const auth = useAuthStore()
const store = CourseStore()
store.ResetFetch()
store.formDataCourse.user_id = auth.user_id
store.formDataEditCourse.user_id = auth.user_id
store.formDatalesson.user_id = auth.user_id
store.formDataeditlesson.user_id = auth.user_id



const toast = useToast()

  const { deleteItem_id } = CourseStore();//Action
  const { fetchCourslist } = CourseStore();//Action



  
  const modalStore = useModalStore();
  const { GetopenModal } = storeToRefs(store); //Get Getter
  const { GetopenModal_ID } = storeToRefs(store); //Get Getter

  const { Pending } = storeToRefs(store); //Get Getter

  const closeModal = () => {
    store.closeModal();
  };


const delete_userid = async (id) => {

  const delc = await store.deleteItem_id(id);
  if(delc){
    toast.success('ລຶບຂໍ້ມູນສຳເລັດ');
    await store.fetchCourslist()
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
                                <li class="breadcrumb-item"><a href="#">{{ $t("menu_page_course") }} </a></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_page_course_page") }}</li>
                            </ol>
                        </nav>
                    </div>
                <Loading v-if="Pending"></Loading>
            <CourseList></CourseList>
            </div>
          </div>
  <div class="modal"  v-if="GetopenModal">
<div class="modal-content" id="deleteConformationLabel">
                                <div class="modal-header">
                                    <div class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
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
                                    <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal" >{{ $t("cancel") }}</button>
                                    <button type="button" class="btn btn-danger" data-remove="task"  @click="delete_userid(GetopenModal_ID)">{{ $t("delete") }} </button>
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