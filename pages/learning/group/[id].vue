<script setup lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import ErrorUpload from "@/components/course/ErrorUpload.vue";
import { useAuthStore } from "@/store/auth";
import { CourseStore } from "@/store/course";

import { GroupStore } from '@/store/group'
import LearningAddGroup from "@/components/course/LearningAddGroup.vue";
import LearningViewCateGroup from "@/components/course/LearningViewCateGroup.vue";
import { useToast } from "vue-toastification";
import ApiService from "../../../services/api.service";
import { useI18n } from "vue-i18n";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import Swal from "sweetalert2";
import { useVuelidate } from "@vuelidate/core";
import { onMounted } from "vue";
import { ref } from 'vue';
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
const { locale, setLocale } = useI18n();
definePageMeta({
  middleware: ["auth", "roles"],
  allowedRoles: [1, 2],
});

const auth = useAuthStore();
const store = CourseStore();
const toast = useToast();
const router = useRouter();
const storegroup = GroupStore();


store.user_id = auth.user_id;
await storegroup.fetchCourseCgIdGroup(router.currentRoute.value.params.id);
await storegroup.fetchGrouplist();

const delete_userid = async () => {

  const delc = await storegroup.DeleClusterSingle();
  if(delc){
   await toast.success('ລຶບຂໍ້ມູນສຳເລັດ');
 await storegroup.fetchCourseCgIdGroup(router.currentRoute.value.params.id);
 storegroup.GetopenModalDe = false;
      }else{
   toast.error('ລຶບຂໍ້ມູນລົ້ມເຫລວ')
      }

  };

  const closeModal = async () => {

storegroup.GetopenModalGEdit = false;
storegroup.GetopenModalDe = false;
  };

    const update_d = async () => {
storegroup.GetopenModalGEdit = false;
storegroup.GetopenModalDe = false;

await storegroup.fetchCourseCgIdGroupUpdate();
await storegroup.fetchCourseCgIdGroup(router.currentRoute.value.params.id);
  };


const filterInput = async (event) => {
  // stores.form.user_phone = event.target.value.replace(/\D/g, "");


  const key = event.data;
      if (event.data === ' ') {
        storegroup.cg_amount_random = storegroup.cg_amount_random.substring(0, storegroup.cg_amount_random.length - 1);
        return;
      }
      if (storegroup.cg_amount_random.charAt(0) == '0') {
        storegroup.cg_amount_random = "";
        return;
      } 
      // if ((storegroup.total_group.charAt(1) !== '') && (storegroup.total_group.charAt(1) !== '0')) {
      //   storegroup.total_group = "2";
      //   return;
      // } 
      storegroup.cg_amount_random = event.target.value.replace(/\D/g, "");
};


onMounted(async () => {
  store.isLoading = false;
});
</script>

<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">{{ $t("menu_couse") }} </a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ $t("menu_exam_history_course") }}
            </li>
          </ol>
        </nav>
      </div>
      <loading v-model:active="store.isLoading" :can-cancel="true" />
      <div class="middle-content container-xxl">
        <div class="row layout-top-spacing">
         
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <LearningAddGroup></LearningAddGroup>
         
         
          </div>
          <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
            <LearningViewCateGroup :id="router.currentRoute.value.params.id"></LearningViewCateGroup>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>

    <div class="modal" v-if="storegroup.GetopenModalDe" >
<div class="modal-content" id="deleteConformationLabel">
                                <div class="modal-header">
                                    <div class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </div>
                                    <h5 class="modal-title" id="exampleModalLabel">{{ $t("delete_record") }}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p class="">{{ $t("delete_record_t") }}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal" >{{ $t("cancel") }}</button>
                                    <button type="button" class="btn btn-danger" data-remove="task"  @click="delete_userid()">{{ $t("delete") }} </button>
                                </div>
                            </div>
  </div>

      <div class="modal" v-if="storegroup.GetopenModalGEdit" >
<div class="modal-content" id="deleteConformationLabel">
                                <div class="modal-header">
                                    <div class="icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </div>
                                    <h5 class="modal-title" id="exampleModalLabel">แก้ไข</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                   <input type="text" class="form-control" id="recipient-name" v-model="storegroup.cg_amount_random" @input="filterInput" maxlength="2">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal" >{{ $t("cancel") }}</button>
                                    <button type="button" class="btn btn-danger" data-remove="task"  @click="update_d()">Save</button>
                                </div>
                            </div>
  </div>
</template>

<style>
.fot-bl{
  font-weight: bold;
}

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