<template>

  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input id="t-text" type="text" name="txt" placeholder="ຊອກຫາ" class="form-control"
      v-model="store.search" @keyup="searchData" />
    </div>
  

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <select class="form-select form-select" aria-label="Default select example" @change="selectshowdata($event)">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  </div>
  <div class="table-responsive">
    <table id="example" class="table table-bordered" style="width:100%">
      <thead>
        <tr>
          <th>
        {{ $t("table_register_id") }}
          </th>
            <!-- <th>
        {{ $t("table_register_name") }}
          </th> -->
            <th>
        {{ $t("table_register_user_firstname") }} 
          </th>
            
            <!-- <th>
        {{ $t("table_register_user_email") }}
          </th> -->
            <th>
        {{ $t("table_register_user_phone") }}
          </th>
            <!-- <th>
        {{ $t("table_register_user_type") }}
          </th> -->
            <th>
        {{ $t("table_register_crt_date") }}
          </th>
            <th>
        {{ $t("table_register_udp_date") }}
          </th>
            <th>
        {{ $t("table_register_verify_account") }}
          </th>
            <th>
        {{ $t("table_register_identification_number") }}
          </th>

          <!-- <th>
        {{ $t("table_ap_user_image") }}
          </th> -->
            <!-- <th>
        user_img
          </th> -->

        </tr>
      </thead>
      <tbody>
      <tr v-for="(user ,index) in store.reportregister" :key="user.user_id">
        <td>
     
          {{ (store.formreport.page * store.formreport.per_page) - (store.formreport.per_page -  index) +  1 }}
        </td>
         <!-- <td>
          {{user.user_name}}
        </td> -->
         <td>
          {{user.user_firstname}}  {{user.user_lastname}}
        </td>
         <!-- <td>
          {{user.user_lastname}}
        </td> -->
         <!-- <td>
          {{user.user_email}}
        </td> -->
         <td>
          {{user.user_phone}}
        </td>
         <!-- <td>
          {{user.user_type}}
        </td> -->
         <td>
          {{user.crt_date}}
        </td>
          <td>
          {{user.udp_date}}
        </td>
    
          <td v-if="user.verify_account == 'system_active'"><button type="button" class="btn btn-success"> {{ $t("system_active") }}</button> </td>
          <td v-else-if="user.verify_account == 'phone_active'"><button type="button" class="btn btn-primary"> {{ $t("phone_active") }}</button> </td>      
           <td v-else-if="user.verify_account == 'system_unactive'"><button type="button" class="btn btn-danger"> {{ $t("phone_active") }}</button> </td>    
            <td v-else-if="user.verify_account == 'phone_unactive'"><button type="button" class="btn btn-danger"> {{ $t("phone_active") }}</button> </td>    
          <td v-else><button type="button" class="btn btn-danger"> {{ $t("unactive") }}</button> </td>
         <td>
          {{user.identification_number}}
        </td>

     
        <!-- <td class="text-end">
                                        <img :src="coverimage(user.user_img)" id="appUserImg" width="120" height="120" />
                                      </td> -->

        
         <!-- <td>
          {{user.user_img}}
        </td> -->
      </tr>
      
      </tbody>
    </table>
    <div>
      <div class="dt--pagination" v-if="store.total_page > 1" >
        <div class="dataTables_paginate paging_simple_numbers" id="zero-config_paginate">
          <ul class="pagination">
            <li class="paginate_button page-item previous" id="zero-config_previous">
              <a href="#" aria-controls="zero-config" data-dt-idx="0" tabindex="0" class="page-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-arrow-left">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg></a>
            </li>
            <li class="paginate_button page-item " v-for="page in store.total_page" :key="page">
              <a href="#" aria-controls="zero-config" data-dt-idx="1" tabindex="0" class="page-link"  :class="{ bgc: page === store.formreport.page }"  @click="setCurrentPageclick(page)">
                {{ page }}</a>
            </li>
            <li class="paginate_button page-item next" id="zero-config_next">
              <a href="#" aria-controls="zero-config"
                data-dt-idx="4" tabindex="0" class="page-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                  height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg></a></li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>



<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { usersStore } from '@/store/users'
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import Paginate from "vuejs-paginate-next";
import { useToast } from 'vue-toastification'
import moment from "moment-timezone";
import { useI18n } from "vue-i18n";
import ApiService from "../../services/api.service";
const { locale, setLocale } = useI18n();

const store = ReportStore();








const searchData = async () => {
 // await store.fetchUsers()
 store.page = 1;

   await store.FitterRegister()
};

const selchk = async (x) => {
  await selectone(x);
};

const selectAll = async () => {
  await selectall();
};

const setCurrentPageclick = async (page) => {
  store.page = 1;
  await store.setCurrentPage(page)
  await store.FitterRegister()
};
const format = (time) => {
  return moment(time).utc().format("DD/MM/YYYY HH:mm");
};

const selectshowdata = async (x) => {
  store.formreport.page = 1;
  await store.selectentires(x.target.value);
  await store.FitterRegister()
};

const selecttype = async (item) => {
  await selecttypes(item.target.value);
  await store.fetchUsers()
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

function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}



</script>
<style>.dt--pagination {
  float: right;
}
.bgc{
 
  color: #0a58ca;
}
#appUserImg {
  object-fit: contain;
}
</style>