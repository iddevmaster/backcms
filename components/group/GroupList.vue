<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
        placeholder="ຊອກຫາ"
        class="form-control"
        required=""
        v-model="store.formsearchgroup.search"
        @keyup="searchData"
      />
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="button"
        name="txt"
        placeholder="ຊອກຫາ"
        class="form-control"
        value="+ ເພີ່ມບົດຮຽນ"
style="
    background-color: rgb(15, 119, 223);
    color: white;
"
        @click="openmodal"
      />
  
    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">
      <select
        class="form-select form-select"
        aria-label="Default select example"
     
      >
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
     
      </select>
    </div>
  </div>


  <div class="table-responsive">
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">{{ $t("table_id_group") }}</th>
                <th class="text-center" scope="col">{{ $t("table_id_name") }}</th>
                <th class="text-center" scope="col">{{ $t("table_id_create") }}</th>
                <th class="text-center" scope="col">{{ $t("table_id_action") }}</th>
            </tr>
        </thead>


        <tbody> 
            <tr  v-for="(item,index) in store.group" :key="item.cg_id">
                <td>{{ (store.formsearchgroup.page * store.formsearchgroup.per_page) - (store.formsearchgroup.per_page -  index) +  1 }}</td>
                
                <td>
                  <span class="table-inner-text">
                    {{item.cg_name}}
                  </span>
                </td>
                <td>
                  <span class="table-inner-text">
                    {{item.crt_date}}
                  </span>
                </td>
      
                <td align="center">
             <div class="btn-group-vertical">
            <button type="button" class="btn btn-success" style="background-color:#0f3bc9;" @click="edit(item)">{{ $t("menu_exam_all_bt_edit_exam") }}</button>
      
            <button type="button" class="btn btn-success" style="background-color:#0f3bc9;" @click="del(item.cg_id)">{{ $t("menu_exam_all_bt_del_exam") }}</button>
            </div>
          </td>
       
             
            </tr>
        </tbody>
    </table>

    <div>
      <div class="dt--pagination" v-if="store.group_total_page > 1">
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
            <li class="paginate_button page-item " v-for="page in store.group_total_page" :key="page">
              <a href="#" aria-controls="zero-config" data-dt-idx="1" tabindex="0" class="page-link"  @click="setCurrentPageclick(page)"
              >
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
      </div>
    </div>
</div>


            <!-- pageinate -->

</template>


<script setup lang="ts">

import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

import { useToast } from "vue-toastification";

import moment from "moment-timezone";
import { GroupStore } from '@/store/group'
import { useAuthStore } from '@/store/auth'

const router = useRouter();

const toast = useToast();
const store = GroupStore();
const auth = useAuthStore()







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


const openmodal = async () => {
store.GetopenModalCreate = true;
};

const del = async (item) => {
 store.cg_id = item;

store.GetopenModal = true;
};

const edit = async (item) => {

  store.formeditgroup.cg_id = item.cg_id
  store.formeditgroup.cg_name = item.cg_name
  store.formeditgroup.user_id = auth.user_id
store.GetopenModalEdit = true;
};



const setCurrentPageclick = async (page) => {
  await store.setCurrentPage(page)
  await store.fetchGrouplist()
};

</script>
<style>
.dt--pagination {
  float: right;
}


/* .modal-content {
  background-color: white;
  padding: 20px;
  width: 70%;
} */

/* @media only screen and (min-width: 576px) {

.modal-content {
background-color: white;
padding: 20px;
width: 100%;
}
} */

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}

</style>