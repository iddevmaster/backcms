<template>
  <div class="row mb-2 justify-content-center">
    <div class="type">
      <select
        class="form-select form-select cateSelect"
        aria-label="Default select example"
        v-model="store.dlt_code"
      >
        <option
          v-for="(item, index) in store.dlt"
          :key="item.dlt_code"
          :value="item.dlt_code"
        >
        <span v-if="locale == 'la'">{{
                              item.dlt_description_loas
                            }}</span>
                            <span v-if="locale == 'en'">{{
                              item.dlt_description_english
                            }}</span>
                            <span v-if="locale == 'th'">{{
                              item.dlt_description
                            }}</span>
        </option>
      </select>
    </div>
  </div>
  <div class="row ps-4 mb-5 gap-2 justify-content-center">
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-12 picker">
      <!-- <VueDatePicker v-model="store.form.start_date"></VueDatePicker> -->
      <Datepicker v-model="store.date_event" :format="format_start" />
    </div>
    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12">
      <select
        class="form-select typeSelect h-100"
        aria-label="Default select example"
        v-model="store.ap_learn_type"
      >
      <option value="1">
          <span v-if="locale == 'la'">{{ $t("menu_learn_theory") }}</span>
          <span v-if="locale == 'en'">{{ $t("menu_learn_theory") }}</span>
          <span v-if="locale == 'th'">{{ $t("menu_learn_theory") }}</span>
        </option>
        <option value="2">
          <span v-if="locale == 'la'">{{ $t("menu_learn_practice") }}</span>
          <span v-if="locale == 'en'">{{ $t("menu_learn_practice") }}</span>
          <span v-if="locale == 'th'">{{ $t("menu_learn_practice") }}</span>
        </option>
      </select>
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3">
      <button class="btn btn-primary mt-0 w-100" @click="Search()">
        <i class="bi bi-search me-2"></i>{{ $t("menu_result_search") }}
      </button>
    </div>
  </div>

<div class="table-responsive">
    <table class="table text-center" v-if="store.result.length > 0">
      <thead>
        <tr>
          <th scope="col">{{ $t("menu_result_index") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_result_name") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_result_phone") }}</th>
        
          <th scope="col">{{ $t("menu_result_type") }}</th>
      
          <th scope="col">{{ $t("menu_result_score") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_result_status") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_result_time") }}</th>
          <th class="text-center" scope="col">{{ $t("menu_result_action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, index) in store.result">
          <td>{{ index + 1 }}</td>
          <td>{{ event.user_detail.user_firstname }} {{ event.user_detail.user_lastname }}</td>
          <td>{{ event.user_detail.user_phone }}</td>
         
          <td v-if="event.mr_learn_type == 1">{{ $t("menu_learn_theory") }}</td>
          <td v-else>{{ $t("menu_learn_practice") }}</td>
          <td>{{ event.mr_score }}</td>
          <td v-if="event.mr_status == 'fail'">{{ $t("menu_fail") }}</td>
          <td v-else>{{ $t("menu_pass") }}</td>
  
          <td>{{ format(event.crt_date) }}</td>
           <td>
            <button
              type="button"
              class="btn btn-success mt-0"
              style="background-color: #ce0000" @click="del(event.mr_id)"
            >
              <i class="bi bi-trash" ></i>
            </button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="store.PopupDelete" class="modal">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-trash-2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </div>
        <h5 class="modal-title" id="exampleModalLabel">{{ $t("delete_record") }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p class="">{{ $t("delete_record_t") }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-bs-dismiss="modal" @click="closeModal">Cancel</button>
        <button type="button" class="btn btn-danger" data-remove="task" @click="delt()">Delete
         </button>
      </div>
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
import { ResultStore } from "@/store/result";

import { useToast } from "vue-toastification";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();
const picked = ref(new Date());

const router = useRouter();
const toast = useToast();
const store = ResultStore();

//await store.fetchDlt()

const { deleteItem } = ResultStore(); //Action

const date = ref(new Date());
store.date_event = moment(date).format("YYYY-MM-DD");

await store.fetchResult()

const format_start = (date) => {
  store.date_event = moment(date).format("YYYY-MM-DD");
  return moment(date).format("YYYY-MM-DD");
};

const format_end = (date) => {
  store.end_date = moment(date).format("YYYY-MM-DD");
  return moment(date).format("YYYY-MM-DD");
};



const format = (time) => {
  return moment(time).format("DD/MM/YYYY HH:mm");
};
// store.fetchAppointment()

const del = async (id) => {
  store.mr_id = id;
  store.PopupDelete = true;
  // store.deleteItem(id);
};

const closeModal = async () => {
  store.PopupDelete = false;
 };

const delt = async () => {
  await store.DeleteResult();
  await store.fetchResult();
  store.PopupDelete = false;

  store.IsCardEdit = false;
  store.PopupDelete = false;
 };


const Search = async () => {
  store.fetchResult();
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