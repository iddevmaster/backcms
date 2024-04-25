<template>
  <div class="row mb-2 justify-content-center">
    <div class="type">
      <select
        class="form-select form-select cateSelect"
        aria-label="Default select example"
        v-model="store.formreserve.dlt_code"
      >
        <option
          v-for="(item, index) in store.dlt"
          :key="item.dlt_code"
          :value="item.dlt_code"
        >
        <span v-if="locale == 'la'" >{{item.dlt_code}} : {{item.dlt_description_loas}}</span>
      <span v-if="locale == 'en'" >{{item.dlt_code}} : {{item.dlt_description_english}}</span>
      <span v-if="locale == 'th'" >{{item.dlt_code}} :{{item.dlt_description}}</span>
        
        </option>
      </select>
    </div>
  </div>
  <div class="row ps-4 mb-5 gap-2 justify-content-center">
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-12 picker">
      <!-- <VueDatePicker v-model="store.form.start_date"></VueDatePicker> -->
      <Datepicker v-model="store.formreserve.present_day" :format="format_present" />
    </div>
    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12">
      <select
        class="form-select typeSelect h-100"
        aria-label="Default select example"
        v-model="store.formreserve.ap_learn_type"
      >
        <option :value="1">{{ $t("menu_learn_theory") }}</option>
        <option :value="2">{{ $t("menu_learn_practice") }}</option>
      </select>
    </div>

    
  <!-- <div class="row mb-4">
    <div class="col-sm-6">
      <label for="exampleFormControlInput1">User</label>
      <Select2 v-model="store.form.user_id" :options="myOptionsUser" :settings="{ settingOption: value, settingOption: value }"  @change="myChangeEvent($event)" @select="mySelectEvent($event)"/>
    </div>
   
  </div> -->
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3">
      <button class="btn btn-primary mt-0 w-100" @click="Search()">
        <i class="bi bi-search me-2"></i>{{ $t("menu_app_manage_search") }}
      </button>
    </div>
  </div>



  
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { AppointStore } from "@/store/appoint";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Paginate from "vuejs-paginate-next";
import { useToast } from "vue-toastification";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();
const picked = ref(new Date());

const router = useRouter();
const toast = useToast();
const store = AppointStore();







const date = ref(new Date().toISOString().slice(0, 10)).value;
store.formreserve.present_day = date

await store.fetchAppPresent()
const format_start = (date) => {
 
  return moment(date).format("HH:mm");
};

const format_present = (date) => {
  store.formreserve.present_day = moment(date).format("YYYY-MM-DD");
  return moment(date).format("YYYY-MM-DD");
};



// store.fetchAppointment()

const del = async (id) => {
  store.deleteItem(id);
};

const Search = async () => {
  await store.fetchAppPresent()
};


</script>
<style>
.dt--pagination {
  float: right;
}
.cateSelect {
  font-size: 20px;
  width: 100%;
  font-weight: bold;
  text-align: center;
  --bs-form-select-bg-img: "";
  border: 1px solid rgb(199, 199, 199);
  
}
.cateSelect:hover {
  
}
.type {
  width: fit-content;
}
.typeSelect {
  padding: 5px;
}
.vuejs3-datepicker__value {
  padding: 5px !important;
  height: 100% !important;
  width: 100%;
}
table {
  border-collapse: collapse !important;
}
.vuejs3-datepicker {
  width: 100%;
}
.picker {
  min-width: fit-content;
}
</style>