<template>
  <div class="row layout-top-spacing">
    <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
      <input
        id="t-text"
        type="text"
        name="txt"
        placeholder="ค้นหา"
        class="form-control"
        required=""   v-model="store.formsearchexam.search" @keyup="searchData"
      />
    </div>
    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4 ms-auto">

    </div>

    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-3 mb-4">
      <select
        class="form-select form-select"
        aria-label="Default select example"   @change="selectshowdata($event)" 
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-bordered">
        <thead>
            <tr>
            <th scope="col" @click="sortList('em_code')">{{ $t("menu_exam_history_index") }} &#8597;</th>
                <th scope="col" @click="sortList('em_code')"> {{ $t("menu_exam_history_score") }} &#8597;</th>
                <th class="text-center" scope="col"> {{ $t("menu_exam_history_total") }}</th>
                <th scope="col" @click="sortList('em_name')"> {{ $t("menu_exam_history_email") }} &#8597;</th>
                <th class="text-center" scope="col"> {{ $t("menu_exam_history_phone") }}</th>
            </tr>
        </thead>

  
        <tbody>
            <tr  v-for="(item, index ) in store.history" :key="item.er_id" >
                <td>{{index + 1}}</td>
                <td>{{item.er_score_total}}</td>
                <td>{{item.er_question_total}}</td>
                <td>{{item.out_user.user_email}}</td>
                <td>{{item.out_user.user_phone}}</td>
             
            </tr>
        </tbody>
    </table>
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

store.em_id = route.params.id;

await store.fetchExamlistByEm()


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