<template>
  <div v-if="store.GetopenModalEdit" class="modal">
    <div
      class="modal-content modal-dialog modal-xl"
      id="deleteConformationLabel"
    >
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          {{ $t("group_edit") }}
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
              v-model="store.formeditgroup.cg_name"
              maxlength="100"
            />

            <span
              v-if="v$.cg_name.$error"
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

const { FormEditGroup } = storeToRefs(store);

const rules = computed(() => {
  return {
    cg_name: {
      required: helpers.withMessage("Exam code field is required", required),
      minLength: minLength(1),
    },
  };
});
const v$ = useVuelidate(rules, FormEditGroup);


const closeModal = async () => {
  store.GetopenModalEdit = false;
}
const save = async () => {
  ///////////// บันทึก

  v$.value.$validate(); ///////////ดัก req

  if (!v$.value.$error) {


  let save = await store.UpdateGroup();
  
  if(save === true){
    store.GetopenModalEdit = false;
    await toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ')
    store.fetchGrouplist();
    
  }else {
    await toast.error('ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ')
  }
  }
};
</script>


