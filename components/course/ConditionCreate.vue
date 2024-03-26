<template>
  <div v-if="store.openModalCreateCon" class="modal">
    <div
      class="modal-content modal-dialog modal-xl"
      id="deleteConformationLabel"
    >
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          {{ $t("group_add") }}
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

  <span v-if="v$.cg_id.$error" class="text-xs text-red-500" style="color: red">
              ຕ້ອງໃສ່ຂໍ້ຄວາມ.</span>

 
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

            <span
              v-if="v$.cc_value_a.$error"
              class="text-xs text-red-500"
              style="color: red"
            >
              ຕ້ອງໃສ່ຂໍ້ຄວາມ.</span
            >

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
            <span
              v-if="v$.cc_value_b.$error"
              class="text-xs text-red-500"
              style="color: red"
            >
              ຕ້ອງໃສ່ຂໍ້ຄວາມ.</span
            >
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
const v$ = useVuelidate(rules, FormDataCondition);
const save = async () => {
  ///////////// บันทึก
  v$.value.$validate(); ///////////ดัก req
  store.formDataCondit.cg_id = store.mycondition_group.cg_id
  store.formDataCondit.cg_name = store.mycondition_group.cg_name

await store.AddCondition();
await store.ResetCondition();

store.mycondition_group = null;
store.openModalCreateCon = false;
v$.value.$reset();


};

const closeModal = async () => {
store.openModalCreateCon = false;
}

const filterInputCgNameA = async (event) => {

     
};

const filterInputCgNameB = async (event) => {

     
};

</script>


