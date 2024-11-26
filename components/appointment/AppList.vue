<template>
  <div class="row layout-top-spacing">


    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1">
      <label for="inputEmail3" class="col-sm-12 col-form-label">Filter</label>

    </div>
    <div class="col-xl-2 col-lg-5 col-md-5 col-sm-2">

      <VueDatePicker
        v-model="store.formlistapp.ap_date_start"
        :format="format"
        :enable-time-picker="false"
  
        :placeholder="$t('exp_update_acc_pehol')"
        required
      ></VueDatePicker>
    </div>

    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1">
      <label for="inputEmail3" class="col-sm-12 col-form-label">ຫາ</label>

    </div>
    <div class="col-xl-2 col-lg-5 col-md-5 col-sm-2">

      <VueDatePicker
        v-model="store.formlistapp.ap_date_end"
        required
        :format="format"
        :enable-time-picker="false"
        :disabled-dates="isDateDisabledEnd"
        :placeholder="$t('exp_update_acc_pehol')"
      ></VueDatePicker>
    </div>


    <div class="col-xl-2 col-lg-2 col-md-12 col-sm-12 mt-auto">
     <button class="btn btn-success" style="margin: 1px;" @click="Fitter()"> ค้นหา</button>
    </div>

  </div>


  <div class="row layout-top-spacing">

    <div class="table-responsive">
    <table id="example" class="table table-bordered" style="width: 100%">
      <thead>
        <tr class="cours_move">
          <th>
          #
          </th>
          <th>
            ວັນທີ
          </th>
    
          <th>
            ເວລາ ເລິ່ມ
          </th>
          <th>
            ປະເພດໃບຂັບຂີ່
          </th>
          <th>ຈຳນວນຮັບໄດ້ລວມ</th>
          <th>ນັດໝາຍແລ້ວ</th>
          <th>ສ້າງໂດຍ</th>
          <th class="no-content">ສະຖານີ່</th>
          <th class="no-content">Action</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="(item,index) in store.applist" :key="item.ap_id" >
        <td>
          {{
              store.formlistapp.page * store.formlistapp.per_page -
              (store.formlistapp.per_page - index) +
              1
            }}
        </td>
        <td>{{ item.ap_date_first }}</td>
        <td>{{ item.time }}</td>
        <td>{{ item.dlt }}</td> 
        <td>{{ item.quata }}</td>
        <td>{{ item.available }}</td>
        <td>{{ item.user_firstname }}</td>
        <td>{{ item.user_full }}</td>
        <td>
          
            
            <a class="badge badge-light-primary text-start me-2 action-view" @click="viewData(item)" >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"    /></svg    ></a>
  
        
          
       
      
             
            
        </td>
      
        </tr>
      </tbody>
    </table>

    <div></div>
  </div>


  <div>
    <div class="dt--pagination" v-if="store.total_page > 1">
      <div
        class="dataTables_paginate paging_simple_numbers"
        id="zero-config_paginate"
      >
        <ul class="pagination">
          <li
            class="paginate_button page-item previous"
            id="zero-config_previous"
            @click="Prev()"
          >
            <a
              href="#"
              aria-controls="zero-config"
              data-dt-idx="0"
              tabindex="0"
              class="page-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-arrow-left"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline></svg ></a>
          </li>
          <li
            class="paginate_button page-item"
            v-for="page in store.total_page"
            :key="page"
          >
            <a
              href="#"
              aria-controls="zero-config"
              data-dt-idx="1"
              tabindex="0"
              class="page-link"
              :class="{ bgcx: page === store.formlistapp.page }"
              @click="setCurrentPageclick(page)"
            >
              {{ page }}</a
            >
          </li>
          <li class="paginate_button page-item next" id="zero-config_next">
            <a
              href="#"
              aria-controls="zero-config"
              @click="Next()"
              data-dt-idx="4"
              tabindex="0"
              class="page-link"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-arrow-right"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline></svg ></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>


