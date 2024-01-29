<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
        placeholder="ຊອກຫາ"
        class="form-control"
        required=""   v-model="store.formsearchexamhistory.search" @keyup="searchData"
      />
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">

    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <select
        class="form-select form-select"
        aria-label="Default select example"   @change="selectshowdata($event)"  
      >
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="150">150</option>
      </select>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-bordered">
        <thead>
            <tr>
            <th scope="col">{{ $t("menu_exam_history_index") }} </th>
                <th class="text-center" scope="col"> {{ $t("menu_exam_history_name") }}</th>
                    <th class="text-center" scope="col"> {{ $t("menu_exam_history_phone") }}</th>
                      <th scope="col"> {{ $t("menu_exam_history_email") }}</th>
                <th scope="col" > {{ $t("menu_exam_history_score") }}</th>
                <th class="text-center" scope="col"> {{ $t("menu_exam_history_total") }}</th>
                <th class="text-center" scope="col"> {{ $t("menu_exam_history_status") }}</th>
              
               
            
            </tr>
        </thead>

  
        <tbody>
            <tr  v-for="(item, index ) in store.history" :key="item.er_id" >
                <td>{{index + 1}}</td>
                <td>{{item.out_user.user_firstname}} {{item.out_user.user_lastname}}</td>
                 <td>{{item.out_user.user_email}}</td>
                <td>{{item.out_user.user_phone}}</td>
                <td>{{item.er_score_total}}</td>
                <td>{{item.er_question_total}}</td>
                <td  v-if="item.status == 'fail'">{{ $t("menu_exam_history_status_fail") }}</td>
                <td  v-else>{{ $t("menu_exam_history_status_pass") }}</td>
            </tr>
        </tbody>
    </table>

        <div>
      <div class="dt--pagination" v-if="store.total_page > 1">
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
      </div>

    </div>
</div>
</template>


<script setup lang="ts">
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net-bs5';
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ExamHistoryStore } from "@/store/examhistory";
import { useToast } from "vue-toastification";
import ApiService from '../../services/api.service';
const route = useRoute();

const toast = useToast();
const store = ExamHistoryStore();
const { setCurrentPage } = ExamHistoryStore();//Action

store.em_id = route.params.id;

await store.fetchExamlistByEm()



const searchData = async () => {
  await store.fetchExamlistByEm()
 
};

const selectshowdata = async (x) => {
  await store.selectentires(x.target.value);
   await store.fetchExamlistByEm()

};

const setCurrentPageclick = async (page) => {
  await setCurrentPage(page)
  await store.fetchExamlistByEm()
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