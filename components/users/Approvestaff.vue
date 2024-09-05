<template>

  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input id="t-text" type="text" name="txt" placeholder="ຊື່ / ບັດປະຈຳຕົວ/ Passport / ເບີໂທ" class="form-control" required=""
      v-model="store.formapprove.search" @keyup="searchData" />
    </div>



  </div>

  <div class="table-responsive">
    <table id="example" class="table table-bordered" style="width:100%">
      <thead>
        <tr>
          <th >{{ $t("approve_table_indexnew") }}</th>
          <th   @click="sortListApp('send_approve')">
            {{ $t("approve_table_senddate") }}  &#8597;
          </th>
          <th>
            {{ $t("approve_table_fullname") }}
          </th>
          <th>
            {{ $t("approve_table_tel") }}
          </th>
          <th>
            {{ $t("approve_table_pass") }}
          </th>
          <th>
            {{ $t("approve_table_prov") }}
          </th>
          <th>
            {{ $t("approve_table_act") }}
          </th>
        </tr>
      </thead>
      <tbody>
       
        <tr v-for="(user ,index) in store.appr" :key="user.identification_number">
          <!-- <td><input type="checkbox" v-model="store.selected" :value="user" number></td> -->
          <td>  {{ index+ 1 }}</td>
        
          <td>  {{ user.send_approve }}</td>
          <td>   {{ user.user_firstname }} {{ user.user_lastname }}</td>
          <td>  {{ user.user_phone }}</td>
          <td>  {{ user.identification_number }}</td>
          <td> {{ user.amphur_name }} - {{ user.province_name }}</td>
        
          <td>
            <div class="d-flex flex-row gap-2">
              <button type="button" class="btn btn-primary btn-sm" @click="viewuser(user.user_id)">{{ $t("approve_table_view_ap") }}</button>
          
            </div>
           </td>
          
 

        </tr>
      </tbody>
    </table>
    <div>
      <!-- <div class="dt--pagination" v-if="posts.total_page > 1">
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
            <li class="paginate_button page-item " v-for="page in posts.total_page" :key="page">
              <a href="#" aria-controls="zero-config" data-dt-idx="1" tabindex="0" class="page-link"
                @click="setCurrentPageclick(page)">
                {{ page }}</a>
            </li>
            <li class="paginate_button page-item next" id="zero-config_next"><a href="#" aria-controls="zero-config"
                data-dt-idx="4" tabindex="0" class="page-link"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                  height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg></a></li>
          </ul>
        </div>
      </div> -->

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
import { email } from '@vuelidate/validators';
const { locale, setLocale } = useI18n();

const router = useRouter();
const toast = useToast()
const store = usersStore()
const { posts } = storeToRefs(usersStore())
const { deleteItem } = usersStore();//Action
const { selectall } = usersStore(); //Action
const { selectone } = usersStore();//Action
const { setCurrentPage } = usersStore();//Action
const { sortLists } = usersStore();//Action
const { sortListsApp } = usersStore();//Action
 
const { selectentires } = usersStore();//Action
const { selecttypes } = usersStore();//Action

const { getSelect } = storeToRefs(store); //Get Getter
const { getSelectALL } = storeToRefs(store); //Get Getter
const { getPaginate } = storeToRefs(store); //Get Getter
const { search } = storeToRefs(store); //Get Getter

let a  = await store.fetchUsersApprovePeddingstaff()


const del = async (id) => {
  await deleteItem(id);
  await store.fetchUsers()
};

const choose = async (id) => {
  router.push({ path: 'dltmanage/'+id})
};

const approve = async (item) => {
  await store.Approve(item);
  await toast.success('ອະນຸມັດສຳເລັດ');
  await store.fetchUsersApprove()
};

const viewuser = async (item) => {
  router.push({ path: '/users/approve/view/'+item})
};


const notapproved = async (item) => {
  await store.Notapprove(item);
  await toast.success('ອະນຸມັດບໍ່ສຳເລັດ');
  await store.fetchUsersApprove()
};

const sortListApp = async (sortBy) => {
  await sortListsApp(sortBy)

};

const searchData = async () => {
  await store.fetchUsersApprovePedding()
};

const selchk = async (x) => {
  await selectone(x);
};

const selectAll = async () => {
  await selectall();
};

const setCurrentPageclick = async (page) => {
  await setCurrentPage(page)
  await store.fetchUsers()
};
const format = (time) => {
  return moment(time).format("DD/MM/YYYY HH:mm");
};

const selectshowdata = async (x) => {
  await selectentires(x.target.value);
  await store.fetchUsers()
};

const view = async (x) => {
  await store.fetchUsersIdDisplay(x)
  store.PopupIdcard = true;
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




</script>
<style>.dt--pagination {
  float: right;
}</style>