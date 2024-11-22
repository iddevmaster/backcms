<template>
  <div class="row layout-top-spacing">


    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5">
      <label for="inputEmail3" class="col-sm-12 col-form-label">ສະຖານະ</label>
      <VueDatePicker
        v-model="store.forminsertnew.ap_date_start"
        :format="format"
        :enable-time-picker="false"
        :disabled-dates="isDateDisabled"
        :placeholder="$t('exp_update_acc_pehol')"
        required
      ></VueDatePicker>
    </div>


    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5">
      <label for="inputEmail3" class="col-sm-12 col-form-label">ສະຖານະ</label>
      <VueDatePicker
        v-model="store.forminsertnew.ap_date_end"
        required
        :format="format"
        :enable-time-picker="false"
        :disabled-dates="isDateDisabledEnd"
        :placeholder="$t('exp_update_acc_pehol')"
      ></VueDatePicker>
    </div>


    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2">
      <label for="inputEmail3" class="col-sm-12 col-form-label"></label>
     <button class="btn btn-success"> ค้นหา</button>
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
        <td>{{ item.ap_id }}</td>
        <td>{{ item.ap_date_first }}</td>
        <td>{{ item.time }}</td>
        <td>{{ item.dlt }}</td> 
        <td>{{ item.quata }}</td>
        <td>{{ item.available }}</td>
        <td>{{ item.ap_id }}</td>
        <td>{{ item.ap_id }}</td>
        <td><button> T</button></td>
        </tr>
      </tbody>
    </table>

    <div></div>
  </div>


</div>

  <!-- <div class="row">
    <span
      >Showing {{ (store.current_page - 1) * store.formsearch.per_page + 1 }} to
      {{
        Math.min(store.current_page * store.formsearch.per_page, store.total)
      }}
      of {{ store.total }} entries</span
    >

    <div class="col-xl-12 col-lg-12">
      <div class="pagination-no_spacing" v-if="posts_statff.total_page > 1">
        <ul class="pagination">
          <li>
            <a
              href="javascript:void(0);"
              class="prev"
              @click="validatePNumberDown()"
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
                class="feather feather-chevron-left"
              >
                <polyline points="15 18 9 12 15 6"></polyline></svg  ></a>
          </li>
          <li>
            <div class="col-xs-1">
              <input
                id="ex1"
                type="number"
                style="width: 50px"
                v-model="store.formsearch.page"
                @input="validatePNumber($event)"
              />
            </div>
          </li>
          <li><a href="javascript:void(0);">/</a></li>
          <li>
            <a href="javascript:void(0);">{{ store.total_page }}</a>
          </li>
          <li>
            <a
              href="javascript:void(0);"
              class="next"
              @click="validatePNumberUp()"
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
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline></svg ></a>
          </li>
        </ul>
      </div>
    </div>
  </div> -->
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
 store.formlistapp.ap_date_end = new Date().toISOString().slice(0, 10);

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

const isDateDisabledEnd = (date) => {
  const currentDate = new Date();
  const disableBeforeDate = new Date(store.formlistapp.ap_date_start); // Adjust the date as needed

  if (!store.formlistapp.ap_date_start) {
    return true;
  }

  return date < currentDate || date == disableBeforeDate;
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