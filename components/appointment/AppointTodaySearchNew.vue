<template>
  <div class="row layout-top-spacing">

    <div class="col-lg-2 col-md-4 col-sm-4 p-3" style="text-align: right;">
      <div class="form-group">
    <label for="staticEmail2" class="sr-only">ວັນທີ :</label>
  </div>
    </div>
    <div class="col-lg-4 col-md-12 col-sm-12 pt-2">
      <div class="form-group">
        <VueDatePicker
                      :format="format"
               v-model="store.formsearchapptoday.ap_date_start"
                      :placeholder="$t('exp_update_acc_pehol')"
                    ></VueDatePicker>
  </div>

   
    </div>

    <div class="col-lg-4 col-md-12 col-sm-12">
      <div class="form-group">
        <button class="btn btn-primary additem _effect--ripple waves-effect waves-light">Search</button>
  </div>

   
    </div>
    
    <div class="col-lg-2 col-md-12 col-sm-12">



    </div>

   


  </div>
  <div class="table-responsive p-2">
    <table id="example" class="table table-bordered" style="width: 100%">
      <thead>
        <tr class="cours_move">
          <th @click="sortList('user_id')">
            {{ $t("menu_user_index") }} &#8597;
            <!-- <input type="checkbox"  v-model="store.isAllSelected" @click="selectAll"> -->
          </th>
          <th @click="sortList('user_firstname')">
           ช่วงเวลา &#8597;
          </th>
          <!-- <th @click="sortList('user_name')">ยูสเซอร &#8597;</th> -->
          <!-- <th @click="sortList('user_email')">อีเมล &#8597;</th> -->
          <th @click="sortList('menu_user_c_username')">
            ປະເພດໃບຂັບຂີ່ &#8597;
          </th>
          <th @click="sortList('user_phone')">
            ID ນັດໝາຍ &#8597;
          </th>
          <th>ຊື່</th>
          <th>ສະຖານະ</th>
          <th>ຜົນທິດສະດີ</th>
          <th>ຜົນປະຕິບັດ</th>
          <th class="no-content">{{ $t("menu_user_c_action") }}</th>
        </tr>
      </thead>
      <tbody>
        
        <tr v-for="(item, index) in store.dlttoday">
          <td>{{ index + 1 }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.dlt_code }}</td>
          <td>{{ item.ap_number }}</td>
          <td>{{ item.user_firstname }} {{ item.user_lastname }}</td>
          <td>{{ item.check_document }}</td>
          <td>{{ item.thero }}</td>
          <td>{{ item.pratic }}</td>
          <td>{{ item.pratic }}</td>
          <!-- <td> {{item.user_reserve.user_prefrix}} {{ item.user_reserve.user_firstname }} {{ item.user_reserve.user_lastname }}
          </td>
          <td>{{ item.user_reserve.user_phone }}</td>
          <td>{{ item.user_reserve.identification_number }}</td>
          <td>{{ item.user_reserve.user_email }}</td>
          <td>
            <button
              type="button"
              class="btn btn-success mt-0"
              style="background-color: #ce0000"
              @click="del(item)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>

    <div></div>
  </div>
  
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { AppointStore } from '@/store/appoint'
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Paginate from "vuejs-paginate-next";
import { useToast } from "vue-toastification";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment-timezone";
import { useI18n } from "vue-i18n";
const { locale, setLocale } = useI18n();

const router = useRouter();
const toast = useToast();
const store = AppointStore();
const auth = useAuthStore();








const format = (time) => {
  return moment(time).format("DD/MM/YYYY");
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

const validatePNumber = async (evt) => {
  const keysAllowed: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  const keyPressed: string = evt.key;
  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault();
  }
  if (store.formsearch.page > store.total_page) {
    store.formsearch.page = store.total_page;
    return false;
  }
  if (store.formsearch.page == "") {
    store.formsearch.page = 1;
    await store.fetchUsers();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    await store.fetchUsers();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
};


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