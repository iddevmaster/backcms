<template>

<div id="tableSimple" class="col-lg-12 col-12 layout-spacing"  v-for="(item, index) in store.group" >
                            <div class="statbox widget box box-shadow">
                                <div class="widget-header">
                                    <div class="row">
                                        <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                            <h4>Date group {{ item.date_group }} </h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget-content widget-content-area">

                                    <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Date</th>
                                                    <th class="text-center" scope="col">Sales</th>
                                                    <th class="text-center" scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Shaun Park</td>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                                        <span class="table-inner-text">25 Apr</span>
                                                    </td>
                                                    <td class="text-center">320</td>
                                                    <td class="text-center">
                                                        <span class="badge badge-light-success">Approved</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Alma Clarke</td>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                                        <span class="table-inner-text">26 Apr</span>
                                                    </td>
                                                    <td class="text-center">110</td>
                                                    <td class="text-center">
                                                        <span class="badge badge-light-secondary">Pending</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Vincent Carpenter</td>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                                        <span class="table-inner-text">05 May</span>
                                                    </td>
                                                    <td class="text-center">210</td>
                                                    <td class="text-center">
                                                        <span class="badge badge-light-danger">Rejected</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Xavier</td>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                                        <span class="table-inner-text">18 May</span>
                                                    </td>
                                                    <td class="text-center">784</td>
                                                    <td class="text-center">
                                                        <span class="badge badge-light-info">In Progress</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                        

                                </div>
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