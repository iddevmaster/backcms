


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { GroupStore } from '@/store/group'
import { useAuthStore } from '@/store/auth'
import GroupList from '@/components/group/GroupList.vue'
import GroupCreate from '@/components/group/GroupCreate.vue'
import GroupEdit from '@/components/group/GroupEdit.vue'


import { useToast } from 'vue-toastification';
import { ref } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2]
})

const auth = useAuthStore()
const store = GroupStore()
const toast = useToast();
store.formcreategroup.user_id = auth.user_id

const user_type = useCookie('user_type'); // useCookie new hook in nuxt 3

 store.fetchGrouplist();
  const closeModal = () => {
    store.GetopenModal = false;
  };

  const delet = async () => {
    let dele = await store.DeleteGroup();
 
    if(dele === true){
      await toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ')
      store.GetopenModal = false;
      
      await store.fetchGrouplist();
    }else {
      await toast.error('ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ')
      store.GetopenModal = false;
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
                                <li class="breadcrumb-item"><a href="#"> {{ $t("title_group") }} </a></li>
                                <li class="breadcrumb-item active" aria-current="page"> {{ $t("title_group_t") }}</li>
                            </ol>
                        </nav>
                    </div>
            <GroupList :user_type="user_type"></GroupList>
            </div>
          </div>

 <GroupCreate></GroupCreate>
 <GroupEdit></GroupEdit>
    <!-- <LessonEdit></LessonEdit> -->

    <div class="modal"  v-if="store.GetopenModal">
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
                                    <button type="button" class="btn btn-danger" data-remove="task" @click="delet">{{ $t("delete") }} </button>
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