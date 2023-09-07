<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-2 col-md-2 col-sm-12">
      <!-- <VueDatePicker v-model="store.form.start_date"></VueDatePicker> -->
      <Datepicker v-model="store.form.date_event" :format="format_start" />
    </div>
    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 mb-4">
      <select
        class="form-select form-select"
        aria-label="Default select example"
        v-model="store.form.ap_learn_type"
      >
        <option value="1">ทฤษฎี</option>
        <option value="2">ปฏิบัติ</option>
      </select>
    </div>

    <div class="col-lg-6 col-md-6 col-sm-3 mb-4">
      <select
        class="form-select form-select"
        aria-label="Default select example"
        v-model="store.form.dtl_code"
      >
        <option
          v-for="(item, index) in store.dtl"
          :key="item.dlt_code"
          :value="item.dlt_code"
        >
          {{ item.dlt_description }}
        </option>
      </select>
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3">
      <button class="btn btn-primary" @click="Search()">ค้นหา</button>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-bordered" v-if="store.group.length > 0">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Remark</th>
          <th scope="col">DLT</th>
          <th class="text-center" scope="col">Learn Type</th>
          <th class="text-center" scope="col">Quota</th>
          <th class="text-center" scope="col">Total Reserv</th>
          <th class="text-center" scope="col">Date Start</th>
          <th class="text-center" scope="col">Date End</th>
          <th class="text-center" scope="col">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, index) in store.group">
          <td>{{ index + 1 }}</td>
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
            {{ event.total_reserve }}
          </td>
          <td>
            {{ event.ap_date_start }}
          </td>
          <td>
            {{ event.ap_date_end }}
          </td>
          <td align="center">
        
            <div class="btn-group-vertical">
              <NuxtLink :to="'/appointment/' + event.ap_id">
              <button
                type="button"
                class="btn btn-success"
                style="background-color: #3f2c73"
              >
                แก้ไขนัดหมาย
              </button>
            </NuxtLink>


              <!-- <button type="button" class="btn btn-success" style="background-color:#3F2C73;"  >ดูราย</button> -->
              <button
                type="button"
                class="btn btn-success"
                style="background-color: #3f2c73"
                @click="del(event)"
              >
                ลบนัดหมาย
              </button>
            </div>
          </td>
        </tr>
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
const picked = ref(new Date());

const router = useRouter();
const toast = useToast();
const store = AppointStore();

const { deleteItem } = AppointStore(); //Action

const date = ref(new Date());

const format_start = (date) => {
  store.form.date_event = moment(date).format("YYYY-MM-DD");
  return moment(date).format("YYYY-MM-DD");
};

const format_end = (date) => {
  store.form.end_date = moment(date).format("YYYY-MM-DD");
  return moment(date).format("YYYY-MM-DD");
};
// store.fetchAppointment()

const del = async (id) => {
  store.deleteItem(id);
  
};

const Search = async () => {
  store.fetchAppointment();
};

const choose = async (id) => {
  router.push({ path: "dltmanage/" + id });
};

const searchData = async () => {};

const selchk = async (x) => {};

const selectAll = async () => {
  await selectall();
};

const setCurrentPageclick = async (page) => {
  await setCurrentPage(page);
  await store.fetchUsers();
};

const selectshowdata = async (x) => {
  await selectentires(x.target.value);
};

const selecttype = async (item) => {
  await selecttypes(item.target.value);
};

const sortList = async (sortBy) => {
  await sortLists(sortBy);
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
</script>
<style>
.dt--pagination {
  float: right;
}
</style>