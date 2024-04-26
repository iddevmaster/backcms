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
        value="+ ເພີ່ມໝວດ"
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
          @change="selectshowdata($event)"
     
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
              
                <th class="text-center" scope="col" @click="sortList('cg_name')">{{ $t("table_id_name") }}  &#8597;</th>
                <th class="text-center" scope="col">{{ $t("table_id_create") }}</th>
                <th class="text-center" scope="col">{{ $t("table_id_action") }}</th>
            </tr>
        </thead>


        <tbody> 
            <tr  v-for="(item,index) in store.group" :key="item.cg_id">
                <td>{{ (store.formsearchgroup.page * store.formsearchgroup.per_page) - (store.formsearchgroup.per_page -  index) +  1 }}</td>
              
                <td>
                  <span class="table-inner-text">
                    {{item.cg_id}} - {{item.cg_name}}
                  </span>
                </td>
                <td>
                  <span class="table-inner-text">
                    {{item.crt_date}}
                  </span>
                </td>
      
      

           <td>    
             <div class="action-btns">

                <NuxtLink>
                  <a
                    href="javascript:void(0);"
                    class="action-btn btn-edit bs-tooltip me-2"
                   @click="edit(item)"
                    data-toggle="tooltip"
                    data-placement="top"
                    aria-label="Edit"
                    data-bs-original-title="Edit"
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
                      class="feather feather-edit-2"
                    >
                      <path
                        d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                      ></path>
                    </svg>
                  </a>
                </NuxtLink>
                <a
                  href="javascript:void(0);"
                  class="action-btn btn-delete bs-tooltip"
                 @click="del(item.cg_id)"
                  data-toggle="tooltip"
                  data-placement="top"
                  aria-label="Delete"
                  data-bs-original-title="Delete"
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
                    class="feather feather-trash-2"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    ></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </a>
              </div></td>
       
             
             
            </tr>
        </tbody>
    </table>

    <div>
      <div class="dt--pagination" v-if="store.group_total_page > 1">
        <div class="dataTables_paginate paging_simple_numbers" id="zero-config_paginate">
          <ul class="pagination">
            <li class="paginate_button page-item previous" id="zero-config_previous" @click="Prev()">
              <a href="#" aria-controls="zero-config" data-dt-idx="0" tabindex="0" class="page-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-arrow-left">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg></a>
            </li>
            <li class="paginate_button page-item " v-for="page in store.group_total_page" :key="page">
              <a href="#" aria-controls="zero-config" data-dt-idx="1" tabindex="0" class="page-link"  :class="{ bgc: page === store.formsearchgroup.page }"  @click="setCurrentPageclick(page)"
              >
                {{ page }}</a>
            </li>
            <li class="paginate_button page-item next" id="zero-config_next"><a href="#" aria-controls="zero-config" @click="Next()"
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
const { sortLists } = GroupStore();//Action






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

const searchData = async () => {
  await store.fetchGrouplist();
};
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

const selectshowdata = async (x) => {
  await store.selectentires(x.target.value);
  await store.fetchGrouplist();
};


const Prev = async () => {

  if (store.formsearchgroup.page == 1) {
    await store.fetchGrouplist();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    store.formsearchgroup.page -= 1;
    await store.fetchGrouplist();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  }
};




const Next = async () => {


  if (store.formsearchgroup.page == store.group_total_page) {
   
    store.formsearchgroup.page = store.group_total_page;
  await store.fetchGrouplist();
    await toast.info("ກຳລັງໂຫຼດຂໍ້ມູນ", {
      timeout: 50,
    });
  } else {
    store.formsearchgroup.page += 1;
await store.fetchGrouplist();
   
  }

};
const sortList = async (sortBy) => {
  await sortLists(sortBy)
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




.bgc{
  color: #0a58ca;
}

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