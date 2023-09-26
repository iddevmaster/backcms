<template>
  <div class="row mb-2 justify-content-center">
    <div class="type">
      <select
        class="form-select form-select cateSelect"
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
  </div>
  <div class="row ps-4 mb-5 gap-2 justify-content-center">
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-12 picker">
      <!-- <VueDatePicker v-model="store.form.start_date"></VueDatePicker> -->
      <Datepicker v-model="store.form.date_event" :format="format_start" />
    </div>
    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12">
      <select
        class="form-select typeSelect h-100"
        aria-label="Default select example"
        v-model="store.form.ap_learn_type"
      >
        <option value="1">ทฤษฎี</option>
        <option value="2">ปฏิบัติ</option>
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

  <div class="table-responsive">
    <table class="table" v-if="store.group.length > 0">
      <thead>
        <tr>
          <th scope="col">{{ $t("menu_app_manage_index") }}</th>
          <th scope="col">{{ $t("menu_app_manage_remark") }}</th>
          <th scope="col">{{ $t("menu_app_manage_dlt") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_app_manage_leantype") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_app_manage_quota") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_app_manage_total_reserve") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_app_manage_date_start") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_app_manage_date_end") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_app_view_action") }}</th>
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
            <span v-if="event.ap_learn_type == 1"> ทฤษฎี </span>
            <span v-else> ปฏิบัติ </span>
          </td>
          <td>
            {{ event.ap_quota }}
          </td>
          <td>
            {{ event.total_reserve }}
          </td>
          <td>
            {{ format(event.ap_date_start) }}
          </td>
          <td>
            {{ format(event.ap_date_end) }}
          </td>
          <td align="center">
            <div class="d-flex gap-2">
              <NuxtLink :to="'/appointment/view/' + event.ap_id">
                <button  type="button"
                  class="btn btn-success mt-0"
                  style="background-color: #92a8d1"
                  data-bs-toggle="tooltip" 
                  data-bs-placement="top" 
                  title="รายละเอียดเพิ่มเติม"
                >
                  <i class="bi bi-clipboard"></i>
                </button>
              </NuxtLink>

              <NuxtLink :to="'/appointment/' + event.ap_id">
                <button
                  type="button"
                  class="btn btn-success mt-0"
                  style="background-color: #3f2c73"
                >
                  <i class="bi bi-gear"></i>
                </button>
              </NuxtLink>
              <!-- <button type="button" class="btn btn-success" style="background-color:#3F2C73;"  >ดูราย</button> -->
              <button
                type="button"
                class="btn btn-success mt-0"
                style="background-color: #ce0000"
                @click="del(event)"
              >
                <i class="bi bi-trash"></i>
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


await store.fetchUser()
const myOptionsUser = JSON.parse(JSON.stringify(store.users));
const myUser = ref();

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

const format = (time) => {
  return moment(time).utc().format("DD/MM/YYYY HH:ss");
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