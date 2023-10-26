<template>


  <div class="table-responsive">
    <table class="table table-bordered">
        <thead>
            <tr>
       
                <th scope="col" @click="sortList('em_code')">{{ $t("menu_exam_all_code") }} &#8597;</th>
                <th class="text-center" scope="col">{{ $t("menu_exam_all_pic") }}</th>
                <th scope="col" @click="sortList('em_name')">{{ $t("menu_exam_all_name") }} &#8597;</th>
                <th class="text-center" scope="col">{{ $t("menu_exam_all_detail") }}</th>
                <th class="text-center" scope="col" @click="sortList('em_random_amount')">{{ $t("menu_exam_all_total_random") }} &#8597;</th>
                 <th class="text-center" scope="col" @click="sortList('total_question')">{{ $t("menu_exam_all_total_exam") }} &#8597;</th>
            
                <th class="text-center" scope="col">{{ $t("menu_exam_all_total_action") }}</th>
            </tr>
        </thead>


        <tbody>
            <tr  v-for="item in store.historylist">
                <td>{{item.er_id}}</td>
          
         
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
import { ExamHistoryStore } from '@/store/examhistory'; // import the auth store we just created
import { useToast } from "vue-toastification";
import ApiService from '../../services/api.service';
const router = useRouter();

const toast = useToast();
const store = ExamHistoryStore();


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