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
                                        <table class="table table-bordered" v-if="item.events">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ap_remark</th>
                                                    <th scope="col">dlt_code</th>
                                                    <th class="text-center" scope="col">ap_learn_type</th>
                                                    <th class="text-center" scope="col">ap_quota</th>
                                                    
                                                    <th class="text-center" scope="col">total_reserv</th>
                                                    <th class="text-center" scope="col">ap_date_start</th>
                                                    <th class="text-center" scope="col">ap_date_end</th>
                                                    <th class="text-center" scope="col">จัดการ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr  v-for="(event, index) in item.events">
                                                    <td>{{ event.ap_remark }}</td>
                                                    <td>
                                                      {{ event.dlt_code }}
                                                    </td>
                                                    <td>
                                                      {{ event.ap_learn_type }}
                                                    </td>
                                                    <td>
                                                      {{ event.ap_quota }}
                                                    </td>
                                                    <td>
                                                      {{ event.total_reserv }}
                                                    </td>
                                                    <td>
                                                      {{ event.ap_date_start }}
                                                    </td>
                                                    <td>
                                                      {{ event.ap_date_end }}
                                                    </td>
                                                    <td align="center">
             <div class="btn-group-vertical">
            <button type="button" class="btn btn-success" style="background-color:#3F2C73;">แก้ไขนัดหมาย</button>
            <!-- <button type="button" class="btn btn-success" style="background-color:#3F2C73;"  >ดูราย</button> -->
            <button type="button" class="btn btn-success" style="background-color:#3F2C73;" >ลบนัดหมาย</button>
            </div>
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