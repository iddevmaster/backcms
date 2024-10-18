<template>

  <div class="row ps-4 mb-5 gap-2 justify-content-center">

    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
      <select
        class="form-select typeSelect h-100"
        aria-label="Default select example"
        v-model="store.form.ap_learn_type" @change="SearchApp()"
      >
        <option value="1">{{ $t("menu_learn_theory") }}</option>
        <option value="2">{{ $t("menu_learn_practice") }}</option>
  
      </select>
    </div>

    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
      <select @change="Search($event)"
        class="form-select typeSelect h-100" :class="store.event.length < 1 && 'bg-warning'"
        aria-label="Default select example"   v-model="store.form.date_event" 

        :disabled="store.event.length < 1 ? true : false"
        >
        <option disabled selected :value="0">{{ $t('select') }}...</option>
        
        <option v-for="(events, x) in store.event">{{events.event}}</option>
      </select> 
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


// await store.fetchUser()
await store.fetchAppointment();
const myOptionsUser = JSON.parse(JSON.stringify(store.users));
const myUser = ref();

const { deleteItem } = AppointStore(); //Action

const date = ref(new Date());





const format = (time) => {
  return moment(time).format("DD/MM/YYYY HH:mm");
};
// store.fetchAppointment()

const del = async (id) => {
  store.deleteItem(id);
};

const Search = async (event) => {
  store.fetchAppointmentEvent();
};

const SearchApp = async () => {
  store.fetchAppointment();
};












function coverttime(date) {
  const datetime = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDatetime = datetime.toLocaleString(undefined, options);

  return formattedDatetime;
}


const myChangeEvent = (event) => {
    console.log("myChangeEvent: ", event.value);
  }
  const mySelectEvent = (e) => {
    console.log("mySelectEvent: ", e.value);
  }
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