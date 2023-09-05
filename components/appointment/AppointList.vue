<template>

  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <!-- <VueDatePicker v-model="store.form.start_date"></VueDatePicker> -->
      <Datepicker v-model="store.form.start_date" :format="format_start"/>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <Datepicker v-model="store.form.end_date" :format="format_end" />
      <!-- <VueDatePicker v-model="store.form.end_date" :format="format"></VueDatePicker> -->
    </div>
       <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <select class="form-select form-select" aria-label="Default select example" v-model="store.form.dtl_code">
         <option   v-for="(item, index) in store.dtl" :key="item.dlt_code" :value="item.dlt_code" >{{item.dlt_description}}</option>
      </select>
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3">
      <button class="btn btn-primary" @click="Search()">ค้นหา</button>
    </div>
  </div>
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { AppointStore } from '@/store/appoint'
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import Paginate from "vuejs-paginate-next";
import { useToast } from 'vue-toastification'
import Datepicker from 'vuejs3-datepicker';
import moment from 'moment';
import { ref } from 'vue'
const picked = ref(new Date())

const router = useRouter();
const toast = useToast()
const store = AppointStore()

const { deleteItem } = AppointStore();//Action


const date = ref(new Date());
// In case of a range picker, you'll receive [Date, Date]
const format_start = (date) => {
store.form.start_date = moment(date).format('YYYY-MM-DD')
 return moment(date).format('YYYY-MM-DD')
}

const format_end = (date) => {
store.form.end_date = moment(date).format('YYYY-MM-DD')
 return moment(date).format('YYYY-MM-DD')
}
// store.fetchAppointment()

const del = async (id) => {
  await deleteItem(id);

};


const Search = async () => {
  store.fetchAppointment()

};



const choose = async (id) => {
  router.push({ path: 'dltmanage/'+id})
};

const searchData = async () => {

};

const selchk = async (x) => {

};

const selectAll = async () => {
  await selectall();
};

const setCurrentPageclick = async (page) => {
  await setCurrentPage(page)
  await store.fetchUsers()
};


const selectshowdata = async (x) => {
  await selectentires(x.target.value);

};

const selecttype = async (item) => {
  await selecttypes(item.target.value);

};

const sortList = async (sortBy) => {
  await sortLists(sortBy)

};

function coverttime(date) {
  const datetime = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDatetime = datetime.toLocaleString(undefined, options);

  return formattedDatetime;

}



</script>
<style>.dt--pagination {
  float: right;
}</style>