<div class="modal" v-if="store.modalGroupDlt">
    <div class="modal-content" id="deleteConformationLabel">
      <div class="modal-header">
        <h1 class="modal-title" id="exampleModalLabel">
         
        </h1>
      </div>
      <div class="modal-body">
        <table class="table table-striped">
    <thead>
      <tr>
        <th>DLT</th>
        <th>QUATA</th>
        <th>Available</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="(item,index) in store.group_event" :key="item.ap_id">
        <td>{{item.dlt_code}}</td>
        <td>{{item.ap_quota}}</td>
        <td>{{item.alva}}</td>
      </tr>

    </tbody>
  </table>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="Hide()"
        >
          ปิด
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
import { AppointStore } from "@/store/appoint";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useToast } from "vue-toastification";
import moment from "moment-timezone";
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();

const router = useRouter();
const toast = useToast();
const store = AppointStore();
const auth = useAuthStore();
 store.formlistapp.ap_date_start = new Date().toISOString().slice(0, 10);

 const currentDate = new Date();
 const nextWeek = new Date(currentDate);
 nextWeek.setDate(currentDate.getDate() + 14);

 store.formlistapp.ap_date_end = nextWeek.toISOString().slice(0, 10)

await store.fetchAppointmentlist();

const date = ref(new Date());
const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


const isDateDisabled = (date) => {
  const currentDate = new Date();
  const disableBeforeDate = new Date(); // Adjust the date as needed
  store.formlistapp.ap_date_end = null;

  return date < currentDate || date < disableBeforeDate;
};


const Hide = async () => {
store.modalGroupDlt = false;
};

const setCurrentPageclick = async (page) => {
  await store.setCurrentPageAPP(page)
  await store.fetchAppointmentlistFitter();
};

const Fitter = async () => {
  if(store.formlistapp.ap_date_start == null){
    return false;
  }
  if(store.formlistapp.ap_date_end == null){
return false;
}
  await store.fetchAppointmentlistFitter();
};

const isDateDisabledEnd = (date) => {
  const currentDate = new Date();
  const disableBeforeDate = new Date(store.formlistapp.ap_date_start); // Adjust the date as needed

  if (!store.formlistapp.ap_date_start) {
    return true;
  }

  return date < currentDate || date == disableBeforeDate;
};


const Prev = async () => {

if (store.formlistapp.page == 1) {
  await store.fetchAppointmentlistFitter();
  await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
    timeout: 50,
  });
} else {
  store.formlistapp.page -= 1;
  await store.fetchAppointmentlistFitter();
  await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
    timeout: 50,
  });
}
};




const Next = async () => {


if (store.formlistapp.page == store.total_page) {
 
  store.formlistapp.page = store.total_page;
await store.fetchAppointmentlistFitter();
  await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
    timeout: 50,
  });
} else {
  store.formlistapp.page += 1;
await store.fetchAppointmentlistFitter();
 
}

};


const viewData = async (item) => {

await store.fetchGROUPDlt(item);
store.modalGroupDlt = true;
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

.cours_move {
  cursor: pointer;
}


.button {
  background-color: #04AA6D; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1 {
  background-color: white; 
  color: black; 
  border: 2px solid #04AA6D;
}

.button1:hover {
  background-color: #04AA6D;
  color: white;
}

.button2 {
  background-color: white; 
  color: black; 
  border: 2px solid #008CBA;
}

.button2:hover {
  background-color: #008CBA;
  color: white;
}

.button3 {
  background-color: white; 
  color: black; 
  border: 2px solid #f44336;
}

.button3:hover {
  background-color: #f44336;
  color: white;
}

.button4 {
  background-color: white;
  color: black;
  border: 2px solid #e7e7e7;
}

.button4:hover {background-color: #e7e7e7;}

.button5 {
  background-color: white;
  color: black;
  border: 2px solid #555555;
}

.button5:hover {
  background-color: #555555;
  color: white;
}
</style>