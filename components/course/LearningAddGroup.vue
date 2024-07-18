<template>
  <div class="widget-content widget-content-area br-8 p-3">
    <div class="widget-header">
      <div class="row pt-3">
        <div class="col-xl-10 col-sm-8 col-8">
          <h3>{{ $t("menu_couse_view_table_header_c") }}</h3>
        </div>
        <div class="col-xl-2 col-sm-2 col-4" style="text-align: center"></div>
      </div>

      <div class="row pt-3">
        <span class="border-bottom"></span>
      </div>
    </div>

    <div class="row pt-3">
      <div class="col-xl-8 col-md-8 mt-3">
        <label for="inputEmail4" class="form-label">ໝວດວິຊາ:</label><span
          class="text-xs text-red-500" style="color:red"> * </span>
        <select class="form-control">
          <option v-for="(item, index) in storegroup.group" :key="item.cg_id">
            {{ locale == "la" ? item.cg_name_lo : item.cg_name_eng }}
          </option>
        </select>


      </div>

      <div class="col-xl-4 col-md-4 mt-3">
        <label for="inputEmail4" class="form-label">ຈຳນວນຄຳຖາມ:</label><span
          class="text-xs text-red-500" style="color:red"> * </span>
          <input type="text" class="form-control" id="inputEmail4" placeholder="Number"   @input="filterInput" v-model="storegroup.total_group" maxlength="2"
                      />

      </div>


    </div>



    <div class="row pt-3">
      <div class="col-xl-12 col-md-12 mt-3">
        <button type="button" class="btn btn-primary"   @click="save()">
                      เพิ่ม
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
import "vue-select/dist/vue-select.css";

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
import ApiService from "../../services/api.service";

const { locale, setLocale } = useI18n();

defineProps({
  is: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const toast = useToast();
const store = CourseStore();


const storegroup = GroupStore()
await storegroup.fetchGrouplist();



const save = async () => {

alert('save');
}

const validatePNumber = async (evt) => {
 
 const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
 const keyPressed: string = evt.key;
 if (!keysAllowed.includes(keyPressed)) {
   evt.preventDefault()
 }
}



const filterInput = async (event) => {
  // stores.form.user_phone = event.target.value.replace(/\D/g, "");


  const key = event.data;
      if (event.data === ' ') {
        storegroup.total_group= storegroup.total_group.substring(0, storegroup.total_group.length - 1);
        return;
      }
      if (storegroup.total_group.charAt(0) == '0') {
        storegroup.total_group = "";
        return;
      } 
      // if ((storegroup.total_group.charAt(1) !== '') && (storegroup.total_group.charAt(1) !== '0')) {
      //   storegroup.total_group = "2";
      //   return;
      // } 
      storegroup.total_group = event.target.value.replace(/\D/g, "");
};

function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}
</script>
