<template>
  <div v-if="store.openModalError" class="modal">
    <div
      class="modal-content modal-dialog modal-xl"
      id="deleteConformationLabel"
    >
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style="color:red">
          Select File Error
        </h5>
      </div>
      <div class="modal-body">
  <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Files Name</th>
              <th scope="col">Action</th>
             
            </tr>
          </thead>
          <tbody>
            <tr v-for="(file, index) in store.selectedFilesError" :key="index">
              <th scope="row">{{index + 1}}</th>
              <td>{{file.name}}</td>
              <td><i class="bi bi-x" style="color:red;font-size:24px;"></i></td> 
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn btn-light-dark"
          data-bs-dismiss="modal"
          @click="closeModal()"
        >
          <i class="flaticon-cancel-12"></i> {{ $t("menu_exam_modal_close") }}
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



const closeModal = async () => {
store.openModalError = false;
}
const filterInputCgNameA = async (event) => {
  const key = event.data;
      if (event.data === ' ') {
        store.formDataCondit.cc_value_a = store.formDataCondit.cc_value_a.substring(0, store.formDataCondit.cc_value_a.length - 1);
        return;
      }
      if (store.formDataCondit.cc_value_a.charAt(0) === '0') {
        store.formDataCondit.cc_value_a = store.formDataCondit.cc_value_a.substring(0, store.formDataCondit.cc_value_a.length - 1);
        return;
  } 
    store.formDataCondit.cc_value_a = event.target.value.replace(/\D/g, "");
};

const filterInputCgNameB = async (event) => {


  const key = event.data;
      if (event.data === ' ') {
        store.formDataCondit.cc_value_b = store.formDataCondit.cc_value_b.substring(0, store.formDataCondit.cc_value_b.length - 1);
        return;
      }
      if (store.formDataCondit.cc_value_b.charAt(0) === '0') {
        store.formDataCondit.cc_value_b = store.formDataCondit.cc_value_b.substring(0, store.formDataCondit.cc_value_b.length - 1);
        return;
  } 
    store.formDataCondit.cc_value_b = event.target.value.replace(/\D/g, "");

     
};


</script>


