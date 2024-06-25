<template>
  <div v-if="store.GetopenModalCreate" class="modal">
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

            <input
              type="text"
              class="form-control"
              id="recipient-name"
              v-model="store.formcreategroup.cg_name_lo"
              maxlength="100"
              @input="filterInputCgName"
            />

            <span
              v-if="v$.cg_name_lo.$error"
              class="text-xs text-red-500"
              style="color: red"
            >
              ຕ້ອງໃສ່ຂໍ້ຄວາມ.</span
            >

          </div>

          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">
              {{ $t("group_name_en") }}:</label
            >
       
            <input
              type="text"
              class="form-control"
              id="recipient-name"
              v-model="store.formcreategroup.cg_name_eng"
              maxlength="100"
              @input="filterInputCgName"
            />

            <span
              v-if="v$.cg_name_eng.$error"
              class="text-xs text-red-500"
              style="color: red"
            >
              ຕ້ອງໃສ່ຂໍ້ຄວາມ.</span
            >
            
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
        <button type="button" class="btn btn-primary" @click="save()">
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
import { GroupStore } from "@/store/group";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
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
const store = GroupStore();
const router = useRouter();

const { FormGroup } = storeToRefs(store);

const rules = computed(() => {
  return {
    cg_name_lo: {
      required: helpers.withMessage("Exam code field is required", required),
      minLength: minLength(1),
    },
    cg_name_eng: {
      required: helpers.withMessage("Exam code field is required", required),
      minLength: minLength(1),
    },
  };
});
const v$ = useVuelidate(rules, FormGroup);
const save = async () => {
  ///////////// บันทึก

  v$.value.$validate(); ///////////ดัก req

  if (!v$.value.$error) {


  let save = await store.SaveGroup();
  
  if(save === true){
    store.GetopenModalCreate = false;
    store.formcreategroup.cg_name = ""
    await toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ')
    store.fetchGrouplist();
    
  }else {
    await toast.error('ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ')
  }
  }
};

const closeModal = async () => {
  store.formcreategroup.cg_name = ""
  store.GetopenModalCreate = false;
}

const filterInputCgName = async (event) => {

      store.formcreategroup.cg_name = event.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
};

</script>


