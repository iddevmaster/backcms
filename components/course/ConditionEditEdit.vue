<template>
  <div v-if="store.openEditConEdit" class="modal">
    <div
      class="modal-content modal-dialog modal-xl"
      id="deleteConformationLabel"
    >
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          Edit ในส่วนของ Edit
        </h5>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">
              {{ $t("group_name") }}:</label
            >

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
      
   


      <v-select
v-model="store.mycondition_group"
    :options=" stores.group"
    label="cg_name"
     placeholder="ເລືອກ"
       
  ></v-select>



 
    </div>

    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
      <input
              type="text"
              class="form-control"
              id="recipient-name"
              v-model="store.formDataCondit.cc_value_a"
              maxlength="2"
              @input="filterInputCgNameA"
            />

       

    </div>

    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
      
      <input
              type="text"
              class="form-control"
              id="recipient-name"
              v-model="store.formDataCondit.cc_value_b"
              maxlength="2"
              @input="filterInputCgNameB"
            />
         
    </div>
  
    
    
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn btn-light-dark"
          data-bs-dismiss="modal"
          @click="closeModal()"
        >
          <i class="flaticon-cancel-12"></i> {{ $t("menu_exam_modal_close") }}
        </button>
        <button type="button" class="btn btn-primary"    @click="save()">
          {{ $t("menu_exam_modal_save") }}
        </button>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { CourseStore } from "@/store/course";
import { LessonStore } from "@/store/lesson";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select';
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
const { locale, setLocale } = useI18n();

const toast = useToast();
const store = CourseStore();
const stores = LessonStore();
const router = useRouter();

const { FormDataCondition } = storeToRefs(store);

const rules = computed(() => {
  return {
    cc_value_a: {
      required: helpers.withMessage('Exam code field is required', required),
      minLength: minLength(1),
    },
    cc_value_b: {
      required: helpers.withMessage('Exam code field is required', required),
      minLength: minLength(1),
    },

    cg_id: {
      required: helpers.withMessage('Exam code field is required', required),
      minLength: minLength(1),
    },
 
  };
});

const save = async () => {
  ///////////// บันทึก
await store.UpdateCondition()
store.openEditConEdit = false;
await store.FetchCondition(router.currentRoute.value.params.id);
};

const closeModal = async () => {
store.openEditConEdit = false;
}

const filterInputCgNameA = async (event) => {

     
};

const filterInputCgNameB = async (event) => {

     
};

</script>


