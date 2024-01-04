<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import { useAuthStore } from '@/store/auth';
import { ResultStore } from '@/store/result';
import ResultEdit from '@/components/result/ResultEdit.vue'
import ResultSearch from '@/components/result/ResultSearch.vue'
import ResultNodata from '@/components/result/ResultNodata.vue'
import ResultListUser from '@/components/result/ResultListUser.vue'

import { useToast } from 'vue-toastification'
import { AlertStore } from '@/store/alert'; // import the auth store we just created
definePageMeta({
  middleware: ['auth','roles'],
  allowedRoles: [1,2],
})



const toast = useToast()
const auth = useAuthStore()

const store = ResultStore()

store.myChoose = [];
store.resultUser = [];
store.IsCardInsert = false
store.IsCardEdit = false;
store.IsCardNoInsert = false;
store.userall = [];
store.IsCardListByUser = false;

const closeModal = () => {
    store.modaldelete = false;
};

  const dele = async (id) => {
    let delel = await store.DeleteResult();
  console.log(delel);
  store.modaldelete = false;
  if(delel == true){
    toast.success('Delete Data');
    await store.fetchResultByUser()

  }
};


</script>

<template>
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="page-meta">
                <nav class="breadcrumb-style-one" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                     <li class="breadcrumb-item"><a href="#">{{ $t("menu_result") }}</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $t("menu_result_form_edit") }}</li>
                    </ol>
                </nav>
            </div>
            <div class="middle-content container-xxl p-0">
                   <div class="row layout-top-spacing">
                        <div class="widget-content widget-content-area br-8 p-3 text-danger">
                            {{ $t("choose_user_edit_t") }} <b><u>{{ $t("choose_user_edit_verify") }}</u></b> {{ $t("choose_user_edit_e") }}
                        </div>
                    </div>
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ResultSearch></ResultSearch>
                        </div>
                    </div>
                </div>
                <div class="row layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing"  v-if="store.resultUser.length > 0" >
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ResultListUser></ResultListUser>
                        </div>
                    </div>
                        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing"  v-if="store.ShowNodataResult">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ResultListUser></ResultListUser>
                        </div>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing" v-if="store.IsCardEdit">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ResultEdit></ResultEdit>
                        </div>
                    </div>

                          <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing" v-if="store.IsCardNoInsert">
                        <div class="widget-content widget-content-area br-8 p-3">
                            <ResultNodata></ResultNodata>
                        </div>
                    </div>

            
                </div>


            </div>

        </div>
    </div>

    <div v-if="store.modaldelete" class="modal">
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
                                    <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal" >Cancel</button>
                                    <button type="button" class="btn btn-danger" data-remove="task" @click="dele">Delete</button>
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

</style>