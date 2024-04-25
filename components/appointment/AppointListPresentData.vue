<template>



  <div class="table-responsive">
    <table class="table" v-if="store.app_present.length > 0">
      <thead>
        <tr>
          <th scope="col">{{ $t("menu_app_manage_index") }}</th>
          <th scope="col">{{ $t("app_round") }}</th>
          <th scope="col"> {{ $t("menu_app_view_list_name") }}</th>
          <th scope="col">{{ $t("menu_app_view_list_phone") }}</th>
          <th scope="col">  {{ $t("menu_app_view_iden") }}</th>
          <th scope="col">  {{ $t("menu_user_birdday") }}</th>
          
  
        </tr>
      </thead>
      <tbody>
      
        <tr v-for="(event, index) in store.app_present">
          <td>{{ index + 1 }}</td>
          <td>{{ format_start(event.appointment_detail.ap_date_start) }} - {{ format_end(event.appointment_detail.ap_date_end) }}</td>
          <td>{{ event.user_reserve.user_prefrix }} {{ event.user_reserve.user_firstname }} {{ event.user_reserve.user_lastname }}</td>
          <td>{{ event.user_reserve.user_phone }}</td>
          <td>{{ event.user_reserve.identification_number }}</td>
          <td>{{ event.user_reserve.user_birthday }}</td>
         
      
        </tr>
      </tbody>
    </table>

     <table class="table" v-else>
    
      <tbody>
      
      
          <td style="text-align:center">
ບໍ່ມີຂໍ້ມູນ</td>
        
         
      
      
      </tbody>
    </table>
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
  return moment(date).format("YYYY-MM-DD HH:mm");
};

const format_end = (date) => {
  return moment(date).format("HH:mm");
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